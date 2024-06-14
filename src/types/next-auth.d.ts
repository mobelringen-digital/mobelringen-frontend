import { User } from "next-auth";

import { GenerateCustomerTokenMutation } from "@/types";

declare module "next-auth" {
  interface User extends NonNullable<GenerateCustomerTokenMutation> {
    token: string;
  }
  interface Session {
    user: User;
    token: string;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User;
  }
}
