import numeral from 'numeral';

export const formattedCurrency = number => {
  return numeral(number).format('0,0');
};
