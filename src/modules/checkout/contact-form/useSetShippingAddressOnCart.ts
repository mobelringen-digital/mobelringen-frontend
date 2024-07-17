import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { useCart } from "@/modules/cart/hooks/useCart";
import { SetShippingAddressOnCart } from "@/queries/cart.queries";
import { SetShippingAddressesOnCartInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const useSetShippingAddressOnCartMutation = () => {
  const { data } = useSession();
  const { cartId } = useCart();

  const setShippingAddress = async (
    address: SetShippingAddressesOnCartInput["shipping_addresses"],
  ) => {
    return await authorizedMagentoClient(String(data?.token), "POST").request(
      SetShippingAddressOnCart,
      { cartId: cartId, shipping_addresses: address },
    );
  };

  return useMutation({
    mutationFn: setShippingAddress,
  });
};
