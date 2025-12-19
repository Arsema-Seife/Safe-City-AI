import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface RiskZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskLevel: "safe" | "caution" | "danger";
  riskScore: number;
  incidents: number;
  description: string;
  riskTypes: string[];
  peakRiskTime: string;
  safetyTips: string[];
}

// Addis Ababa locations with detailed risk info
const mockZones: RiskZone[] = [
  { 
    id: "1", 
    name: "Merkato", 
    lat: 9.0107, 
    lng: 38.7400, 
    riskLevel: "caution", 
    riskScore: 65, 
    incidents: 18, 
    description: "Africa's largest open-air market. Very crowded with narrow alleys.",
    riskTypes: ["Pickpocketing", "Bag snatching", "Scams", "Getting lost"],
    peakRiskTime: "10 AM - 4 PM (peak market hours)",
    safetyTips: [
      "Keep valuables in front pockets or hidden pouches",
      "Avoid displaying phones or jewelry",
      "Travel with a local guide if unfamiliar",
      "Stay in main walkways, avoid isolated alleys",
      "Keep bags zipped and held in front of you"
    ]
  },
  { 
    id: "2", 
    name: "Bole", 
    lat: 8.9806, 
    lng: 38.7878, 
    riskLevel: "safe", 
    riskScore: 20, 
    incidents: 3, 
    description: "Modern business district near the airport with upscale restaurants and hotels.",
    riskTypes: ["Minor theft", "Traffic accidents"],
    peakRiskTime: "Late night (after 11 PM)",
    safetyTips: [
      "Use registered taxis or ride-hailing apps",
      "ATMs inside malls are safer than street ones",
      "Be cautious of overly friendly strangers at night"
    ]
  },
  { 
    id: "3", 
    name: "Piassa", 
    lat: 9.0320, 
    lng: 38.7469, 
    riskLevel: "caution", 
    riskScore: 55, 
    incidents: 12, 
    description: "Historic center with old Italian architecture. Busy commercial area.",
    riskTypes: ["Pickpocketing", "Currency scams", "Distraction theft"],
    peakRiskTime: "Afternoon rush (3 PM - 6 PM)",
    safetyTips: [
      "Exchange money only at banks or hotels",
      "Be wary of people 'accidentally' bumping into you",
      "Keep your phone secure when taking photos",
      "Negotiate taxi fares before getting in"
    ]
  },
  { 
    id: "4", 
    name: "Kazanchis", 
    lat: 9.0142, 
    lng: 38.7631, 
    riskLevel: "safe", 
    riskScore: 18, 
    incidents: 2, 
    description: "Financial district with embassies, banks, and major offices. Well-patrolled.",
    riskTypes: ["Opportunistic theft"],
    peakRiskTime: "Generally safe all hours",
    safetyTips: [
      "Standard urban precautions apply",
      "Be aware of surroundings at ATMs",
      "Police presence is high - report any issues"
    ]
  },
  { 
    id: "5", 
    name: "Mexico Square", 
    lat: 9.0000, 
    lng: 38.7500, 
    riskLevel: "safe", 
    riskScore: 22, 
    incidents: 4, 
    description: "Central landmark area with good lighting and regular foot traffic.",
    riskTypes: ["Minor pickpocketing", "Begging"],
    peakRiskTime: "After dark (7 PM onwards)",
    safetyTips: [
      "Stay in well-lit areas at night",
      "Avoid walking alone in quiet side streets",
      "Keep small change for beggars to avoid showing wallet"
    ]
  },
  { 
    id: "6", 
    name: "Megenagna", 
    lat: 9.0200, 
    lng: 38.8000, 
    riskLevel: "caution", 
    riskScore: 48, 
    incidents: 9, 
    description: "Major transit hub with bus terminals. Very crowded during rush hours.",
    riskTypes: ["Pickpocketing", "Bus theft", "Bag slashing"],
    peakRiskTime: "Rush hours (7-9 AM, 5-7 PM)",
    safetyTips: [
      "Hold bags in front when boarding buses",
      "Avoid rush hour if possible",
      "Don't fall asleep on public transport",
      "Use inner pockets for phones and wallets",
      "Stay alert in crowds - thieves work in groups"
    ]
  },
  { 
    id: "7", 
    name: "CMC", 
    lat: 9.0400, 
    lng: 38.8200, 
    riskLevel: "safe", 
    riskScore: 15, 
    incidents: 2, 
    description: "Quiet residential area with families. Gated communities common.",
    riskTypes: ["Residential burglary (rare)"],
    peakRiskTime: "Very safe area",
    safetyTips: [
      "Standard home security measures",
      "Good area for evening walks",
      "Local neighborhood watch active"
    ]
  },
  { 
    id: "8", 
    name: "Arat Kilo", 
    lat: 9.0350, 
    lng: 38.7600, 
    riskLevel: "safe", 
    riskScore: 25, 
    incidents: 5, 
    description: "University district with students and cafes. Vibrant but generally safe.",
    riskTypes: ["Phone snatching", "Student scams"],
    peakRiskTime: "Late evenings on weekends",
    safetyTips: [
      "Keep phones secure when walking",
      "Use reputable cafes and restaurants",
      "Good area during daytime"
    ]
  },
];

