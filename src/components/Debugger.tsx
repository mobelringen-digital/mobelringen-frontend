"use client";
import React from "react";

interface Props {
  data: any;
  name?: string;
}

export const Debugger: React.FC<Props> = ({ data, name = "Debugger" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="my-16">
      <button
        aria-label={name}
        className="text-sm bg-black text-white p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {name}
      </button>
      {isOpen ? (
        <div className="bg-black text-white text-sm p-4">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
};
