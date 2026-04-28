import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { API_BASE_URL } from "../config";

export default function Register() {
  const [role, setRole] = useState("user");
  const [, setLocation] = useLocation();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        token: credentialResponse.credential,
        role
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Welcome to the SportSync Federation!");
      setLocation("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0E0E10] relative overflow-hidden">
      <div className="absolute inset-0 field-grid opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-[460px] relative z-10">
        <div className="bg-[#1C1C1E] border border-[#2D2D30] p-12 rounded-[3rem] shadow-2xl shadow-black/50">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-8">
              <span className="text-4xl font-[900] italic tracking-tighter text-[#EF4444] uppercase">SportSync</span>
            </Link>
            <h2 className="text-3xl font-[900] italic uppercase tracking-tighter">Create Profile</h2>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Join the Global Tournament Network</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-1">Rank / Role</label>
              <div className="relative group">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-[#EF4444] transition-colors" />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#0E0E10] border border-[#2D2D30] rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all font-bold text-white appearance-none"
                >
                  <option value="user">Athlete</option>
                  <option value="organizer">Organizer</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <GoogleLogin 
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Sync Failed")}
                theme="dark"
                shape="pill"
                size="large"
                width="300"
                text="signup_with"
              />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Already Enlisted?{" "}
              <Link href="/login" className="text-[#EF4444] font-black hover:underline ml-2">Login to Dashboard</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
