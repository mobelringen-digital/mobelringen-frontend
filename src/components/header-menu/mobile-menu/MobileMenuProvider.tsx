"use client";

import React, { Suspense } from "react";

import cx from "classnames";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CloseIcon } from "@/components/_ui/icons/CloseIcon";
import { LocationIcon } from "@/components/_ui/icons/LocationIcon";
import { MenuIcon } from "@/components/_ui/icons/MenuIcon";
import { Search } from "@/components/header-menu/Search";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

interface Props {
  children: React.ReactNode;
}

export const MobileMenuProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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
    <div className="flex gap-2 items-center lg:hidden">
      <button aria-labelledby="Mobile menu" onClick={handleMenuButtonClick}>
        <MenuIcon />
      </button>
      <button
        aria-labelledby="Location"
        onClick={() => router.push("?store=select")}
      >
        <LocationIcon />
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
        <ContainerLayout className={cx("flex h-[80px]")}>
          <div className="flex items-center gap-8 w-full">
            <button aria-labelledby="Close" onClick={handleMenuButtonClick}>
              <CloseIcon />
            </button>
            <Suspense fallback={null}>
              <Search />
            </Suspense>
          </div>
        </ContainerLayout>
        <div
          className={cx(
            "fixed border-t border-t-cold-grey-dark overflow-y-auto overflow-x-hidden py-4 left-0 top-[80px] h-[calc(100dvh-80px)] right-0 bottom-0 bg-white z-100 transition-all duration-500 ease-in-out",
            {
              "translate-x-0": isOpen,
              "-translate-x-full": !isOpen,
            },
          )}
        >
          <ContainerLayout>{children}</ContainerLayout>
        </div>
      </div>
    </div>
  );
};
