import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import { fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';

const user = fakeUser();

const mocks = [
  // SIGN_UP
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: user.name,
        email: user.email,
        password: 'password',
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: '12389345',
          email: user.email,
          name: user.name,
        },
      },
    },
  },
  // CURRENT_USER
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: user } },
  },
];

describe('<SignUp />', () => {
  it('it renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    userEvent.type(screen.getByPlaceholderText(/Name/), user.name);
    userEvent.type(screen.getByPlaceholderText(/Email/), user.email);
    userEvent.type(screen.getByPlaceholderText(/Password/), 'password');
    userEvent.click(screen.getByText('Sign Up!'));
    await screen.findByText(
      `Signed up with ${user.email}, please go ahead and Sign In!`
    );
  });
});
