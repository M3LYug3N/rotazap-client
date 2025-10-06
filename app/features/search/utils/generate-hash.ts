export const generateHash = (
  skuId: number,
  supplierId: number,
  price: number
) => `${skuId}-${supplierId}-${price}`;
