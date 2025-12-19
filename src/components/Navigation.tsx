import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import { Shield, Map, LayoutDashboard, Bell, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Shield },
  { path: "/map", label: "Map", icon: Map },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/alerts", label: "Alerts", icon: Bell },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav className="max-w-5xl mx-auto">
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">SafeCity</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="hidden md:block">
              <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                Login
              </button>
            </Link>
            
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl mt-2 p-3 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                </Link>
              );
            })}
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <div className="px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-center font-medium text-sm mt-2">
                Login
              </div>
            </Link>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
