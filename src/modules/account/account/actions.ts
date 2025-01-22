"use server";

import { getToken } from "@/modules/auth/actions";
import { CustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

import { navigate } from "../../../app/actions";

export async function getCustomerDetails() {
  const token = await getToken();

  if (!token) return;

  try {
    const data = await authorizedMagentoClient(token, "GET", {
      tags: ["customer", token],
      revalidate: 600,
    }).request<CustomerQuery>(CustomerDocument);

    if (token && data?.customer) {
      return data.customer;
    }
  } catch (e) {
    return null;
  }

  return null;
}

export async function getCustomerOrders() {
  const token = await getToken();

  if (!token) return;

  try {
    return await authorizedMagentoClient(token, "GET", {
      tags: ["customer-orders"],
      revalidate: 600,
    }).request<CustomerQuery>(CustomerDocument);
  } catch (e) {
    await navigate("/auth/login?token=EXPIRED");

    return null;
  }
}
