"use client";

import React from "react";

import { useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { openToast } from "@/components/_ui/toast-provider";
import { updateCustomer } from "@/modules/account/settings/personal-information/actions";
import { CustomerDataFragment, CustomerUpdateInput } from "@/types";

type FormData = CustomerUpdateInput;

interface Props {
  customer?: CustomerDataFragment | null;
}

export const PersonalInformation: React.FC<Props> = ({ customer }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      firstname: customer?.firstname ?? "",
      lastname: customer?.lastname ?? "",
      phone_number: customer?.phone_number ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != null || v !== ""),
    );
    return await updateCustomer(data)
      .then(() => {
        openToast({
          content: "Endringer lagret",
        });
      })
      .catch(() => {
        openToast({
          content: "Noe gikk galt",
        });
      });
  };

  return (
    <div className="p-8 bg-white rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Personlig informasjon</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <FieldWrapper
              error={errors.firstname}
              control={control}
              label="Fornavn"
              name="firstname"
            >
              <Input type="text" variant="bordered" />
            </FieldWrapper>
          </div>

          <div className="col-span-1">
            <FieldWrapper
              error={errors.lastname}
              control={control}
              label="Etternavn"
              name="lastname"
            >
              <Input type="text" variant="bordered" />
            </FieldWrapper>
          </div>

          <div className="col-span-1">
            <FieldWrapper
              error={errors.phone_number}
              control={control}
              label="Telefonnummer"
              name="phone_number"
            >
              <Input type="text" variant="bordered" />
            </FieldWrapper>
          </div>
        </div>

        <Button
          className="w-1/4"
          disabled={isSubmitting}
          color="primary"
          type="submit"
        >
          Lagre endringer
        </Button>
      </form>
    </div>
  );
};
