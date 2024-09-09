import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";

export default function CustomerService() {
  return (
    <AccountPageLayout>
      <StaticPageContent url="/account/customer-service" />
    </AccountPageLayout>
  );
}
