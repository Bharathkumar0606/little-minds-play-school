import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const stories = [
  {
    title: "The Clever Little Fox 🦊",
    emoji: "🦊",
    color: "bg-orange",
    pages: [
      { text: "Once upon a time, there was a clever little fox who lived in a cozy forest. 🌲", bg: "from-green/20 to-accent/10" },
      { text: "One day, the fox found a puzzle near the river. 'I must solve it!' said the fox. 🧩", bg: "from-sky/20 to-primary/10" },
      { text: "The fox tried and tried. 'Think, think, think!' 🤔", bg: "from-secondary/30 to-orange/10" },
      { text: "Finally, the fox solved it! A treasure box opened with fruits and treats! 🎁🍎", bg: "from-pink/20 to-secondary/20" },
      { text: "Moral: Never give up! Keep trying and you will succeed! ⭐", bg: "from-primary/20 to-accent/10" },
    ],
  },
  {
    title: "The Rainbow Friends 🌈",
    emoji: "🌈",
    color: "bg-sky",
    pages: [
      { text: "Red, Orange, Yellow, Green, Blue — five little crayons were best friends! 🖍️", bg: "from-pink/20 to-secondary/20" },
      { text: "One day, they had a fight. 'I am the best color!' each one said. 😤", bg: "from-orange/20 to-red/10" },
      { text: "They separated and the world became grey and sad. 😢", bg: "from-muted to-muted" },
      { text: "A little girl said, 'You are all beautiful together!' She drew a rainbow! 🎨", bg: "from-sky/20 to-primary/10" },
      { text: "Moral: Together we are stronger and more beautiful! 🤝🌈", bg: "from-primary/20 to-accent/10" },
    ],
  },
  {
    title: "The Counting Stars ⭐",
    emoji: "⭐",
    color: "bg-secondary text-secondary-foreground",
    pages: [
      { text: "Little Mia loved counting everything — trees, flowers, and birds! 🌳🌸🐦", bg: "from-green/20 to-sky/10" },
      { text: "One night, she tried to count the stars. '1, 2, 3...' she counted. ✨", bg: "from-primary/20 to-sky/20" },
      { text: "'There are too many!' she laughed. But she kept trying. 😄", bg: "from-secondary/30 to-orange/10" },
      { text: "Her mom smiled and said, 'The sky has infinite stars, just like your possibilities!' 💫", bg: "from-pink/20 to-primary/10" },
      { text: "Moral: Keep learning — there's always more to discover! 📚⭐", bg: "from-accent/20 to-green/10" },
    ],
  },
  {
    title: "The Brave Little Elephant 🐘",
    emoji: "🐘",
    color: "bg-green",
    pages: [
      { text: "Ellie the elephant was shy and quiet. She was afraid to play with others. 🐘😟", bg: "from-muted to-sky/10" },
      { text: "One day, a little bird fell from a tree. 'Help!' cried the bird. 🐦", bg: "from-sky/20 to-green/10" },
      { text: "Ellie was scared, but she gently picked up the bird with her trunk. 💪", bg: "from-secondary/30 to-orange/10" },
      { text: "All the animals cheered! 'Ellie is brave!' they said. 🎉", bg: "from-pink/20 to-secondary/20" },
      { text: "Moral: Being brave doesn't mean not being afraid — it means helping others anyway! 💖", bg: "from-primary/20 to-accent/10" },
    ],
  },
];

const Stories = () => {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  if (activeStory === null) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-4">Story Time 📚</h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">Tap on a story to start reading!</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {stories.map((s, i) => (
              <motion.button
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setActiveStory(i); setPage(0); }}
                className="card-playful border-border text-left group cursor-pointer"
              >
                <div className={`${s.color} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform`}>
                  {s.emoji}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.pages.length} pages</p>
                <div className="flex items-center gap-1 mt-3 text-primary font-semibold text-sm">
                  <Play size={14} /> Read Story
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const story = stories[activeStory];
  const currentPage = story.pages[page];

  return (
    <div className="min-h-screen section-padding flex items-center justify-center">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => setActiveStory(null)}
          className="text-muted-foreground hover:text-foreground font-semibold mb-6 block"
        >
          ← All Stories
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={`card-playful border-border p-8 md:p-12 bg-gradient-to-br ${currentPage.bg} min-h-[300px] flex flex-col items-center justify-center text-center`}
          >
            <div className="text-6xl mb-6">{story.emoji}</div>
            <h2 className="font-heading text-lg font-bold text-muted-foreground mb-2">
              {story.title} — Page {page + 1}
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
              {currentPage.text}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-muted text-foreground font-semibold disabled:opacity-40"
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <span className="text-muted-foreground font-bold">{page + 1} / {story.pages.length}</span>
          <button
            onClick={() => setPage((p) => Math.min(story.pages.length - 1, p + 1))}
            disabled={page === story.pages.length - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold disabled:opacity-40"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
