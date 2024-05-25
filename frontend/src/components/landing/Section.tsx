import React from "react";

interface ISection {
  title: string;
  detail: string;
  rtl?: boolean;
}

const Section: React.FC<ISection> = ({ title, detail, rtl = false }) => {
  return (
    <section className={`flex my-4 gap-10`}>
      <p className={`w-1/5 text-2xl font-thin `}>{title}</p>
      <p className={`w-4/5 text-2xl font-thin `}>{detail}</p>
    </section>
  );
};

export default Section;
