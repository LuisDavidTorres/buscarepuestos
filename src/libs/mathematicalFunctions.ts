export function calculateDiscount(price: number, discount: number): number {
  return price - discount;
}

export function calculateIva(price: number): number {
  const ivaAmount = Math.round(price * 0.19);

  return ivaAmount;
}

export function calculateNetPrice(price: number): number {
  const ivaAmount = price * 0.19;
  price = Math.round(price / 1.19);

  return price;
}