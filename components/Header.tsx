"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = ({ user }: { user: User }) => {
  return (
    <header className="header sticky top-0">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="log"
            height={32}
            width={140}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};

export default Header;
