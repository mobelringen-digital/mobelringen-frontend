"use server";

import { MaskedOrderDocument } from "@/queries/order.queries";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function getMaskedOrder(maskId: string) {
  const data = await baseMagentoClient().request(MaskedOrderDocument, {
    mask: maskId,
  });

  return data.getOrderByMask;
}
