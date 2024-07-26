import { getCustomerDetails } from "@/modules/account/actions";
import { DetailsPage } from "@/modules/account/DetailsPage";

import { navigate } from "../actions";

async function getCustomer() {
  const data = await getCustomerDetails();

  if (!data?.customer) return navigate("/auth/login");

  return data;
}

export default async function AccountPage() {
  const data = await getCustomer();

  if (!data?.customer) {
    return null;
  }

  return <DetailsPage data={data.customer} />;
}
