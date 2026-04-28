import { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Mail, Shield, Bell, Lock, Moon, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleSave = () => {
    toast.success("Preferences saved successfully!");
  };

  const handleToggleTheme = () => {
    setDarkTheme(!darkTheme);
    toast.info(darkTheme ? "Light theme is currently under development!" : "Dark theme enabled.");
  };

  if (!user) return null;

  return (
    <div className="p-8 lg:p-12 space-y-10 bg-[#0E0E10] min-h-screen text-white">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-[#EF4444] text-[10px] font-black uppercase tracking-[0.3em]">
          <SettingsIcon className="h-4 w-4" /> Configuration
        </div>
        <h1 className="text-6xl md:text-8xl font-[900] italic tracking-tighter uppercase leading-[0.85]">
          Sector <span className="text-slate-800">Settings</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm">Manage your profile, preferences, and account security.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[2.5rem] p-10 space-y-8">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <User className="text-[#EF4444]" /> Profile Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Full Name</label>
                <div className="bg-[#0E0E10] border border-[#2D2D30] rounded-2xl py-4 px-6 font-bold text-white flex items-center gap-3">
                  <User className="h-4 w-4 text-slate-500" /> {user.name}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Email Address</label>
                <div className="bg-[#0E0E10] border border-[#2D2D30] rounded-2xl py-4 px-6 font-bold text-white flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-500" /> {user.email}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Federation Role</label>
                <div className="bg-[#0E0E10] border border-[#2D2D30] rounded-2xl py-4 px-6 font-bold text-white flex items-center gap-3">
                  <Shield className="h-4 w-4 text-slate-500" /> {user.role.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-[#2D2D30] rounded-[2.5rem] p-10 space-y-8">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <Bell className="text-blue-500" /> Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[#2D2D30] rounded-2xl">
                <div>
                  <h4 className="font-bold text-white">Email Notifications</h4>
                  <p className="text-xs text-slate-500">Receive updates about your tournaments.</p>
                </div>
                <div 
                  onClick={() => setEmailNotifs(!emailNotifs)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${emailNotifs ? 'bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${emailNotifs ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-[#2D2D30] rounded-2xl">
                <div>
                  <h4 className="font-bold text-white">Dark Theme</h4>
                  <p className="text-xs text-slate-500">Enforce dark mode across all interfaces.</p>
                </div>
                <div 
                  onClick={handleToggleTheme}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${darkTheme ? 'bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${darkTheme ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleSave}
              className="mt-4 bg-[#EF4444] text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all hover:bg-red-600"
            >
              Save Configuration
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-900/20 to-red-900/5 border border-red-900/30 rounded-[2.5rem] p-10 space-y-6">
            <h3 className="text-xl font-black italic tracking-tighter uppercase text-red-400">Danger Zone</h3>
            <p className="text-xs text-slate-400 font-bold leading-relaxed">
              Permanent actions that cannot be undone. Proceed with extreme caution.
            </p>
            <div className="space-y-4">
              <button onClick={() => toast.info("Password reset link sent to your email.")} className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                 <Lock className="w-4 h-4" /> Change Password
              </button>
              <button onClick={() => toast.error("Account deletion requested. Check your email to confirm.")} className="w-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                 <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
