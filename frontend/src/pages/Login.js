import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_BASE_URL } from "../config";
export default function Login() {
    const [, setLocation] = useLocation();
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
                token: credentialResponse.credential
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            toast.success(`Welcome to SportSync!`);
            setLocation("/dashboard");
        }
        catch (err) {
            console.error("GOOGLE AUTH ERROR:", err.response?.data || err.message);
            toast.error("Google Authentication Failed");
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center p-6 bg-[#0E0E10] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 field-grid opacity-10 pointer-events-none" }), _jsx("div", { className: "w-full max-w-[460px] relative z-10", children: _jsxs("div", { className: "bg-[#1C1C1E] border border-[#2D2D30] p-12 rounded-[3rem] shadow-2xl shadow-black/50", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx(Link, { href: "/", className: "inline-block mb-8", children: _jsx("span", { className: "text-4xl font-[900] italic tracking-tighter text-[#EF4444] uppercase", children: "SportSync" }) }), _jsx("h2", { className: "text-3xl font-[900] italic uppercase tracking-tighter", children: "Access Arena" }), _jsx("p", { className: "mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]", children: "Official Entry Terminal" })] }), _jsx("div", { className: "space-y-8", children: _jsx("div", { className: "flex justify-center", children: _jsx(GoogleLogin, { onSuccess: handleGoogleSuccess, onError: () => toast.error("Google Sync Failed"), theme: "dark", shape: "pill", size: "large", width: "300" }) }) }), _jsx("div", { className: "mt-8 text-center", children: _jsxs("p", { className: "text-xs text-slate-500 font-bold uppercase tracking-widest", children: ["Don't have an account? ", " ", _jsx(Link, { href: "/register", className: "text-[#EF4444] font-black hover:underline ml-2", children: "Sign up with Google" })] }) }), _jsx("div", { className: "mt-12 pt-8 border-t border-white/5 text-center", children: _jsx("p", { className: "text-[9px] text-slate-700 font-bold uppercase tracking-[0.2em]", children: "SportSync Federation Security System" }) })] }) })] }));
}
