import React from "react";

interface FAQItemInterface {
  answer: string;
  question: string;
}

const FAQItem: React.FC<FAQItemInterface> = ({ answer, question }) => {
  return (
    <article className="w-full">
      <details className="border border-blue-dark cursor-pointer">
        <summary className="">{question}</summary>
        <p>{answer}</p>
      </details>
    </article>
  );
};

export default FAQItem;
