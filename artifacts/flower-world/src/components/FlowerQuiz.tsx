import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const QUESTIONS = [
  {
    id: 1,
    question: "Кое настроение ви описва най-добре?",
    options: [
      { text: "Мистериозен и Дълбок", trait: "exotic" },
      { text: "Ярък и Жизнерадостен", trait: "meadow" },
      { text: "Спокоен и Замислен", trait: "water" },
      { text: "Смел и Драматичен", trait: "tropical" }
    ]
  },
  {
    id: 2,
    question: "Кой сезон говори на вашата душа?",
    options: [
      { text: "Пролет (Прераждане)", trait: "meadow" },
      { text: "Лято (Жизненост)", trait: "tropical" },
      { text: "Есен (Преход)", trait: "exotic" },
      { text: "Зима (Тишина)", trait: "water" }
    ]
  },
  {
    id: 3,
    question: "Коя цветова палитра ви привлича?",
    options: [
      { text: "Дълбоко Лилаво и Магента", trait: "exotic" },
      { text: "Топло Жълто и Оранжево", trait: "meadow" },
      { text: "Чисто Бяло и Синьо", trait: "water" },
      { text: "Ярко Червено и Розово", trait: "tropical" }
    ]
  }
];

const RESULTS = {
  exotic: {
    name: "Амазонска Орхидея",
    meaning: "Притежавате рядка и сложна красота, процъфтяваща в дълбочина и мистерия.",
    color: "#a32cc4"
  },
  meadow: {
    name: "Дива Прерийна Роза",
    meaning: "Носите естествена топлина и устойчива радост на всички около вас.",
    color: "#ffb6c1"
  },
  water: {
    name: "Свещен Лотос",
    meaning: "Намирате чистота и спокойствие сред хаоса, винаги издигайки се над него.",
    color: "#e6e6fa"
  },
  tropical: {
    name: "Кралска Протея",
    meaning: "Вие сте смели, величествени и не се страхувате да се откроите от тълпата.",
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
              Въпрос {currentStep + 1} от {QUESTIONS.length}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl mb-8">
              {QUESTIONS[currentStep].question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUESTIONS[currentStep].options.map((option, i) => (
                <button
                  key={i}
                  data-testid={`button-quiz-option-${i}`}
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
              Вашият Цвят
            </span>
            <h3 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: getResult().color }}>
              {getResult().name}
            </h3>
            <p className="text-lg text-foreground/80 mb-8 max-w-md mx-auto">
              {getResult().meaning}
            </p>
            <Button
              data-testid="button-quiz-restart"
              onClick={resetQuiz}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 text-primary"
            >
              Опитай Отново
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlowerQuiz;
