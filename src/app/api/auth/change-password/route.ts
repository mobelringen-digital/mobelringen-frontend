import { NextRequest } from "next/server";

import { ChangeCustomerPasswordDocument } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function POST(request: NextRequest) {
  const { currentPassword, newPassword } = await request.json();
  try {
    const data = await baseMagentoClient().request(
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
