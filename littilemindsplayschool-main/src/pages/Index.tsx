import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Puzzle, Palette, BookOpen, Heart, Brain, Calendar, Star, Users } from "lucide-react";
import heroImg from "@/assets/hero-children.jpg";

const features = [
  { icon: Brain, title: "Brain Games", desc: "Color, number & alphabet puzzles", color: "bg-sky", link: "/brain-games" },
  { icon: Palette, title: "Arts & Colors", desc: "Cartoon coloring & drawing", color: "bg-orange", link: "/arts" },
  { icon: BookOpen, title: "Story Time", desc: "Animated cartoon stories", color: "bg-pink", link: "/stories" },
  { icon: Heart, title: "Wellness", desc: "Yoga, meditation & breathing", color: "bg-green", link: "/wellness" },
  { icon: Puzzle, title: "Activities", desc: "Play-based learning games", color: "bg-primary", link: "/activities" },
  { icon: Calendar, title: "Visit Us", desc: "Schedule a school visit", color: "bg-secondary text-secondary-foreground", link: "/visit" },
];

const fees = [
  { age: "3-4 Years", name: "Tiny Tots", price: "₹25,000/year", features: ["Play-based learning", "Art & craft", "Story sessions"] },
  { age: "4-5 Years", name: "Little Stars", price: "₹30,000/year", features: ["Brain games", "Yoga & wellness", "Alphabet & numbers"] },
  { age: "5-6 Years", name: "Super Kids", price: "₹35,000/year", features: ["Advanced puzzles", "School readiness", "All activities"] },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 via-background to-primary/10">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block bg-secondary text-secondary-foreground rounded-full px-4 py-1 text-sm font-bold mb-4">
                🌟 Admissions Open for 2025-26
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6 text-foreground">
                Where <span className="text-primary">Learning</span> Meets{" "}
                <span className="text-orange">Play</span>! 🎨
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Nurturing creativity, logic, and confidence in children ages 3–6 through innovative play-based education at Subash Nagar, Nizamabad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admission" className="btn-playful bg-primary text-primary-foreground">
                  Apply Now 🚀
                </Link>
                <Link to="/visit" className="btn-playful bg-secondary text-secondary-foreground border-2 border-foreground/10">
                  Schedule Visit 📅
                </Link>
                <Link to="/auth" className="btn-playful bg-orange text-white shadow-lg shadow-orange/20">
                  Login / Join 🎨
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-secondary">
                <img src={heroImg} alt="Happy children learning through play" width={1920} height={1024} className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground rounded-2xl px-4 py-2 font-bold shadow-lg animate-bounce-slow">
                🧩 100+ Activities
              </div>
              <div className="absolute -top-4 -right-4 bg-orange text-orange-foreground rounded-2xl px-4 py-2 font-bold shadow-lg animate-float">
                🎯 Ages 3-6
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Offer ✨
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete learning experience that develops your child's brain, body, and creativity
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={f.link} className="card-playful flex items-start gap-4 border-border group">
                  <div className={`${f.color} p-3 rounded-2xl text-primary-foreground group-hover:scale-110 transition-transform`}>
                    <f.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{f.title}</h3>
                    <p className="text-muted-foreground">{f.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Fee Structure 💰
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {fees.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`card-playful border-border text-center ${i === 2 ? "border-primary ring-2 ring-primary/20" : ""}`}
              >
                <div className="text-sm font-bold text-muted-foreground mb-1">{f.age}</div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{f.name}</h3>
                <div className="text-3xl font-bold text-primary mb-4">{f.price}</div>
                <ul className="space-y-2 text-left">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-muted-foreground">
                      <Star size={14} className="text-secondary shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/admission" className="mt-6 block btn-playful bg-primary text-primary-foreground text-center text-sm py-3">
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-playful border-border flex flex-col md:flex-row items-center gap-8 p-8"
          >
            <div>
              <div className="text-sm font-bold text-primary mb-1">Founder & CEO</div>
              <h3 className="font-heading text-3xl font-bold text-foreground mb-3">Gangone Sreevalli</h3>
              <p className="text-muted-foreground leading-relaxed">
                With a passionate vision for transforming early childhood education, Gangone Sreevalli founded Innovative Play School 
                to create a nurturing environment where children learn through play, creativity, and exploration. 
                Her mission is to build strong foundations of logical thinking, confidence, and social skills in every child.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Users size={16} className="text-primary" />
                <span>Dedicated to shaping the future, one child at a time</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-sky text-primary-foreground section-padding text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Give Your Child the Best Start? 🌈</h2>
          <p className="opacity-90 text-lg mb-8">
            Visit us at Subash Nagar, Nizamabad or call us at 8639133127
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/visit" className="btn-playful bg-secondary text-secondary-foreground">
              Schedule Visit
            </Link>
            <a href="tel:8639133127" className="btn-playful border-2 border-primary-foreground/30 text-primary-foreground">
              📞 Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
