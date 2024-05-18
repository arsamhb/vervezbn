import Section from "@/components/shared/Section";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center">
      <Section title="What we do?" detail="We do some new stuff" />
      <Section
        title="Why we do?"
        detail="To ignore death and earn some halal money"
      />
      <Section
        title="Where we do?"
        detail="Anywhere with a desk and electricity"
      />
      <Section title="How we do?" detail="By burning phosphor and glucose" />
    </main>
  );
}
 