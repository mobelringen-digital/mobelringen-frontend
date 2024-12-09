import { useQuery } from "@tanstack/react-query";

import { fetchCustomer } from "@/modules/account/services/fetchCustomer";
import { useSession } from "@/utils/hooks/useSession";

export const useCustomerQuery = () => {
  const session = useSession();

  return useQuery({
    queryKey: ["customer", session.token],
    queryFn: () => fetchCustomer(session.token),
    enabled: !!session.token,
    staleTime: 3600,
  });
};
