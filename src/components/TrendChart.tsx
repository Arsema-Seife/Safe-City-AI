import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

const incidentData = [
  { time: "00:00", incidents: 12, risk: 45 },
  { time: "04:00", incidents: 8, risk: 35 },
  { time: "08:00", incidents: 15, risk: 55 },
  { time: "12:00", incidents: 22, risk: 65 },
  { time: "16:00", incidents: 28, risk: 75 },
  { time: "20:00", incidents: 35, risk: 85 },
  { time: "23:00", incidents: 25, risk: 70 },
];

const weeklyData = [
  { day: "Mon", safe: 45, caution: 30, danger: 10 },
  { day: "Tue", safe: 50, caution: 25, danger: 8 },
  { day: "Wed", safe: 42, caution: 35, danger: 12 },
  { day: "Thu", safe: 48, caution: 28, danger: 9 },
  { day: "Fri", safe: 35, caution: 40, danger: 18 },
  { day: "Sat", safe: 30, caution: 45, danger: 22 },
  { day: "Sun", safe: 40, caution: 38, danger: 15 },
];

interface TrendChartProps {
  title: string;
  type?: "area" | "bar";
}

export function TrendChart({ title, type = "area" }: TrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card-elevated p-6"
    >
      <h3 className="font-display font-semibold text-lg mb-4">{title}</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={incidentData}>
              <defs>
                <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--danger))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--danger))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-md)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="incidents"
                stroke="hsl(var(--primary))"
                fill="url(#colorIncidents)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="risk"
                stroke="hsl(var(--danger))"
                fill="url(#colorRisk)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-md)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="safe" fill="hsl(var(--safe))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="caution" fill="hsl(var(--caution))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="danger" fill="hsl(var(--danger))" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
