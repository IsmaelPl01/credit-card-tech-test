export const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber || cardNumber.length !== 16) {
    return cardNumber;
  }
  
  const first2 = cardNumber.slice(0, 2);
  const last4 = cardNumber.slice(-4);
  return `${first2}**********${last4}`;
};
