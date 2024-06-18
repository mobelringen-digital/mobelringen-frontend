"use client";

import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

import { navigate } from "../../app/actions";

type FormData = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Array<Error> | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  React.useEffect(() => {
    (async () => {
      const tokenExpired = searchParams.get("callback") === "TOKEN_EXPIRED";
      if (tokenExpired && session?.token) {
        await signOut({
          callbackUrl: "/auth/login",
        });
      }
    })();
  }, [session?.token, searchParams]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError(JSON.parse(res.error));
      setIsLoading(false);
    }

    if (res?.ok) return navigate("/account").then(() => setIsLoading(false));
  };

  return (
    <>
      <ContainerLayout className="my-16 flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full md:w-3/4 lg:w-1/3"
        >
          {error ? (
            <div className="my-4">
              {error.map((err, i) => (
                <div className="text-dark-red text-sm" key={i}>
                  {err.message}
                </div>
              ))}
            </div>
          ) : null}

          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            control={control}
            label="E-post eller mobilnummer"
            name="email"
            error={errors.email}
          >
            <Input variant="bordered" />
          </FieldWrapper>

          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            error={errors.password}
            control={control}
            label="Passord"
            name="password"
          >
            <Input type="password" variant="bordered" />
          </FieldWrapper>

          <Button
            disabled={isLoading || isSubmitting}
            color="primary"
            type="submit"
          >
            Logg inn
          </Button>
        </form>
      </ContainerLayout>
    </>
  );
};
