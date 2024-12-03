import React from "react";

import { Button } from "@/components/_ui/button/Button";

interface Props {
  onClose: () => void;
  onReset: () => void;
}

export const FilterActions: React.FC<Props> = ({ onClose, onReset }) => {
  return (
    <div className="fixed lg:sticky left-0 right-0 p-4 bg-white bottom-0 border-t border-cold-grey-dark flex justify-between gap-4 z-40">
      <Button
        aria-label="Fjern alle"
        type="button"
        color="grey"
        className="w-full"
        onClick={onReset}
      >
        Fjern alle
      </Button>
      <Button
        aria-label="Vis resultater"
        type="submit"
        color="primary"
        className="w-full"
        onClick={onClose}
      >
        Vis resultater
      </Button>
    </div>
  );
};
