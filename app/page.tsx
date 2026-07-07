import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import PixelParty from "@/components/PixelParty";
import RuinsBackdrop from "@/components/RuinsBackdrop";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <RuinsBackdrop />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <footer className="pb-24 pt-10 text-center font-display text-xs tracking-widest text-stone-500">
        © 2026 FELIX TANDIAN — THE JOURNEY CONTINUES…
      </footer>
      <PixelParty />
    </main>
  );
}
