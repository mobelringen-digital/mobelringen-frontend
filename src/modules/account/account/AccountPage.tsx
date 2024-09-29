import React from "react";

import { Debugger } from "@/components/Debugger";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { CustomerDataFragment } from "@/types";

interface Props {
  data?: CustomerDataFragment | null;
}

export const AccountPage: React.FC<Props> = ({ data }) => {
  return (
    <AccountPageLayout title="Velkommen!">
      <p className="text-xl lg:text-2xl">
        Her kan du finne informasjon om dine ordrer med status, endre dine personopplysninger og samtykker eller se dine
        eksklusive tilbud om du er medlem av Kundeklubben.
      </p>
      <Debugger data={data} />
    </AccountPageLayout>
  );
};
