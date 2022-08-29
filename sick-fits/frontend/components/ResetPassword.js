import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import RequestPasswordReset from './RequestPasswordReset';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      message
    }
  }
`;

export default function ResetPassword({ token }) {
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
    token,
  });
  const [resetPassword, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );
  if (!token) {
    return (
      <div>
        <p>Sorry, you must provide a password reset token</p>
        <RequestPasswordReset />
      </div>
    );
  }
  const passwordResetError = data?.redeemUserPasswordResetToken?.message
    ? data.redeemUserPasswordResetToken
    : undefined;
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await resetPassword();
      }}
    >
      <h2>Reset Password</h2>
      <DisplayError error={error || passwordResetError} />
      {data?.redeemUserPasswordResetToken === null && (
        <p>Success! You can now Sign In with your new password.</p>
      )}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          New Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Reset!</button>
    </Form>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string,
};
