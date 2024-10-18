"use server";

import { getToken } from "@/modules/auth/actions";
import { ChangeCustomerPasswordDocument } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

import { handleError } from "../../../../app/actions";

export async function changeCustomerPassword(
  currentPassword: string,
  newPassword: string,
) {
  const token = await getToken();

  return authorizedMagentoClient(token, "POST")
    .request(ChangeCustomerPasswordDocument, {
      currentPassword,
      newPassword,
    })
    .catch((error) => {
      return handleError(error);
    });
}
