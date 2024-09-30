import { getStores } from "@/components/store-selector/actions";
import { getCustomerDetails } from "@/modules/account/account/actions";
import { PreferencesPage } from "@/modules/account/preferences/PreferencesPage";

export default async function AccountPreferences() {
  const customer = await getCustomerDetails();
  const stores = await getStores();

  return <PreferencesPage stores={stores} customer={customer} />;
}
