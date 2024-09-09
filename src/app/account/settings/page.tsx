import { getCustomerDetails } from "@/modules/account/account/actions";
import { SettingsPage } from "@/modules/account/settings/SettingsPage";

export default async function AccountSettings() {
  const customer = await getCustomerDetails();

  return <SettingsPage customer={customer?.customer} />;
}
