import { useQuery } from "@tanstack/react-query";

import { StoresListDocument } from "@/queries/stores.queries";
import { StoresListQuery } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

const STORES_LIST_QUERY_KEY = ["stores"];

export const useStoresList = ({ searchInput }: { searchInput?: string }) => {
  const fetchStores = async () => {
    try {
      const data = await baseMagentoClient("GET").request<StoresListQuery>(
        StoresListDocument,
        {
          searchInput,
        },
      );

      return data.getStores;
    } catch (e) {
      // Do nothing
    }
  };

  return useQuery({
    queryKey: [...STORES_LIST_QUERY_KEY, searchInput],
    queryFn: fetchStores,
    staleTime: 3600,
  });
};
