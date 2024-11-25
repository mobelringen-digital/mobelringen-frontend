import React from "react";

import { revalidateTag } from "next/cache";

export default function KlarnaStatusUpdate() {
  revalidateTag("cart");

  return <>OK</>;
}
