"use client";

import React from "react";

import cx from "classnames";

import { ChevronRight } from "@/components/icons/ChevronRight";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { NavigationIcon } from "@/components/icons/NavigationIcon";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { MenuQuery } from "@/types";

interface Props {
  data: MenuQuery;
}

export const MobileMenu: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMenuButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    return setIsOpen((prev) => !prev);
  };

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
            "fixed p-4 left-0 top-[80px] h-[calc(100vh-80px)] right-0 bottom-0 bg-white z-100 transition-all duration-500 ease-in-out",
            {
              "translate-x-0": isOpen,
              "-translate-x-full": !isOpen,
            },
          )}
        >
          <ul className="flex gap-4 flex-col list-none">
            {data.menus[0].links?.map((menu, idx) => {
              return (
                <li className="flex justify-between items-center" key={idx}>
                  <span className="text-2xl font-feature font-medium">
                    {menu.label}
                  </span>{" "}
                  <ChevronRight />
                </li>
              );
            })}
          </ul>
        </ContainerLayout>
      </div>
    </div>
  );
};
