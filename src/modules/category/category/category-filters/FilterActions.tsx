import React from "react";

import { Button } from "@/components/_ui/button/Button";

interface Props {
  onClose: () => void;
  onReset: () => void;
}

export const FilterActions: React.FC<Props> = ({ onClose, onReset }) => {
  return (
    <div className="sticky p-4 bg-white bottom-0 border-t border-cold-grey-dark flex justify-between gap-4 z-40">
      <Button
        aria-labelledby="Fjern alle"
        type="button"
        color="grey"
        className="w-full"
        onClick={onReset}
      >
        Fjern alle
      </Button>
      <Button
        aria-labelledby="Vis resultater"
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
