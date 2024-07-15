import React from "react";

import { toast, Toaster, resolveValue } from "react-hot-toast";

import { IToastProps, Toast } from "@/components/_ui/toast-provider/Toast";

interface IToastOptions extends Omit<IToastProps, "onClose" | "isOpen"> {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
}

export const openToast = ({
  position = "top-right",
  duration,
  ...props
}: IToastOptions): string =>
  toast(
    (t) => (
      <Toast {...props} isOpen={true} onClose={() => toast.dismiss(t.id)} />
    ),
    {
      position,
      duration,
    },
  );

export const ToastProvider = (): JSX.Element => {
  return (
    <Toaster containerStyle={{ bottom: "1rem" }}>
      {(t) => <>{resolveValue(t.message, t)}</>}
    </Toaster>
  );
};
