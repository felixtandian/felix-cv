import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <footer className="py-10 text-center font-display text-xs tracking-widest text-stone-500">
        © 2026 FELIX TANDIAN — THE JOURNEY CONTINUES…
      </footer>
    </main>
  );
}
