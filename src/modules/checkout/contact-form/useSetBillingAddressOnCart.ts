import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { useCart } from "@/modules/cart/hooks/useCart";
import { SetBillingAddressOnCart } from "@/queries/cart.queries";
import { SetBillingAddressOnCartInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const useSetBillingAddressOnCartMutation = () => {
  const { data } = useSession();
  const { cartId } = useCart();

  const setBillingAddress = async (
    address: SetBillingAddressOnCartInput["billing_address"],
  ) => {
    return await authorizedMagentoClient(String(data?.token), "POST").request(
      SetBillingAddressOnCart,
      { cartId: cartId, billing_address: address },
    );
  };

  return useMutation({
    mutationFn: setBillingAddress,
  });
};
