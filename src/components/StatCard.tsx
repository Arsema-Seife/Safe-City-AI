import { motion } from "framer-motion";
import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  type?: "default" | "safe" | "caution" | "danger";
  delay?: number;
}

const typeStyles = {
  default: "bg-primary/10 text-primary",
  safe: "bg-safe/10 text-safe",
  caution: "bg-caution/10 text-caution",
  danger: "bg-danger/10 text-danger",
};

export function StatCard({ title, value, change, icon, type = "default", delay = 0 }: StatCardProps) {
  const getTrendIcon = () => {
    if (!change) return <Minus className="h-4 w-4" />;
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (!change) return "text-muted-foreground";
    // For safety metrics, down is good
    if (type === "danger" || type === "caution") {
      return change < 0 ? "text-safe" : "text-danger";
    }
    return change > 0 ? "text-safe" : "text-danger";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card-elevated p-6"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${typeStyles[type]}`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-display font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </div>
    </motion.div>
  );
}
