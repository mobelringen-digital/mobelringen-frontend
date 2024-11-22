"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { login } from "@/modules/auth/actions";
import { GenerateCustomerTokenMutation } from "@/types";
import { useRequestCallback } from "@/utils/hooks/useRequestCallback";

import { navigate } from "../../app/actions";

type FormData = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [cookie, setCookie] = useCookies();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, _setError] = React.useState<Array<Error> | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();
  const { handlePossibleErrors } = useRequestCallback();

  React.useEffect(() => {
    if (searchParams.get("token") === "EXPIRED" && !!cookie.token) {
      setCookie("token", "", { path: "/", expires: new Date() });
      router.push(pathname);
    }
    if (searchParams.get("token") === "EXPIRED" && !cookie.token) {
      router.push(pathname);
    }
  }, [cookie.token, pathname, router, searchParams, setCookie]);

  const loginGTMEvent = () => {
    return sendGTMEvent({
      event: "login",
      method: "email",
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const res = await login(data);

    handlePossibleErrors(res);

    if ((res as GenerateCustomerTokenMutation)?.generateCustomerToken?.token) {
      loginGTMEvent();
      return navigate("/account");
    }

    setIsLoading(false);
    return res;
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <ContainerLayout className="my-16 flex flex-col items-center justify-center md:w-3/4 lg:w-1/3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
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
            aria-label="Logg inn"
            disabled={isLoading || isSubmitting}
            color="primary"
            type="submit"
          >
            Logg inn
          </Button>
          <div className="flex w-full justify-end mt-2">
            <Link aria-label="Glemt passord" href="/auth/forgot">
              Glemt passord?
            </Link>
          </div>
        </form>
        <div className="mt-8 pt-4 border-t border-dark-grey border-opacity-30 flex flex-col">
          <p className="text-xl">Ny bruker</p>
          <p className="my-2">
            Har du ikke konto fra før kan du opprette en her. Med den kan du
            bestille varer kjapt og enkelt, ha oversikt over alle ordre og melde
            deg inn i kundeklubben.
          </p>
          <Button
            aria-label="Opprett ny bruker"
            className="mt-2"
            as={Link}
            href="/auth/register"
            color="secondary"
          >
            Opprett ny bruker
          </Button>
        </div>
      </ContainerLayout>
    </>
  );
};
