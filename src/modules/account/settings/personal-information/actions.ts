"use server";

import { revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import { CustomerUpdateInput, UpdateCustomerDocument } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function updateCustomer(input: CustomerUpdateInput) {
  const token = await getToken();
  const data = await authorizedMagentoClient(token, "POST").request(
    UpdateCustomerDocument,
    {
      input,
    },
  );

  revalidateTag("customer");

  return data;
}
