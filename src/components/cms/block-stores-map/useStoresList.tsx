import { useQuery } from "@tanstack/react-query";

import { StoresListDocument } from "@/queries/stores.queries";
import { CoordinatesInput, StoresListQuery } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

const STORES_LIST_QUERY_KEY = ["stores"];

export const useStoresList = ({
  searchInput,
  coordinates,
}: {
  searchInput?: string;
  coordinates?: CoordinatesInput;
}) => {
  const fetchStores = async () => {
    try {
      const data = await baseMagentoClient("GET").request<StoresListQuery>(
        StoresListDocument,
        {
          searchInput,
          coordinates,
          geolocation: !!coordinates,
        },
      );

      return data.getStores;
    } catch (e) {
      // Do nothing
    }
  };

  return useQuery({
    queryKey: [...STORES_LIST_QUERY_KEY, searchInput, coordinates],
    queryFn: fetchStores,
    staleTime: 3600,
  });
};
