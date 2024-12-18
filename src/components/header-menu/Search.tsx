"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { SearchIcon } from "@/components/_ui/icons/SearchIcon";
import { Input } from "@/components/_ui/input/Input";

interface Props {
  searchIconPosition?: "left" | "right";
  clearAfterSubmit?: boolean;
}

export const Search: React.FC<Props> = ({
  searchIconPosition = "left",
  clearAfterSubmit,
}) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState(
    clearAfterSubmit ? "" : searchParams.get("q") || "",
  );

  const positionProps =
    searchIconPosition === "left"
      ? {
          startContent: (
            <button aria-label="Search" type="submit">
              <SearchIcon />
            </button>
          ),
        }
      : {
          endContent: (
            <button aria-label="Search" type="submit">
              <SearchIcon />
            </button>
          ),
        };

  return (
    <form className="w-full" method="GET" action="/search">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        {...positionProps}
        name="q"
        placeholder="Finn produkter"
      />
    </form>
  );
};
