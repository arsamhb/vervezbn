import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Section from "@/components/landing/Section";
import FAQ from "@/components/shared/FAQ";


export default function Home() {
  return (
    <div className="flex flex-col justify-between gap-20">
      <Hero />
      <Features />
      <HowItWorks />
      {/* <FAQ /> */}
    </div>
  );
}
