"use server";

import { redirect } from "next/navigation";

export async function navigate(url: string) {
  redirect(url);
}

export interface GraphQLError {
  response: {
    errors: Array<{
      message: string;
      extensions: {
        category: string;
      };
      locations: Array<{
        line: number;
        column: number;
      }>;
    }>;
  };
}

export async function handleError(error: any) {
  if (error.response.errors) {
    const isGraphQlAuthorizationError = error.errors?.find(
      (err: any) =>
        !!err?.extensions?.category &&
        err.extensions.category === "graphql-authorization",
    );

    if (isGraphQlAuthorizationError) {
      return navigate("/auth/login?token=EXPIRED");
    }

    return {
      errors: error.response.errors,
    };
  }
}
