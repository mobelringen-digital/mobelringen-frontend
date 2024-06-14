"use client";
import React from "react";

import ReactJson from "react-json-view";

interface Props {
  data: any;
  name?: string;
}

export const Debugger: React.FC<Props> = ({ data, name = "Debugger" }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="my-16">
      <button
        className="text-sm bg-black text-white p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {name}
      </button>
      {isOpen ? (
        <ReactJson
          src={data}
          enableClipboard={false}
          displayDataTypes={false}
          name="data"
          theme="monokai"
          style={{ fontSize: "12px" }}
        />
      ) : null}
    </div>
  );
};
