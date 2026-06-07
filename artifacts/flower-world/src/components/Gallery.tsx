import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_FLOWERS = [
  { id: 1, src: '/images/gallery-1.png', alt: 'Macro shot of exotic purple orchid', span: 'col-span-1 row-span-1' },
  { id: 2, src: '/images/gallery-2.png', alt: 'Field of wild prairie roses', span: 'col-span-2 row-span-2' },
  { id: 3, src: '/images/gallery-3.png', alt: 'Elegant white lotus flower', span: 'col-span-1 row-span-2' },
  { id: 4, src: '/images/gallery-4.png', alt: 'Vibrant red flame lily', span: 'col-span-1 row-span-1' },
  { id: 5, src: '/images/gallery-5.png', alt: 'Blue poppy in himalayan landscape', span: 'col-span-2 row-span-1' },
  { id: 6, src: '/images/gallery-6.png', alt: 'King protea majestic close up', span: 'col-span-1 row-span-1' },
];

const Gallery = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
      {MOCK_FLOWERS.map((flower, index) => (
        <motion.div
          key={flower.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, zIndex: 10 }}
          className={`relative overflow-hidden group cursor-pointer ${flower.span} bg-card rounded-sm`}
        >
          <img 
            src={flower.src} 
            alt={flower.alt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-primary font-serif text-xl">{flower.alt.split(' ').slice(0, 3).join(' ')}</span>
            <span className="text-sm text-foreground/70">{flower.alt}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
