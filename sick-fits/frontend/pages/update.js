import Head from 'next/head';
import PropTypes from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  return (
    <div>
      <Head>
        <title>Sick Fits | Update Product</title>
      </Head>
      <PleaseSignIn>
        <UpdateProduct id={query.id} />
      </PleaseSignIn>
    </div>
  );
}

UpdatePage.propTypes = {
  query: PropTypes.any,
};
