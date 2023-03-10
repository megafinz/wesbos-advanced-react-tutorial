import { gql, useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: checkoutError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [CURRENT_USER_QUERY],
    }
  );
  const { closeCart } = useCart();
  return (
    <CheckoutFormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        nProgress.start();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });
        if (error) {
          setLoading(false);
          setError(error);
          nProgress.done();
          return;
        }
        const order = await checkout({
          variables: {
            token: paymentMethod.id,
          },
        });
        router.push({
          pathname: '/orders/[id]',
          query: { id: order.data.checkout.id },
        });
        closeCart();
        setLoading(false);
        nProgress.done();
      }}
    >
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {checkoutError && <p style={{ fontSize: 12 }}>{checkoutError.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
