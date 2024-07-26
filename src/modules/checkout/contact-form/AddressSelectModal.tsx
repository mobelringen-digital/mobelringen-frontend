import React from "react";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { RadioGroup } from "@nextui-org/radio";

import { Loader } from "@/components/_ui/loader/Loader";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { useCustomerQuery } from "@/modules/account/hooks/useCustomerQuery";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (customerAddressId: number) => void;
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
              <div className="max-h-64 overflow-auto">
                {customer?.addresses && customer.addresses.length > 0 ? (
                  <RadioGroup color="primary">
                    {customer?.addresses?.map((address) => (
                      <RadioBlock
                        onClick={() => {
                          if (address?.id) {
                            onSelect(address.id);
                          }

                          onClose();
                        }}
                        key={address?.id}
                        value={String(address?.id)}
                      >
                        <b>
                          {address?.firstname} {address?.lastname}
                        </b>
                        <br />
                        {address?.city}, {address?.street} {address?.postcode}
                      </RadioBlock>
                    ))}
                  </RadioGroup>
                ) : (
                  <span>Ingen lagrede adresser funnet</span>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
