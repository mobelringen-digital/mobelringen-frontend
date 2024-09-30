import { AuthHandler } from "@/components/auth-handler/AuthHandler";
import { getCustomerDetails } from "@/modules/account/account/actions";

export async function AuthServerComponent() {
  const customer = await getCustomerDetails();

  return <AuthHandler customer={customer} />;
}
