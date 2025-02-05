"use client";

import React from "react";

import { Switch } from "@nextui-org/react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Stage } from "@/types";

export const PageStageSwitch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isDraft = searchParams.get("stage") === Stage.Draft;

  const handleChange = (value: boolean) => {
    if (value) {
      return router.push(`${pathname}?preview=true&stage=${Stage.Draft}`);
    }
    return router.push(`${pathname}?preview=true&stage=${Stage.Published}`);
  };

  return (
    <div className="fixed bottom-8 right-8 bg-white rounded-2xl p-4 flex gap-4 items-center justify-center z-50">
      <Switch isSelected={isDraft} onValueChange={handleChange} />
    </div>
  );
};
