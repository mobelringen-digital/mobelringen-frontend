import { getWishlist } from "@/modules/account/wishlist/actions";
import { WishlistPage } from "@/modules/account/wishlist/WishlistPage";

export default async function Wishlist() {
  const wishlist = await getWishlist();

  return (
    <>
      <WishlistPage wishlist={wishlist} />
    </>
  );
}
