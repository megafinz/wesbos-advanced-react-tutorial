import PropTypes from 'prop-types';
import Order from '../../components/Order';

export default function OrderPage({ query }) {
  return <Order orderId={query.id} />;
}

OrderPage.propTypes = {
  query: PropTypes.any,
};
