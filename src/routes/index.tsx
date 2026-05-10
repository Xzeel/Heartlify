import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import Lenis from "lenis";
import { LoveBackground } from "@/components/LoveBackground";
import { LoveResult } from "@/components/LoveResult";

export const Route = createFileRoute("/")({
  component: LovinityPage,
});

function calcLove(a: string, b: string) {
  const n1 = a.trim();
  const n2 = b.trim();
  if (!n1 || !n2) return 0;
  const base =
    (n1.length * n2.charCodeAt(0) + n2.length * n1.charCodeAt(0)) % 80;
  const jitter = Math.random() * 30;
  return Math.max(5, Math.min(100, Math.round(base + jitter + 10)));
}

function LovinityPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [secret, setSecret] = useState(false);
  const [pending, setPending] = useState<{ p: number; names: string } | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [result, setResult] = useState<{ p: number; names: string; key: number } | null>(
    null,
  );
  const year = new Date().getFullYear();

  useEffect(() => {
    const lenis = new Lenis();
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;
    const data = {
      p: calcLove(name1, name2),
      names: `${name1.trim()}  ❤  ${name2.trim()}`,
    };
    if (secret) {
      setResult(null);
      setPending(data);
    } else {
      setPending(null);
      setResult({ ...data, key: Date.now() });
    }
  };

  const reveal = () => {
    if (!pending) return;
    setRevealing(true);
    setTimeout(() => {
      setResult({ ...pending, key: Date.now() });
      setPending(null);
      setRevealing(false);
    }, 700);
  };

  return (
    <>
      <LoveBackground />
      <div className="relative flex min-h-screen flex-col items-center justify-between px-4 py-12 font-lexend">
        <header className="mt-6 text-center animate-fade-in-up">
          <h1 className="animate-gradient-text text-5xl font-bold tracking-tight sm:text-6xl">
            Lovinity
          </h1>
          <p className="mt-3 text-xl font-light text-white/90 drop-shadow">
            Buktikan Kecocokan Cinta Kalian
          </p>
        </header>

        <main className="my-10 w-full">
          <section
            className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl shadow-pink-200/50 backdrop-blur-xl sm:max-w-lg animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-center text-base text-rose-800/80">
              Masukkan nama kalian dan lihat magic-nya! 💖
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-rose-900">
                  Nama Anda
                </label>
                <input
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="cth. Aurora"
                  className="w-full rounded-2xl border border-pink-200 bg-white/70 px-4 py-3 text-rose-900 placeholder:italic placeholder:text-pink-300 transition focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-400/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-rose-900">
                  Nama Dia
                </label>
                <input
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="cth. Reyhan"
                  className="w-full rounded-2xl border border-pink-200 bg-white/70 px-4 py-3 text-rose-900 placeholder:italic placeholder:text-pink-300 transition focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-400/40"
                />
              </div>

              <label className="flex items-center justify-between gap-3 rounded-2xl border border-pink-200 bg-pink-50/60 px-4 py-3 cursor-pointer select-none">
                <span className="text-sm font-medium text-rose-900">
                  🤫 Mode Rahasia
                  <span className="block text-xs font-normal text-rose-700/70">Sembunyikan hasil sampai kamu siap</span>
                </span>
                <input
                  type="checkbox"
                  checked={secret}
                  onChange={(e) => setSecret(e.target.checked)}
                  className="h-5 w-5 accent-pink-500"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-pink-300/50 transition-all hover:scale-105 hover:from-rose-500 hover:to-pink-500 hover:shadow-xl active:scale-100"
              >
                Hitung Cinta! 💘
              </button>
            </form>

            {pending && !result && (
              <div className="mt-8 text-center animate-fade-in-up">
                <p className="text-sm font-medium text-pink-600/80">{pending.names}</p>
                <div className="my-6 flex justify-center">
                  <div className={`relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-2xl shadow-pink-300/60 ${revealing ? "animate-pulse-soft" : ""}`}>
                    <span className="text-6xl">{revealing ? "💗" : "🎁"}</span>
                  </div>
                </div>
                <p className="mb-4 text-sm text-rose-700/80">
                  {revealing ? "Membuka hasil..." : "Hasil tersembunyi. Siap untuk kejutan?"}
                </p>
                <button
                  onClick={reveal}
                  disabled={revealing}
                  className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-300/50 transition-all hover:scale-105 disabled:opacity-60"
                >
                  {revealing ? "✨ ✨ ✨" : "Buka Kejutan! 🎉"}
                </button>
              </div>
            )}

            {result && (
              <LoveResult key={result.key} percent={result.p} names={result.names} />
            )}
          </section>
        </main>

        <footer className="mt-8 text-center text-sm text-white/80">
          © {year} Lovinity. Built with 💖 by XzeelArcadia
        </footer>
      </div>
    </>
  );
}
