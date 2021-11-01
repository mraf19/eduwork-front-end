export const totalItemCart = items => {
  return items.reduce((acc, curr) => acc + curr.qty, 0);
}

export function sumPrice(items){
  return items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
}

export function formatRupiah(number){
  return new Intl.NumberFormat('id-ID', {maximumSignificantDigits: 2, style: 'currency', currency: 'IDR'}).format(number);
}