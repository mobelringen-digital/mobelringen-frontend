"use client";

import React from "react";

import cx from "classnames";

import { Close } from "@/components/_ui/icons/figma/Close";

interface Props {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const FiltersDrawer = React.forwardRef<HTMLDivElement, Props>(
  function FiltersDrawer({ children, title, isOpen, onClose }, ref) {
    React.useEffect(() => {
      if (isOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }, [isOpen]);

    return (
      <>
        <div
          id="overlay"
          className={cx("fixed inset-0 z-30 bg-black bg-opacity-30", {
            hidden: !isOpen,
          })}
        />
        <div
          ref={ref}
          className={cx(
            "fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform bg-white w-full lg:w-[480px]",
            { "transform translate-x-full": !isOpen },
          )}
        >
          {title ? (
            <div className="flex items-center justify-between px-8 py-6 border-b border-cold-grey-dark">
              <span className="font-semibold text-lg">{title}</span>
              <button aria-label="Close" onClick={onClose}>
                <Close />
              </button>
            </div>
          ) : null}

          <div className="w-full pb-20 lg:pb-0">{children}</div>
        </div>
      </>
    );
  },
);

FiltersDrawer.displayName = "FiltersDrawer";
