"use client";

import React from "react";

import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { createCustomer } from "@/modules/auth/actions";
import { BaseStoreFragment, CustomerCreateInput } from "@/types";

import { navigate } from "../../app/actions";

type FormData = CustomerCreateInput & {
  confirm_password: string;
  favorite_store: string;
};

interface Props {
  stores?: Array<BaseStoreFragment | null> | null;
}

export const RegisterPage: React.FC<Props> = ({ stores }) => {
  const [favoriteStore, setFavoriteStore] = React.useState([""]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Array<Error> | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const { confirm_password, ...customerData } = data;

    const res = await createCustomer(customerData).finally(() =>
      setIsLoading(false),
    );

    if (!res.success) {
      setError(res.errors);
    }

    if (res.success) {
      return navigate("/register/success").then(() => setIsLoading(false));
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
            error={errors.firstname}
            control={control}
            label="Fornavn *"
            name="firstname"
          >
            <Input type="text" variant="bordered" />
          </FieldWrapper>

          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            error={errors.lastname}
            control={control}
            label="Etternavn *"
            name="lastname"
          >
            <Input type="text" variant="bordered" />
          </FieldWrapper>

          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            control={control}
            label="E-post *"
            name="email"
            error={errors.email}
          >
            <Input variant="bordered" />
          </FieldWrapper>

          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            error={errors.lastname}
            control={control}
            label="Telefonnummer *"
            name="phone_number"
          >
            <Input type="text" variant="bordered" />
          </FieldWrapper>

          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            error={errors.lastname}
            control={control}
            label="Adresse *"
            name="street"
          >
            <Input type="text" variant="bordered" />
          </FieldWrapper>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FieldWrapper
                rules={{ required: "Dette er et påkrevd felt" }}
                error={errors.postcode}
                control={control}
                label="Postnummer *"
                name="postcode"
              >
                <Input type="text" variant="bordered" />
              </FieldWrapper>
            </div>
            <div className="col-span-8">
              <FieldWrapper
                rules={{ required: "Dette er et påkrevd felt" }}
                control={control}
                label="Poststed *"
                name="city"
              >
                <Input type="text" variant="bordered" />
              </FieldWrapper>
            </div>
          </div>

          {stores ? (
            <FieldWrapper
              label="Favorittbutikk *"
              rules={{ required: "Dette er et påkrevd felt" }}
              error={errors.favorite_store}
              control={control}
              name="favorite_store"
            >
              <Select
                variant="bordered"
                placeholder="Velg favorittbutikk"
                classNames={{
                  innerWrapper: "bg-white",
                  trigger: "bg-white rounded-lg border-dark-gray h-10",
                }}
                selectionMode="single"
                // @ts-expect-error - Fix this
                onSelectionChange={setFavoriteStore}
                selectedKeys={favoriteStore}
              >
                {stores?.map((store, idx) => (
                  <SelectItem
                    value={store?.external_id ?? idx}
                    key={store?.external_id ?? idx}
                  >
                    {store?.name}
                  </SelectItem>
                ))}
              </Select>
            </FieldWrapper>
          ) : null}

          <FieldWrapper
            rules={{ required: "Dette er et påkrevd felt" }}
            error={errors.password}
            control={control}
            label="Passord *"
            name="password"
          >
            <Input type="password" variant="bordered" />
          </FieldWrapper>

          <FieldWrapper
            rules={{
              required: "Dette er et påkrevd felt",
              validate: (value) =>
                value === watch("password") || "Passordene er ikke like",
            }}
            error={errors.confirm_password}
            control={control}
            label="Gjenta passord *"
            name="confirm_password"
          >
            <Input type="password" variant="bordered" />
          </FieldWrapper>

          <div className="flex flex-col gap-4 w-full my-4">
            <FieldWrapper
              rules={{ required: "Dette er et påkrevd felt" }}
              error={errors.accepts_terms}
              control={control}
              name="accepts_terms"
            >
              <Checkbox>
                Jeg ønsker å bli medlem av Kundeklubben og få eksklusive
                rabatter på produkter, og samtykker til medlemsvilkårene. *
              </Checkbox>
            </FieldWrapper>

            <FieldWrapper
              rules={{ required: "Dette er et påkrevd felt" }}
              error={errors.accepts_emails}
              control={control}
              name="accepts_emails"
            >
              <Checkbox required={true}>
                Jeg samtykker til å motta kommunikasjon på e-post *
              </Checkbox>
            </FieldWrapper>

            <FieldWrapper control={control} name="accepts_sms">
              <Checkbox>
                Jeg samtykker til å motta kommunikasjon på SMS
              </Checkbox>
            </FieldWrapper>

            <FieldWrapper control={control} name="accepts_digital_campaigns">
              <Checkbox>Jeg samtykker til digital annonsering</Checkbox>
            </FieldWrapper>
          </div>

          {error ? (
            <div className="my-2">
              {error.map((err, i) => (
                <div className="text-dark-red text-sm font-semibold" key={i}>
                  {err.message}
                </div>
              ))}
            </div>
          ) : null}

          <Button
            aria-label="Opprett ny bruker"
            disabled={isLoading || isSubmitting}
            color="primary"
            type="submit"
          >
            Opprett ny bruker
          </Button>

          <div className="flex flex-col w-full font-light">
            <p>Felt merket med * må fylles ut.</p>
            <p>
              Når du trykker på &quot;opprett ny bruker&quot; godtar du våre{" "}
              <Link aria-label="medlemsvilkår" className="underline" href="/medlemsvilkar">
                medlemsvilkår.
              </Link>
            </p>
          </div>
        </form>
      </ContainerLayout>
    </>
  );
};
