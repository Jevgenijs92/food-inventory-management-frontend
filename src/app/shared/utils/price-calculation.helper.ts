export const calculatePricePerUnit = (
  quantityPerPackaging: number,
  pricePerPackaging: number
): number => {
  return Number(quantityPerPackaging) && Number(pricePerPackaging)
    ? pricePerPackaging / quantityPerPackaging
    : 0;
};
