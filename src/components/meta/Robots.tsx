import React from "react";

import { Robots } from "@/types";

interface Props {
  robots: Robots;
}

export const MetaRobots: React.FC<Props> = ({ robots }) => {
  return <meta name="robots" content={robots.replace("_", ",")} />;
};
