import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from "lucide-react";

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setEnquiries(data || []);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <MessageSquare className="text-primary" /> Visit Enquiries
        </h1>
        <p className="text-slate-500 text-sm">Follow up with parents who want to visit the school</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-400">Loading enquiries...</div>
        ) : enquiries.length > 0 ? enquiries.map((item: any) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Parent</p>
                </div>
              </div>
              <button className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                <CheckCircle size={20} />
              </button>
            </div>

            <div className="space-y-3 py-4 border-y border-slate-50 my-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarIcon size={16} className="text-slate-400" />
                <span>{new Date(item.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock size={16} className="text-slate-400" />
                <span>{item.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                  Child: {item.childAge}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <a 
                href={`tel:${item.phone}`}
                className="flex-1 py-2 text-center text-xs font-bold bg-slate-50 text-slate-600 rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                Call Now
              </a>
              <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">
                <XCircle size={16} />
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
            No enquiries yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiriesPage;
