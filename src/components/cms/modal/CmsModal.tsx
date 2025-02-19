"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { Loader } from "@/components/_ui/loader/Loader";
import { CmsImage } from "@/components/cms/__components/image/CmsImage";
import { TextBlock } from "@/components/cms/__components/text-block/TextBlock";
import { useCmsModalQuery } from "@/components/cms/modal/useCmsModalQuery";
import { Modal, ModalActions, ModalContent } from "@/components/modal";
import { ButtonAction, CmsButtonFragment, ModalSize, ModalType } from "@/types";
import { CAMPAIGN_COLORS } from "@/utils/helpers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

const MODAL_SIZE_MAP: Record<ModalSize, "sm" | "md" | "lg" | "xl" | "2xl"> = {
  [ModalSize.Md]: "md",
  [ModalSize.Lg]: "lg",
  [ModalSize.Xl]: "xl",
  [ModalSize.Xxl]: "2xl",
};

const CmsModal: React.FC<Props> = ({ type, isOpen, onClose }) => {
  const router = useRouter();
  const { data, isLoading } = useCmsModalQuery(type);

  if (!data) {
    return null;
  }

  const handleButtonAction = (button: CmsButtonFragment) => {
    if (button.action === ButtonAction.Link && button.link) {
      return router.push(button.link);
    }

    if (button.action === ButtonAction.CloseModal) {
      return onClose();
    }
  };

  return (
    <Modal
      title={data.title ?? ""}
      size={MODAL_SIZE_MAP[data.modalSize ?? ModalSize.Lg]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {isLoading ? <Loader /> : null}
        {data.content.map((content, index) => {
          switch (content.__typename) {
            case "Image":
              return (
                <CmsImage key={index} className="rounded-xl" data={content} />
              );

            case "TextBlock":
              return <TextBlock key={index} data={content} />;

            default:
              return null;
          }
        })}
      </ModalContent>
      <ModalActions>
        <div className="flex gap-2 w-full">
          {data.actions.map((action, index) => {
            return (
              <button
                onClick={() => handleButtonAction(action)}
                className="transition-all rounded-full py-6 px-6 lg:px-8 text-sm lg:text-base h-12 flex items-center justify-center w-full"
                style={{
                  backgroundColor:
                    CAMPAIGN_COLORS[action.backgroundColor ?? "MR_powder"],
                  color: CAMPAIGN_COLORS[action.textColor ?? "MR_black"],
                }}
                key={index}
              >
                {action.title}
              </button>
            );
          })}
        </div>
      </ModalActions>
    </Modal>
  );
};

export default CmsModal;
