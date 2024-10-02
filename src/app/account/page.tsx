import { AccountPage } from "@/modules/account/account/AccountPage";
import { getCustomerDetails } from "@/modules/account/account/actions";

import { navigate } from "../actions";

export default async function Account() {
  const customerData = await getCustomerDetails();

  if (!customerData) {
    return navigate("/auth/login?token=EXPIRED");
  }

  return <AccountPage data={customerData} />;
}
