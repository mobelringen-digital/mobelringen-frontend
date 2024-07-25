"use server";

import { cookies } from "next/headers";

interface LoginInput {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginInput) {
  const cookiesStore = cookies();

  const data = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/auth/login",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      cache: "no-store",
    },
  ).then((res) => res.json());

  if (data?.token) {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    cookiesStore.set("token", data.token, {
      expires: oneWeekFromNow,
    });
  }

  return data;
}

export async function logout() {
  const cookiesStore = cookies();

  if (!cookiesStore.get("token")) {
    return false;
  }

  cookiesStore.set("token", "", {
    expires: new Date(0),
  });

  return true;
}

export async function getToken() {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
}
