import { useState } from "react";
import { useLocation } from "wouter";
import { Trophy, Calendar, Zap, MapPin, ArrowLeft, Save, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "../config";

export default function CreateTournament() {
  const [formData, setFormData] = useState({
    name: "",
    sportType: "Football",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const token = localStorage.getItem("token");
    
    try {
      await axios.post(`${API_BASE_URL}/api/tournaments`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Tournament created successfully!");
      setLocation("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        toast.error("You are not authorized. Only Organizers can create tournaments.");
      } else {
        toast.error(err.response?.data?.message || "Failed to create tournament");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
          <h1 className="text-4xl font-black tracking-tight">Host New Event</h1>
        </div>
      </header>

      <div className="bg-sidebar-accent/30 border border-sidebar-border rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl -mr-32 -mt-32 rounded-full" />
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-foreground/50 ml-1">Tournament Name</label>
                <div className="relative">
                  <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold"
                    placeholder="Annual College Cup"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-foreground/50 ml-1">Sport Category</label>
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <select 
                    value={formData.sportType}
                    onChange={(e) => setFormData({...formData, sportType: e.target.value})}
                    className="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold appearance-none"
                  >
                    <option>Football</option>
                    <option>Cricket</option>
                    <option>Basketball</option>
                    <option>Volleyball</option>
                    <option>Esports</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-foreground/50 ml-1">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-foreground/50 ml-1">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/30 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Publishing..." : <><Save className="h-5 w-5" /> Launch Tournament</>}
            </button>
          </div>
        </form>
      </div>

      <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 flex items-start gap-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-sm">Organizer Note</p>
          <p className="text-xs text-foreground/50 leading-relaxed">
            Once published, you can start inviting teams to register. The system will automatically generate a point table and schedule based on the number of teams.
          </p>
        </div>
      </div>
    </div>
  );
}
