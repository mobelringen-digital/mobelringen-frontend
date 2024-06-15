import { auth } from "@/auth/auth";
import { DetailsPage } from "@/modules/account/DetailsPage";
import { LoginPage } from "@/modules/account/LoginPage";
import { CustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

async function getCustomerDetails() {
  const session = await auth();

  return await authorizedMagentoClient(session?.token).request<CustomerQuery>(
    CustomerDocument,
  );
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.token) {
    return <LoginPage />;
  }

  const data = await getCustomerDetails();

  if (!data.customer) {
    return <LoginPage />;
  }

  return <DetailsPage data={data.customer} />;
}
