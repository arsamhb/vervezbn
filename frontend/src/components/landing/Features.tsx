import React from "react";

type Props = {};

const features = [
  {
    text: "Fastest review among all the mock takers, giving the score up to 12 hours and comments up to 24 hour",
  },
  {
    text: "Trained by massive and reliable data sets and official books for IELTS",
  },
  {
    text: "Without rest at your service, Without mistake delivered to you",
  },
];

const Features = (props: Props) => {
  return (
    <div className="flex flex-row justify-between items-center h-[50vh]">
      {features.map((feat, index) => (
        <>
          <p className="w-1/4 text-center">{feat.text}</p>
          {index + 1 < features.length && (
            <div className=" border-l border-2 border-blue-light h-16 my-auto w-0"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default Features;
