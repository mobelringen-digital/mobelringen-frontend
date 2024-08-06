import React from "react";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { RadioGroup } from "@nextui-org/radio";

import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { useCustomerQuery } from "@/modules/account/hooks/useCustomerQuery";
import { CustomerQuery } from "@/types";

interface Props {
  customer?: CustomerQuery;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (customerAddressId: number) => void;
}

export const AddressSelectModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onSelect,
}) => {
  const { data: customer } = useCustomerQuery();

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
              <div className="max-h-64 overflow-auto">
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
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
