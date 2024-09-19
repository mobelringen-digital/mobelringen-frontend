"use server";

import { setDeliveryTypeDocument } from "@/queries/cart.queries";
import { SetDeliveryTypeInput } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function setDeliveryType(input: SetDeliveryTypeInput) {
  return baseMagentoClient().request(setDeliveryTypeDocument, {
    input,
  });
}
