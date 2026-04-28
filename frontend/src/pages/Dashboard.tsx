import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Trophy, Activity, Users, CalendarClock, Plus, Settings, BarChart3, Star, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!savedUser) {
      setLocation("/login");
    } else {
      setUser(savedUser);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="p-8 lg:p-12 space-y-12 bg-[#0E0E10] min-h-screen text-white">
      {/* DASHBOARD HEADER */}
      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#EF4444] text-[10px] font-black uppercase tracking-[0.3em]">
            <Activity className="h-4 w-4" /> Personal Console
          </div>
          <h1 className="text-6xl md:text-8xl font-[900] italic tracking-tighter uppercase leading-[0.85]">
            Control <span className="text-slate-800">Panel</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm">Active Session: <span className="text-white">{user.name}</span> • {user.role.toUpperCase()}</p>
        </div>
        <Link href="/tournaments/new" className="bg-[#EF4444] hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all flex items-center gap-2">
          <Plus className="h-4 w-4" /> Launch Tournament
        </Link>
      </header>

      {/* DASHBOARD STATS - DRIBBBLE STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Trophy} label="Tournaments" value="1" color="text-[#EF4444]" />
        <StatCard icon={Users} label="Total Teams" value="4" color="text-blue-500" />
        <StatCard icon={CalendarClock} label="Upcoming" value="2" color="text-yellow-500" />
        <StatCard icon={TrendingUp} label="Efficiency" value="98%" color="text-emerald-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* MAIN TOURNAMENT LIST */}
        <div className="lg:col-span-2 space-y-8">
           <h3 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
              <Star className="h-5 w-5 text-[#EF4444]" /> My Authorized Events
           </h3>
           <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[3rem] p-12 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#EF4444]/5" />
              <div className="relative z-10 space-y-4">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/5">
                    <Trophy className="h-8 w-8 text-slate-800" />
                 </div>
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter">No Events Hosted</h4>
                 <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">You haven't initialized any tournaments in the federation yet.</p>
                 <button 
                  onClick={() => setLocation("/tournaments/new")}
                  className="mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                 >
                    Initialize First Event
                 </button>
              </div>
           </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="space-y-12">
           <section className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-600">Recent Logs</h3>
              <div className="space-y-4">
                 <LogEntry label="Server connection stable" time="Just now" color="bg-emerald-500" />
                 <LogEntry label="Account verified" time="2 hours ago" color="bg-[#EF4444]" />
                 <LogEntry label="System initialized" time="3 hours ago" color="bg-blue-500" />
              </div>
           </section>

           <section className="bg-gradient-to-br from-[#EF4444]/20 to-red-900/20 border border-[#EF4444]/20 rounded-[2.5rem] p-10 space-y-6">
              <h3 className="text-xl font-black italic tracking-tighter uppercase">Pro Federation</h3>
              <p className="text-xs text-slate-400 font-bold leading-relaxed">Upgrade to the Platinum Tier to unlock automated match scheduling and real-time live-streaming API integrations.</p>
              <button className="w-full bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105">
                 Upgrade Now
              </button>
           </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-[#1C1C1E] border border-[#2D2D30] p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-[#EF4444]/30 transition-all">
      <div className={`absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity ${color.replace('text-', 'bg-')}`} />
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
          <Icon className={`h-4 w-4 ${color}`} /> {label}
        </div>
        <div className="text-6xl font-[900] italic tracking-tighter group-hover:scale-105 transition-transform origin-left">{value}</div>
      </div>
    </div>
  );
}

function LogEntry({ label, time, color }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={`w-2 h-2 rounded-full ${color} group-hover:animate-ping`} />
      <div>
        <p className="text-xs font-black uppercase italic tracking-tight group-hover:text-white transition-colors">{label}</p>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{time}</p>
      </div>
    </div>
  );
}
