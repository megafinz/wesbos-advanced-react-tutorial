import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  CartItemUpdateInput,
  CartItemWhereInput,
} from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  _: unknown,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput | CartItemUpdateInput> {
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  const allCartItems = (await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  })) as CartItemWhereInput[];
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    const updatedCartItem = await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
    });
    return updatedCartItem as CartItemUpdateInput;
  }
  const newCartItem = await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
  return newCartItem as CartItemCreateInput;
}
