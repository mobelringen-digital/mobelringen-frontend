import { AccountPage } from "@/modules/account/account/AccountPage";
import { getCustomerDetails } from "@/modules/account/account/actions";
import { getToken, logout } from "@/modules/auth/actions";

import { navigate } from "../actions";

export default async function Account() {
  const token = await getToken();
  const customerData = await getCustomerDetails();

  if (!customerData?.customer) {
    return logout().then(() =>
      navigate(`/auth/login?callback=TOKEN_EXPIRED&token=${token}`),
    );
  }

  return <AccountPage data={customerData?.customer} />;
}
