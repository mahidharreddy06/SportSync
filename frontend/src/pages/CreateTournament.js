import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import { Trophy, Calendar, Zap, ArrowLeft, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "../config";
export default function CreateTournament() {
    const [formData, setFormData] = useState({
        name: "",
        sportType: "Football",
        startDate: "",
        endDate: "",
    });
    const [loading, setLoading] = useState(false);
    const [, setLocation] = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.post(`${API_BASE_URL}/api/tournaments`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Tournament created successfully!");
            setLocation("/dashboard");
        }
        catch (err) {
            if (err.response?.status === 403 || err.response?.status === 401) {
                toast.error("You are not authorized. Only Organizers can create tournaments.");
            }
            else {
                toast.error(err.response?.data?.message || "Failed to create tournament");
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12", children: [_jsx("header", { className: "flex items-center justify-between", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("button", { onClick: () => window.history.back(), className: "flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary transition-colors", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Go Back"] }), _jsx("h1", { className: "text-4xl font-black tracking-tight", children: "Host New Event" })] }) }), _jsxs("div", { className: "bg-sidebar-accent/30 border border-sidebar-border rounded-3xl overflow-hidden shadow-2xl relative", children: [_jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl -mr-32 -mt-32 rounded-full" }), _jsxs("form", { onSubmit: handleSubmit, className: "p-8 space-y-8 relative z-10", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-black uppercase tracking-widest text-foreground/50 ml-1", children: "Tournament Name" }), _jsxs("div", { className: "relative", children: [_jsx(Trophy, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold", placeholder: "Annual College Cup", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-black uppercase tracking-widest text-foreground/50 ml-1", children: "Sport Category" }), _jsxs("div", { className: "relative", children: [_jsx(Zap, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" }), _jsxs("select", { value: formData.sportType, onChange: (e) => setFormData({ ...formData, sportType: e.target.value }), className: "w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold appearance-none", children: [_jsx("option", { children: "Football" }), _jsx("option", { children: "Cricket" }), _jsx("option", { children: "Basketball" }), _jsx("option", { children: "Volleyball" }), _jsx("option", { children: "Esports" })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-black uppercase tracking-widest text-foreground/50 ml-1", children: "Start Date" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" }), _jsx("input", { type: "date", value: formData.startDate, onChange: (e) => setFormData({ ...formData, startDate: e.target.value }), className: "w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-black uppercase tracking-widest text-foreground/50 ml-1", children: "End Date" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" }), _jsx("input", { type: "date", value: formData.endDate, onChange: (e) => setFormData({ ...formData, endDate: e.target.value }), className: "w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-bold", required: true })] })] })] })] }), _jsx("div", { className: "pt-6", children: _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/30 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]", children: loading ? "Publishing..." : _jsxs(_Fragment, { children: [_jsx(Save, { className: "h-5 w-5" }), " Launch Tournament"] }) }) })] })] }), _jsxs("div", { className: "p-8 rounded-3xl bg-primary/5 border border-primary/10 flex items-start gap-4", children: [_jsx("div", { className: "bg-primary/20 p-2 rounded-lg", children: _jsx(Zap, { className: "h-5 w-5 text-primary" }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "font-bold text-sm", children: "Organizer Note" }), _jsx("p", { className: "text-xs text-foreground/50 leading-relaxed", children: "Once published, you can start inviting teams to register. The system will automatically generate a point table and schedule based on the number of teams." })] })] })] }));
}
