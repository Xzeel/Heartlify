import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";

const FUN_MESSAGES = [
  "Bintang-bintang merestui kalian! ✨",
  "Cinta ini ditulis di langit 🌙",
  "Takdir bekerja dengan caranya sendiri 💫",
  "Jangan sia-siakan momen ini 💌",
  "Hati kalian berdetak seirama 💓",
  "Kisah kalian baru saja dimulai 🌹",
  "Ada chemistry yang nyata di sini 🔥",
  "Dunia butuh lebih banyak cinta seperti ini 🌸",
];

function getLabel(p: number) {
  if (p >= 90) return { title: "Perfect Match!", color: "from-pink-500 to-rose-500" };
  if (p >= 70) return { title: "Great Match!", color: "from-pink-500 to-rose-400" };
  if (p >= 50) return { title: "Good Match", color: "from-rose-400 to-pink-400" };
  if (p >= 30) return { title: "Bisa Diusahakan", color: "from-pink-400 to-pink-300" };
  return { title: "Just Friends 🤝", color: "from-pink-300 to-rose-300" };
}

export function LoveResult({ percent, names }: { percent: number; names: string }) {
  const spring = useSpring(0, { stiffness: 60, damping: 18, duration: 1.6 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [shown, setShown] = useState(0);
  const [message] = useState(
    () => FUN_MESSAGES[Math.floor(Math.random() * FUN_MESSAGES.length)],
  );

  useEffect(() => {
    spring.set(percent);
    const unsub = display.on("change", (v) => setShown(v));
    return () => unsub();
  }, [percent, spring, display]);

  const label = getLabel(percent);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-8 text-center"
      >
        <p className="text-sm font-medium text-pink-200/90">{names}</p>
        <div className="my-4 flex items-baseline justify-center gap-1 animate-pulse-soft">
          <span
            className={`bg-gradient-to-r ${label.color} bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl`}
          >
            {shown}
          </span>
          <span className="text-4xl font-bold text-pink-500">%</span>
        </div>
        <h3
          className={`bg-gradient-to-r ${label.color} bg-clip-text text-2xl font-bold text-transparent`}
        >
          {label.title}
        </h3>
        <p className="mt-2 text-sm text-rose-700/80">{message}</p>
      </motion.div>
    </AnimatePresence>
  );
}
