import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWERS = [
  { id: 1, src: '/images/gallery-1.png', name: 'Лилава Орхидея', origin: 'Амазонска Джунгла' },
  { id: 2, src: '/images/gallery-2.png', name: 'Дива Прерийна Роза', origin: 'Северноамериканска Прерия' },
  { id: 3, src: '/images/gallery-3.png', name: 'Свещен Лотос', origin: 'Азиатски Водни Пътища' },
  { id: 4, src: '/images/gallery-4.png', name: 'Пламтяща Лилия', origin: 'Африканска Савана' },
  { id: 5, src: '/images/gallery-5.png', name: 'Синьо Хималайско Мак', origin: 'Хималаите' },
  { id: 6, src: '/images/gallery-6.png', name: 'Кралска Протея', origin: 'Южноафрикански Нос' },
  { id: 7, src: '/images/gallery-7.png', name: 'Тъмночервено Мак', origin: 'Средиземноморски Полета' },
  { id: 8, src: '/images/gallery-8.png', name: 'Лавандулови Поля', origin: 'Прованс, Франция' },
  { id: 9, src: '/images/gallery-9.png', name: 'Черешов Цвят', origin: 'Япония' },
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
