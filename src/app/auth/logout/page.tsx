import { cookies } from "next/headers";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { logout } from "@/modules/auth/actions";

import { navigate } from "../../actions";

export default async function Logout() {
  const cookiesStore = cookies();

  if (!cookiesStore.get("token")?.value) {
    return navigate(`/auth/login?callback=NO_TOKEN`);
  }

  await logout().then(() =>
    navigate(`/auth/login?session=${cookiesStore.get("token")?.value}`),
  );

  return <PageTopLoader />;
}
