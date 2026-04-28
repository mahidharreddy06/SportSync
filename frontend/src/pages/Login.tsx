import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        token: credentialResponse.credential
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(`Welcome to SportSync!`);
      setLocation("/dashboard");
    } catch (err: any) {
      console.error("GOOGLE AUTH ERROR:", err.response?.data || err.message);
      toast.error("Google Authentication Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0E0E10] relative overflow-hidden">
      <div className="absolute inset-0 field-grid opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-[460px] relative z-10">
        <div className="bg-[#1C1C1E] border border-[#2D2D30] p-12 rounded-[3rem] shadow-2xl shadow-black/50">
          <div className="text-center mb-12">
            <Link href="/" className="inline-block mb-8">
              <span className="text-4xl font-[900] italic tracking-tighter text-[#EF4444] uppercase">SportSync</span>
            </Link>
            <h2 className="text-3xl font-[900] italic uppercase tracking-tighter">
              Access Arena
            </h2>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Official Entry Terminal</p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center">
              <GoogleLogin 
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Sync Failed")}
                theme="dark"
                shape="pill"
                size="large"
                width="300"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Don't have an account? {" "}
              <Link href="/register" className="text-[#EF4444] font-black hover:underline ml-2">Sign up with Google</Link>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
             <p className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.2em]">SportSync Federation Security System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
