import { useMergeGuestCartToCustomer } from "@/utils/hooks/useMergeGuestCartToCustomer";

export const GuestCartMergeProvider = () => {
  useMergeGuestCartToCustomer();

  return null;
};
