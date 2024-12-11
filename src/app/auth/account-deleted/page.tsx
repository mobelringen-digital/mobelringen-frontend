import React, {Suspense} from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";

export default async function AccountDeleted() {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <StaticPageContent url="/auth/account-deleted" />
    </Suspense>
  );
}
