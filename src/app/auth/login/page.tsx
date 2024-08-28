import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { LoginPage } from "@/modules/auth/LoginPage";

export default async function Login() {
  return (
    <>
      <LoginPage />
      <StaticPageContent url="/auth/login" />
    </>
  );
}
