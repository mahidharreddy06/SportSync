import { Link, useLocation } from "wouter";
import { Trophy } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <nav className="bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-white block leading-none italic uppercase tracking-tighter">Tournament Hub</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Run the bracket</span>
            </div>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink href="/" active={location === "/"}>Home</NavLink>
            <NavLink href="/tournaments" active={location === "/tournaments"}>Tournaments</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-6">
            {user ? (
              <Link href="/dashboard" className="text-sm font-black text-white hover:text-blue-400 transition-colors uppercase tracking-widest">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
                  Sign in
                </Link>
                <Link href="/register" className="bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-white/5 hover:scale-105 active:scale-95">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className={`text-xs font-black uppercase tracking-[0.2em] transition-all relative py-2 ${
        active 
          ? "text-blue-500" 
          : "text-slate-500 hover:text-white"
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}
    </Link>
  );
}
