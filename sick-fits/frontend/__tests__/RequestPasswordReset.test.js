import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import RequestPasswordReset, {
  REQUEST_PASSWORD_RESET_MUTATION,
} from '../components/RequestPasswordReset';

const mocks = [
  {
    request: {
      query: REQUEST_PASSWORD_RESET_MUTATION,
      variables: {
        email: 'fake-user@example.com',
      },
    },
    result: {
      data: {
        sendUserPasswordResetLink: null,
      },
    },
  },
];

describe('<RequestPasswordReset />', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestPasswordReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation when submitted', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <RequestPasswordReset />
      </MockedProvider>
    );
    userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'fake-user@example.com'
    );
    userEvent.click(screen.getByText(/Request Reset/));
    await screen.findByText(/Success/);
  });
});
