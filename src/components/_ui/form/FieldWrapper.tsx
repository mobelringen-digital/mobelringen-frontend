import React from "react";

import cx from "classnames";
import {
  Controller,
  UseControllerProps,
  FieldValues,
  FieldError,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues = FieldValues>
  extends UseControllerProps<TFieldValues> {
  label?: string;
  children: React.ReactElement;
  error?: FieldError;
  className?: string;
}

export function FieldWrapper<TFieldValues extends FieldValues = FieldValues>({
  label,
  children,
  name,
  error,
  className,
  ...rest
}: Props<TFieldValues>) {
  return (
    <div className={cx("flex flex-col gap-1", className)}>
      {label ? (
        <label className="text-base font-normal" htmlFor={label}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        rules={{}}
        render={({ field }) =>
          React.cloneElement<any>(children, {
            ...field,
            name,
            id: name,
          })
        }
        {...rest}
      />
      {error && <span className="text-red text-sm">{error.message}</span>}
    </div>
  );
}
