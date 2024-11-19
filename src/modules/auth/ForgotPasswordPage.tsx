"use client";

import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { openToast } from "@/components/_ui/toast-provider";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { requestPasswordResetEmail } from "@/modules/auth/actions";

type FormData = {
  email: string;
};

export const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    await requestPasswordResetEmail(data.email)
      .then(() => openToast({ content: "E-post sendt" }))
      .catch(() => openToast({ content: "Noe gikk galt" }))
      .finally(() => setIsLoading(false));
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

          <Button
            aria-labelledby="Send e-post"
            disabled={isLoading || isSubmitting}
            color="primary"
            type="submit"
          >
            Send e-post
          </Button>
        </form>
      </ContainerLayout>
    </>
  );
};
