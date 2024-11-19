import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ResetPasswordPage } from "@/modules/auth/ResetPasswordPage";

export default function ForgotPassword() {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
