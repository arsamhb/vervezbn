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
    <div className="flex flex-row justify-between items-center standard-padding flex-wrap">
      {features.map((feat, index) => (
        <div className="w-[250px] h-[250px] border border-primary rounded-sm grid place-items-center p-4">
          <p className="text-center">{feat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
