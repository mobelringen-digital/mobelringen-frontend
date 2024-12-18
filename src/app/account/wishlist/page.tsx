import { getCustomerDetails } from "@/modules/account/account/actions";
import { WishlistPage } from "@/modules/account/wishlist/WishlistPage";

export default async function Wishlist() {
  const customer = await getCustomerDetails();

  return (
    <>
      <WishlistPage wishlist={customer?.wishlists} />
    </>
  );
}
