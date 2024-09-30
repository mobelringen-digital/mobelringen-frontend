"use client";

import React from "react";

import { Checkbox } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { openToast } from "@/components/_ui/toast-provider";
import { updateCustomer } from "@/modules/account/settings/personal-information/actions";
import { CustomerDataFragment, CustomerUpdateInput } from "@/types";

type FormData = CustomerUpdateInput;

interface Props {
  customer?: CustomerDataFragment | null;
}

export const Communication: React.FC<Props> = ({ customer }) => {
  const [accepts_sms, setAcceptsSms] = React.useState<boolean>(
    customer?.accepts_sms ?? false,
  );
  const [accepts_emails, setAcceptsEmails] = React.useState<boolean>(
    customer?.accepts_emails ?? false,
  );
  const [accepts_digital_campaigns, setAcceptsDigitalCampaigns] =
    React.useState<boolean>(customer?.accepts_digital_campaigns ?? false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      accepts_sms: customer?.accepts_sms ?? false,
      accepts_emails: customer?.accepts_emails ?? false,
      accepts_digital_campaigns: customer?.accepts_digital_campaigns ?? false,
    },
  });

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
        className="flex flex-col gap-4 lg:w-1/2"
      >
        <FieldWrapper control={control} name="accepts_emails">
          <Checkbox isSelected={accepts_emails} onValueChange={setAcceptsEmails}>
            Jeg samtykker til å motta kommunikasjon på e-post
          </Checkbox>
        </FieldWrapper>

        <FieldWrapper control={control} name="accepts_sms">
          <Checkbox
            isSelected={accepts_sms}
            onValueChange={setAcceptsSms}
          >
            Jeg samtykker til å motta kommunikasjon på SMS
          </Checkbox>
        </FieldWrapper>

        <FieldWrapper control={control} name="accepts_digital_campaigns">
          <Checkbox
            isSelected={accepts_digital_campaigns}
            onValueChange={setAcceptsDigitalCampaigns}
          >
            Jeg samtykker til digital annonsering
          </Checkbox>
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
