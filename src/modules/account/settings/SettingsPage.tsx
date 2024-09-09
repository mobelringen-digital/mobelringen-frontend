import React from "react";

import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { ChangePassword } from "@/modules/account/settings/change-password/ChangePassword";
import { PersonalInformation } from "@/modules/account/settings/personal-information/PersonalInformation";
import { CustomerDataFragment } from "@/types";

interface Props {
  customer?: CustomerDataFragment | null;
}

export const SettingsPage: React.FC<Props> = ({ customer }) => {
  return (
    <AccountPageLayout title="Profilinstillinger">
      <div className="flex flex-col w-full gap-8">
        <PersonalInformation customer={customer} />
        <ChangePassword />
      </div>
    </AccountPageLayout>
  );
};
