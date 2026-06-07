import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface FlowerEntry {
  name: string;
  desc: string;
  hex: string;
  image: string;
}

interface Props {
  country: string;
  displayName: string;
  flowers: FlowerEntry[];
  onClose: () => void;
}

const FlowerPanel = ({ displayName, flowers, onClose }: Props) => {
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
        transition={{ type: 'spring', damping: 26, stiffness: 200 }}
        className="absolute top-0 right-0 bottom-0 w-full md:w-[420px] bg-card border-l border-white/10 z-20 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <div>
              <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">Страна</p>
              <h3 className="font-serif text-2xl text-primary">{displayName}</h3>
            </div>
            <button
              data-testid="button-close-panel"
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          <p className="text-xs uppercase tracking-widest text-foreground/40 mb-5">
            Характерни Цветя
          </p>

          <div className="space-y-5">
            {flowers.map((flower, idx) => (
              <motion.div
                key={flower.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.15 }}
                className="flex gap-4 bg-background/50 rounded-sm border border-white/5 hover:border-primary/30 transition-colors overflow-hidden"
              >
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 py-3 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: flower.hex,
                        boxShadow: `0 0 8px ${flower.hex}90`,
                      }}
                    />
                    <h4 className="font-serif text-base text-foreground/90">{flower.name}</h4>
                  </div>
                  <p className="text-xs text-foreground/55 leading-relaxed">{flower.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FlowerPanel;
