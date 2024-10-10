import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

export default function NotFound() {
  return (
    <ContainerLayout>
      <StaticPageContent url="/not-found" />
    </ContainerLayout>
  );
}
