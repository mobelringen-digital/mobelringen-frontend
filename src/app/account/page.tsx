import { auth } from "@/auth/auth";
import { DetailsPage } from "@/modules/account/DetailsPage";
import { LoginPage } from "@/modules/account/LoginPage";
import { CustomerDocument } from "@/queries/mutations/customer.mutations";
import { CmsStaticPageConfigurationDocument } from "@/queries/page.queries";
import {
  CmsStaticPageConfigurationQuery,
  CmsStaticPageConfigurationQueryVariables,
  CustomerQuery,
  StaticPageType,
} from "@/types";
import {
  authorizedMagentoClient,
  baseHygraphClient,
} from "@/utils/lib/graphql";

async function getCustomerDetails() {
  const session = await auth();

  return await authorizedMagentoClient(session?.token).request<CustomerQuery>(
    CustomerDocument,
  );
}

async function getStaticPageConfiguration() {
  return await baseHygraphClient.request<
    CmsStaticPageConfigurationQuery,
    CmsStaticPageConfigurationQueryVariables
  >(CmsStaticPageConfigurationDocument, {
    where: {
      pageType: StaticPageType.LoginPage,
    },
  });
}

export default async function AccountPage() {
  const session = await auth();
  const configuration = await getStaticPageConfiguration();

  if (!session?.token) {
    return <LoginPage configuration={configuration.staticPageConfiguration} />;
  }

  const data = await getCustomerDetails();

  if (!data.customer) {
    return <LoginPage configuration={configuration.staticPageConfiguration} />;
  }

  return <DetailsPage data={data.customer} />;
}
