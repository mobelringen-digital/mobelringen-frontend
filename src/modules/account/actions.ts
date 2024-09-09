"use server";

import { getToken } from "@/modules/auth/actions";
import { UpdateCustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerUpdateInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function updateCustomerDetails(input: CustomerUpdateInput) {
  const token = await getToken();

  if (!token) return;

  return await authorizedMagentoClient(token, "POST").request(
    UpdateCustomerDocument,
    { input },
  );
}
