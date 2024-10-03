import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { generatePrettyUrl } from "@/utils/helpers";
import { NextServerComponentProps } from "@/utils/ts-utils";

export default function Brand({ params }: NextServerComponentProps) {
  const url = generatePrettyUrl(params.url, {
    removeTrailSlash: true,
  });

  return <StaticPageContent url={url} />;
}
