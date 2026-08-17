export const CURRENCY_SYMBOL = 'K';

export function formatPrice(amount: number): string {
  return `K ${amount.toFixed(2)}`;
}
