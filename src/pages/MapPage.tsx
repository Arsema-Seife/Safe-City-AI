import { motion } from "framer-motion";
import { RiskMap } from "@/components/RiskMap";
import { useState } from "react";
import { MapPin, AlertTriangle, Shield, Clock, Lightbulb, ChevronRight } from "lucide-react";
import type { RiskZone } from "@/components/RiskMap";

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <div className="h-[calc(100vh-5rem)] flex">
        {/* Map takes most space */}
        <div className="flex-1 p-4">
          <RiskMap
            onZoneSelect={setSelectedZone}
            selectedZone={selectedZone}
            className="h-full shadow-lg"
          />
        </div>

        {/* Detailed sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 p-5 border-l border-border bg-card/50 overflow-y-auto hidden lg:block"
        >
          <h2 className="font-display font-semibold text-lg mb-4">Addis Ababa Safety Map</h2>
          
          {selectedZone ? (
            <motion.div
              key={selectedZone.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              {/* Zone Header */}
              <div>
                <h3 className="font-semibold text-xl mb-2">{selectedZone.name}</h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    selectedZone.riskLevel === "safe"
                      ? "bg-safe/15 text-safe"
                      : selectedZone.riskLevel === "caution"
                      ? "bg-caution/15 text-caution"
                      : "bg-danger/15 text-danger"
                  }`}
                >
                  {selectedZone.riskLevel.charAt(0).toUpperCase() + selectedZone.riskLevel.slice(1)} Area
                </span>
                <p className="text-sm text-muted-foreground mt-3">{selectedZone.description}</p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Risk Score</span>
                  </div>
                  <p className="text-xl font-bold">{selectedZone.riskScore}<span className="text-sm font-normal text-muted-foreground">/100</span></p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Incidents</span>
                  </div>
                  <p className="text-xl font-bold">{selectedZone.incidents} <span className="text-sm font-normal text-muted-foreground">this month</span></p>
                </div>
              </div>

              {/* Peak Risk Time */}
              <div className="bg-caution/10 border border-caution/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-caution" />
                  <span className="text-sm font-medium text-caution">Peak Risk Time</span>
                </div>
                <p className="text-sm">{selectedZone.peakRiskTime}</p>
              </div>

              {/* Risk Types */}
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Common Risks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedZone.riskTypes.map((risk, i) => (
                    <span key={i} className="bg-danger/10 text-danger text-xs px-2.5 py-1 rounded-full">
                      {risk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safety Tips */}
              <div className="bg-safe/5 border border-safe/20 rounded-xl p-4">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-safe">
                  <Lightbulb className="h-4 w-4" />
                  Safety Tips
                </h4>
                <ul className="space-y-2">
                  {selectedZone.safetyTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-safe shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select a location on the map to see detailed safety information
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">City Overview</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-safe/10 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-safe">5</p>
                <p className="text-xs text-muted-foreground">Safe</p>
              </div>
              <div className="bg-caution/10 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-caution">3</p>
                <p className="text-xs text-muted-foreground">Caution</p>
              </div>
              <div className="bg-danger/10 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-danger">0</p>
                <p className="text-xs text-muted-foreground">Danger</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
