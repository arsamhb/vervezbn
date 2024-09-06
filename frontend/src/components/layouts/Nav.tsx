import React from "react";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="standard-padding flex flex-row justify-between items-center h-[7vh] fixed top-0 right-0 left-0 backdrop-blur z-50">
      <ul className="flex flex-row w-full gap-12 justify-center items-center">
        <li className="mr-auto">
          <Link className="text-h5" href="/">VerveDevLab</Link>
        </li>
        <li>
          <Link className="text-h5" href="/">Home</Link>
        </li>
        <li>
          <Link className="text-h5" href="/about">About</Link>
        </li>
        <li>
          <Link className="text-h5" href="/writing">Writing</Link>
        </li>
        <li>
          <Link className="text-h5" href="/#faq">FAQ</Link>
        </li>
        <li>
          <Link className="text-h5" href="/auth">Login</Link>
        </li>
        <li className="button bg-secondary">
          <Link className="text-h5" href="/auth">Start</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
