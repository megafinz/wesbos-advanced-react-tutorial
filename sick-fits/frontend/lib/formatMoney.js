export default function formatMoney(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  const formatter = new Intl.NumberFormat('en-us', options);
  return formatter.format(amount);
}
