import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "wouter";
import { Trophy, Home, BarChart3, Settings, LogOut, Flame } from "lucide-react";
export default function Sidebar() {
    const [location] = useLocation();
    const [, setLocation] = useLocation();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLocation("/login");
    };
    return (_jsxs("aside", { className: "w-64 fixed left-0 top-0 h-screen bg-[#1C1C1E] border-r border-[#2D2D30] flex flex-col z-50", children: [_jsx("div", { className: "p-8", children: _jsxs(Link, { href: "/", className: "flex items-center gap-2 group", children: [_jsx("div", { className: "text-3xl font-[900] italic tracking-tighter text-[#EF4444] group-hover:scale-105 transition-transform uppercase", children: "SportSync" }), _jsx("div", { className: "w-2 h-2 bg-[#EF4444] rounded-full animate-pulse shadow-[0_0_8px_#EF4444]" })] }) }), _jsxs("nav", { className: "flex-1 px-4 space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 ml-4", children: "Competitions" }), _jsxs("div", { className: "space-y-1", children: [_jsx(SidebarLink, { href: "/", icon: Home, label: "Home", active: location === "/" }), _jsx(SidebarLink, { href: "/tournaments", icon: Trophy, label: "Tournaments", active: location.startsWith("/tournaments") }), _jsx(SidebarLink, { href: "/dashboard", icon: BarChart3, label: "Dashboard", active: location === "/dashboard" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 ml-4", children: "Favorites" }), _jsx("div", { className: "space-y-1", children: _jsx(SidebarLink, { href: "/hot-matches", icon: Flame, label: "Hot Matches", active: location === "/hot-matches" }) })] })] }), _jsxs("div", { className: "p-4 mt-auto border-t border-[#2D2D30]", children: [_jsxs(Link, { href: "/settings", className: `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all ${location === "/settings" ? "bg-[#EF4444]/10 text-[#EF4444]" : "text-slate-400 hover:text-white hover:bg-white/5"}`, children: [_jsx(Settings, { className: "h-5 w-5" }), " Settings"] }), _jsxs("button", { onClick: handleLogout, className: "flex items-center gap-3 px-4 py-3 w-full text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-xl transition-all", children: [_jsx(LogOut, { className: "h-5 w-5" }), " Logout"] })] })] }));
}
function SidebarLink({ href, icon: Icon, label, active }) {
    return (_jsxs(Link, { href: href, className: `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all ${active
            ? "bg-[#EF4444]/10 text-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            : "text-slate-400 hover:text-white hover:bg-white/5"}`, children: [_jsx(Icon, { className: `h-5 w-5 ${active ? "text-[#EF4444]" : "text-slate-500"}` }), label] }));
}
