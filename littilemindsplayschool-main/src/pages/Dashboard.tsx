import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  TrendingUp, 
  MoreVertical,
  Clock,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-semibold">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    admissions: 0,
    visits: 0,
    newToday: 0,
    pending: 0
  });
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [userVisits, setUserVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple isAdmin check - you can expand this later
  const isAdmin = 
    user?.email === 'sreevalli@innovativeplayschool.com' || 
    user?.email === 'admin@innovativeplayschool.com' ||
    user?.email === 'bharathgatla14@gmail.com'; // Added for user from screenshot

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    } else {
      fetchUserData();
    }
  }, [isAdmin, user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const { count: admissionCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
      const { count: visitCount } = await supabase.from('visits').select('*', { count: 'exact', head: true });
      
      const { data: recent } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        admissions: admissionCount || 0,
        visits: visitCount || 0,
        newToday: 2,
        pending: 5
      });
      setRecentAdmissions(recent || []);
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      // Fetch only applications belonging to this user
      const { data: apps } = await supabase
        .from('students')
        .select('*')
        .eq('googleId', user.uid)
        .order('created_at', { ascending: false });

      const { data: visits } = await supabase
        .from('visits')
        .select('*')
        .eq('googleId', user.uid)
        .order('created_at', { ascending: false });

      setUserApplications(apps || []);
      setUserVisits(visits || []);
    } catch (error) {
      console.error("User data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Admin View
  if (isAdmin) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">School Overview</h1>
            <p className="text-slate-500 text-sm">Real-time management for Innovative Play School</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Export Report
            </button>
            <Link to="/admission" className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all">
              Add Student
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Admissions" 
            value={stats.admissions} 
            icon={GraduationCap} 
            color="bg-blue-500" 
            trend="+12%"
          />
          <StatCard 
            title="Visit Enquiries" 
            value={stats.visits} 
            icon={Calendar} 
            color="bg-purple-500" 
            trend="+5%"
          />
          <StatCard 
            title="New Today" 
            value={stats.newToday} 
            icon={Clock} 
            color="bg-emerald-500" 
          />
          <StatCard 
            title="Total Parents" 
            value={stats.admissions + stats.visits} 
            icon={Users} 
            color="bg-orange-500" 
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Admissions</h3>
              <Link to="/dashboard/admissions" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">Child Name</th>
                    <th className="px-6 py-4 font-bold">Parent</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentAdmissions.length > 0 ? recentAdmissions.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {item.childName.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-700">{item.childName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{item.parentName}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-slate-400">No admissions yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-2">School Capacity</h3>
              <p className="text-indigo-100 text-sm mb-6">You have reached 85% of your current student capacity.</p>
              <div className="w-full bg-white/20 h-2 rounded-full mb-4">
                <div className="bg-white w-[85%] h-full rounded-full"></div>
              </div>
              <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                Manage Batches
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User (Parent) View
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's the status of your applications.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/visit" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Schedule Visit
          </Link>
          <Link to="/admission" className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2">
            <PlusCircle size={18} /> Apply for Admission
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Applications Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} /> My Applications
              </h3>
            </div>
            <div className="p-0">
              {userApplications.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {userApplications.map((app: any) => (
                    <div key={app.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          {app.childName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{app.childName}</h4>
                          <p className="text-xs text-slate-400">Submitted on {new Date(app.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                          Under Review
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="text-slate-300" size={32} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">No applications found</h4>
                  <p className="text-slate-500 text-sm mb-6">You haven't submitted any admission forms yet.</p>
                  <Link to="/admission" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all">
                    Start Application
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Visits Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="text-purple-500" size={20} /> My Scheduled Visits
              </h3>
            </div>
            <div className="p-0">
              {userVisits.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {userVisits.map((visit: any) => (
                    <div key={visit.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{new Date(visit.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
                          <p className="text-xs text-slate-400">At {visit.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span className="text-emerald-600 text-xs font-bold uppercase">Confirmed</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <p className="text-sm">No visits scheduled.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="text-amber-500" size={20} /> Next Steps
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">1</div>
                <p className="text-sm text-slate-600 mt-1">Submit the admission form for your child.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">2</div>
                <p className="text-sm text-slate-600 mt-1">Wait for our staff to review and contact you.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">3</div>
                <p className="text-sm text-slate-600 mt-1">Schedule a physical visit to the campus.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-50">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "We are excited to have you join our Innovative Play School family!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
