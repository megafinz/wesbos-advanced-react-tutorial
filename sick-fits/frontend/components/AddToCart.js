import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;

export default function AddToCart({ productId }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      productId,
    },
    refetchQueries: [CURRENT_USER_QUERY],
  });
  return (
    <button
      onClick={addToCart}
      disabled={loading}
      aria-busy={loading}
      type="button"
    >
      🛒 Add{loading && 'ing'} To Cart
    </button>
  );
}

AddToCart.propTypes = {
  productId: PropTypes.string,
};
