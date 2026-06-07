import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const FLOWER_DATA: Record<string, { name: string; color: string; desc: string; hex: string }[]> = {
  "North America": [
    { name: "Wild Prairie Rose", color: "Pink", desc: "Symbol of love and boundless plains.", hex: "#ffb6c1" },
    { name: "California Poppy", color: "Orange", desc: "State flower, capturing the golden sun.", hex: "#ffa500" },
    { name: "Trillium", color: "White", desc: "Woodland beauty with three distinct petals.", hex: "#f0f8ff" },
    { name: "Black-Eyed Susan", color: "Yellow", desc: "Meadow dweller with a dark heart.", hex: "#ffd700" },
    { name: "Lupine", color: "Purple", desc: "Mountain towering spikes of violet.", hex: "#8a2be2" }
  ],
  "South America": [
    { name: "Amazon Orchid", color: "Magenta", desc: "Exotic and deeply complex.", hex: "#a32cc4" },
    { name: "Passion Flower", color: "Violet", desc: "Spiritual and intricately woven.", hex: "#ee82ee" },
    { name: "Heliconia", color: "Red/Orange", desc: "Tropical fire piercing the canopy.", hex: "#ff4500" },
    { name: "Puya Raimondii", color: "Silver-Blue", desc: "The ancient queen of the Andes.", hex: "#b0c4de" },
    { name: "Angel's Trumpet", color: "White/Yellow", desc: "Dramatic bells hanging in the dusk.", hex: "#ffffe0" }
  ],
  "Europe": [
    { name: "English Rose", color: "Red", desc: "Classic romance and thorny grace.", hex: "#dc143c" },
    { name: "Lavender", color: "Purple", desc: "The fragrant soul of Provence.", hex: "#e6e6fa" },
    { name: "Tulip", color: "Various", desc: "Dutch icon of spring's arrival.", hex: "#ff69b4" },
    { name: "Edelweiss", color: "White", desc: "Alpine purity and rugged survival.", hex: "#f8f8ff" },
    { name: "Iris", color: "Blue-Violet", desc: "French emblem of faith and wisdom.", hex: "#483d8b" }
  ],
  "Africa": [
    { name: "King Protea", color: "Pink/Cream", desc: "Majestic crown of the cape.", hex: "#ff6b6b" },
    { name: "Bird of Paradise", color: "Orange/Blue", desc: "Exotic flight frozen in time.", hex: "#ff8c00" },
    { name: "Baobab Flower", color: "White", desc: "Sacred bloom of the tree of life.", hex: "#fffff0" },
    { name: "Flame Lily", color: "Red/Yellow", desc: "National fire climbing the brush.", hex: "#ff0000" },
    { name: "African Violet", color: "Purple", desc: "Miniature beauty of the shade.", hex: "#9400d3" }
  ],
  "Asia": [
    { name: "Cherry Blossom", color: "Pale Pink", desc: "Fleeting beauty of Japanese spring.", hex: "#ffb7c5" },
    { name: "Lotus", color: "Pink/White", desc: "Sacred rise from muddy waters.", hex: "#ffc0cb" },
    { name: "Chrysanthemum", color: "Golden", desc: "Imperial crest of the autumn.", hex: "#daa520" },
    { name: "Plumeria", color: "White/Yellow", desc: "Tropical scent on a warm breeze.", hex: "#fffff0" },
    { name: "Blue Poppy", color: "Sky Blue", desc: "Himalayan rarity touching the sky.", hex: "#87ceeb" }
  ],
  "Australia/Oceania": [
    { name: "Waratah", color: "Crimson", desc: "Bold red heart of the bush.", hex: "#dc143c" },
    { name: "Kangaroo Paw", color: "Red/Green", desc: "Unique velvet texture of the west.", hex: "#8b0000" },
    { name: "Sturt's Desert Pea", color: "Red/Black", desc: "Dramatic teardrops on dry earth.", hex: "#800000" },
    { name: "Golden Wattle", color: "Yellow", desc: "National fluff of pure sunlight.", hex: "#ffd700" },
    { name: "Cooktown Orchid", color: "Pink", desc: "Tropical elegance in the heat.", hex: "#da70d6" }
  ]
};

interface Props {
  continent: string;
  onClose: () => void;
}

const FlowerPanel = ({ continent, onClose }: Props) => {
  const flowers = FLOWER_DATA[continent] || FLOWER_DATA["Asia"];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 cursor-pointer"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 bottom-0 w-full md:w-96 bg-card border-l border-white/10 z-20 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <h3 className="font-serif text-2xl text-primary">{continent}</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          <div className="space-y-6">
            {flowers.map((flower, idx) => (
              <motion.div 
                key={flower.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                className="bg-background/50 p-4 rounded-sm border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm" 
                    style={{ backgroundColor: flower.hex, boxShadow: `0 0 10px ${flower.hex}80` }} 
                  />
                  <h4 className="font-serif text-lg text-foreground/90">{flower.name}</h4>
                </div>
                <p className="text-sm text-foreground/60 pl-7">{flower.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FlowerPanel;
