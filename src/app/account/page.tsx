import { auth } from "@/auth/auth";
import { DetailsPage } from "@/modules/account/DetailsPage";
import { CustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

import { navigate } from "../actions";

async function getCustomerDetails() {
  const session = await auth();

  if (!session?.token) return navigate("/auth/login");

  return await authorizedMagentoClient(session.token).request<CustomerQuery>(
    CustomerDocument,
  );
}

export default async function AccountPage() {
  const data = await getCustomerDetails();

  if (!data?.customer) {
    return null;
  }

  return <DetailsPage data={data.customer} />;
}
