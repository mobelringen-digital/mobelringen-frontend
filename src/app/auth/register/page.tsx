import React, {Suspense} from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { getStores } from "@/components/store-selector/actions";
import { RegisterPage } from "@/modules/auth/RegisterPage";

export default async function Register() {
  const stores = await getStores();

  return (
    <Suspense fallback={<PageTopLoader />}>
      <RegisterPage stores={stores} />
      <StaticPageContent url="/auth/register" />
    </Suspense>
  );
}
