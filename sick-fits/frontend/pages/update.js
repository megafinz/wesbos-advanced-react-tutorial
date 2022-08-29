import Head from 'next/head';
import PropTypes from 'prop-types';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  return (
    <div>
      <Head>
        <title>Sick Fits | Update Product</title>
      </Head>
      <UpdateProduct id={query.id} />
    </div>
  );
}

UpdatePage.propTypes = {
  query: PropTypes.any,
};
