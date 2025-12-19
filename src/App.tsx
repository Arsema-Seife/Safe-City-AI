import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { ParticleBackground } from "@/components/ParticleBackground";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapPage from "./pages/MapPage";
import Dashboard from "./pages/Dashboard";
import AlertsPage from "./pages/AlertsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="safecity-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background relative">
            <ParticleBackground />
            <Navigation />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
