import { Box } from "@mui/material";
import React from "react";
import { RowHeroBannerFragment } from "../RowHeroBanner.gql";

export const ImageBanner: React.FC<RowHeroBannerFragment> = props => (
    <Box
      sx={{
        width: "100%",
        height: { xs: "min(70vh,485px)", md: "min(70vh,820px)" },
        background: `url(${props.heroAsset.url}) no-repeat center center/cover`,
      }}
     />
  );
