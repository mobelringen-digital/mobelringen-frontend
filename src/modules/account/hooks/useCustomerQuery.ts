"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import {
  CUSTOMER_QUERY_KEY,
  fetchCustomer,
} from "@/modules/account/services/fetchCustomer";

export const useCustomerQuery = () => {
  const { data } = useSession();

  return useQuery({
    queryKey: [...CUSTOMER_QUERY_KEY],
    queryFn: () => fetchCustomer(String(data?.token)),
    enabled: !!data?.token,
    staleTime: Infinity,
  });
};
