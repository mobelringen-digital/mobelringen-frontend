"use client";

import React from "react";

import { StoresSelectController } from "@/components/store-selector/StoresSelectController";
import { BaseStoreFragment } from "@/types";

interface Props {
  selectedStore?: BaseStoreFragment | null;
}

export const StoreSelector: React.FC<Props> = ({ selectedStore }) => {
  return <StoresSelectController selectedStore={selectedStore} />;
};
