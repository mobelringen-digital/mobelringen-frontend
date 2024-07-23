import { openToast } from "@/components/_ui/toast-provider";

export type ErrorResponse = {
  response: {
    errors: {
      message: string;
    }[];
  };
};

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
