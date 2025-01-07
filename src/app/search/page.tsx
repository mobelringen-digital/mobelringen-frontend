import { searchArticles, searchProducts } from "@/modules/search/actions";
import { SearchPage } from "@/modules/search/SearchPage";
import {NextServerComponentProps} from "@/utils/ts-utils";

export default async function Search({ searchParams }: NextServerComponentProps) {
  const searchQuery = searchParams.q as string;

  const productsData = await searchProducts(searchQuery);
  const articlesData = await searchArticles(searchQuery);

  return (
    <SearchPage
      query={searchQuery}
      articles={articlesData.pages}
      products={productsData.products}
    />
  );
}
