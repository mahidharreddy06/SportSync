import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "wouter";
import { Trophy } from "lucide-react";
export default function Navbar() {
    const [location] = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (_jsx("nav", { className: "bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-20 items-center", children: [_jsxs(Link, { href: "/", className: "flex items-center gap-3 group", children: [_jsx("div", { className: "bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform", children: _jsx(Trophy, { className: "h-5 w-5 text-white" }) }), _jsxs("div", { children: [_jsx("span", { className: "text-xl font-black text-white block leading-none italic uppercase tracking-tighter", children: "Tournament Hub" }), _jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black", children: "Run the bracket" })] })] }), _jsxs("div", { className: "hidden md:flex items-center gap-10", children: [_jsx(NavLink, { href: "/", active: location === "/", children: "Home" }), _jsx(NavLink, { href: "/tournaments", active: location === "/tournaments", children: "Tournaments" })] }), _jsx("div", { className: "flex items-center gap-6", children: user ? (_jsx(Link, { href: "/dashboard", className: "text-sm font-black text-white hover:text-blue-400 transition-colors uppercase tracking-widest", children: "Dashboard" })) : (_jsxs(_Fragment, { children: [_jsx(Link, { href: "/login", className: "text-sm font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest", children: "Sign in" }), _jsx(Link, { href: "/register", className: "bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-white/5 hover:scale-105 active:scale-95", children: "Get started" })] })) })] }) }) }));
}
function NavLink({ href, active, children }) {
    return (_jsxs(Link, { href: href, className: `text-xs font-black uppercase tracking-[0.2em] transition-all relative py-2 ${active
            ? "text-blue-500"
            : "text-slate-500 hover:text-white"}`, children: [children, active && (_jsx("span", { className: "absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" }))] }));
}
