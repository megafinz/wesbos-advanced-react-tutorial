import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import wait from 'waait';
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { ALL_PRODUCTS_QUERY } from '../components/ProductList';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('<CreateProduct />', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('handles the updating', async () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    userEvent.type(screen.getByPlaceholderText(/name/i), product.name);
    userEvent.type(screen.getByPlaceholderText(/price/i), `${product.price}`);
    userEvent.type(
      screen.getByPlaceholderText(/description/i),
      product.description
    );
    expect(screen.getByDisplayValue(product.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(`${product.price}`)).toBeInTheDocument();
    expect(screen.getByDisplayValue(product.description)).toBeInTheDocument();
  });

  it('creates the product when the form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: product.name,
            description: product.description,
            image: '',
            price: product.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...product,
              id: '123091834098',
              __typename: 'Product',
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: { skip: 0, first: 4 },
        },
        result: {
          data: { allProducts: [product] },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );
    userEvent.type(screen.getByPlaceholderText(/name/i), product.name);
    userEvent.type(screen.getByPlaceholderText(/price/i), `${product.price}`);
    userEvent.type(
      screen.getByPlaceholderText(/description/i),
      product.description
    );
    userEvent.click(screen.getByText(/Add Product/i));
    await waitFor(() => wait(0));
    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith({
      pathname: '/product/123091834098',
    });
  });
});
