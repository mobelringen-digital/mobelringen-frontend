"use client";

import React from "react";

import { useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { openToast } from "@/components/_ui/toast-provider";
import { changeCustomerPassword } from "@/modules/account/settings/change-password/actions";
import { DeleteCustomer } from "@/modules/account/settings/change-password/DeleteCustomer";
import { ChangeCustomerPasswordMutation, CustomerDataFragment } from "@/types";
import { useRequestCallback } from "@/utils/hooks/useRequestCallback";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

interface Props {
  customer?: CustomerDataFragment | null;
}

export const ChangePassword: React.FC<Props> = ({ customer }) => {
  const { handlePossibleErrors } = useRequestCallback();
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const res = await changeCustomerPassword(
      data.currentPassword,
      data.newPassword,
    );

    handlePossibleErrors(res);

    if ((res as ChangeCustomerPasswordMutation).changeCustomerPassword?.email) {
      reset();
      openToast({ content: "Passordendring vellykket" });
    }

    return res;
  };

  return (
    <div className="p-8 bg-white rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Sikkerhet</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-1/2"
      >
        <FieldWrapper
          rules={{ required: "Dette er et påkrevd felt" }}
          error={errors.currentPassword}
          control={control}
          label="Nåværende passord"
          name="currentPassword"
        >
          <Input type="password" variant="bordered" />
        </FieldWrapper>

        <FieldWrapper
          rules={{ required: "Dette er et påkrevd felt" }}
          error={errors.newPassword}
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
          error={errors.confirmNewPassword}
          control={control}
          label="Gjenta passord"
          name="confirmNewPassword"
        >
          <Input type="password" variant="bordered" />
        </FieldWrapper>

        <Button
          aria-labelledby="Lagre endringer"
          className="w-1/2"
          disabled={isSubmitting}
          color="primary"
          type="submit"
        >
          Lagre endringer
        </Button>
      </form>
      <div className="flex mt-4 justify-end">
        <DeleteCustomer customer={customer} />
      </div>
    </div>
  );
};
