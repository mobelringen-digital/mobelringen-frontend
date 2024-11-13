"use client";

import React from "react";

import { useConfirm } from "@/components/confirm/hooks/useConfirm";
import { deleteCustomer } from "@/modules/account/settings/change-password/actions";
import { DeleteCustomerMessage } from "@/modules/account/settings/DeleteCustomerMessage";
import { CustomerDataFragment } from "@/types";
import { useRequestCallback } from "@/utils/hooks/useRequestCallback";

import { navigate } from "../../../../app/actions";

interface Props {
  customer?: CustomerDataFragment | null;
}

export const DeleteCustomer: React.FC<Props> = ({ customer }) => {
  const { handlePossibleErrors } = useRequestCallback();
  const { showConfirmation } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: "Slett min profil",
      message: <DeleteCustomerMessage customer={customer} />,
      proceedText: "Slett min profil",
      proceedButtonId: "customer-delete-proceed",
    });

    if (!confirmed) {
      return;
    }
    const response = await deleteCustomer();

    handlePossibleErrors(response);

    if (response) {
      return navigate("/auth/account-deleted");
    }

    return;
  };

  return (
    <button
      id="customer-delete-init"
      className="underline"
      onClick={handleDelete}
    >
      Slett min profil
    </button>
  );
};
