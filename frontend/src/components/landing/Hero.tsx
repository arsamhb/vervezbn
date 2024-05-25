import React from "react";
import Image from "next/image";
import aaliImage from "@/assets/img/aali.png";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col justify-between w-full h-[90vh] py-12">
      <span className="flex flex-row justify-between items-center w-full">
        <h2>
          A Fast, Knowledgeable, <br />
          <em>With No Error</em>, AI agent <br />
          to help take the score you want in <br />
          <em>IELTS</em>
        </h2>
        <Image src={aaliImage} height={600} alt="Picture of the Aali" />
      </span>
      <span className="flex flex-row gap-4 place-items-start">
        <button className="border text-blue-dark border-blue-dark px-2 py-1 bg-blue-light">
          <Link href="/writing">Take a writing test</Link>
        </button>
        <button className="border text-blue-light border-blue-light px-2 py-1 bg-blue-dark">
          <Link href="/#learn-more">Learn more</Link>
        </button>
      </span>
    </div>
  );
};

export default Hero;
