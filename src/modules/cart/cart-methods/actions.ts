"use server";

import { revalidateTag } from "next/cache";

import { setDeliveryTypeDocument } from "@/queries/cart.queries";
import { SetDeliveryTypeInput } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function setDeliveryType(input: SetDeliveryTypeInput) {
  const data = await baseMagentoClient().request(setDeliveryTypeDocument, {
    input,
  });

  revalidateTag("cart");

  return data;
}