const riskColors = {
  safe: { fill: "#10b981", stroke: "#059669" },
  caution: { fill: "#f59e0b", stroke: "#d97706" },
  danger: { fill: "#ef4444", stroke: "#dc2626" },
};

interface RiskMapProps {
  onZoneSelect?: (zone: RiskZone) => void;
  selectedZone?: RiskZone | null;
  className?: string;
}

export function RiskMap({ onZoneSelect, selectedZone, className = "" }: RiskMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const [zones] = useState<RiskZone[]>(mockZones);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Addis Ababa
    const map = L.map(mapRef.current, {
      center: [9.0192, 38.7525],
      zoom: 13,
      zoomControl: true,
    });

    // Add tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add markers for each zone
    zones.forEach((zone) => {
      const colors = riskColors[zone.riskLevel];
      const marker = L.circleMarker([zone.lat, zone.lng], {
        radius: 12 + zone.riskScore / 15,
        fillColor: colors.fill,
        fillOpacity: 0.7,
        color: colors.stroke,
        weight: 2,
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 180px; padding: 4px;">
          <h3 style="font-weight: 600; font-size: 15px; margin: 0 0 6px 0; color: #1f2937;">${zone.name}</h3>
          <span style="display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; background-color: ${
            zone.riskLevel === "safe" ? "#d1fae5" : zone.riskLevel === "caution" ? "#fef3c7" : "#fee2e2"
          }; color: ${
            zone.riskLevel === "safe" ? "#065f46" : zone.riskLevel === "caution" ? "#92400e" : "#991b1b"
          };">
            ${zone.riskLevel.charAt(0).toUpperCase() + zone.riskLevel.slice(1)}
          </span>
          <p style="font-size: 13px; margin: 8px 0 0 0; color: #6b7280;">${zone.description}</p>
        </div>
      `);

      marker.on("click", () => {
        onZoneSelect?.(zone);
      });

      markersRef.current.push(marker);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = [];
    };
  }, [zones, onZoneSelect]);

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const zone = zones[index];
      const colors = riskColors[zone.riskLevel];
      const isSelected = selectedZone?.id === zone.id;

      marker.setStyle({
        radius: isSelected ? 18 : 12 + zone.riskScore / 15,
        fillOpacity: isSelected ? 0.9 : 0.7,
        weight: isSelected ? 3 : 2,
      });
    });
  }, [selectedZone, zones]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
    >
      <div ref={mapRef} className="h-full w-full" style={{ minHeight: "100%" }} />

      {/* Minimal Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-3 z-[1000] border border-border/50">
        <div className="flex items-center gap-4">
          {Object.entries(riskColors).map(([level, colors]) => (
            <div key={level} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.fill }} />
              <span className="text-xs text-muted-foreground capitalize">{level}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export type { RiskZone };
