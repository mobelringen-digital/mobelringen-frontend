import React from "react";

import { RadioGroup } from "@nextui-org/radio";

import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { Modal, ModalContent } from "@/components/modal";
import { useCustomerQuery } from "@/modules/account/hooks/useCustomerQuery";
import { CustomerDataFragment } from "@/types";

interface Props {
  customer?: CustomerDataFragment | null;
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} title="Velg adresse">
      <ModalContent>
        <div className="max-h-64 overflow-auto">
          <RadioGroup color="primary">
            {customer?.addresses?.map((address) => (
              <RadioBlock
                onClick={() => {
                  if (address?.id) {
                    onSelect(address.id);
                  }

                  onOpenChange(false);
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
      </ModalContent>
    </Modal>
  );
};
