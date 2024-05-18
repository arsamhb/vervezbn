import React from "react";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="bg-blue-dark standard-padding flex flex-row justify-between items-center">
      <ul className="flex flex-row w-full gap-12">
        <li>
          <Link href="/">VerveDevLab</Link>
        </li>
        <li>
          <Link href="/writing">Writing</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
