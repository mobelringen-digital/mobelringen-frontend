"use client";

import { useQuery } from "@tanstack/react-query";

import {
  CUSTOMER_QUERY_KEY,
  fetchCustomer,
} from "@/modules/account/services/fetchCustomer";
import { useSession } from "@/utils/hooks/useSession";

export const useCustomerQuery = () => {
  const { token } = useSession();

  return useQuery({
    queryKey: [...CUSTOMER_QUERY_KEY],
    queryFn: () => fetchCustomer(String(token)),
    enabled: !!token,
    staleTime: Infinity,
  });
};
