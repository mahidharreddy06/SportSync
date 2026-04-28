import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
                token: credentialResponse.credential,
                role
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            toast.success("Welcome to the SportSync Federation!");
            setLocation("/dashboard");
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Registration Failed");
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center p-6 bg-[#0E0E10] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 field-grid opacity-10 pointer-events-none" }), _jsx("div", { className: "w-full max-w-[460px] relative z-10", children: _jsxs("div", { className: "bg-[#1C1C1E] border border-[#2D2D30] p-12 rounded-[3rem] shadow-2xl shadow-black/50", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx(Link, { href: "/", className: "inline-block mb-8", children: _jsx("span", { className: "text-4xl font-[900] italic tracking-tighter text-[#EF4444] uppercase", children: "SportSync" }) }), _jsx("h2", { className: "text-3xl font-[900] italic uppercase tracking-tighter", children: "Create Profile" }), _jsx("p", { className: "mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]", children: "Join the Global Tournament Network" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-1", children: "Rank / Role" }), _jsxs("div", { className: "relative group", children: [_jsx(Shield, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-[#EF4444] transition-colors" }), _jsxs("select", { value: role, onChange: (e) => setRole(e.target.value), className: "w-full bg-[#0E0E10] border border-[#2D2D30] rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-[#EF4444]/10 focus:border-[#EF4444] outline-none transition-all font-bold text-white appearance-none", children: [_jsx("option", { value: "user", children: "Athlete" }), _jsx("option", { value: "organizer", children: "Organizer" })] })] })] }), _jsx("div", { className: "flex justify-center pt-6", children: _jsx(GoogleLogin, { onSuccess: handleGoogleSuccess, onError: () => toast.error("Google Sync Failed"), theme: "dark", shape: "pill", size: "large", width: "300", text: "signup_with" }) })] }), _jsx("div", { className: "mt-10 pt-8 border-t border-white/5 text-center", children: _jsxs("p", { className: "text-xs text-slate-500 font-bold uppercase tracking-widest", children: ["Already Enlisted?", " ", _jsx(Link, { href: "/login", className: "text-[#EF4444] font-black hover:underline ml-2", children: "Login to Dashboard" })] }) })] }) })] }));
}
