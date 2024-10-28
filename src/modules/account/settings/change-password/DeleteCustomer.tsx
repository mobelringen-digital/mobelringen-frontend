"use client";

import { useConfirm } from "@/components/confirm/hooks/useConfirm";
import { deleteCustomer } from "@/modules/account/settings/change-password/actions";
import { useRequestCallback } from "@/utils/hooks/useRequestCallback";

import { navigate } from "../../../../app/actions";

export const DeleteCustomer = () => {
  const { handlePossibleErrors } = useRequestCallback();
  const { showConfirmation } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: "Slett kunde",
      message: "Er du sikker på at du vil slette kunden?",
    });

    if (!confirmed) {
      return;
    }
    const response = await deleteCustomer();

    handlePossibleErrors(response);

    if (response) {
      return navigate("/auth/login");
    }

    return;
  };

  return <button className="underline" onClick={handleDelete}>Slett kunde</button>;
};
