import { CustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const CUSTOMER_QUERY_KEY = ["customer"];

export const fetchCustomer = async (token: string) => {
  const response =
    await authorizedMagentoClient(token).request<CustomerQuery>(
      CustomerDocument,
    );

  return response.customer;
};
