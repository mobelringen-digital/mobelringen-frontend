import { graphql } from "@/types/schema";

export const CmsModalDocument = graphql(`
  query CmsModal($modalType: ModalType) {
    modal(where: { modalType: $modalType }) {
      title
      modalSize
      content {
        ...CmsImage
        ...CmsTextBlock
      }
      actions {
        ...CmsButton
      }
    }
  }
`);
