import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Trophy, Calendar, Users, ArrowRight, Activity, Flame } from "lucide-react";
import { Link } from "wouter";

export default function Tournaments() {
  const { data: tournaments, isLoading } = useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/tournaments");
      return res.data;
    }
  });

  return (
    <div className="p-8 lg:p-12 space-y-12 bg-[#0E0E10] min-h-screen text-white">
      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#EF4444] text-[10px] font-black uppercase tracking-[0.3em]">
            <Flame className="h-4 w-4" /> Global Arena
          </div>
          <h1 className="text-6xl md:text-8xl font-[900] italic tracking-tighter uppercase leading-[0.85]">
            Active <span className="text-slate-800">Leagues</span>
          </h1>
        </div>
        <Link href="/tournaments/new" className="bg-[#EF4444] hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all flex items-center gap-2">
          Create Tournament
        </Link>
      </header>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[450px] bg-[#1C1C1E] rounded-[3rem] animate-pulse border border-[#2D2D30]" />
          ))}
        </div>
      ) : tournaments?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((t: any) => (
            <TournamentCard key={t._id} tournament={t} />
          ))}
        </div>
      ) : (
        <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[3rem] p-24 text-center space-y-8 relative overflow-hidden">
           <div className="absolute inset-0 bg-[#EF4444]/5 opacity-50" />
           <div className="relative z-10 space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
                <Activity className="h-10 w-10 text-slate-700" />
              </div>
              <h3 className="text-4xl font-black italic uppercase tracking-tighter">The Arena is Empty</h3>
              <p className="text-slate-500 font-bold max-w-sm mx-auto uppercase text-xs tracking-widest">No leagues have been authorized by the federation yet.</p>
           </div>
        </div>
      )}
    </div>
  );
}

function TournamentCard({ tournament }: { tournament: any }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-[#EF4444] rounded-[3rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
      <div className="relative bg-[#1C1C1E] border border-[#2D2D30] rounded-[3rem] overflow-hidden transition-all group-hover:translate-y-[-10px]">
        <div className="p-10 space-y-10">
          <div className="flex justify-between items-start">
             <div className="w-16 h-16 bg-[#EF4444]/10 rounded-2xl flex items-center justify-center text-3xl font-black text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all">
                {tournament.sportType[0]}
             </div>
             <div className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 border border-white/5">
                {tournament.type || 'League'}
             </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-[900] italic uppercase tracking-tighter leading-none group-hover:text-[#EF4444] transition-colors">{tournament.name}</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 italic">{tournament.sportType} Championship</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/5">
             <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-700 mb-1">Status</p>
                <p className="text-xs font-black text-blue-500 uppercase italic tracking-tight">{tournament.status}</p>
             </div>
             <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-700 mb-1">Roster</p>
                <p className="text-xs font-black text-white uppercase italic tracking-tight">{tournament.teamsCount || 0} Teams</p>
             </div>
          </div>

          <Link href={`/tournaments/${tournament._id}`} className="block">
            <button className="w-full bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white border border-[#EF4444]/20 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
              Enter Arena <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
