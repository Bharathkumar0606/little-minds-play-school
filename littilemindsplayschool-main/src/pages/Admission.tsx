import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, GraduationCap, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SignInRequired from "@/components/SignInRequired";
import { supabase } from "@/lib/supabase";

const Admission = () => {
  const { user, loading } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    childName: "",
    age: "",
    parentName: "",
    phone: "",
    email: "",
    address: "",
  });

  const canSubmit = form.childName && form.age && form.parentName && form.phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("students").insert([
        {
          ...form,
          googleId: user.uid,
          googleEmail: user.email,
          googleName: user.displayName,
          googlePhoto: user.photoURL,
        },
      ]);

      if (error) throw error;
      
      console.log("✅ Student saved to Supabase");
      setSubmitted(true);
    } catch (error: any) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to submit: " + (error.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <SignInRequired
        title="Sign In to Apply 🎓"
        description="Please sign in with your Google account to submit an admission application. We'll send a confirmation to your email!"
      />
    );
  }

  if (submitted) {
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
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Application Submitted! 🎉</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for applying to Innovative Play School! We will contact you at <strong>{form.phone}</strong> within 2 business days.
          </p>
          <div className="bg-gradient-to-br from-primary/5 to-sky/5 rounded-2xl p-4 text-left space-y-2 mb-4">
            <p className="text-foreground"><strong>Child:</strong> {form.childName} ({form.age})</p>
            <p className="text-foreground"><strong>Parent:</strong> {form.parentName}</p>
            <p className="text-foreground"><strong>Phone:</strong> {form.phone}</p>
          </div>
          <div className="bg-accent/10 rounded-2xl p-3 mb-6">
            <p className="text-sm text-accent-foreground font-semibold">
              📧 A confirmation email has been sent to <strong>{user.email}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <Phone size={14} /> For queries, call 8639133127
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding bg-[#FFFBF0]">
      <div className="container mx-auto max-w-2xl">
        <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-2 flex items-center justify-center gap-2">
          Admission 🎓
        </h1>
        <p className="text-center text-muted-foreground mb-8 text-lg">
          Join Innovative Play School — Where Learning Meets Play!
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

        <div className="space-y-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="card-playful border-border p-6 md:p-10 space-y-6 bg-white shadow-xl">
            <h2 className="font-heading text-2xl font-bold text-foreground">Admission Form</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-heading font-bold text-foreground mb-2">Child's Name *</label>
                <input
                  type="text"
                  value={form.childName}
                  onChange={(e) => setForm({ ...form, childName: e.target.value })}
                  placeholder="Enter child's name"
                  className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-foreground mb-2">Child's Age *</label>
                <select
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select age</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5 years</option>
                  <option value="6 years">6 years</option>
                </select>
              </div>

              <div>
                <label className="block font-heading font-bold text-foreground mb-2">Parent/Guardian Name *</label>
                <input
                  type="text"
                  value={form.parentName}
                  onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                  placeholder="Enter parent's name"
                  className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-foreground mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-foreground mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email"
                  className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-foreground mb-2">Address (Optional)</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter address"
                  rows={3}
                  className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none resize-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full btn-playful bg-[#D1B5FF] text-white hover:bg-[#C2A1FF] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 shadow-none border-none"
            >
              {isSubmitting ? "Submitting..." : "Submit Application 🖋️"}
            </button>
          </form>

          {/* Info sections below the form */}
          <div className="grid gap-6">
            <div className="card-playful border-border p-6 bg-white shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={22} className="text-primary" />
                <h3 className="font-heading text-xl font-bold text-foreground">Fee Structure</h3>
              </div>
              <div className="space-y-3">
                {[
                  { age: "3-4 yrs", fee: "₹25,000/yr" },
                  { age: "4-5 yrs", fee: "₹30,000/yr" },
                  { age: "5-6 yrs", fee: "₹35,000/yr" },
                ].map((f) => (
                  <div key={f.age} className="flex justify-between items-center bg-[#F9F7F0] rounded-xl px-4 py-3">
                    <span className="font-bold text-foreground">{f.age}</span>
                    <span className="font-bold text-primary">{f.fee}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-playful border-border p-6 bg-white shadow-md">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                Why Choose Us? <Star size={20} className="text-secondary fill-secondary" />
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {["Play-based learning", "Small class sizes", "Trained educators", "Safe environment", "Brain development focus"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;
