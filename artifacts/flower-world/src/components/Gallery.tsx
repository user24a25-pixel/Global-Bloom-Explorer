import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWERS = [
  { id: 1, src: '/images/gallery-1.png', name: 'Purple Orchid', origin: 'Amazon Rainforest' },
  { id: 2, src: '/images/gallery-2.png', name: 'Wild Prairie Rose', origin: 'North American Plains' },
  { id: 3, src: '/images/gallery-3.png', name: 'Sacred Lotus', origin: 'Asian Waterways' },
  { id: 4, src: '/images/gallery-4.png', name: 'Flame Lily', origin: 'African Savanna' },
  { id: 5, src: '/images/gallery-5.png', name: 'Blue Himalayan Poppy', origin: 'Himalayas' },
  { id: 6, src: '/images/gallery-6.png', name: 'King Protea', origin: 'South African Cape' },
  { id: 7, src: '/images/gallery-7.png', name: 'Crimson Poppy', origin: 'Mediterranean Fields' },
  { id: 8, src: '/images/gallery-8.png', name: 'Lavender Fields', origin: 'Provence, France' },
  { id: 9, src: '/images/gallery-9.png', name: 'Cherry Blossom', origin: 'Japan' },
];

const Gallery = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[320px]">
      {FLOWERS.map((flower, index) => (
        <motion.div
          key={flower.id}
          data-testid={`gallery-card-${flower.id}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
          onHoverStart={() => setHovered(flower.id)}
          onHoverEnd={() => setHovered(null)}
          className="relative overflow-hidden group cursor-pointer rounded-sm"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              rotateX: hovered === flower.id ? 2 : 0,
              rotateY: hovered === flower.id ? -2 : 0,
              scale: hovered === flower.id ? 1.03 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src={flower.src}
              alt={flower.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <AnimatePresence>
              {hovered === flower.id && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-0 left-0 right-0 p-6"
                >
                  <p className="font-serif text-xl text-[hsl(var(--primary))]">{flower.name}</p>
                  <p className="text-sm text-white/70 mt-1 uppercase tracking-widest">{flower.origin}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {hovered !== flower.id && (
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-serif text-lg text-white/80">{flower.name}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
