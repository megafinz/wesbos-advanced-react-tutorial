import PropTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import PleaseSignIn from '../../components/PleaseSignIn';
import ProductList from '../../components/ProductList';

export default function ProductsPage({ query }) {
  const page = parseInt(query.page) || 1;
  return (
    <div>
      <PleaseSignIn>
        <Pagination page={page} />
        <ProductList page={page} />
        <Pagination page={page} />
      </PleaseSignIn>
    </div>
  );
}

ProductsPage.propTypes = {
  query: PropTypes.any,
};
