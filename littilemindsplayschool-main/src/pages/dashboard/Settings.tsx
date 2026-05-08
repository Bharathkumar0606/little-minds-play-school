import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Settings as SettingsIcon, User, Bell, Shield, Smartphone, Save } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <SettingsIcon className="text-primary" /> Settings
        </h1>
        <p className="text-slate-500 text-sm">Manage your profile and application preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User size={20} className="text-primary" /> Profile Information
            </h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.displayName || ""}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">School Name</label>
                <input 
                  type="text" 
                  defaultValue="Innovative Play School"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Bell size={20} className="text-primary" /> Notification Settings
            </h3>
            <div className="space-y-4">
              {[
                { title: "Email Notifications", desc: "Receive email for new admissions", default: true },
                { title: "Visit Alerts", desc: "Get notified when a visit is scheduled", default: true },
                { title: "Weekly Reports", desc: "Summary of school activities", default: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${item.default ? 'bg-primary' : 'bg-slate-200'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.default ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <Shield size={32} className="text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Security Center</h3>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">Your data is encrypted and protected using Supabase enterprise-grade security protocols.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs transition-all">
              Change Password
            </button>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : <><Save size={18} /> Save All Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
