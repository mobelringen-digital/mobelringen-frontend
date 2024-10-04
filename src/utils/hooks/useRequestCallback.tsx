import { openToast } from "@/components/_ui/toast-provider";

export type ErrorResponse = {
  response: {
    errors: {
      message: string;
    }[];
  };
};

export const useRequestCallback = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePossibleErrors = <_, T>(data: T | { errors: any }) => {
    // @ts-expect-error - Handle error
    if ("errors" in data && data.errors) {
      data.errors.map((err: any) => openToast({ content: err.message }));
    }
  };

  return { handlePossibleErrors };
};
