import React from "react";

import { CustomerDataFragment } from "@/types";

interface Props {
  customer?: CustomerDataFragment | null;
}

export const DeleteCustomerMessage: React.FC<Props> = ({ customer }) => {
  return (
    <div className="flex flex-col gap-4">
      <p>Hei {customer?.firstname}</p>
      <p>
        Vi ser at du vurderer å avslutte handlekontoen din hos oss. Før vi
        hjelper deg videre, vil vi gjerne minne deg om fordelene du kanskje vil
        gå glipp av – for vi i Møbelringen ønsker å gi deg et hjem som gir deg
        komfort og ekte hjemmekos
      </p>
      <ul className="list-disc pl-4 font-bold">
        <li>Eksklusive rabatter og tilbud</li>
        <li>Enkel oversikt over alle kjøpene dine</li>
        <li>Raskere utsjekk ved neste kjøp</li>
      </ul>
      <p className="italic">
        Om du velger å slette din profil vil vi slette eller anonymisere
        historikk og opplysninger på mobelringen.no. Du vil også melde deg ut av
        Møbelringen Kundeklubb.
      </p>
    </div>
  );
};
