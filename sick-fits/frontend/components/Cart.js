import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import { useUser } from './User';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
    h3,
    p {
      margin: 0;
    }
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img
        width={100}
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}=
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart cartItemId={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!user) {
    return (
      <p>
        Please <Link href="/signin">Sign In</Link> to view your Cart
      </p>
    );
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {user.cart.map((x) => (
          <CartItem key={x.id} cartItem={x} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.any,
};
