import React from "react";

const aboutUsContent = [
  {
    title: "Our Mission",
    text: "Our mission is to develop the english level of all iranians",
  },
  {
    title: "Our Vision",
    text: "Our vision is to develop the english level of our country in order to people can study and learn everything on their own and practicing the IELTS exam is just the beginning",
  },
  {
    title: "Our Team",
    text: "Our team contained from two passionate young developer whose their passion do not let them stay at the place they are",
  },
];

const About = () => {
  return (
    <article className="standard-margin flex flex-col items-center gap-12">
      {aboutUsContent.map((item) => (
        <section className="flex flex-col items-center">
          <h2 className=" text-center">{item.title}</h2>
          <p className=" text-center">{item.text}</p>
        </section>
      ))}
    </article>
  );
};

export default About;
