import React from "react";

import cx from "classnames";

const MESSAGES = [
  {
    title: "Ordren er registrert",
    message: "Nettbutikken har mottatt din ordre",
  },
  {
    title: "Pakkes",
    message:
      "Din ordre oversendes til vårt lager eller til en av våre leverandører, avhengig av hvilken eller hvilke varer du har bestilt",
  },
  {
    title: "Ordren er på vei",
    message:
      "Når det nærmer seg levering vil du motta et varsel om dette på SMS. Du vil også ha mulighet til å gjøre enkelte endringer på leveringstiden, dersom den opprinnelige ikke skulle passe",
  },
  {
    title: "Ordren er levert",
    message: "Takk for handelen!",
  },
];

export const DeliverySteps = () => {
  return (
    <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-2">
      <div className="text-xl font-semibold mb-2">Hva skjer nå?</div>
      <ol className="relative mx-2 border-s border-red">
        {MESSAGES.map((data, index) => (
          <li
            className={cx("ms-6", {
              "mb-10 ": index !== MESSAGES.length - 1,
            })}
            key={index}
          >
            <span className="absolute text-sm flex items-center justify-center w-6 h-6 bg-[#FF3E3E] ring-[#FF3E3E] rounded-full -start-3 ring-3 font-semibold text-[#3F1414]">
              {index + 1}
            </span>
            <h3 className="font-semibold leading-tight">{data.title}</h3>
            <p className="text-sm text=[#786E6D]">{data.message}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};
