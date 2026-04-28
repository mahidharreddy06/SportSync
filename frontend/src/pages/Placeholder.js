import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { ArrowLeft, Construction } from "lucide-react";
export default function Placeholder({ title }) {
    const [, setLocation] = useLocation();
    return (_jsxs("div", { className: "p-8 lg:p-12 min-h-screen flex flex-col items-center justify-center text-center space-y-8 bg-[#0E0E10] text-white", children: [_jsx("div", { className: "w-24 h-24 bg-[#EF4444]/10 rounded-full flex items-center justify-center mb-6", children: _jsx(Construction, { className: "h-12 w-12 text-[#EF4444] animate-bounce" }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-5xl font-[900] italic uppercase tracking-tighter", children: title }), _jsx("p", { className: "text-slate-500 font-bold uppercase text-xs tracking-widest", children: "Federation Engineers are currently calibrating this sector." })] }), _jsxs("button", { onClick: () => window.history.back(), className: "bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Return to Arena"] })] }));
}
