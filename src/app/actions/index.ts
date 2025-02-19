"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NotificationBarsDocument } from "@/queries/page.queries";
import { baseHygraphClient } from "@/utils/lib/graphql";

export async function getNotificationBars() {
  const cookiesStores = await cookies();
  const closedNotifications =
    cookiesStores?.get("closedNotifications")?.value ?? [];

  const data = await baseHygraphClient("GET", {
    cache: "no-cache",
    revalidate: 0,
    tags: ["notification-bars"],
  }).request(NotificationBarsDocument);

  return {
    ...data,
    notificationBars: data.notificationBars.filter((not) => {
      if (!not.content?.id) return false;

      return !closedNotifications.includes(not.content?.id as never);
    }),
  };
}

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
