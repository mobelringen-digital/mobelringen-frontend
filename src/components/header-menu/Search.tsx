"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { SearchIcon } from "@/components/_ui/icons/SearchIcon";
import { Input } from "@/components/_ui/input/Input";

export const Search = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get("q") || "");

  return (
    <form className="w-full" method="GET" action="/search">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={
          <button aria-labelledby="Search" type="submit">
            <SearchIcon />
          </button>
        }
        name="q"
        placeholder="Finn produkter"
      />
    </form>
  );
};
