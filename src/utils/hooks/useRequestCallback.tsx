import { openToast } from "@/components/_ui/toast-provider";

export type ErrorResponse = {
  response: {
    errors: {
      message: string;
    }[];
  };
};

export const useRequestCallback = () => {
  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      openToast({
        content: error.message,
      });
    }
  };

  return { handleError };
};
