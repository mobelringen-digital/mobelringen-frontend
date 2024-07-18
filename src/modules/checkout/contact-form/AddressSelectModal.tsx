import React from "react";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { RadioGroup } from "@nextui-org/radio";

import { Loader } from "@/components/_ui/loader/Loader";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { useCustomerQuery } from "@/modules/account/hooks/useCustomerQuery";
import { CheckoutAddressFields } from "@/modules/checkout/factories";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (data: Partial<CheckoutAddressFields>) => void;
}

export const AddressSelectModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onSelect,
}) => {
  const { data: customer, isLoading } = useCustomerQuery();

  return (
    <Modal
      size="2xl"
      className="mx-2"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white rounded-2xl">
        {(onClose) => (
          <>
            <ModalHeader className="bg-cream flex items-center px-2 lg:px-5 gap-1">
              Velg adresse
            </ModalHeader>
            <ModalBody className="py-6 px-2 lg:px-5">
              {isLoading ? <Loader /> : null}
              {customer?.addresses && customer.addresses.length > 0 ? (
                <RadioGroup color="primary">
                  {customer?.addresses?.map((address) => (
                    <RadioBlock
                      onClick={() => {
                        onSelect({
                          firstname: customer?.firstname ?? "",
                          lastname: customer?.lastname ?? "",
                          city: address?.city ?? "",
                          street: address?.street?.toString() ?? "",
                          postcode: address?.postcode ?? "",
                          telephone: address?.telephone ?? "",
                          company: address?.company ?? "",
                        });
                        onClose();
                      }}
                      key={address?.id}
                      value={String(address?.id)}
                    >
                      <b>
                        {customer?.firstname} {customer?.lastname}
                      </b>
                      <br />
                      {address?.city}, {address?.street} {address?.postcode}
                    </RadioBlock>
                  ))}
                </RadioGroup>
              ) : (
                <span>Ingen lagrede adresser funnet</span>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
