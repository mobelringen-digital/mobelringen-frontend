"use server";

import { IPaperDocument } from "@/queries/page.queries";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function getIPapers() {
  const res = await baseMagentoClient().request(IPaperDocument);

  return res.iPapers;
}
