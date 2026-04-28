import { useLocation } from "wouter";
import { ArrowLeft, Construction } from "lucide-react";

export default function Placeholder({ title }: { title: string }) {
  const [, setLocation] = useLocation();

  return (
    <div className="p-8 lg:p-12 min-h-screen flex flex-col items-center justify-center text-center space-y-8 bg-[#0E0E10] text-white">
      <div className="w-24 h-24 bg-[#EF4444]/10 rounded-full flex items-center justify-center mb-6">
        <Construction className="h-12 w-12 text-[#EF4444] animate-bounce" />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-5xl font-[900] italic uppercase tracking-tighter">{title}</h1>
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Federation Engineers are currently calibrating this sector.</p>
      </div>

      <button 
        onClick={() => window.history.back()}
        className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Return to Arena
      </button>
    </div>
  );
}
