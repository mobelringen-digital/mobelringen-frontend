import React from "react";

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="block lg:hidden">
        <Image src="/mobile_logo.svg" alt="logo" width={48} height={48} />
      </div>
      <div className="hidden lg:block">
        <Image src="/logo.svg" alt="logo" width={112} height={56} />
      </div>
    </Link>
  );
};
