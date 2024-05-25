import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col items-center justify-between bg-blue-dark standard-padding gap-8">
      <span className="flex flex-row items-center justify-between w-full">
        <span className="mr-auto">
          <Link href="/">VerveDevLab</Link>
        </span>
        <ul className="flex flex-col gap-2">
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
        </ul>
      </span>
      <p>&copy; {new Date().getFullYear()} VerveDevLab. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
