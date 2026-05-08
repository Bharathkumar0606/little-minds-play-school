import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, MapPin, Phone, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import SignInRequired from "@/components/SignInRequired";
import { supabase } from "@/lib/supabase";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

const Visit = () => {
  const { user, loading } = useAuth();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = date && time && name && phone && childAge;

  const handleSubmit = async () => {
    if (!canSubmit || !user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("visits").insert([
        {
          name,
          phone,
          childAge,
          date: date?.toISOString(),
          time,
          googleId: user.uid,
          googleEmail: user.email,
          googleName: user.displayName,
          googlePhoto: user.photoURL,
        },
      ]);

      if (error) throw error;
      
      console.log("✅ Visit scheduled in Supabase");
      setConfirmed(true);
    } catch (error: any) {
      console.error("❌ Error scheduling visit:", error);
      alert("Failed to schedule visit: " + (error.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Require sign-in
  if (!user) {
    return (
      <SignInRequired
        title="Sign In to Schedule a Visit 📅"
        description="Please sign in with your Google account to schedule a school visit. We'll send a confirmation to your email!"
      />
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen section-padding flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-playful border-border text-center max-w-md w-full p-8"
        >
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-accent" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Visit Confirmed! 🎉</h2>
          <div className="space-y-3 text-left bg-muted rounded-2xl p-4 mb-4">
            <p className="text-foreground"><strong>Name:</strong> {name}</p>
            <p className="text-foreground"><strong>Phone:</strong> {phone}</p>
            <p className="text-foreground"><strong>Child's Age:</strong> {childAge}</p>
            <p className="text-foreground"><strong>Date:</strong> {date && format(date, "PPP")}</p>
            <p className="text-foreground"><strong>Time:</strong> {time}</p>
          </div>
          <div className="bg-accent/10 rounded-2xl p-3 mb-6">
            <p className="text-sm text-accent-foreground font-semibold">
              📧 A confirmation email has been sent to <strong>{user.email}</strong>
            </p>
          </div>
          <div className="space-y-2 text-muted-foreground text-sm">
            <div className="flex items-center gap-2"><MapPin size={14} /> Subash Nagar, Nizamabad</div>
            <div className="flex items-center gap-2"><Phone size={14} /> 8639133127</div>
          </div>
          <button
            onClick={() => { setConfirmed(false); setDate(undefined); setTime(""); setName(""); setPhone(""); setChildAge(""); }}
            className="mt-6 btn-playful bg-primary text-primary-foreground"
          >
            Schedule Another Visit
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto max-w-2xl">
        <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-4">Schedule a Visit 📅</h1>
        <p className="text-center text-muted-foreground mb-4">
          Come see our school! Pick a date and time that works for you.
        </p>

        {/* Signed in badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2 bg-accent/10 text-accent-foreground rounded-full px-4 py-1.5 text-sm font-semibold">
            {user.photoURL && (
              <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
            )}
            Signed in as {user.displayName || user.email}
          </div>
        </div>

        <div className="card-playful border-border p-6 md:p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block font-heading font-bold text-foreground mb-2">Parent's Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-heading font-bold text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Child Age */}
          <div>
            <label className="block font-heading font-bold text-foreground mb-2">Child's Age</label>
            <select
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Select age</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years">5 years</option>
              <option value="6 years">6 years</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block font-heading font-bold text-foreground mb-2">Preferred Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-left flex items-center gap-2 transition-colors focus:border-primary",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon size={18} />
                  {date ? format(date, "PPP") : "Pick a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date() || d.getDay() === 0}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time */}
          <div>
            <label className="block font-heading font-bold text-foreground mb-2">
              <Clock size={16} className="inline mr-1" /> Preferred Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-xl py-2 text-sm font-bold transition-all ${
                    time === t
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-foreground hover:bg-primary/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full btn-playful bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm Visit ✅
          </button>
        </div>

        {/* Location info */}
        <div className="mt-8 card-playful border-border p-6">
          <h3 className="font-heading text-xl font-bold text-foreground mb-4">📍 Find Us</h3>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Subash Nagar, Nizamabad</div>
            <div className="flex items-center gap-2"><Phone size={16} className="text-primary" /> 8639133127</div>
          </div>
          <div className="mt-4 rounded-2xl overflow-hidden border-2 border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.5!2d78.09!3d18.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQwJzEyLjAiTiA3OMKwMDUnMjQuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Innovative Play School Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visit;
