import PropTypes from 'prop-types';
import ProductDetails from '../../components/ProductDetails';

export default function ProductDetailsPage({ query }) {
  return <ProductDetails id={query.id} />;
}

ProductDetailsPage.propTypes = {
  query: PropTypes.any,
};
