const tax_rate = 0.13;

const roundMoney = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export interface SalesTotal {
  subtotal: number;
  discount: number;
  taxAmount: number;
  totalAmount: number;
}

export const calcMultiItemSales = (
  items: { quantity: number; price: number }[],
  discount: number,
): SalesTotal => {
  if (items.length === 0) {
    throw new Error("Sales must contain atleast one item.");
  }
  for (const item of items) {
    if (
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      !Number.isFinite(item.price) ||
      item.price < 0
    ) {
      throw new Error("Discount cannot be negative amount.");
    }
  }

  const subtotal = roundMoney(
    items.reduce((sum, item) => sum + item.quantity, 0),
  );
  if (discount > subtotal) {
    throw new Error("Dsicount cannot exceed the subtotal.");
  }
  const taxableAmount = roundMoney(subtotal - discount);
  const taxAmount = roundMoney(taxableAmount * tax_rate);
  const totalAmount = roundMoney(taxableAmount + taxAmount);

  return {
    subtotal,
    discount: roundMoney(discount),
    taxAmount,
    totalAmount,
  };
};
