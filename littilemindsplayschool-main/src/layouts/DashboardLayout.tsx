import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  GraduationCap,
  MessageSquare,
  PlusCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = 
    user?.email === 'sreevalli@innovativeplayschool.com' || 
    user?.email === 'admin@innovativeplayschool.com' ||
    user?.email === 'bharathgatla14@gmail.com'; // Added for user from screenshot

  const adminMenuItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Admissions", icon: GraduationCap, path: "/dashboard/admissions" },
    { label: "Enquiries", icon: MessageSquare, path: "/dashboard/enquiries" },
    { label: "Schedules", icon: Calendar, path: "/dashboard/schedules" },
    { label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const userMenuItems = [
    { label: "My Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "New Admission", icon: PlusCircle, path: "/admission" },
    { label: "Schedule Visit", icon: Calendar, path: "/visit" },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col hidden md:flex`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
          {isSidebarOpen && <span className="font-bold text-slate-800 truncate">{isAdmin ? "Admin Panel" : "Parent Panel"}</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-semibold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-slate-800">Welcome, {user?.displayName} 👋</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <img 
                src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.displayName} 
                className="w-9 h-9 rounded-full border border-slate-200" 
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
