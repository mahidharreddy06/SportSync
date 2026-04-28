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
import Placeholder from "./pages/Placeholder";
import Settings from "./pages/Settings";
import HotMatches from "./pages/HotMatches";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="258943999879-ibkc4908rel0q7kmn8cr11o3hnrnrvk3.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-[#0E0E10] text-white">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/tournaments" component={Tournaments} />
            <Route path="/tournaments/new" component={CreateTournament} />
            <Route path="/tournaments/:id" component={TournamentDetail} />
            <Route path="/settings" component={Settings} />
            <Route path="/hot-matches" component={HotMatches} />
          </Switch>
        </main>
        <Toaster position="bottom-right" theme="dark" />
      </div>
    </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
