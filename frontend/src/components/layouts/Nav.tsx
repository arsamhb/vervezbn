import React from "react";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="standard-padding flex flex-row justify-between items-center h-[7vh] fixed top-0 right-0 left-0">
      <ul className="flex flex-row w-full gap-12 justify-center items-center">
        <li className="mr-auto">
          <Link href="/">VerveDevLab</Link>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/writing">Writing</Link>
        </li>
        <li>
          <Link href="/#faq">FAQ</Link>
        </li>
        <li>
          <Link href="/auth">Login</Link>
        </li>
        <li className="button bg-secondary">
          <Link href="/auth">Start</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
