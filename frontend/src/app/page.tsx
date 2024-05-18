import Section from "@/components/shared/Section";

const landingInfo = [
  { title: "What we do?", detail: "We do some new stuff" },
  { title: "Why we do?", detail: "To ignore death and earn some halal money" },
  { title: "Where we do?", detail: "Anywhere with a desk and electricity" },
  { title: "How we do?", detail: "By burning phosphor and glucose" },
];
export default function Home() {
  return (
    <>
      {landingInfo.map((info, index) => (
        <Section
          detail={info.detail}
          title={info.title}
          key={index}
          rtl={index % 2 === 0}
        />
      ))}
    </>
  );
}
