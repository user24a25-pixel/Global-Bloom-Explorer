import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 300, suffix: 'K+', label: 'Flower Species Worldwide' },
  { value: 150, suffix: '+', label: 'Countries Explored' },
  { value: 10, suffix: 'K+', label: 'Years of Floral Tradition' },
  { value: 7, suffix: '', label: 'Continents of Wonder' },
];

const Counter = ({ value, suffix, label }: { value: number, suffix: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = (duration / end) * 5;
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 50) || 1;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 border border-white/5 bg-background/50 backdrop-blur-sm rounded-sm">
      <div className="font-serif text-5xl md:text-7xl text-primary mb-4 shadow-primary/20 drop-shadow-lg">
        {count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-foreground/70">{label}</div>
    </div>
  );
};

const CounterSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <Counter key={i} {...stat} />
      ))}
    </div>
  );
};

export default CounterSection;
