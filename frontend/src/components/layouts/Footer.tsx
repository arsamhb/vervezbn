import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col items-center justify-between bg-primary-dark footer-padding gap-16">
      <span className="flex flex-row items-center justify-between w-full">
        <span className="mr-auto">
          <Link className="text-light text-p" href="/">
            VerveDevLab
          </Link>
        </span>
        <ul className="flex flex-col gap-4">
          <li>
            <Link className="text-light text-p" href="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="text-light text-p" href="/how">
              How it works?
            </Link>
          </li>
          <li>
            <Link className="text-light text-p" href="/writing">
              Writing
            </Link>
          </li>
          <li>
            <Link className="text-light text-p" href="/#faq">
              FAQ
            </Link>
          </li>
        </ul>
      </span>
      <p className="text-light text-p">
        &copy; {new Date().getFullYear()} VerveDevLab. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
