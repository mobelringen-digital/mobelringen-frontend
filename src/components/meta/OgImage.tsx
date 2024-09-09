import React from "react";

interface Props {
  image: string;
}

export const OgImage: React.FC<Props> = ({ image }) => {
  return <meta property="og:image" content={image} />;
};
