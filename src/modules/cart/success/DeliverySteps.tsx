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
            <div className="absolute -start-3 ring-4 justify-center w-6 h-6 bg-white ring-white rounded-full font-semibold text-[#3F1414]">
              <span className="text-sm flex justify-center items-center w-6 h-6 bg-[#FF3E3E] ring-[#FF3E3E] rounded-full font-semibold text-[#3F1414]">
                {index + 1}
              </span>
            </div>
            <h3 className="font-semibold leading-tight">{data.title}</h3>
            <p className="text-sm text-dark-grey">{data.message}</p>
          </li>
        ))}
        <li className="absolute bottom-0 -left-2 flex flex-shrink-0 bg-white h-4 w-4 rounded-full border-red" />
      </ol>
    </div>
  );
};
