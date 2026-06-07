import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const QUESTIONS = [
  {
    id: 1,
    question: "What mood best describes you?",
    options: [
      { text: "Mysterious & Deep", trait: "exotic" },
      { text: "Bright & Cheerful", trait: "meadow" },
      { text: "Calm & Reflective", trait: "water" },
      { text: "Bold & Dramatic", trait: "tropical" }
    ]
  },
  {
    id: 2,
    question: "Which season speaks to your soul?",
    options: [
      { text: "Spring (Rebirth)", trait: "meadow" },
      { text: "Summer (Vibrancy)", trait: "tropical" },
      { text: "Autumn (Transition)", trait: "exotic" },
      { text: "Winter (Stillness)", trait: "water" }
    ]
  },
  {
    id: 3,
    question: "What color palette draws you in?",
    options: [
      { text: "Deep Purples & Magentas", trait: "exotic" },
      { text: "Warm Yellows & Oranges", trait: "meadow" },
      { text: "Pure Whites & Blues", trait: "water" },
      { text: "Vibrant Reds & Pinks", trait: "tropical" }
    ]
  }
];

const RESULTS = {
  exotic: {
    name: "Amazon Orchid",
    meaning: "You possess a rare and complex beauty, thriving in depth and mystery.",
    color: "#a32cc4"
  },
  meadow: {
    name: "Wild Prairie Rose",
    meaning: "You bring natural warmth and resilient joy to everyone around you.",
    color: "#ffb6c1"
  },
  water: {
    name: "Sacred Lotus",
    meaning: "You find purity and calm amidst the chaos, always rising above.",
    color: "#e6e6fa"
  },
  tropical: {
    name: "King Protea",
    meaning: "You are bold, majestic, and unafraid to stand out in a crowd.",
    color: "#ff6b6b"
  }
};

const FlowerQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    exotic: 0, meadow: 0, water: 0, tropical: 0
  });

  const handleOptionClick = (trait: string) => {
    setScores(prev => ({ ...prev, [trait]: prev[trait] + 1 }));
    setCurrentStep(prev => prev + 1);
  };

  const getResult = () => {
    const highestTrait = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return RESULTS[highestTrait as keyof typeof RESULTS];
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ exotic: 0, meadow: 0, water: 0, tropical: 0 });
  };

  return (
    <div className="bg-card/50 border border-white/5 p-8 md:p-12 rounded-sm max-w-2xl mx-auto min-h-[400px] flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep < QUESTIONS.length ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full text-center"
          >
            <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
              Question {currentStep + 1} of {QUESTIONS.length}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl mb-8">
              {QUESTIONS[currentStep].question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUESTIONS[currentStep].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(option.trait)}
                  className="p-4 border border-white/10 hover:border-primary/50 bg-background/50 hover:bg-primary/10 transition-all text-foreground/80 hover:text-primary rounded-sm"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center"
          >
            <span className="text-foreground/50 text-sm uppercase tracking-widest mb-4 block">
              Your Match
            </span>
            <h3 className="font-serif text-4xl md:text-5xl mb-4 text-primary" style={{ color: getResult().color }}>
              {getResult().name}
            </h3>
            <p className="text-lg text-foreground/80 mb-8 max-w-md mx-auto">
              {getResult().meaning}
            </p>
            <Button onClick={resetQuiz} variant="outline" className="border-primary/30 hover:bg-primary/10 text-primary">
              Take Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlowerQuiz;
