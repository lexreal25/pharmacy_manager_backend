export const calcSales = (
  quantity: number,
  price: number,
  discount: number,
  tax: number,
) => {
  const subtotal = quantity * price;
  const discountedSubtotal = subtotal - discount;
  const taxAmount = discountedSubtotal * tax;

  return {
    subtotal,
    taxAmount,
    totalAmount: Number((discountedSubtotal + taxAmount).toFixed(2)),
  };
};
