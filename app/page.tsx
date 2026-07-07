import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import NightSky from "@/components/NightSky";
import Sprite from "@/components/Sprite";
import XpBar from "@/components/XpBar";
import MenuCursor from "@/components/MenuCursor";
import KonamiCode from "@/components/KonamiCode";

/* save-point crystal — the reward for scrolling to the end */
const crystal = [
  "..a..",
  ".aba.",
  "abbba",
  "abbba",
  ".aba.",
  "..a..",
];

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <NightSky />
      <XpBar />
      <MenuCursor />
      <KonamiCode />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <footer className="sky-ink pb-24 pt-10 text-center font-display text-[9px] text-stone-400">
        <div aria-hidden className="mb-4 flex justify-center">
          <span className="save-crystal">
            <Sprite
              rows={crystal}
              palette={{ a: "#ffd54a", b: "#fff3c4" }}
              px={4}
            />
          </span>
        </div>
        © 2026 FELIX TANDIAN — THE JOURNEY CONTINUES…
      </footer>
    </main>
  );
}
