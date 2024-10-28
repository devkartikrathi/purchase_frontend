export const truncateText = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-IN');
};