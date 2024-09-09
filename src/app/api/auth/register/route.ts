import { NextRequest } from "next/server";

import { CreateCustomerV2Document } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  try {
    const data = await baseMagentoClient().request(CreateCustomerV2Document, {
      input: requestData,
    });

    if (data.createCustomerV2?.customer) {
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
