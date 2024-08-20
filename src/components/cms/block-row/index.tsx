"use client";

import React from "react";

import cx from "classnames";

import { Column } from "@/components/cms/__components/column/Column";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockRowFragment } from "@/types";

interface Props {
  data: CmsBlockRowFragment;
}

const COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const COLSPAN: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

const MOBILE_ORDER: Record<number, string> = {
  1: "order-1",
  2: "order-2",
  3: "order-3",
  4: "order-4",
};

const DESKTOP_ORDER: Record<number, string> = {
  1: "lg:order-1",
  2: "lg:order-2",
  3: "lg:order-3",
  4: "lg:order-4",
};

const calculateColumns = (columns: number) => {
  if (columns > 4) {
    return COLUMNS[4];
  }

  return COLUMNS[columns];
};

const calculateSpan = (columns: number) => {
  if (columns > 4) {
    return COLSPAN[4];
  }

  return COLSPAN[columns];
};

export const BlockRow: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper
      config={data.blockConfig}
      isFullWidth={data.useFullPageWidth === true}
    >
      <div className={cx("grid gap-8", calculateColumns(data.columns.length))}>
        {data.columns.map((column, idx) => {
          return (
            <div
              key={idx}
              className={cx(
                calculateSpan(data.columns.length),
                MOBILE_ORDER[column.mobilePosition ?? 1],
                DESKTOP_ORDER[column.desktopPosition ?? 1],
                "flex lg:col-span-1",
              )}
            >
              <Column column={column} />
            </div>
          );
        })}
      </div>
    </CmsBlockWrapper>
  );
};
