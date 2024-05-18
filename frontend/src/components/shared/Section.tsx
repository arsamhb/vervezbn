import React from "react";

interface ISection {
  title: string;
  detail: string;
  rtl?: boolean;
}

const Section: React.FC<ISection> = ({ title, detail, rtl = false }) => {
  return (
    <section
      className={`flex ${rtl ? "flex-row" : "flex-row-reverse"} my-4 gap-10`}
    >
      <h2 className=" text-2xl font-bold">{title}</h2>
      <p className=" text-2xl font-thin">{detail}</p>
    </section>
  );
};

export default Section;
