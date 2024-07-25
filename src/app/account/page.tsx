import { DetailsPage } from "@/modules/account/DetailsPage";
import { getToken } from "@/modules/auth/actions";
import { CustomerDocument } from "@/queries/mutations/customer.mutations";
import { CustomerQuery } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

import { navigate } from "../actions";

async function getCustomerDetails() {
  const token = await getToken();

  if (!token) return navigate("/auth/login");

  const data =
    await authorizedMagentoClient(token).request<CustomerQuery>(
      CustomerDocument,
    );

  if (!data.customer) return navigate("/auth/login");

  return data;
}

export default async function AccountPage() {
  const data = await getCustomerDetails();

  if (!data?.customer) {
    return null;
  }

  return <DetailsPage data={data.customer} />;
}
