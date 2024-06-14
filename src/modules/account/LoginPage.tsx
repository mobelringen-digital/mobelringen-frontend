"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/_ui/button/Button";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

export const LoginPage = () => {
  const { data } = useSession();
  return (
    <ContainerLayout className="my-16">
      {data?.user ? (
        <Button color="primary" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button
          color="primary"
          onClick={() =>
            signIn("credentials", {
              email: "aivaras.karaliunas@alpha-solutions.no",
              password: "<YELA9<)evim>O;5bOr3",
              callbackUrl: "/account/details",
            })
          }
        >
          Login
        </Button>
      )}
    </ContainerLayout>
  );
};
