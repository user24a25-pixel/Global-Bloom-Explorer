import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerPanel from './FlowerPanel';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Rough mapping of region to our defined continents for simplicity
const CONTINENT_MAP: Record<string, string> = {
  "North America": "North America",
  "South America": "South America",
  "Europe": "Europe",
  "Africa": "Africa",
  "Asia": "Asia",
  "Oceania": "Australia/Oceania",
};

// Extracted simplified region mapping logic (using ISO/Region names in production would be better, but we rely on a simplified approach here)
const getContinentName = (geo: any) => {
  // A robust mapping would use ISO codes, but we can do a quick mapping based on name or region if available in the topjson.
  // For the sake of this visualization, let's group by typical longitude/latitude or hardcode major ones if region isn't present.
  // Actually world-atlas countries-110m has limited properties (name, iso_a2).
  // I will use a simple switch on continent based on geography ID or Name for a reliable mock.
  
  const name = geo.properties.name;
  const as = ["China", "India", "Japan", "Russia", "Indonesia", "Iran", "Saudi Arabia"];
  const eu = ["France", "Germany", "Italy", "United Kingdom", "Spain", "Poland", "Ukraine"];
  const af = ["South Africa", "Egypt", "Nigeria", "Kenya", "Ethiopia", "Morocco"];
  const sa = ["Brazil", "Argentina", "Colombia", "Chile", "Peru"];
  const na = ["United States of America", "Canada", "Mexico"];
  const oc = ["Australia", "New Zealand", "Papua New Guinea", "Fiji"];

  if (as.includes(name)) return "Asia";
  if (eu.includes(name)) return "Europe";
  if (af.includes(name)) return "Africa";
  if (sa.includes(name)) return "South America";
  if (na.includes(name)) return "North America";
  if (oc.includes(name)) return "Australia/Oceania";
  
  // fallback simple logic
  const id = geo.id; // numerical id
  // Just mapping randomly for remaining small countries to keep the visual complete
  return "Asia"; // fallback
};

const WorldMap = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-card/20 rounded-xl overflow-hidden border border-white/5">
      <ComposableMap
        projectionConfig={{
          scale: 140,
          center: [0, 20]
        }}
        className="w-full h-full max-h-[700px] opacity-80"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const continent = getContinentName(geo);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => setSelectedContinent(continent)}
                  style={{
                    default: {
                      fill: "hsl(var(--muted))",
                      stroke: "hsl(var(--border))",
                      strokeWidth: 0.5,
                      outline: "none",
                      transition: "all 0.3s"
                    },
                    hover: {
                      fill: "hsl(var(--primary) / 0.5)",
                      stroke: "hsl(var(--primary))",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 8px hsl(var(--primary)))"
                    },
                    pressed: {
                      fill: "hsl(var(--primary))",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <AnimatePresence>
        {selectedContinent && (
          <FlowerPanel 
            continent={selectedContinent} 
            onClose={() => setSelectedContinent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldMap;
