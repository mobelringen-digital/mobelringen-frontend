"use client";

import React from "react";

import { NumericFormat, NumericFormatProps } from "react-number-format";

type FormatType = "currency" | "default";

export interface FormatNumberProps extends NumericFormatProps {
  format?: FormatType;
  dataTestId?: string;
}

const formats: { [key in FormatType]: NumericFormatProps } = {
  default: {
    decimalSeparator: ",",
    thousandSeparator: ".",
    displayType: "text",
  },
  currency: {
    fixedDecimalScale: true,
    thousandSeparator: " ",
    decimalScale: 2,
  },
};

export const FormatNumber: React.FC<FormatNumberProps> = ({
  format = "default",
  suffix,
  ...props
}) => {
  const formatProps = formats[format] || {};
  const defaultProps = formats.default;

  return (
    <NumericFormat
      {...defaultProps}
      renderText={(value) => <>{value}</>}
      suffix={` ${suffix}`}
      {...formatProps}
      {...props}
    />
  );
};
