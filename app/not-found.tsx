import Link from "next/link";
import NightSky from "@/components/NightSky";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <NightSky />
      <h1 className="sky-ink text-center font-display text-3xl text-[#ff6b6b] sm:text-5xl">
        GAME OVER
      </h1>
      <p className="sky-ink text-center text-stone-300">
        The page you seek lies in another castle.
      </p>
      <Link
        href="/"
        className="sky-ink blink font-display text-sm text-gold"
      >
        ▶ CONTINUE
      </Link>
    </main>
  );
}
