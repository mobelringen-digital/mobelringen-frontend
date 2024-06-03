import React from "react";

interface Props {
  url: Array<string>;
}

export const Breadcrumbs: React.FC<Props> = ({ url }) => {
  return url.map((value, idx) => <li key={idx}>{value}</li>);
};
