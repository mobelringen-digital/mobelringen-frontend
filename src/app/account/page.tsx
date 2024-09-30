import { AccountPage } from "@/modules/account/account/AccountPage";
import { getCustomerDetails } from "@/modules/account/account/actions";
import { getToken } from "@/modules/auth/actions";

import { navigate } from "../actions";

export default async function Account() {
  const token = await getToken();
  const customerData = await getCustomerDetails();

  if (!customerData) {
    return navigate(`/auth/logout?token=${token}`);
  }

  return <AccountPage data={customerData} />;
}
