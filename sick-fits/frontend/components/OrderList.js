import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import OrderItemStyles from './styles/OrderItemStyles';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        photo {
          image {
            publicUrlTransformed
          }
        }
        quantity
      }
    }
  }
`;

const OrderListStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrderList() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) {
    return <p>Loading…</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { allOrders } = data;
  return (
    <div>
      <Head>
        <title>Sick Fits | Your Orders</title>
      </Head>
      <h2>You have {allOrders.length} orders</h2>
      <OrderListStyles>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/orders/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInOrder(order)} Item(s)</p>
                  <p>{order.items.length} Product(s)</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo.image.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderListStyles>
    </div>
  );
}
