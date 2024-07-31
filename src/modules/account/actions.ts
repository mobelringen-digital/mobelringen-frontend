"use server";

import { getToken } from "@/modules/auth/actions";
import { UpdateCustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerDocument, CustomerQuery, CustomerUpdateInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function getCustomerDetails() {
  const token = await getToken();

  if (!token) return;

  return await authorizedMagentoClient(token, "GET", {
    tags: ["customer"],
    revalidate: 3600,
  }).request<CustomerQuery>(CustomerDocument);
}

export async function updateCustomerDetails(input: CustomerUpdateInput) {
  const token = await getToken();

  if (!token) return;

  return await authorizedMagentoClient(token, "POST").request(
    UpdateCustomerDocument,
    { input },
  );
}
