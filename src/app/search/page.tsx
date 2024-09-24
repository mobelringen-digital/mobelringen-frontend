import { searchArticles, searchProducts } from "@/modules/search/actions";
import { SearchPage } from "@/modules/search/SearchPage";

type Props = {
  params: { url: Array<string> };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ searchParams }: Props) {
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
