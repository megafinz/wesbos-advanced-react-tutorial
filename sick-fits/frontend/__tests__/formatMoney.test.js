import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
    expect(formatMoney(140)).toEqual('$1.40');
  });

  it('works with whole dollars', () => {
    expect(formatMoney(100)).toEqual('$1.00');
    expect(formatMoney(10000)).toEqual('$100.00');
    expect(formatMoney(0)).toEqual('$0.00');
  });

  it('works with big numbers', () => {
    expect(formatMoney(500000)).toEqual('$5,000.00');
  });
});
