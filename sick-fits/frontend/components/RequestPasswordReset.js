import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
    }
  }
`;

export default function RequestPasswordReset() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
  });
  const [requestPasswordReset, { data, error, loading }] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await requestPasswordReset();
        clearForm();
      }}
    >
      <h2>Request Password Reset</h2>
      <DisplayError error={error} />
      {data?.sendUserPasswordResetLink === null && (
        <p>Success! Check your email for a link.</p>
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
      </fieldset>
      <button type="submit">Request Reset!</button>
    </Form>
  );
}
