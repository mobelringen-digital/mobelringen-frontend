import React from "react";

import { BaseStoreFragment } from "@/types";

interface Props {
  store: BaseStoreFragment;
}

export const StoreWorkingDays: React.FC<Props> = ({ store }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-1">
        <span>Mandag</span>
        <span>{store.opening_hours?.monday ?? "Stengt"}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Tirsdag</span>
        <span>{store.opening_hours?.tuesday ?? "Stengt"}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Onsdag</span>
        <span>{store.opening_hours?.wednesday ?? "Stengt"}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Torsdag</span>
        <span>{store.opening_hours?.thursday ?? "Stengt"}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Fredag</span>
        <span>{store.opening_hours?.friday ?? "Stengt"}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Lørdag</span>
        <span>{store.opening_hours?.saturday ?? "Stengt"}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Søndag</span>
        <span>{store.opening_hours?.sunday ?? "Stengt"}</span>
      </div>
    </div>
  );
};
