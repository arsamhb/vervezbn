import React from "react";

type Props = {};

const features = [
  {
    title: "Realistic Mock Exams",
    text: "Experience IELTS writing tasks in an environment that closely mirrors the real exam. Get instant access to cue cards, and submit your writings for expert-level evaluation.",
  },
  {
    title: "AI-Powered Feedback",
    text: "Receive detailed reviews powered by a state-of-the-art AI model fine-tuned to IELTS criteria. Whether you opt for basic comments or a comprehensive improvement plan, our feedback is designed to guide your progress.",
  },
  {
    title: "Flexible Evaluation Plans",
    text: "Choose from three levels of feedback – Free, Premium, and Ultra. Start with a basic score or upgrade for in-depth analysis and tailored training programs to sharpen your skills.",
  },
];

const Features = (props: Props) => {
  return (
    <div className="h-screen max-h-screen flex flex-col justify-evenly">
      <h2 className="text-h3 standard-margin text-center">
        Welcome to [Product Name], your ultimate companion for mastering the
        IELTS writing exam. Powered by advanced AI and designed to mimic the
        official IELTS environment, we provide personalized feedback to help you
        improve your writing skills. Whether you're aiming for a quick score or
        a deep dive into your writing strengths and weaknesses, we've got the
        tools to help you succeed.
      </h2>
      <div className="flex flex-row justify-between items-center standard-padding flex-wrap">
        {features.map((feat, index) => (
          <section className="h-[300px] w-[360px] border border-primary rounded-sm flex flex-col justify-between px-6 py-8">
            <h3 className="text-center text-h3">{feat.title}</h3>
            <p className="text-center text-p">{feat.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Features;
