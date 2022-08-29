import Head from 'next/head';
import styled from 'styled-components';
import RequestPasswordReset from '../components/RequestPasswordReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <GridStyles>
      <Head>
        <title>Sick Fits | Sign In</title>
      </Head>
      <SignIn />
      <SignUp />
      <RequestPasswordReset />
    </GridStyles>
  );
}
