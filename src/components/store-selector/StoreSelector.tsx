import React from "react";

import { getStore, getStores } from "@/components/store-selector/actions";
import { StoresSelectController } from "@/components/store-selector/StoresSelectController";
import { getToken } from "@/modules/auth/actions";

export async function StoreSelector() {
  const stores = await getStores();
  const token = await getToken();
  const selectedStore = await getStore();

  if (!stores) return null;

  return (
    <StoresSelectController
      selectedStore={selectedStore}
      isAuthorized={!!token}
      stores={stores}
    />
  );
}
