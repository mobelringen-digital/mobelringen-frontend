import React from "react";

import { SearchIcon } from "@/components/_ui/icons/SearchIcon";
import { Input } from "@/components/_ui/input/Input";

export const SearchInput = () => {
  return <Input startContent={<SearchIcon />} placeholder="Finn produkter" />;
};
