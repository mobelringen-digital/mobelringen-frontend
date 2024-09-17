import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().set("token", "", {
      expires: new Date(0),
    });

    return Response.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "An error occurred while logging out.",
      },
      { status: 400 },
    );
  }
}
