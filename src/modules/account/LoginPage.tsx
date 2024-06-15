"use client";

import React from "react";

import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { CmsDynamicHeader } from "@/components/cms/dynamic-header/CmsDynamicHeader";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsStaticPageConfigurationFragment } from "@/types";

import { navigate } from "../../app/actions";

interface Props {
  configuration?: CmsStaticPageConfigurationFragment | null;
}

type FormData = {
  email: string;
  password: string;
};

export const LoginPage: React.FC<Props> = ({ configuration }) => {
  const [error, setError] = React.useState<Array<Error> | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) setError(JSON.parse(res.error));

    if (res?.ok) return navigate("/account");
  };

  return (
    <>
      <CmsDynamicHeader data={configuration?.dynamicHeader}>
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
          <span className="text-4xl lg:text-5xl text-white font-feature">
            Logg inn
          </span>
        </div>
      </CmsDynamicHeader>
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

          <Button disabled={isSubmitting} color="primary" type="submit">
            Logg inn
          </Button>
        </form>
      </ContainerLayout>
      <Debugger data={configuration} />
    </>
  );
};
