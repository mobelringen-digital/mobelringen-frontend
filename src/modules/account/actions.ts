"use server";

import { getToken } from "@/modules/auth/actions";
import { CustomerDocument, CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function getCustomerDetails() {
  const token = await getToken();

  if (!token) return;

  return await authorizedMagentoClient(token).request<CustomerQuery>(
    CustomerDocument,
  );
}
