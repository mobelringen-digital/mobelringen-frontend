import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { SupportIcon } from "@/components/_ui/icons/SupportIcon";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

export const MoreInformation = () => {
  return (
    <section className="w-full bg-powder py-10 lg:py-16 my-28">
      <ContainerLayout className="flex flex-col lg:flex-row justify-center">
        <div className="grid grid-cols-6 gap-6 lg:gap-0 items-center lg:w-4/5">
          <div className="col-span-6 lg:col-span-4">
            <div className="grid grid-cols-10 items-center">
              <div className="col-span-12 lg:col-span-2 flex justify-center lg:justify-start">
                <SupportIcon />
              </div>

              <div className="col-span-12 lg:col-span-7 flex flex-col text-center lg:text-left gap-2">
                <h4 className="text-3xl font-feature font-normal">
                  Lurer du på noe mer?
                </h4>
                <p>
                  Lurer du på mulighetene til skreddersøm, om produktet passer
                  inn med resten av stua eller om den lokale butikken kan hjelpe
                  med bestillingen?
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-2 flex justify-center lg:justify-end">
            <Button color="secondary" variant="bordered" className="text-sm">
              Kontakt din nærmeste butikk
            </Button>
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
};
