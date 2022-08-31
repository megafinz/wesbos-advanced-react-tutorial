import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);
  if (loading) {
    return <p>Loading…</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  const currentPage = Math.min(Math.max(1, page), pageCount);
  return (
    <PaginationStyles data-testid="pagination-container">
      <Head>
        <title>
          Sick Fits — Page {currentPage} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${currentPage - 1}`}>
        <a aria-disabled={currentPage <= 1}>← Prev</a>
      </Link>
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${currentPage + 1}`}>
        <a aria-disabled={currentPage >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
};
