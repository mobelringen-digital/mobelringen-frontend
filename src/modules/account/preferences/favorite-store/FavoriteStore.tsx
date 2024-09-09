"use client";

import React from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { openToast } from "@/components/_ui/toast-provider";
import { updateCustomer } from "@/modules/account/settings/personal-information/actions";
import {
  BaseStoreFragment,
  CustomerDataFragment,
  CustomerUpdateInput,
} from "@/types";

type FormData = Pick<CustomerUpdateInput, "favorite_store">;

interface Props {
  customer?: CustomerDataFragment | null;
  stores?: Array<BaseStoreFragment | null> | null;
}

export const FavoriteStore: React.FC<Props> = ({ customer, stores }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      favorite_store: customer?.favorite_store ?? "",
    },
  });

  if (!stores) return null;

  const onSubmit = async (data: FormData) => {
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
      <h2 className="text-xl font-bold mb-4">Kommunikasjon</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-1/2"
      >
        <FieldWrapper control={control} name="favorite_store">
          <Select
            label="Favorittbutikk"
            placeholder="Velg favorittbutikk"
            selectionMode="single"
            className="max-w-xs"
          >
            {stores?.map((store, idx) => (
              <SelectItem key={store?.external_id ?? idx}>
                {store?.name}
              </SelectItem>
            ))}
          </Select>
        </FieldWrapper>

        <Button
          className="w-1/2"
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
