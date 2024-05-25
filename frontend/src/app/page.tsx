import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Section from "@/components/landing/Section";
import FAQ from "@/components/shared/FAQ";

const landingInfo = [
  {
    title: "What is Aali?",
    detail: "Aali is a trained AI agent who knows how an IELTS exam scored.",
  },
  {
    title:
      "What makes Aali different from a human who is scoring our real and mock exams?",
    detail:
      "Aali is not biased to any content or concept so it will give a fair score, It does not need to sleep. And it has been read a count of IELTS writings that no other human being ever read.",
  },
];
export default function Home() {
  return (
    <div className="standard-margin flex flex-col justify-between gap-20">
      <Hero />
      {landingInfo.map((info, index) => (
        <Section
          detail={info.detail}
          title={info.title}
          key={index}
          rtl={index % 2 === 0}
        />
      ))}
      <HowItWorks />
      <Features />
      <FAQ />
    </div>
  );
}
