import { createHash } from "crypto";

export const generateBasketHash = (
  skuId: number,
  supplierId: number,
  basePrice: number,
  qty: number
): string =>
  createHash("md5")
    .update(`${skuId}-${supplierId}-${basePrice}=${qty}`)
    .digest("hex");
