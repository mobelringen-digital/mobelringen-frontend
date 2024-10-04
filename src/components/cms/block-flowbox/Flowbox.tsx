"use client";

import React, { useEffect } from "react";

import Script from "next/script";

interface FlowboxProps {
  flowKey: string;
  locale?: string;
}

const Flowbox: React.FC<FlowboxProps> = ({ flowKey, locale = "nb-NO" }) => {
  // Generate a unique container ID based on the flowKey
  const containerId = `js-flowbox-flow-${flowKey}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initializeFlowbox = () => {
        if (window.flowbox && typeof window.flowbox === "function") {
          window.flowbox("init", {
            container: `#${containerId}`,
            key: flowKey,
            locale: locale,
          });
        } else {
          // Do nothing if Flowbox is not available
        }
      };

      if (window.flowbox && typeof window.flowbox === "function") {
        // If the Flowbox script is already loaded
        initializeFlowbox();
      } else {
        // Wait for the script to load and then initialize
        window.addEventListener("flowboxScriptLoaded", initializeFlowbox);
      }

      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener("flowboxScriptLoaded", initializeFlowbox);
      };
    }
  }, [flowKey, locale, containerId]);

  return (
    <>
      {/* The container where Flowbox will render the content */}
      <div id={containerId} />

      {/* Load the Flowbox script using Next.js's Script component */}
      <Script
        id="flowbox-js-embed"
        src="https://connect.getflowbox.com/flowbox.js"
        strategy="beforeInteractive"
        onLoad={() => {
          // Dispatch a custom event to initialize Flowbox
          const event = new Event("flowboxScriptLoaded");
          window.dispatchEvent(event);
        }}
      />
    </>
  );
};

export default Flowbox;
