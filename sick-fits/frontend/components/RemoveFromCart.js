import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($cartItemId: ID!) {
    deleteCartItem(id: $cartItemId) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ cartItemId }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      cartItemId,
    },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id: cartItemId,
    //   },
    // },
  });
  return (
    <BigButton
      onClick={removeFromCart}
      disabled={loading}
      aria-busy={loading}
      type="button"
      title="Remove this item from Cart"
    >
      &times;
    </BigButton>
  );
}

RemoveFromCart.propTypes = {
  cartItemId: PropTypes.string,
};
