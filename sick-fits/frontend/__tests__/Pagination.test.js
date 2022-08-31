import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { makePaginationMocksFor } from '../lib/testUtils';
import Pagination from '../components/Pagination';

describe('<Pagination />', () => {
  it('displays a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading…');
  });

  it('renders pagination for 18 items', async () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination-container');
    expect(container).toHaveTextContent('Page 1 of 5');
    expect(container).toMatchSnapshot();
  });

  it('disables the prev page on first page', async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination-container');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });

  it('disables the next page on last page', async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={3} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination-container');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('enables prev and next on middle page', async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={2} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination-container');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});
