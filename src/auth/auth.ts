import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions, User } from "next-auth";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { GenerateCustomerTokenDocument } from "@/queries/mutations/customer.mutations";
import {
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export type ErrorResponse = {
  response: {
    status: number;
    data: Record<string, string>;
    errors: Array<Error>;
  };
};

export type Error = {
  message: string;
};

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          username: credentials?.email,
          password: credentials?.password,
        };

        try {
          const res = await baseMagentoClient().request<
            GenerateCustomerTokenMutation,
            GenerateCustomerTokenMutationVariables
          >(GenerateCustomerTokenDocument, {
            email: payload.username ?? "",
            password: payload.password ?? "",
          });

          if (res.generateCustomerToken) {
            return res as User; // @TODO: return customer data
          }
        } catch (error) {
          throw new Error(
            JSON.stringify((error as ErrorResponse)?.response.errors),
          );
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session({ token, session }) {
      session.token = token.user.generateCustomerToken?.token as string;

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.token = user.generateCustomerToken?.token as string;
      }
      return token;
    },
  },
};

// Use it in server contexts
function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export { authOptions, auth };
