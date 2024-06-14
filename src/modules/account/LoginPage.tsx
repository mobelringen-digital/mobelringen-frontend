"use client";

import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/_ui/button/Button";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

export const LoginPage = () => {
  const { data } = useSession();
  const [error, setError] = React.useState<Array<Error> | null>(null);

  const handleSignIn = async () => {
    const res = await signIn("credentials", {
      email: "aivaras.karaliunas@alpha-solutions.n",
      password: "<YELA9<)evim>O;5bOr3",
      redirect: false,
      callbackUrl: "/account/details",
    });

    if (res?.error) setError(JSON.parse(res.error));
  };

  return (
    <ContainerLayout className="my-16">
      {error ? (
        <div className="my-4">
          {error.map((err, i) => (
            <div className="text-dark-red text-sm" key={i}>
              {err.message}
            </div>
          ))}
        </div>
      ) : null}
      {data?.user ? (
        <Button color="primary" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button color="primary" onClick={handleSignIn}>
          Login
        </Button>
      )}
    </ContainerLayout>
  );
};
