import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar as CalendarIcon, Clock, User, Phone, MapPin } from "lucide-react";

const SchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      const { data, error } = await supabase
        .from('visits')
        .select('*')
        .order('date', { ascending: true });
      
      if (!error) setSchedules(data || []);
      setLoading(false);
    };
    fetchSchedules();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <CalendarIcon className="text-primary" /> Visit Schedules
        </h1>
        <p className="text-slate-500 text-sm">Manage and track upcoming school tours</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h3 className="font-bold text-slate-800">Upcoming Visits</h3>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-center py-10 text-slate-400">Loading schedule...</div>
          ) : schedules.length > 0 ? (
            <div className="space-y-4">
              {schedules.map((visit: any) => (
                <div key={visit.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-sm shrink-0">
                    <span className="text-[10px] font-bold text-primary uppercase">
                      {new Date(visit.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-2xl font-black text-slate-800">
                      {new Date(visit.date).getDate()}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      {visit.name} <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Child Age: {visit.childAge}</span>
                    </h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock size={14} className="text-primary" /> {visit.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Phone size={14} className="text-primary" /> {visit.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all">
                      Confirm
                    </button>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400">No visits scheduled yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;
