import { useQuery } from "@tanstack/react-query";

import { StoresListDocument } from "@/queries/stores.queries";
import { StoresListQuery } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

const STORES_LIST_QUERY_KEY = ["stores"];

export const useStoresList = ({ postcode }: { postcode?: string }) => {
  const fetchStores = async () => {
    const data = await baseMagentoClient("GET").request<StoresListQuery>(
      StoresListDocument,
      {
        postcode,
      },
    );

    return data.getStores;
  };

  return useQuery({
    queryKey: [...STORES_LIST_QUERY_KEY, postcode],
    queryFn: fetchStores,
    staleTime: 3600,
  });
};
