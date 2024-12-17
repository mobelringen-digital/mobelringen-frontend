import React, {Suspense} from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { LoginPage } from "@/modules/auth/LoginPage";

export default async function Login() {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <LoginPage />
      <StaticPageContent url="/auth/login" />
    </Suspense>
  );
}
