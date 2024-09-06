import React from "react";

type Props = {};

const howItWorksTextContent = [
  {
    title: "Create an Account",
    text: "Sign up and get 3 coins as a welcome gift. Refer friends to earn more coins.",
  },
  {
    title: "Choose a Writing Task",
    text: "Select from a variety of IELTS writing tasks that match your skill level.",
  },
  {
    title: "Submit Your Writing",
    text: "Send your completed task for evaluation. Depending on your selected plan, you’ll receive a score and feedback within minutes.",
  },
  {
    title: "Receive and Review Feedback",
    text: "Access your personalized feedback on your user panel. Upgrade your plan at any time to receive more detailed insights and a training plan.",
  },
  {
    title: "Track Your Progress",
    text: "Monitor your past writings, scores, and transaction history in your personalized dashboard.",
  },
];

const HowItWorks = (props: Props) => {
  return (
    <div className="flex flex-col h-screen max-h-screen items-center justify-between py-20">
      {howItWorksTextContent.map((section, index) => {
        return (
          <article
            className={`bg-primary-light rounded-md p-4 w-[50vw] h-[10vh] flex flex-col justify-evenly ${
              index % 2 === 0 ? "mr-auto" : "ml-auto"
            }`}
          >
            <h3 className="text-h3">{section.title}</h3>
            <p className="text-h6">{section.text}</p>
          </article>
        );
      })}
    </div>
  );
};

export default HowItWorks;
