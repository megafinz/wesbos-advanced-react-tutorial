import PropTypes from 'prop-types';
import PleaseSignIn from '../../components/PleaseSignIn';
import ProductDetails from '../../components/ProductDetails';

export default function ProductDetailsPage({ query }) {
  return (
    <PleaseSignIn>
      <ProductDetails id={query.id} />
    </PleaseSignIn>
  );
}

ProductDetailsPage.propTypes = {
  query: PropTypes.any,
};
