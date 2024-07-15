import { ErrorResponse } from "@/auth/auth";
import { openToast } from "@/components/_ui/toast-provider";

export const useRequestCallback = () => {
  const handleError = (error: Error) => {
    (error as unknown as ErrorResponse).response.errors.map((err) => {
      openToast({
        content: err.message,
      });
    });
  };

  return { handleError };
};
