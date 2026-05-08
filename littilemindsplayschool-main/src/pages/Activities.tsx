import { motion } from "framer-motion";
import { Puzzle, Users, Brain, Palette, Music, TreePine } from "lucide-react";

const activityList = [
  {
    icon: Puzzle,
    title: "Puzzle Play 🧩",
    desc: "Shape sorting, jigsaw puzzles, and pattern matching to build spatial awareness.",
    color: "bg-orange",
    ageGroup: "3-6 years",
  },
  {
    icon: Users,
    title: "Group Games 👫",
    desc: "Musical chairs, Simon says, relay races — learning teamwork and social skills.",
    color: "bg-sky",
    ageGroup: "3-6 years",
  },
  {
    icon: Brain,
    title: "Memory Games 🧠",
    desc: "Card matching, picture recall, and memory chains to sharpen concentration.",
    color: "bg-primary",
    ageGroup: "4-6 years",
  },
  {
    icon: Palette,
    title: "Clay & Craft ✂️",
    desc: "Clay modeling, paper folding, bead stringing — fine motor skill development.",
    color: "bg-pink",
    ageGroup: "3-6 years",
  },
  {
    icon: Music,
    title: "Music & Rhymes 🎵",
    desc: "Nursery rhymes, rhythm clapping, and singing games for language development.",
    color: "bg-green",
    ageGroup: "3-5 years",
  },
  {
    icon: TreePine,
    title: "Outdoor Play 🌳",
    desc: "Sand play, nature walks, gardening — exploring the world through senses.",
    color: "bg-secondary text-secondary-foreground",
    ageGroup: "3-6 years",
  },
];

const Activities = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-4">Learning Activities 🎯</h1>
        <p className="text-center text-muted-foreground mb-12 text-lg">Real activities designed for ages 3-6 to learn through play!</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {activityList.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-playful border-border"
            >
              <div className="flex items-start gap-4">
                <div className={`${a.color} p-3 rounded-2xl text-primary-foreground shrink-0`}>
                  <a.icon size={28} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{a.title}</h3>
                  <p className="text-muted-foreground mt-1">{a.desc}</p>
                  <span className="inline-block mt-2 text-xs font-bold bg-muted px-3 py-1 rounded-full text-muted-foreground">
                    {a.ageGroup}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
