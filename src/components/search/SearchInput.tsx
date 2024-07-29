import React from "react";

import { SearchIcon } from "@/components/_ui/icons/SearchIcon";
import { Input, InputProps } from "@/components/_ui/input/Input";

export const SearchInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      startContent={<SearchIcon />}
      placeholder="Finn produkter"
      {...props}
    />
  );
};
