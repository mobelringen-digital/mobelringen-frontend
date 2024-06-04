"use client";

import React from "react";

import cx from "classnames";

import { usePathname, useSearchParams } from "next/navigation";

import { CloseIcon } from "@/components/icons/CloseIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { NavigationIcon } from "@/components/icons/NavigationIcon";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

interface Props {
  children: React.ReactNode;
}

export const MobileMenuProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleMenuButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    return setIsOpen((prev) => !prev);
  };

  React.useEffect(() => {
    setIsOpen(false);
    // Listen for route changes and close the dropdown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div className="flex gap-1 items-center md:hidden">
      <button onClick={handleMenuButtonClick}>
        <MenuIcon />
      </button>
      <button>
        <NavigationIcon />
      </button>

      <div
        className={cx(
          "fixed left-0 top-0 right-0 h-[80px] bg-white z-100 transition-all duration-500 ease-in-out",
          {
            "opacity-100 visible": isOpen,
            "opacity-0 invisible": !isOpen,
          },
        )}
      >
        <ContainerLayout
          className={cx("flex h-[80px] border-b border-b-cold-grey-dark")}
        >
          <button onClick={handleMenuButtonClick}>
            <CloseIcon />
          </button>
        </ContainerLayout>
        <ContainerLayout
          className={cx(
            "fixed overflow-y-auto overflow-x-hidden p-4 left-0 top-[80px] h-[calc(100dvh-80px)] right-0 bottom-0 bg-white z-100 transition-all duration-500 ease-in-out",
            {
              "translate-x-0": isOpen,
              "-translate-x-full": !isOpen,
            },
          )}
        >
          {children}
        </ContainerLayout>
      </div>
    </div>
  );
};
