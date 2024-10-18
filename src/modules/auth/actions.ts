"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { AssignCustomerToGuestCart } from "@/queries/cart.queries";
import {
  GenerateCustomerTokenDocument,
  RequestPasswordResetEmailDocument,
  ResetPasswordDocument,
} from "@/queries/mutations/customer.mutations";
import {
  CustomerCreateInput,
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from "@/types";
import {
  authorizedMagentoClient,
  baseMagentoClient,
} from "@/utils/lib/graphql";

import { handleError } from "../../app/actions";

interface LoginInput {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginInput) {
  const cookiesStore = cookies();

  const data = await baseMagentoClient("POST", {
    cache: "no-store",
  })
    .request<
      GenerateCustomerTokenMutation,
      GenerateCustomerTokenMutationVariables
    >(GenerateCustomerTokenDocument, {
      email,
      password,
    })
    .catch((error) => {
      return handleError(error);
    });

  const token = (data as GenerateCustomerTokenMutation)?.generateCustomerToken
    ?.token;

  if (token) {
    await assignCustomerToGuestCart(token);

    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    cookiesStore.set("token", token, {
      expires: oneWeekFromNow,
    });
  }

  return data;
}

export async function createCustomer(input: CustomerCreateInput) {
  return await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  }).then((res) => res.json());
}

export async function assignCustomerToGuestCart(token: string) {
  const cookiesStore = cookies();
  const guestCartId = cookiesStore.get("cart")?.value;

  if (!token || !guestCartId) {
    return false;
  }

  const data = await authorizedMagentoClient(token, "POST").request(
    AssignCustomerToGuestCart,
    {
      cartId: guestCartId,
    },
  );

  cookiesStore.set("cart", "", {
    expires: new Date(0),
  });

  revalidateTag("cart");

  return data;
}

export async function getToken() {
  const cookieStore = cookies();

  return cookieStore.get("token")?.value;
}

export async function requestPasswordResetEmail(email: string) {
  const data = await baseMagentoClient("POST").request(
    RequestPasswordResetEmailDocument,
    {
      email,
    },
  );

  return data.requestPasswordResetEmail;
}

export async function resetPassword(
  email: string,
  resetPasswordToken: string,
  newPassword: string,
) {
  const data = await baseMagentoClient("POST")
    .request(ResetPasswordDocument, {
      resetPasswordToken,
      newPassword,
      email,
    })
    .catch((e) => {
      return handleError(e);
    });

  return data;
}
