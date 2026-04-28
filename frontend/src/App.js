import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tournaments from "./pages/Tournaments";
import CreateTournament from "./pages/CreateTournament";
import TournamentDetail from "./pages/TournamentDetail";
import Settings from "./pages/Settings";
import HotMatches from "./pages/HotMatches";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
    return (_jsx(GoogleOAuthProvider, { clientId: "258943999879-ibkc4908rel0q7kmn8cr11o3hnrnrvk3.apps.googleusercontent.com", children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs("div", { className: "flex min-h-screen bg-[#0E0E10] text-white", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 ml-64 min-h-screen", children: _jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { path: "/login", component: Login }), _jsx(Route, { path: "/register", component: Register }), _jsx(Route, { path: "/dashboard", component: Dashboard }), _jsx(Route, { path: "/tournaments", component: Tournaments }), _jsx(Route, { path: "/tournaments/new", component: CreateTournament }), _jsx(Route, { path: "/tournaments/:id", component: TournamentDetail }), _jsx(Route, { path: "/settings", component: Settings }), _jsx(Route, { path: "/hot-matches", component: HotMatches })] }) }), _jsx(Toaster, { position: "bottom-right", theme: "dark" })] }) }) }));
}
export default App;
