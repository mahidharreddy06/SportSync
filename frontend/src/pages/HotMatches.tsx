import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Flame, Trophy, Calendar } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function HotMatches() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/matches`);
        setMatches(res.data);
      } catch (err) {
        console.error("Failed to fetch hot matches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="p-8 lg:p-12 space-y-10 bg-[#0E0E10] min-h-screen text-white">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-[#EF4444] text-[10px] font-black uppercase tracking-[0.3em]">
          <Flame className="h-4 w-4" /> Trending
        </div>
        <h1 className="text-6xl md:text-8xl font-[900] italic tracking-tighter uppercase leading-[0.85]">
          Hot <span className="text-slate-800">Matches</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm">Most anticipated upcoming and live clashes.</p>
      </header>

      {loading ? (
        <div className="py-32 text-center text-slate-500 font-bold animate-pulse">Loading Grid...</div>
      ) : matches.length === 0 ? (
        <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[3rem] p-12 text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/5">
             <Trophy className="h-8 w-8 text-slate-800" />
          </div>
          <h4 className="text-2xl font-black italic uppercase tracking-tighter">No Active Matches</h4>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">There are no hot matches available right now.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {matches.map((match: any, i: number) => (
            <div key={match._id || i} className="group bg-[#1C1C1E] border border-[#2D2D30] p-8 rounded-[2.5rem] hover:border-[#EF4444]/30 transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex justify-between items-center mb-8">
                <span className="px-3 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[9px] font-black uppercase tracking-widest text-[#EF4444]">
                  {match.status || 'Live'}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {new Date(match.date).toLocaleDateString() || 'Today'}
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1 text-center">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-[#EF4444] transition-colors">
                    {match.team1Id?.name || 'Team A'}
                  </h3>
                  <div className="text-4xl font-[900] mt-2">{match.score1 || 0}</div>
                </div>

                <div className="px-6 text-slate-600 font-black italic text-xl">VS</div>

                <div className="flex-1 text-center">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
                    {match.team2Id?.name || 'Team B'}
                  </h3>
                  <div className="text-4xl font-[900] mt-2">{match.score2 || 0}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
