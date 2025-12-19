import { motion } from "framer-motion";
import { AlertCard, Alert } from "@/components/AlertCard";
import { Bell, Search } from "lucide-react";
import { useState } from "react";

const allAlerts: Alert[] = [
  {
    id: "1",
    type: "caution",
    title: "Increased Activity",
    message: "Higher than usual foot traffic near Merkato. Stay alert with belongings.",
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
  {
    id: "3",
    type: "info",
    title: "Event Notice",
    message: "Public gathering at Meskel Square this evening. Expect crowds.",
    location: "Meskel Square",
    time: "2 hours ago",
  },
  {
    id: "4",
    type: "caution",
    title: "Traffic Advisory",
    message: "Heavy congestion around Megenagna roundabout.",
    location: "Megenagna",
    time: "3 hours ago",
  },
  {
    id: "5",
    type: "safe",
    title: "All Clear",
    message: "CMC area reports low incident activity today.",
    location: "CMC",
    time: "5 hours ago",
  },
];

type FilterType = "all" | "danger" | "caution" | "safe" | "info";

export default function AlertsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [alerts, setAlerts] = useState<Alert[]>(allAlerts);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter = filter === "all" || alert.type === filter;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "caution", label: "Caution" },
    { value: "safe", label: "Cleared" },
    { value: "info", label: "Info" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl font-bold mb-1">Alerts</h1>
          <p className="text-muted-foreground text-sm">Recent safety updates in Addis Ababa</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search alerts..."
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Alerts List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onDismiss={dismissAlert} />
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No alerts found</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
