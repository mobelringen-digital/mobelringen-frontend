import { RowHeroBannerFragment } from "./RowHeroBanner.gql";
import React from "react";
import { VideoBanner } from "./components/VideoBanner";
import { ImageBanner } from "./components/ImageBanner";

export function RowHeroBanner(props: RowHeroBannerFragment) {
  if (props.heroAsset.mimeType !== "video/mp4") {
    return <ImageBanner {...props} />;
  }

  return <VideoBanner {...props} />;
}
