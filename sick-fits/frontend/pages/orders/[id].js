import PropTypes from 'prop-types';
import Order from '../../components/Order';
import PleaseSignIn from '../../components/PleaseSignIn';

export default function OrderPage({ query }) {
  return (
    <PleaseSignIn>
      <Order orderId={query.id} />
    </PleaseSignIn>
  );
}

OrderPage.propTypes = {
  query: PropTypes.any,
};
