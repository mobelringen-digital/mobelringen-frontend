import { useQuery } from "@tanstack/react-query";

import { CustomerDocument } from "@/types";
import { useSession } from "@/utils/hooks/useSession";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const useCustomerQuery = () => {
  const session = useSession();

  const fetchCustomer = async () => {
    const data = await authorizedMagentoClient(session.token, "GET").request(
      CustomerDocument,
    );

    return data.customer;
  };

  return useQuery({
    queryKey: ["customer"],
    queryFn: fetchCustomer,
    enabled: !!session.token,
    staleTime: 3600,
  });
};
