import Head from 'next/head';
import PropTypes from 'prop-types';
import ResetPassword from '../components/ResetPassword';

export default function ResetPasswordPage({ query }) {
  return (
    <div>
      <Head>
        <title>Sick Fits | Reset Password</title>
      </Head>
      <ResetPassword token={query.token} />
    </div>
  );
}

ResetPasswordPage.propTypes = {
  query: PropTypes.any,
};
