"use client";

import React, { useEffect } from "react";

const loadFlowbox = () =>
  new Promise((resolve) => {
    (function (d, id) {
      if (!window.flowbox) {
        const f = function () {
          // eslint-disable-next-line prefer-rest-params
          f.q.push(arguments);
        };
        // @ts-expect-error - flowbox is a global variable
        f.q = [];
        window.flowbox = f;
      }
      if (d.getElementById(id)) {
        return resolve(id);
      }
      const s = d.createElement("script"),
        fjs = d.scripts[d.scripts.length - 1];
      s.id = id;
      s.async = true;
      s.src = "https://connect.getflowbox.com/flowbox.js";
      fjs?.parentNode?.insertBefore(s, fjs);
      resolve(id);
    })(document, "flowbox-js-embed");
  });

const containerName = "js-flowbox-flow";
const locale = "nb-NO";

const Flowbox = ({ flowKey: key }: { flowKey: string }) => {
  const container = `${containerName}-${key}`;
  useEffect(() => {
    loadFlowbox().then(() => {
      window.flowbox("init", { container: container, key, locale });
    });
  }, [container, key]);

  return <div id={container} />;
};

export default Flowbox;
