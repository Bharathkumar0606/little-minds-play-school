import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw, Star } from "lucide-react";

type Game = "colors" | "numbers" | "alphabets" | "mismatch";

const colorQuestions = [
  { question: "Which color is the SKY? ☁️", options: ["🔴 Red", "🔵 Blue", "🟢 Green", "🟡 Yellow"], answer: 1 },
  { question: "Which color is a BANANA? 🍌", options: ["🔴 Red", "🔵 Blue", "🟢 Green", "🟡 Yellow"], answer: 3 },
  { question: "Which color is GRASS? 🌿", options: ["🔴 Red", "🔵 Blue", "🟢 Green", "🟡 Yellow"], answer: 2 },
  { question: "Which color is a FIRE TRUCK? 🚒", options: ["🔴 Red", "🔵 Blue", "🟢 Green", "🟡 Yellow"], answer: 0 },
  { question: "Which color is the SUN? ☀️", options: ["🟣 Purple", "🔵 Blue", "🟠 Orange", "🟡 Yellow"], answer: 3 },
];

const numberQuestions = [
  { question: "How many fingers on ONE hand? ✋", options: ["3", "4", "5", "6"], answer: 2 },
  { question: "What comes after 2?", options: ["1", "3", "4", "5"], answer: 1 },
  { question: "🍎🍎🍎 How many apples?", options: ["2", "3", "4", "5"], answer: 1 },
  { question: "What is 1 + 1?", options: ["1", "2", "3", "4"], answer: 1 },
  { question: "Which is the BIGGEST number?", options: ["3", "7", "2", "5"], answer: 1 },
];

const alphabetQuestions = [
  { question: "What letter does APPLE start with? 🍎", options: ["B", "A", "C", "D"], answer: 1 },
  { question: "What letter does CAT start with? 🐱", options: ["B", "D", "C", "K"], answer: 2 },
  { question: "What comes after A?", options: ["C", "D", "B", "E"], answer: 2 },
  { question: "What letter does DOG start with? 🐕", options: ["B", "G", "C", "D"], answer: 3 },
  { question: "How many letters in 'SUN'?", options: ["2", "3", "4", "5"], answer: 1 },
];

const mismatchQuestions = [
  { question: "Which one does NOT belong?", options: ["🍎 Apple", "🍌 Banana", "🚗 Car", "🍇 Grapes"], answer: 2 },
  { question: "Which one is NOT an animal?", options: ["🐕 Dog", "🐱 Cat", "📚 Book", "🐟 Fish"], answer: 2 },
  { question: "Which one does NOT fly?", options: ["🦅 Eagle", "🐦 Bird", "🪨 Rock", "🦋 Butterfly"], answer: 2 },
  { question: "Which one is NOT a shape?", options: ["⭐ Star", "⬛ Square", "🎵 Music", "🔵 Circle"], answer: 2 },
  { question: "Which color is ODD one out?", options: ["🔴 Red", "🔴 Red", "🔵 Blue", "🔴 Red"], answer: 2 },
];

const games: Record<Game, { title: string; emoji: string; color: string; questions: typeof colorQuestions }> = {
  colors: { title: "Color Match", emoji: "🎨", color: "bg-pink", questions: colorQuestions },
  numbers: { title: "Number Fun", emoji: "🔢", color: "bg-sky", questions: numberQuestions },
  alphabets: { title: "ABC Quiz", emoji: "🔤", color: "bg-green", questions: alphabetQuestions },
  mismatch: { title: "Odd One Out", emoji: "🧩", color: "bg-orange", questions: mismatchQuestions },
};

const BrainGames = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const startGame = (game: Game) => {
    setActiveGame(game);
    setQIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = games[activeGame!].questions[qIndex].answer === idx;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (qIndex + 1 >= games[activeGame!].questions.length) {
        setFinished(true);
      } else {
        setQIndex((i) => i + 1);
        setSelected(null);
      }
    }, 1000);
  };

  if (!activeGame) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-4">Brain Games 🧠</h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">Choose a game and test your brain!</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {(Object.keys(games) as Game[]).map((key, i) => {
              const g = games[key];
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => startGame(key)}
                  className="card-playful border-border text-left group cursor-pointer"
                >
                  <div className={`${g.color} text-primary-foreground w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                    {g.emoji}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">{g.title}</h3>
                  <p className="text-muted-foreground">{g.questions.length} questions • Ages 3-6</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const game = games[activeGame];

  if (finished) {
    return (
      <div className="min-h-screen section-padding flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-playful border-border text-center max-w-md w-full p-8"
        >
          <div className="text-6xl mb-4">{score >= 4 ? "🏆" : score >= 2 ? "⭐" : "💪"}</div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
            {score >= 4 ? "Amazing!" : score >= 2 ? "Good Job!" : "Keep Trying!"}
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            You got <span className="font-bold text-primary">{score}</span> out of {game.questions.length} correct!
          </p>
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: game.questions.length }).map((_, i) => (
              <Star key={i} size={24} className={i < score ? "text-secondary fill-secondary" : "text-border"} />
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => startGame(activeGame)} className="btn-playful bg-primary text-primary-foreground flex items-center gap-2">
              <RotateCcw size={18} /> Play Again
            </button>
            <button onClick={() => setActiveGame(null)} className="btn-playful bg-muted text-foreground">
              All Games
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = game.questions[qIndex];

  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setActiveGame(null)} className="text-muted-foreground hover:text-foreground font-semibold">
            ← Back
          </button>
          <div className="text-sm font-bold text-muted-foreground">
            {qIndex + 1} / {game.questions.length}
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-3 mb-8">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${((qIndex + 1) / game.questions.length) * 100}%` }}
          />
        </div>
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-playful border-border p-8"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            {q.question}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {q.options.map((opt, idx) => {
              let cls = "border-2 border-border bg-card hover:border-primary hover:bg-primary/5";
              if (selected !== null) {
                if (idx === q.answer) cls = "border-2 border-accent bg-accent/10";
                else if (idx === selected) cls = "border-2 border-destructive bg-destructive/10";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={`${cls} rounded-2xl p-4 text-lg font-bold text-foreground transition-all flex items-center justify-center gap-2`}
                >
                  {opt}
                  {selected !== null && idx === q.answer && <CheckCircle size={20} className="text-accent" />}
                  {selected !== null && idx === selected && idx !== q.answer && <XCircle size={20} className="text-destructive" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrainGames;
