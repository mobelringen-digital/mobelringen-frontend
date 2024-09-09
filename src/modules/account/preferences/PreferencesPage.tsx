import React from "react";

import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { Communication } from "@/modules/account/preferences/communication/Communication";
import { FavoriteStore } from "@/modules/account/preferences/favorite-store/FavoriteStore";
import { BaseStoreFragment, CustomerDataFragment } from "@/types";

interface Props {
  customer?: CustomerDataFragment | null;
  stores?: Array<BaseStoreFragment | null> | null;
}

export const PreferencesPage: React.FC<Props> = ({ customer, stores }) => {
  return (
    <AccountPageLayout title="Samtykker og preferanser">
      <div className="flex flex-col w-full gap-8">
        <FavoriteStore customer={customer} stores={stores} />
        <Communication customer={customer} />
      </div>
    </AccountPageLayout>
  );
};
