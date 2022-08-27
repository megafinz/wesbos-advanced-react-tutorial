import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

export default function Product({ product }) {
  return (
    <ItemStyles>
      {product?.photo && (
        <img
          src={product.photo.image.publicUrlTransformed}
          alt={product.name}
        />
      )}
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price / 100)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: add buttons to edit and delete item */}
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.any,
};
