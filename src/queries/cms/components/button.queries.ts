import { graphql } from "@/types/schema";

export const CmsButtonFragment = graphql(`
  fragment CmsButton on Button {
    title
    backgroundColor
    textColor
    action
    link
  }
`);
