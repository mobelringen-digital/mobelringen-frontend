"use client";

import React from "react";

import { signIn } from "next-auth/react";

import { Button } from "@/components/_ui/button/Button";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

export const LoginPage = () => {
  const [error, setError] = React.useState<Array<Error> | null>(null);

  const handleSignIn = async () => {
    const res = await signIn("credentials", {
      email: "aivaras.karaliunas@alpha-solutions.no",
      password: "<YELA9<)evim>O;5bOr3",
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
      <Button color="primary" onClick={handleSignIn}>
        Login
      </Button>
    </ContainerLayout>
  );
};
