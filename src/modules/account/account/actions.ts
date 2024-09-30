"use server";

import { getToken } from "@/modules/auth/actions";
import { CustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function getCustomerDetails() {
  const token = await getToken();

  if (!token) return;

  const data = await authorizedMagentoClient(token, "POST", {
    tags: ["customer"],
  }).request<CustomerQuery>(CustomerDocument);

  if (token && data.customer) {
    return data.customer;
  }
}

export async function getCustomerOrders() {
  const token = await getToken();

  if (!token) return;

  return await authorizedMagentoClient(token, "GET", {
    tags: ["customer-orders"],
    revalidate: 3600,
  }).request<CustomerQuery>(CustomerDocument);
}
