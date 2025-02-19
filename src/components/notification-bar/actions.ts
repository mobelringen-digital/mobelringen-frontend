"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function hideNotification(id: string) {
  const cookiesStores = await cookies();

  const closedNotifications = cookiesStores?.get("closedNotifications")?.value
    ? JSON.parse(cookiesStores?.get("closedNotifications")?.value as string)
    : [];

  cookiesStores?.set(
    "closedNotifications",
    JSON.stringify([...closedNotifications, id]),
  );

  revalidateTag("notification-bars");
}
