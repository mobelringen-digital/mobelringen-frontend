import React from "react";

import Link from "next/link";

import { BlockLinks } from "@/components/footer/block-links/BlockLinks";
import { MenuQueryDocument } from "@/queries/menu.queries";
import { MenuQuery, MenuType } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

async function getFooterBlocks() {
  return await baseHygraphClient.request<MenuQuery>(MenuQueryDocument, {
    where: {
      menuLocation: MenuType.FooterMenu,
    },
  });
}

export async function FooterBlockLinks() {
  const footerBlocks = await getFooterBlocks();
  const data = footerBlocks.menus[0].links;

  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-8 border-t border-black border-opacity-20 border-b py-8 lg:py-16">
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 pr-8 mb-8 lg:mb-0">
        <span className="text-sm font-bold">Kundeklubben</span>
        <p className="text-sm">
          Dette er klubben for deg som brenner for det samme som oss -personlig
          interiør som gjør det hjemmekoselig – uansett om du er hjemme eller på
          hytta. Meld deg inn i Kundeklubben og få 20%* på et helt kjøp!
        </p>
        <p className="mt-4">
          <Link href="#" className="bg-black px-6 py-4 rounded-full text-white">
            Bli medlem
          </Link>
        </p>
      </div>
      {data.map((block) => {
        if (block.__typename === "LinkBlock") {
          return <BlockLinks block={block} key={block.id} />;
        }

        return null;
      })}
    </div>
  );
}
