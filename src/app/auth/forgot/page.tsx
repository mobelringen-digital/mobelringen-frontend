import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ForgotPasswordPage } from "@/modules/auth/ForgotPasswordPage";

export default function ResetPassword() {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
