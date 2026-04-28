import { Link } from "wouter";
import { Trophy, ArrowRight, Play, Star, Calendar, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="p-8 lg:p-12 space-y-12">
      {/* HEADER SECTION */}
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Global Federation</h2>
          <p className="text-slate-500 font-bold text-sm">Welcome to SportSync. Connect, manage, and play.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="bg-[#EF4444] hover:bg-red-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
            Access Arena
          </Link>
        </div>
      </header>

      {/* HERO SECTION CLEAN */}
      <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[3rem] p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#EF4444]/5 opacity-50" />
        <div className="relative z-10 space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
            <Trophy className="h-10 w-10 text-slate-700" />
          </div>
          <h3 className="text-4xl font-black italic uppercase tracking-tighter">Your Tournaments Await</h3>
          <p className="text-slate-500 font-bold max-w-sm mx-auto uppercase text-xs tracking-widest">
            Organize leagues, schedule matches, and manage teams seamlessly.
          </p>
          <div className="pt-4">
             <Link href="/tournaments/new" className="inline-block bg-[#EF4444] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
               Launch New Event
             </Link>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-white/5">
        <div className="text-center">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            SportSync — Built for the next generation of <span className="text-[#EF4444]">athletes.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
