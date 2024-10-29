import React from "react";

interface Props {
  title: string;
}

export const MetaTitle: React.FC<Props> = ({ title }) => {
  if (title) {
    return <title>{`${title} | Møbelringen`}</title>;
  }

  return <title>Mobelringen</title>;
};
