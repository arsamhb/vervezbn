import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeroBGPath from "@/assets/img/HeroBGSVG.svg"
import HeroCurvePath from "@/assets/img/HeroCurveSVG.svg"

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col justify-between w-full h-[100vh] standard-padding relative">
      <Image src={HeroBGPath} className="w-[100vw] h-[100vh] absolute top-0 right-0 z-[-1]" alt="background-image" />
      <Image src={HeroCurvePath} className="w-[100vw] h-[100vh] absolute top-0 right-0 z-[-1]" alt="background-image" />
      <span className="flex flex-row justify-between items-center w-full mt-16 h-2/3">
        <h1 className="text-h1">
          A Fast, Knowledgeable, <br />
          <em>With No Error</em>, AI agent <br />
          to help take the score you want in <br />
          <em>IELTS</em>
        </h1>
      </span>
      <span className="flex flex-row gap-4 place-items-start mb-16 h-1/6">
        <button className="button bg-primary text-light ">
          <Link href="/writing">Take a writing test</Link>
        </button>
      </span>
    </div>
  );
};

export default Hero;
