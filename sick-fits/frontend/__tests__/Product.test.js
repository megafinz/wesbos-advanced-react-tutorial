import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { fakeItem } from '../lib/testUtils';
import Product from '../components/Product';

const product = fakeItem();

describe('<Product />', () => {
  it('renders out the price tag and title', () => {
    // Arrange / Act.
    const { container } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const link = container.querySelector('a');

    // Assert.
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent('dogs are best');
  });

  it('renders and matches the snapshot', () => {
    // Arrange / Act.
    const { container } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    // Assert.
    expect(container).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    // Arrange / Act.
    render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const img = screen.getByAltText(product.name);

    // Assert.
    expect(img).toBeInTheDocument();
  });
});
