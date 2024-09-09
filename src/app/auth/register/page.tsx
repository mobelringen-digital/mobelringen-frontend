import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { RegisterPage } from "@/modules/auth/RegisterPage";

export default async function Register() {
  return (
    <>
      <RegisterPage />
      <StaticPageContent url="/auth/register" />
    </>
  );
}
