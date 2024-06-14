import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { CustomerDocument } from "@/queries/mutations/customer.queries";
import { CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const CUSTOMER_DETAILS_QUERY_KEY = ["customer-details"];

export const useCustomerDetailsQuery = () => {
  const session = useSession();
  const fetchCustomerDetails = async () => {
    const data = await authorizedMagentoClient(
      session.data?.token,
    ).request<CustomerQuery>(CustomerDocument);

    return data.customer;
  };

  return useQuery({
    queryKey: [...CUSTOMER_DETAILS_QUERY_KEY],
    queryFn: fetchCustomerDetails,
  });
};
