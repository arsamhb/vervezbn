import React from "react";
import FAQItem from "./FAQItem";

const faqQuestionsList = [
  {
    question:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eligendi.",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem saepe molestias tempore. Voluptatem distinctio tenetur non debitis, sequi error! Quisquam?",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eligendi.",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem saepe molestias tempore. Voluptatem distinctio tenetur non debitis, sequi error! Quisquam?",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eligendi.",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem saepe molestias tempore. Voluptatem distinctio tenetur non debitis, sequi error! Quisquam?",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eligendi.",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem saepe molestias tempore. Voluptatem distinctio tenetur non debitis, sequi error! Quisquam?",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eligendi.",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem saepe molestias tempore. Voluptatem distinctio tenetur non debitis, sequi error! Quisquam?",
  },
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="flex flex-col gap-2 items-center w-full">
      <h2>FAQ</h2>
      {faqQuestionsList.map((item, index) => (
        <FAQItem key={index} answer={item.answer} question={item.question} />
      ))}
    </section>
  );
};

export default FAQ;
