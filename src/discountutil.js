// Cart totals with discount
export function calculateCartTotals(cartItems, discountPercent) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.Quantity || item.quantity || 1),
    0
  );

  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalAmount = totalAmount - discountAmount;

  return { totalAmount, discountAmount, finalAmount };
}

// Coupon discount handler
export function getCouponDiscount(coupon, totalPrice) {
  let discountPercent = 0;

  switch (coupon) {
    case "SNEHA10":
      discountPercent = 10;
      break;
    case "SNEHA20":
      discountPercent = 20;
      break;
    case "SNEHA30":
      discountPercent = 30;
      break;
    default:
      discountPercent = 0;
  }

  const discountAmount = (totalPrice * discountPercent) / 100;

  return {
    isValid: discountPercent > 0,
    discountPercent,
    discountAmount,
  };
}

// Direct discount handler
export function calculateDiscount(totalAmount, discountPercent) {
  const discount = (totalAmount * discountPercent) / 100;
  return { discount };
}