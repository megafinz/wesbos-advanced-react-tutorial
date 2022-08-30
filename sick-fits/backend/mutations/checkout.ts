import { KeystoneContext } from '@keystone-next/types';
import { OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
import { Session } from '../types';

const gql = String.raw;

export default async function checkout(
  _: unknown,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const session = context.session as Session;
  const userId = session.itemId;
  if (!userId) {
    throw new Error('Sorry, you must be signed in to create an order.');
  }
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: gql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }`,
  });
  const cartItems = user.cart.filter((x) => !!x.product);
  const amount = cartItems.reduce(
    (tally, cartItem) => tally + cartItem.product.price * cartItem.quantity,
    0
  );
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  const orderItems = cartItems.map((x) => ({
    name: x.product.name,
    description: x.product.description,
    price: x.product.price,
    quantity: x.quantity,
    photo: { connect: { id: x.product.photo.id } },
  }));
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });
  const cartItemIds = user.cart.map((x) => x.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds,
  });
  return order;
}
