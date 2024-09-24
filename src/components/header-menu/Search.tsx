"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { SearchIcon } from "@/components/_ui/icons/SearchIcon";
import { Input } from "@/components/_ui/input/Input";

export const Search = () => {
  const searchParams = useSearchParams();

  return (
    <form method="GET" action="/search">
      <Input
        value={searchParams.get("q") || ""}
        startContent={
          <button type="submit">
            <SearchIcon />
          </button>
        }
        name="q"
        placeholder="Finn produkter"
      />
    </form>
  );
};
