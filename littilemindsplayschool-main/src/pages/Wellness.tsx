import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const activities = [
  {
    title: "Breathing Exercise 🌬️",
    emoji: "🌬️",
    color: "bg-sky",
    desc: "Breathe in slowly, hold, breathe out. Follow the circle!",
    type: "breathing" as const,
  },
  {
    title: "Meditation 🧘",
    emoji: "🧘",
    color: "bg-primary",
    desc: "Close your eyes, sit still, and listen to your breath.",
    type: "meditation" as const,
  },
  {
    title: "Yoga Poses 🤸",
    emoji: "🤸",
    color: "bg-green",
    desc: "Try these fun yoga poses! Hold each for 10 seconds.",
    type: "yoga" as const,
  },
];

const yogaPoses = [
  { name: "Tree Pose 🌳", instruction: "Stand on one leg, hands above head like branches!", emoji: "🌳" },
  { name: "Cat Pose 🐱", instruction: "Get on all fours, arch your back up like a cat!", emoji: "🐱" },
  { name: "Butterfly 🦋", instruction: "Sit down, put feet together, flap your knees like wings!", emoji: "🦋" },
  { name: "Cobra 🐍", instruction: "Lie on tummy, push up with arms, look up at the sky!", emoji: "🐍" },
  { name: "Star Pose ⭐", instruction: "Stand wide, stretch arms out — be a star!", emoji: "⭐" },
];

const BreathingCircle = () => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setCount((c) => {
        if (phase === "inhale" && c >= 4) { setPhase("hold"); return 0; }
        if (phase === "hold" && c >= 4) { setPhase("exhale"); return 0; }
        if (phase === "exhale" && c >= 4) { setPhase("inhale"); return 0; }
        return c + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, phase]);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{
          scale: phase === "inhale" ? 1.5 : phase === "hold" ? 1.5 : 1,
        }}
        transition={{ duration: 1 }}
        className="w-32 h-32 rounded-full bg-sky/30 border-4 border-sky flex items-center justify-center"
      >
        <span className="font-heading text-xl font-bold text-foreground">
          {phase === "inhale" ? "Breathe In" : phase === "hold" ? "Hold" : "Breathe Out"}
        </span>
      </motion.div>
      <p className="text-2xl font-bold text-primary">{count + 1}</p>
      <button
        onClick={() => { setRunning(!running); if (!running) { setPhase("inhale"); setCount(0); } }}
        className="btn-playful bg-primary text-primary-foreground flex items-center gap-2"
      >
        {running ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
      </button>
    </div>
  );
};

const MeditationTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [target] = useState(60);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s >= target) { setRunning(false); return s; }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, target]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="6"
            strokeDasharray={`${(seconds / target) * 283} 283`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-3xl font-bold text-foreground">{target - seconds}s</span>
        </div>
      </div>
      <p className="text-muted-foreground">Close your eyes and breathe slowly 🧘</p>
      <div className="flex gap-3">
        <button
          onClick={() => setRunning(!running)}
          className="btn-playful bg-primary text-primary-foreground flex items-center gap-2"
        >
          {running ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
        </button>
        <button
          onClick={() => { setRunning(false); setSeconds(0); }}
          className="btn-playful bg-muted text-foreground flex items-center gap-2"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </div>
  );
};

const YogaPoses = () => {
  const [poseIdx, setPoseIdx] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        key={poseIdx}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="text-8xl mb-4">{yogaPoses[poseIdx].emoji}</div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{yogaPoses[poseIdx].name}</h3>
        <p className="text-muted-foreground text-lg max-w-sm">{yogaPoses[poseIdx].instruction}</p>
      </motion.div>
      <div className="flex gap-2">
        {yogaPoses.map((_, i) => (
          <button
            key={i}
            onClick={() => setPoseIdx(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === poseIdx ? "bg-primary scale-125" : "bg-muted"}`}
          />
        ))}
      </div>
      <button
        onClick={() => setPoseIdx((i) => (i + 1) % yogaPoses.length)}
        className="btn-playful bg-green text-green-foreground"
      >
        Next Pose →
      </button>
    </div>
  );
};

const Wellness = () => {
  const [active, setActive] = useState<number | null>(null);

  if (active === null) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-4">Wellness & Mindfulness 🧘</h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">Healthy body, healthy mind!</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {activities.map((a, i) => (
              <motion.button
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(i)}
                className="card-playful border-border text-center cursor-pointer group"
              >
                <div className={`${a.color} text-primary-foreground w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {a.emoji}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{a.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{a.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto max-w-2xl">
        <button onClick={() => setActive(null)} className="text-muted-foreground hover:text-foreground font-semibold mb-8 block">
          ← Back
        </button>
        <div className="card-playful border-border p-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">{activities[active].title}</h2>
          {activities[active].type === "breathing" && <BreathingCircle />}
          {activities[active].type === "meditation" && <MeditationTimer />}
          {activities[active].type === "yoga" && <YogaPoses />}
        </div>
      </div>
    </div>
  );
};

export default Wellness;
