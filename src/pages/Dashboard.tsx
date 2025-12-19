import { motion } from "framer-motion";
import { Shield, AlertTriangle, MapPin, TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { AlertsPanel } from "@/components/AlertCard";

const trendData = [
  { time: "6am", incidents: 5 },
  { time: "9am", incidents: 12 },
  { time: "12pm", incidents: 18 },
  { time: "3pm", incidents: 15 },
  { time: "6pm", incidents: 22 },
  { time: "9pm", incidents: 14 },
];

const zoneData = [
  { name: "Bole", safe: 85 },
  { name: "CMC", safe: 78 },
  { name: "Piassa", safe: 55 },
  { name: "Merkato", safe: 42 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Safety overview for Addis Ababa</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Safety Score", value: "76", icon: Shield, color: "text-safe", bg: "bg-safe/10" },
            { label: "Active Alerts", value: "5", icon: AlertTriangle, color: "text-caution", bg: "bg-caution/10" },
            { label: "Safe Zones", value: "5", icon: MapPin, color: "text-primary", bg: "bg-primary/10" },
            { label: "vs Yesterday", value: "-12%", icon: TrendingDown, color: "text-safe", bg: "bg-safe/10" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Charts Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trend Chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <h3 className="font-semibold mb-4">Today's Incidents</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis hide />
                    <Area
                      type="monotone"
                      dataKey="incidents"
                      stroke="hsl(var(--primary))"
                      fill="url(#colorIncidents)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Zone Safety */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <h3 className="font-semibold mb-4">Zone Safety Scores</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneData} layout="vertical">
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={60} />
                    <Bar dataKey="safe" fill="hsl(var(--safe))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Alerts Sidebar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <h3 className="font-semibold mb-4">Recent Alerts</h3>
            <AlertsPanel />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
