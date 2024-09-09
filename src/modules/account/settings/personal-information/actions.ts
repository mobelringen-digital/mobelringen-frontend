"use server";

import { getToken } from "@/modules/auth/actions";
import { CustomerUpdateInput, UpdateCustomerDocument } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function updateCustomer(input: CustomerUpdateInput) {
  const token = await getToken();
  return await authorizedMagentoClient(token, "POST").request(
    UpdateCustomerDocument,
    {
      input,
    },
  );
}
