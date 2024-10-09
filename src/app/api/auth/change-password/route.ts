import { NextRequest } from "next/server";

import { getToken } from "@/modules/auth/actions";
import { ChangeCustomerPasswordDocument } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function POST(request: NextRequest) {
  const token = await getToken();
  const { currentPassword, newPassword } = await request.json();
  try {
    const data = await authorizedMagentoClient(token, "POST").request(
      ChangeCustomerPasswordDocument,
      {
        currentPassword,
        newPassword,
      },
    );

    if (data.changeCustomerPassword) {
      return Response.json(
        {
          success: true,
        },
        {
          status: 200,
        },
      );
    }

    return Response.json(
      {
        success: false,
        errors: [{ message: "Invalid credentials" }],
      },
      { status: 401 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        errors: (error as any).response.errors,
      },
      {
        status: 401,
      },
    );
  }
}
