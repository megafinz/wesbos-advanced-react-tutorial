import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';
import { CURRENT_USER_QUERY } from '../components/User';
import Nav from '../components/Nav';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: { authenticatedItem: fakeUser({ cart: [fakeCartItem()] }) },
    },
  },
];

describe('<Nav />', () => {
  it('renders a minimal nav when user is signed out', () => {
    const { container } = render(
      <MockedProvider mocks={notSignedInMocks}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign In');
    const signInLink = screen.getByText('Sign In');
    expect(signInLink).toHaveAttribute('href', '/signin');
    expect(container).toHaveTextContent('Products');
    const productsLink = screen.getByText('Products');
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('renders a full nav when user is signed in', async () => {
    const { container } = render(
      <MockedProvider mocks={signedInMocks}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign Out');
  });

  it('renders the amount of items in the cart', async () => {
    const { container } = render(
      <MockedProvider mocks={signedInMocksWithCartItems}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
