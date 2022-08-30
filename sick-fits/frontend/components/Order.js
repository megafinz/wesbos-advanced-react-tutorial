import Head from 'next/head';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import OrderStyles from './styles/OrderStyles';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
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

export default function Order({ orderId }) {
  const { data, error, loading } = useQuery(ORDER_QUERY, {
    variables: {
      id: orderId,
    },
  });
  if (loading) {
    return <p>Loading…</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { order } = data;
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits | Order #{order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((x) => (
          <div key={x.id} className="order-item">
            <img src={x.photo.image.publicUrlTransformed} alt={x.name} />
            <div className="item-details">
              <h2>{x.name}</h2>
              <p>Qty: {x.quantity}</p>
              <p>Each: {formatMoney(x.price)}</p>
              <p>Sub Total: {formatMoney(x.price * x.quantity)}</p>
              <p>{x.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

Order.propTypes = {
  orderId: PropTypes.string,
};
