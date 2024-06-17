import { redirect } from "next/navigation";

import { auth } from "@/auth/auth";
import { LoginPage } from "@/modules/auth/LoginPage";

export default async function Login() {
  const session = await auth();

  if (session?.token) {
    return redirect("/account");
  }

  return <LoginPage />;
}
