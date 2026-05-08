import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Puzzle, LogIn, UserPlus, Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        // Fallback for other providers if needed
        const { error } = await supabase.auth.signInWithOAuth({ provider });
        if (error) throw error;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      toast.success("Welcome back! 🎉");
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
          }
        }
      });
      if (error) throw error;
      
      toast.success("Account created! Redirecting...");
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E1F5EE] to-[#EAF3DE] p-4 font-body">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                <Puzzle size={40} className="text-white" />
            </div>
            <h1 className="font-heading text-3xl font-bold mb-2">Innovative Play School</h1>
            <p className="text-sm opacity-90">Where learning becomes an adventure</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
            <button 
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === "login" ? "text-[#1D9E75]" : "text-gray-400 hover:text-gray-600"}`}
            >
                <div className="flex items-center justify-center gap-2">
                    <LogIn size={18} /> Sign In
                </div>
                {activeTab === "login" && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#1D9E75] rounded-t-full" />
                )}
            </button>
            <button 
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === "signup" ? "text-[#1D9E75]" : "text-gray-400 hover:text-gray-600"}`}
            >
                <div className="flex items-center justify-center gap-2">
                    <UserPlus size={18} /> Sign Up
                </div>
                {activeTab === "signup" && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#1D9E75] rounded-t-full" />
                )}
            </button>
        </div>

        <div className="p-8">
            <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                    <motion.form 
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleLogin}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="hello@playschool.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D9E75]"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold">
                            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                                <input type="checkbox" className="rounded text-[#1D9E75] focus:ring-[#1D9E75]" />
                                Remember me
                            </label>
                            <a href="#" className="text-[#1D9E75] hover:underline">Forgot password?</a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#1D9E75] to-[#0F6E56] text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                        <div className="relative my-6 text-center">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                            <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all font-bold text-sm"
                            >
                                <Chrome size={18} className="text-red-500" /> Google
                            </button>
                            <button 
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all font-bold text-sm"
                            >
                                <Github size={18} /> Github
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.form 
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleSignup}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 block">First Name</label>
                                <input 
                                    type="text" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 block">Last Name</label>
                                <input 
                                    type="text" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hello@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Phone Number</label>
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 98765 43210"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 8 characters"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Confirm Password</label>
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1D9E75] focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#1D9E75] to-[#0F6E56] text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="mt-8 text-center">
                <button 
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#1D9E75] transition-all"
                >
                    <ArrowLeft size={14} /> Back to Home
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
