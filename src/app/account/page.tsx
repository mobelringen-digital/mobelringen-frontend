import { AccountPage } from "@/modules/account/account/AccountPage";
import { getCustomerDetails } from "@/modules/account/account/actions";

export default async function Account() {
  const customerData = await getCustomerDetails();

  return <AccountPage data={customerData?.customer} />;
}
