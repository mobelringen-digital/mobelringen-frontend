"use server";

export async function changeCustomerPassword(
  currentPassword: string,
  newPassword: string,
) {
  return await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/auth/change-password",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
      cache: "no-store",
    },
  ).then((res) => res.json());
}
