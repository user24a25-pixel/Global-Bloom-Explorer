import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingPetals from '@/components/FloatingPetals';
import WorldMap from '@/components/WorldMap';
import Gallery from '@/components/Gallery';
import CounterSection from '@/components/CounterSection';
import FlowerQuiz from '@/components/FlowerQuiz';

const Home = () => {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(13, 31, 14, 0)", "rgba(13, 31, 14, 0.85)"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Sticky Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 py-4 px-8 border-b border-white/5 transition-colors"
        style={{ 
          backgroundColor: headerBg,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-serif text-2xl tracking-wider text-primary">WoF</span>
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-foreground/80">
            <a href="#map" className="hover:text-primary transition-colors">World Map</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#quiz" className="hover:text-primary transition-colors">Quiz</a>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <FloatingPetals />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 drop-shadow-lg">
              World of Flowers
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="text-lg md:text-2xl font-light tracking-widest text-primary/90 uppercase"
          >
            A Botanical Journey
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary/50"
        >
          <span className="text-sm uppercase tracking-widest mb-2 block">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl mb-4 text-primary"
            >
              Explore by Continent
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/70 max-w-2xl mx-auto"
            >
              Click on a region to discover its native floral wonders.
            </motion.p>
          </div>
          <WorldMap />
        </div>
      </section>

      {/* Video Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/flowers-blooming.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/40" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            Nature's Masterpiece
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/80 font-light"
          >
            Every bloom tells a story of survival, evolution, and breathtaking beauty.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-primary">Featured Blooms</h2>
            <p className="text-foreground/70 max-w-2xl">A curated selection of the world's most stunning specimens.</p>
          </motion.div>
          <Gallery />
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-32">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-primary">Discover Your Flower</h2>
            <p className="text-foreground/70">Find the bloom that resonates with your soul.</p>
          </motion.div>
          <FlowerQuiz />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,hsl(var(--primary))_0,transparent_100%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <CounterSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl text-primary mb-6">World of Flowers</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              A curated digital conservatory celebrating the diverse and magnificent world of botanical life across the globe.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-lg mb-2">Explore</h4>
            <a href="#map" className="text-sm text-foreground/60 hover:text-primary transition-colors">World Map</a>
            <a href="#gallery" className="text-sm text-foreground/60 hover:text-primary transition-colors">Gallery</a>
            <a href="#quiz" className="text-sm text-foreground/60 hover:text-primary transition-colors">Quiz</a>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Newsletter</h4>
            <p className="text-sm text-foreground/60 mb-4">Receive weekly botanical inspirations.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-primary/50 flex-1"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2 text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-xs text-foreground/40 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} World of Flowers. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
