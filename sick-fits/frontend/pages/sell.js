import Head from 'next/head';
import CreateProduct from '../components/CreateProduct';

export default function SellPage() {
  return (
    <div>
      <Head>
        <title>Sick Fits | Sell</title>
      </Head>
      <CreateProduct />
    </div>
  );
}
