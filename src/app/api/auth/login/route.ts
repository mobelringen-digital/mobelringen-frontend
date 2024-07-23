import { NextRequest } from "next/server";

import { GenerateCustomerTokenDocument } from "@/queries/mutations/customer.mutations";
import {
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        {
          status: 400,
        },
      );
    }

    const data = await baseMagentoClient().request<
      GenerateCustomerTokenMutation,
      GenerateCustomerTokenMutationVariables
    >(GenerateCustomerTokenDocument, {
      email,
      password,
    });

    if (data.generateCustomerToken?.token) {
      return Response.json(
        {
          success: true,
          token: data.generateCustomerToken?.token,
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
