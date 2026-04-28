import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Trophy, Calendar, MapPin, Users, ArrowLeft, Clock, Plus, Edit2, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "../config";
export default function TournamentDetail() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("standings");
    const [tournament, setTournament] = useState(null);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    // Match Scheduling State
    const [newMatch, setNewMatch] = useState({ team1Id: "", team2Id: "", date: "" });
    const [editingMatch, setEditingMatch] = useState(null);
    const [matchScore, setMatchScore] = useState({ score1: 0, score2: 0, status: "completed" });
    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr)
            setCurrentUser(JSON.parse(userStr));
        const fetchData = async () => {
            try {
                const tournRes = await axios.get(`${API_BASE_URL}/api/tournaments/${id}`);
                setTournament(tournRes.data);
                try {
                    const teamsRes = await axios.get(`${API_BASE_URL}/api/teams/${id}`);
                    setTeams(teamsRes.data);
                }
                catch (e) {
                    console.error("Teams fetch error", e);
                }
                try {
                    const matchesRes = await axios.get(`${API_BASE_URL}/api/matches?tournamentId=${id}`);
                    setMatches(matchesRes.data);
                }
                catch (e) {
                    console.error("Matches fetch error", e);
                }
            }
            catch (err) {
                console.error("Failed to fetch tournament data", err.response?.data || err.message);
                toast.error("Failed to load tournament details");
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);
    const handleRegisterTeam = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.elements.namedItem("name").value;
        const members = form.elements.namedItem("members").value;
        try {
            const token = localStorage.getItem("token");
            if (!token)
                return toast.error("Please login first");
            const res = await axios.post(`${API_BASE_URL}/api/teams`, { name, members, tournamentId: id }, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Team Registered Successfully!");
            setTeams([...teams, res.data]);
            form.reset();
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Failed to register team");
        }
    };
    const handleScheduleMatch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token)
                return toast.error("Please login first");
            const res = await axios.post(`${API_BASE_URL}/api/matches`, { ...newMatch, tournamentId: id }, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Match Scheduled!");
            // Refetch matches to get populated team names
            const matchesRes = await axios.get(`${API_BASE_URL}/api/matches?tournamentId=${id}`);
            setMatches(matchesRes.data);
            setNewMatch({ team1Id: "", team2Id: "", date: "" });
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Failed to schedule match");
        }
    };
    const handleUpdateScore = async (matchId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token)
                return toast.error("Please login first");
            await axios.put(`${API_BASE_URL}/api/matches/${matchId}/score`, matchScore, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Score Updated!");
            setEditingMatch(null);
            const matchesRes = await axios.get(`${API_BASE_URL}/api/matches?tournamentId=${id}`);
            setMatches(matchesRes.data);
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Failed to update score");
        }
    };
    if (loading)
        return _jsx("div", { className: "p-12 text-center text-white", children: "Loading Arena..." });
    if (!tournament)
        return _jsx("div", { className: "p-12 text-center text-white", children: "Tournament Not Found" });
    const isOrganizer = currentUser?.id === tournament.organizer?._id || currentUser?.id === tournament.organizer;
    return (_jsxs("div", { className: "p-8 lg:p-12 space-y-10 bg-[#0E0E10] min-h-screen text-white", children: [_jsxs(Link, { href: "/tournaments", className: "inline-flex items-center gap-2 text-slate-500 hover:text-white mb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Back to Arena"] }), _jsxs("div", { className: "bg-[#1C1C1E] border border-[#2D2D30] rounded-[3rem] p-12 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 p-12 opacity-[0.03]", children: _jsx(Trophy, { className: "h-64 w-64" }) }), _jsxs("div", { className: "relative z-10 space-y-8 text-center md:text-left", children: [_jsxs("div", { className: "flex flex-wrap gap-2 justify-center md:justify-start", children: [_jsx("span", { className: "px-3 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[9px] font-black uppercase tracking-widest text-[#EF4444]", children: tournament.sportType }), _jsx("span", { className: "px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400", children: "LEAGUE" })] }), _jsx("h1", { className: "text-6xl md:text-8xl font-[900] italic tracking-tighter uppercase leading-[0.85]", children: tournament.name }), _jsxs("div", { className: "flex flex-wrap gap-8 justify-center md:justify-start pt-8 border-t border-white/5", children: [_jsx(MetaItem, { icon: Calendar, label: "Period", value: `${new Date(tournament.startDate).toLocaleDateString()} - ${new Date(tournament.endDate).toLocaleDateString()}` }), _jsx(MetaItem, { icon: MapPin, label: "Arena", value: tournament.location || "Virtual Arena" }), _jsx(MetaItem, { icon: Users, label: "Roster", value: `${teams.length} teams enrolled` })] })] })] }), _jsxs("div", { className: "flex gap-10 border-b border-[#2D2D30] overflow-x-auto pb-1", children: [_jsx(TabButton, { active: activeTab === "standings", onClick: () => setActiveTab("standings"), label: "Standings" }), _jsx(TabButton, { active: activeTab === "schedule", onClick: () => setActiveTab("schedule"), label: "Schedule" }), _jsx(TabButton, { active: activeTab === "teams", onClick: () => setActiveTab("teams"), label: "Teams" })] }), _jsxs("div", { className: "bg-[#1C1C1E] border border-[#2D2D30] rounded-[2.5rem] overflow-hidden", children: [activeTab === "standings" && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-white/[0.02] border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500", children: [_jsx("th", { className: "px-10 py-6", children: "Rank" }), _jsx("th", { className: "px-10 py-6", children: "Club" }), _jsx("th", { className: "px-10 py-6 text-center", children: "P" }), _jsx("th", { className: "px-10 py-6 text-center", children: "W" }), _jsx("th", { className: "px-10 py-6 text-center", children: "D" }), _jsx("th", { className: "px-10 py-6 text-center", children: "L" }), _jsx("th", { className: "px-10 py-6 text-center", children: "GD" }), _jsx("th", { className: "px-10 py-6 text-right", children: "Points" })] }) }), _jsx("tbody", { className: "divide-y divide-white/5", children: teams.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-12 text-slate-500 font-bold uppercase tracking-widest", children: "No Standings Yet" }) })) : teams.map((team, idx) => (_jsxs("tr", { className: "hover:bg-[#EF4444]/5 transition-colors group", children: [_jsx("td", { className: "px-10 py-8", children: _jsx("span", { className: `text-xl font-black italic ${idx === 0 ? "text-[#EF4444]" : "text-slate-600"}`, children: String(idx + 1).padStart(2, '0') }) }), _jsx("td", { className: "px-10 py-8", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[#EF4444]", children: team.name[0] }), _jsx("span", { className: "text-xl font-black italic uppercase tracking-tighter group-hover:text-[#EF4444] transition-colors", children: team.name })] }) }), _jsx("td", { className: "px-10 py-8 text-center text-slate-400 font-bold", children: "0" }), _jsx("td", { className: "px-10 py-8 text-center text-slate-400 font-bold", children: "0" }), _jsx("td", { className: "px-10 py-8 text-center text-slate-400 font-bold", children: "0" }), _jsx("td", { className: "px-10 py-8 text-center text-slate-400 font-bold", children: "0" }), _jsx("td", { className: "px-10 py-8 text-center text-slate-400 font-bold", children: "0" }), _jsx("td", { className: "px-10 py-8 text-right font-black italic text-4xl text-[#EF4444] tracking-tighter", children: "0" })] }, idx))) })] }) })), activeTab === "schedule" && (_jsxs("div", { className: "p-10 space-y-10", children: [isOrganizer && (_jsxs("div", { className: "bg-white/5 border border-white/10 p-8 rounded-[2rem]", children: [_jsxs("h3", { className: "text-xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-2", children: [_jsx(Plus, { className: "h-5 w-5 text-[#EF4444]" }), " Arrange Match"] }), _jsxs("form", { onSubmit: handleScheduleMatch, className: "grid md:grid-cols-4 gap-4", children: [_jsxs("select", { required: true, value: newMatch.team1Id, onChange: (e) => setNewMatch({ ...newMatch, team1Id: e.target.value }), className: "bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white outline-none", children: [_jsx("option", { value: "", children: "Select Team 1" }), teams.map(t => _jsx("option", { value: t._id, children: t.name }, t._id))] }), _jsxs("select", { required: true, value: newMatch.team2Id, onChange: (e) => setNewMatch({ ...newMatch, team2Id: e.target.value }), className: "bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white outline-none", children: [_jsx("option", { value: "", children: "Select Team 2" }), teams.map(t => _jsx("option", { value: t._id, children: t.name }, t._id))] }), _jsx("input", { type: "datetime-local", required: true, value: newMatch.date, onChange: (e) => setNewMatch({ ...newMatch, date: e.target.value }), className: "bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white outline-none" }), _jsx("button", { type: "submit", className: "bg-[#EF4444] text-white rounded-xl font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:bg-red-600 transition-all", children: "Schedule" })] })] })), _jsx("div", { className: "space-y-4", children: matches.length === 0 ? (_jsxs("div", { className: "py-20 text-center space-y-4", children: [_jsx("div", { className: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600", children: _jsx(Clock, { className: "h-10 w-10" }) }), _jsx("h3", { className: "text-3xl font-black italic uppercase tracking-tighter", children: "Arena Pending" }), _jsx("p", { className: "text-slate-500 font-bold", children: "The match grid is still being calculated." })] })) : (matches.map((match) => (_jsxs("div", { className: "bg-[#0E0E10] border border-[#2D2D30] rounded-2xl p-6 flex items-center justify-between", children: [_jsx("div", { className: "flex-1 text-right", children: _jsx("span", { className: "text-xl font-black italic uppercase", children: match.team1Id?.name || 'TBA' }) }), _jsxs("div", { className: "px-8 text-center space-y-2", children: [_jsx("div", { className: "text-[10px] text-slate-500 font-black uppercase tracking-widest", children: new Date(match.date).toLocaleString() }), editingMatch === match._id ? (_jsxs("div", { className: "flex items-center gap-2 justify-center", children: [_jsx("input", { type: "number", className: "w-12 bg-white/10 text-center rounded p-1", value: matchScore.score1, onChange: e => setMatchScore({ ...matchScore, score1: +e.target.value }) }), _jsx("span", { children: "-" }), _jsx("input", { type: "number", className: "w-12 bg-white/10 text-center rounded p-1", value: matchScore.score2, onChange: e => setMatchScore({ ...matchScore, score2: +e.target.value }) }), _jsxs("select", { className: "text-xs bg-white/10 rounded p-1", value: matchScore.status, onChange: e => setMatchScore({ ...matchScore, status: e.target.value }), children: [_jsx("option", { value: "scheduled", children: "Scheduled" }), _jsx("option", { value: "ongoing", children: "Ongoing" }), _jsx("option", { value: "completed", children: "Completed" })] }), _jsx("button", { onClick: () => handleUpdateScore(match._id), className: "text-emerald-400 hover:text-emerald-300 ml-2", children: _jsx(Save, { className: "w-4 h-4" }) })] })) : (_jsxs("div", { className: "text-3xl font-[900] text-[#EF4444] tracking-tighter", children: [match.score1, " - ", match.score2, isOrganizer && (_jsx("button", { onClick: () => { setEditingMatch(match._id); setMatchScore({ score1: match.score1, score2: match.score2, status: match.status }); }, className: "ml-4 text-slate-500 hover:text-white inline-block align-middle", children: _jsx(Edit2, { className: "w-4 h-4" }) }))] })), _jsx("div", { className: "text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400", children: match.status })] }), _jsx("div", { className: "flex-1 text-left", children: _jsx("span", { className: "text-xl font-black italic uppercase", children: match.team2Id?.name || 'TBA' }) })] }, match._id)))) })] })), activeTab === "teams" && (_jsxs("div", { className: "p-10 space-y-10", children: [teams.length === 0 ? (_jsx("div", { className: "py-20 text-center text-slate-500 font-bold uppercase tracking-widest", children: "No Teams Enrolled Yet" })) : (_jsx("div", { className: "grid md:grid-cols-2 gap-6", children: teams.map((team, idx) => (_jsx("div", { className: "group bg-white/5 border border-white/5 p-10 rounded-[2.5rem] hover:bg-[#EF4444]/10 hover:border-[#EF4444]/30 transition-all cursor-pointer", children: _jsxs("div", { className: "flex items-center gap-8", children: [_jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-[#EF4444] to-red-800 flex items-center justify-center text-4xl font-black shadow-2xl shadow-red-900/40", children: team.name[0] }), _jsxs("div", { children: [_jsx("h4", { className: "text-2xl font-black italic uppercase tracking-tighter group-hover:text-white transition-colors", children: team.name }), _jsx("p", { className: "text-[10px] text-[#EF4444] font-black uppercase tracking-[0.3em]", children: "Qualified Squad" })] })] }) }, idx))) })), _jsxs("div", { className: "bg-white/5 border border-white/10 p-8 rounded-[2rem]", children: [_jsxs("h3", { className: "text-xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-2", children: [_jsx(Users, { className: "h-5 w-5 text-[#EF4444]" }), " Enlist New Team"] }), _jsxs("form", { onSubmit: handleRegisterTeam, className: "space-y-4", children: [_jsx("div", { children: _jsx("input", { type: "text", name: "name", placeholder: "Team Name", required: true, className: "w-full bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white focus:outline-none focus:border-[#EF4444]" }) }), _jsx("div", { children: _jsx("input", { type: "text", name: "members", placeholder: "Team Members (Comma separated)", required: true, className: "w-full bg-[#0E0E10] border border-[#2D2D30] rounded-xl py-3 px-4 font-bold text-white focus:outline-none focus:border-[#EF4444]" }) }), _jsx("button", { type: "submit", className: "bg-[#EF4444] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all hover:bg-red-600", children: "Register Team" })] })] })] }))] })] }));
}
function MetaItem({ icon: Icon, label, value }) {
    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-white/5 p-2 rounded-lg", children: _jsx(Icon, { className: "h-4 w-4 text-[#EF4444]" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-slate-600", children: label }), _jsx("p", { className: "text-sm font-bold text-slate-300", children: value })] })] }));
}
function TabButton({ active, onClick, label }) {
    return (_jsxs("button", { onClick: onClick, className: `relative py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${active ? "text-[#EF4444]" : "text-slate-600 hover:text-slate-400"}`, children: [label, active && (_jsx("span", { className: "absolute bottom-0 left-0 w-full h-1 bg-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.5)]" }))] }));
}
