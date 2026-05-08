import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Activities", path: "/activities" },
  { label: "Brain Games", path: "/brain-games" },
  { label: "Arts & Colors", path: "/arts" },
  { label: "Stories", path: "/stories" },
  { label: "Wellness", path: "/wellness" },
  { label: "Admission", path: "/admission" },
  { label: "Visit Us", path: "/visit" },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Desktop & Mobile Main Header */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <img src={logo} alt="Innovative Play School" className="h-10 w-10 md:h-12 md:w-12 rounded-full transition-transform group-hover:rotate-12" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-bounce-slow" />
          </div>
          <span className="font-heading text-lg md:text-xl font-bold text-primary tracking-tight">
            Innovative Play School
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-200 shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "text-slate-600 hover:text-primary hover:bg-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User / Login Actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full border-2 border-primary/20 hover:border-primary/50 transition-all p-0.5"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-300">
                  <div className="p-5 bg-slate-50 border-b border-slate-100">
                    <p className="font-bold text-slate-800 text-sm truncate">{user.displayName || "User"}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <Link to="/dashboard" className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <User size={18} /> My Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setDropdownOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              <LogIn size={18} />
              <span className="hidden sm:inline">Join Us</span>
            </Link>
          )}

          {/* Mobile Menu Toggle (keep for smaller items if needed) */}
          <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Nav for Mobile (One Tap Access) */}
      <div className="lg:hidden bg-white border-t border-slate-50 overflow-x-auto scrollbar-hide py-2 px-4 no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                location.pathname === item.path
                  ? "bg-primary text-white shadow-sm shadow-primary/20"
                  : "text-slate-500 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar (Optional fallback) */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setOpen(false)}>
           <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-2xl p-6 animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-slate-800">Menu</span>
                <button onClick={() => setOpen(false)}><X size={24} /></button>
              </div>
              <div className="space-y-2">
                {navItems.map(item => (
                   <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-sm font-bold ${location.pathname === item.path ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-50"}`}
                   >
                     {item.label}
                   </Link>
                ))}
              </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
