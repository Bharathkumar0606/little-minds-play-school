import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { GraduationCap, Search, Filter, MoreHorizontal, Mail, Phone as PhoneIcon } from "lucide-react";

const AdmissionsPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setAdmissions(data || []);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="text-primary" /> Student Admissions
          </h1>
          <p className="text-slate-500 text-sm">Review and manage new student applications</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students or parents..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/30">
                <th className="px-6 py-4 font-bold">Student Name</th>
                <th className="px-6 py-4 font-bold">Age</th>
                <th className="px-6 py-4 font-bold">Parent Details</th>
                <th className="px-6 py-4 font-bold">Submission Date</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10 text-slate-400">Loading admissions...</td></tr>
              ) : admissions.length > 0 ? admissions.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700">{item.childName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.id.slice(0, 8)}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.age}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-700 text-sm">{item.parentName}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <a href={`tel:${item.phone}`} className="text-slate-400 hover:text-primary transition-colors">
                        <PhoneIcon size={14} />
                      </a>
                      <a href={`mailto:${item.email}`} className="text-slate-400 hover:text-primary transition-colors">
                        <Mail size={14} />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="text-center py-10 text-slate-400">No student applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;
