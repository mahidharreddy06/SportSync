import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Trophy, Calendar, MapPin, Users, ArrowLeft, Clock, Shield, Plus, Edit2, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function TournamentDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("standings");
  const [tournament, setTournament] = useState<any>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Match Scheduling State
  const [newMatch, setNewMatch] = useState({ team1Id: "", team2Id: "", date: "" });
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState({ score1: 0, score2: 0, status: "completed" });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setCurrentUser(JSON.parse(userStr));

    const fetchData = async () => {
      try {
        const tournRes = await axios.get(`http://localhost:5000/api/tournaments/${id}`);
        setTournament(tournRes.data);

        try {
          const teamsRes = await axios.get(`http://localhost:5000/api/teams/${id}`);
          setTeams(teamsRes.data);
        } catch (e) { console.error("Teams fetch error", e); }

        try {
          const matchesRes = await axios.get(`http://localhost:5000/api/matches?tournamentId=${id}`);
          setMatches(matchesRes.data);
        } catch (e) { console.error("Matches fetch error", e); }

      } catch (err: any) {
        console.error("Failed to fetch tournament data", err.response?.data || err.message);
        toast.error("Failed to load tournament details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleRegisterTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const members = (form.elements.namedItem("members") as HTMLInputElement).value;
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login first");
      const res = await axios.post("http://localhost:5000/api/teams", 
        { name, members, tournamentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Team Registered Successfully!");
      setTeams([...teams, res.data]);
      form.reset();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to register team");
    }
  };

  const handleScheduleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login first");
      const res = await axios.post("http://localhost:5000/api/matches", 
        { ...newMatch, tournamentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Match Scheduled!");
      // Refetch matches to get populated team names
      const matchesRes = await axios.get(`http://localhost:5000/api/matches?tournamentId=${id}`);
      setMatches(matchesRes.data);
      setNewMatch({ team1Id: "", team2Id: "", date: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to schedule match");
    }
  };

  const handleUpdateScore = async (matchId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login first");
      await axios.put(`http://localhost:5000/api/matches/${matchId}/score`, 
        matchScore,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Score Updated!");
      setEditingMatch(null);
      const matchesRes = await axios.get(`http://localhost:5000/api/matches?tournamentId=${id}`);
      setMatches(matchesRes.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update score");
    }
  };

  if (loading) return <div className="p-12 text-center text-white">Loading Arena...</div>;
  if (!tournament) return <div className="p-12 text-center text-white">Tournament Not Found</div>;

  const isOrganizer = currentUser?.id === tournament.organizer?._id || currentUser?.id === tournament.organizer;

  return (
    <div className="p-8 lg:p-12 space-y-10 bg-[#0E0E10] min-h-screen text-white">
      <Link href="/tournaments" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
        <ArrowLeft className="h-4 w-4" /> Back to Arena
      </Link>

      <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[3rem] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
          <Trophy className="h-64 w-64" />
        </div>
        
        <div className="relative z-10 space-y-8 text-center md:text-left">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[9px] font-black uppercase tracking-widest text-[#EF4444]">
              {tournament.sportType}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400">
              LEAGUE
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-[900] italic tracking-tighter uppercase leading-[0.85]">
            {tournament.name}
          </h1>

          <div className="flex flex-wrap gap-8 justify-center md:justify-start pt-8 border-t border-white/5">
            <MetaItem icon={Calendar} label="Period" value={`${new Date(tournament.startDate).toLocaleDateString()} - ${new Date(tournament.endDate).toLocaleDateString()}`} />
            <MetaItem icon={MapPin} label="Arena" value={tournament.location || "Virtual Arena"} />
            <MetaItem icon={Users} label="Roster" value={`${teams.length} teams enrolled`} />
          </div>
        </div>
      </div>

      <div className="flex gap-10 border-b border-[#2D2D30] overflow-x-auto pb-1">
        <TabButton active={activeTab === "standings"} onClick={() => setActiveTab("standings")} label="Standings" />
        <TabButton active={activeTab === "schedule"} onClick={() => setActiveTab("schedule")} label="Schedule" />
        <TabButton active={activeTab === "teams"} onClick={() => setActiveTab("teams")} label="Teams" />
      </div>

      <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[2.5rem] overflow-hidden">
        {activeTab === "standings" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
                  <th className="px-10 py-6">Rank</th>
                  <th className="px-10 py-6">Club</th>
                  <th className="px-10 py-6 text-center">P</th>
                  <th className="px-10 py-6 text-center">W</th>
                  <th className="px-10 py-6 text-center">D</th>
                  <th className="px-10 py-6 text-center">L</th>
                  <th className="px-10 py-6 text-center">GD</th>
                  <th className="px-10 py-6 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {teams.length === 0 ? (
                   <tr><td colSpan={8} className="text-center py-12 text-slate-500 font-bold uppercase tracking-widest">No Standings Yet</td></tr>
                ) : teams.map((team, idx) => (
                  <tr key={idx} className="hover:bg-[#EF4444]/5 transition-colors group">
                    <td className="px-10 py-8">
                      <span className={`text-xl font-black italic ${idx === 0 ? "text-[#EF4444]" : "text-slate-600"}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[#EF4444]">
                            {team.name[0]}
                          </div>
                          <span className="text-xl font-black italic uppercase tracking-tighter group-hover:text-[#EF4444] transition-colors">{team.name}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-center text-slate-400 font-bold">0</td>
                    <td className="px-10 py-8 text-center text-slate-400 font-bold">0</td>
                    <td className="px-10 py-8 text-center text-slate-400 font-bold">0</td>
                    <td className="px-10 py-8 text-center text-slate-400 font-bold">0</td>
                    <td className="px-10 py-8 text-center text-slate-400 font-bold">0</td>
                    <td className="px-10 py-8 text-right font-black italic text-4xl text-[#EF4444] tracking-tighter">0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === "schedule" && (
          <div className="p-10 space-y-10">
            {isOrganizer && (
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                <h3 className="text-xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-[#EF4444]" /> Arrange Match
                </h3>
                <form onSubmit={handleScheduleMatch} className="grid md:grid-cols-4 gap-4">
                  <select 
                    required 
                    value={newMatch.team1Id} 
                    onChange={(e) => setNewMatch({...newMatch, team1Id: e.target.value})}
                    className="bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white outline-none"
                  >
                    <option value="">Select Team 1</option>
                    {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                  </select>
                  <select 
                    required 
                    value={newMatch.team2Id} 
                    onChange={(e) => setNewMatch({...newMatch, team2Id: e.target.value})}
                    className="bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white outline-none"
                  >
                    <option value="">Select Team 2</option>
                    {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                  </select>
                  <input 
                    type="datetime-local" 
                    required 
                    value={newMatch.date} 
                    onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                    className="bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white outline-none"
                  />
                  <button type="submit" className="bg-[#EF4444] text-white rounded-xl font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:bg-red-600 transition-all">
                    Schedule
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {matches.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                    <Clock className="h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">Arena Pending</h3>
                  <p className="text-slate-500 font-bold">The match grid is still being calculated.</p>
                </div>
              ) : (
                matches.map((match: any) => (
                  <div key={match._id} className="bg-[#0E0E10] border border-[#2D2D30] rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex-1 text-right">
                      <span className="text-xl font-black italic uppercase">{match.team1Id?.name || 'TBA'}</span>
                    </div>
                    
                    <div className="px-8 text-center space-y-2">
                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{new Date(match.date).toLocaleString()}</div>
                      {editingMatch === match._id ? (
                        <div className="flex items-center gap-2 justify-center">
                           <input type="number" className="w-12 bg-white/10 text-center rounded p-1" value={matchScore.score1} onChange={e => setMatchScore({...matchScore, score1: +e.target.value})} />
                           <span>-</span>
                           <input type="number" className="w-12 bg-white/10 text-center rounded p-1" value={matchScore.score2} onChange={e => setMatchScore({...matchScore, score2: +e.target.value})} />
                           <select className="text-xs bg-white/10 rounded p-1" value={matchScore.status} onChange={e => setMatchScore({...matchScore, status: e.target.value})}>
                              <option value="scheduled">Scheduled</option>
                              <option value="ongoing">Ongoing</option>
                              <option value="completed">Completed</option>
                           </select>
                           <button onClick={() => handleUpdateScore(match._id)} className="text-emerald-400 hover:text-emerald-300 ml-2"><Save className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <div className="text-3xl font-[900] text-[#EF4444] tracking-tighter">
                          {match.score1} - {match.score2}
                          {isOrganizer && (
                            <button onClick={() => { setEditingMatch(match._id); setMatchScore({ score1: match.score1, score2: match.score2, status: match.status }); }} className="ml-4 text-slate-500 hover:text-white inline-block align-middle">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                      <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">{match.status}</div>
                    </div>

                    <div className="flex-1 text-left">
                      <span className="text-xl font-black italic uppercase">{match.team2Id?.name || 'TBA'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="p-10 space-y-10">
            {teams.length === 0 ? (
               <div className="py-20 text-center text-slate-500 font-bold uppercase tracking-widest">No Teams Enrolled Yet</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {teams.map((team, idx) => (
                  <div key={idx} className="group bg-white/5 border border-white/5 p-10 rounded-[2.5rem] hover:bg-[#EF4444]/10 hover:border-[#EF4444]/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#EF4444] to-red-800 flex items-center justify-center text-4xl font-black shadow-2xl shadow-red-900/40">
                        {team.name[0]}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-white transition-colors">{team.name}</h4>
                        <p className="text-[10px] text-[#EF4444] font-black uppercase tracking-[0.3em]">Qualified Squad</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h3 className="text-xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#EF4444]" /> Enlist New Team
              </h3>
              <form onSubmit={handleRegisterTeam} className="space-y-4">
                <div>
                  <input type="text" name="name" placeholder="Team Name" required className="w-full bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white focus:outline-none focus:border-[#EF4444]" />
                </div>
                <div>
                  <input type="text" name="members" placeholder="Team Members (Comma separated)" required className="w-full bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white focus:outline-none focus:border-[#EF4444]" />
                </div>
                <button type="submit" className="bg-[#EF4444] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all hover:bg-red-600">
                  Register Team
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/5 p-2 rounded-lg">
        <Icon className="h-4 w-4 text-[#EF4444]" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</p>
        <p className="text-sm font-bold text-slate-300">{value}</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
        active ? "text-[#EF4444]" : "text-slate-600 hover:text-slate-400"
      }`}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
      )}
    </button>
  );
}
