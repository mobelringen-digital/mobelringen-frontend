import { getStores } from "@/components/store-selector/actions";
import { StoresPage } from "@/modules/stores/StoresPage";

export default async function Stores() {
  const stores = await getStores();

  return <StoresPage stores={stores} />;
}
