import React from "react";

import { SearchIcon } from "@/components/_ui/icons/SearchIcon";
import { Input } from "@/components/_ui/input/Input";

export const Search = () => {
  return (
    <form method="GET" action="/search">
      <Input
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
