import React from "react";

import { Cart } from "@/components/header-menu/cart";

export const Actions = () => {
  return (
    <ul className="flex items-center z-50">
      <li>
        <div className="flex items-center ml-auto space-x-6">
          <Cart />
        </div>
      </li>
    </ul>
  );
};
