import React from "react";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="bg-blue-dark standard-padding flex flex-row justify-between items-center h-[10vh]">
      <ul className="flex flex-row w-full gap-12">
        <li>
          <Link href="/">VerveDevLab</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/how">How it works?</Link>
        </li>
        <li>
          <Link href="/writing">Writing</Link>
        </li>
        <li>
          <Link href="/#faq">FAQ</Link>
        </li>
        <li className=" ml-auto">
          <Link href="/auth">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
