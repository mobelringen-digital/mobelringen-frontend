"use client";

import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { openToast } from "@/components/_ui/toast-provider";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { resetPassword } from "@/modules/auth/actions";
import { ResetPasswordMutation } from "@/types";
import { useRequestCallback } from "@/utils/hooks/useRequestCallback";

import { navigate } from "../../app/actions";

type FormData = {
  email: string;
  newPassword: string;
  repeatNewPassword: string;
  resetPasswordToken: string;
};

export const ResetPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const { handlePossibleErrors } = useRequestCallback();

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const token = searchParams.get("token");

    if (!token) {
      setIsLoading(false);
      return openToast({ content: "Noe gikk galt" });
    }

    const res = await resetPassword(data.email, token, data.newPassword);

    handlePossibleErrors(res);
    setIsLoading(false);

    if ((res as ResetPasswordMutation).resetPassword) {
      return navigate("/auth/reset/success");
    }
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <ContainerLayout className="my-16 flex flex-col items-center justify-center md:w-3/4 lg:w-1/3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            error={errors.email}
            control={control}
            label="E-post"
            name="email"
          >
            <Input type="text" variant="bordered" />
          </FieldWrapper>
          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            error={errors.email}
            control={control}
            label="Nytt passord"
            name="newPassword"
          >
            <Input type="password" variant="bordered" />
          </FieldWrapper>
          <FieldWrapper
            rules={{
              required: "Dette er et påkrevd felt",
              validate: (value) =>
                value === watch("newPassword") || "Passordene er ikke like",
            }}
            error={errors.email}
            control={control}
            label="Gjenta nytt passord"
            name="repeatNewPassword"
          >
            <Input type="password" variant="bordered" />
          </FieldWrapper>

          <Button
            aria-labelledby="Sett nytt passord"
            disabled={isLoading || isSubmitting}
            color="primary"
            type="submit"
          >
            Sett nytt passord
          </Button>
        </form>
      </ContainerLayout>
    </>
  );
};
