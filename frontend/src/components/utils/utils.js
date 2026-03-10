
//configures price description based on amount
export function configirePrice(item, amount) {
  if (amount == 0) {
    return "Free"
  }
  return `$${((item.priceCents) / 100).toFixed(2)}`;
};

export function formatPrice(amount) {
  return (amount / 100).toFixed(2);
}

