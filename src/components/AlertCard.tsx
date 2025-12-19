import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, X, MapPin } from "lucide-react";
import { useState } from "react";

export interface Alert {
  id: string;
  type: "danger" | "caution" | "safe" | "info";
  title: string;
  message: string;
  location?: string;
  time: string;
}

const alertConfig = {
  danger: { icon: AlertTriangle, bg: "bg-danger/10", border: "border-danger/20", iconColor: "text-danger" },
  caution: { icon: AlertTriangle, bg: "bg-caution/10", border: "border-caution/20", iconColor: "text-caution" },
  safe: { icon: CheckCircle, bg: "bg-safe/10", border: "border-safe/20", iconColor: "text-safe" },
  info: { icon: Info, bg: "bg-primary/10", border: "border-primary/20", iconColor: "text-primary" },
};

interface AlertCardProps {
  alert: Alert;
  onDismiss: (id: string) => void;
}

export function AlertCard({ alert, onDismiss }: AlertCardProps) {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`relative p-4 rounded-xl border ${config.bg} ${config.border}`}
    >
      <button
        onClick={() => onDismiss(alert.id)}
        className="absolute top-3 right-3 p-1 rounded-lg hover:bg-foreground/5 transition-colors"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <Icon className={`h-5 w-5 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium">{alert.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            {alert.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {alert.location}
              </span>
            )}
            <span>{alert.time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "caution",
      title: "Increased Activity",
      message: "Higher than usual foot traffic reported near Merkato market.",
      location: "Merkato",
      time: "10 min ago",
    },
    {
      id: "2",
      type: "safe",
      title: "Area Cleared",
      message: "Bole district back to normal safety levels.",
      location: "Bole",
      time: "1 hour ago",
    },
  ]);

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} onDismiss={dismissAlert} />
      ))}
    </div>
  );
}
