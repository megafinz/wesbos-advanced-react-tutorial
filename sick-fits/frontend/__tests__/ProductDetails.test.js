import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import { fakeItem } from '../lib/testUtils';
import ProductDetails, {
  PRODUCT_DETAILS_QUERY,
} from '../components/ProductDetails';

const product = fakeItem();

const mocks = [
  {
    request: {
      query: PRODUCT_DETAILS_QUERY,
      variables: {
        id: '123',
      },
    },
    result: {
      data: {
        Product: product,
      },
    },
  },
  {
    request: {
      query: PRODUCT_DETAILS_QUERY,
      variables: {
        id: '1234',
      },
    },
    result: {
      errors: [{ message: 'Item not found!' }],
    },
  },
];

describe('<ProductDetails />', () => {
  it('renders with proper data', async () => {
    // Arrange / Act.
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <ProductDetails id="123" />
      </MockedProvider>
    );

    await screen.findByTestId('product-details-container');

    // Assert.
    expect(container).toMatchSnapshot();
  });

  it('errors out when item is not found', async () => {
    // Arrange / Act.
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <ProductDetails id="1234" />
      </MockedProvider>
    );

    await screen.findByTestId('graphql-error');

    // Assert.
    expect(container).toHaveTextContent('Shoot!');
    expect(container).toHaveTextContent('Item not found!');
  });
});
