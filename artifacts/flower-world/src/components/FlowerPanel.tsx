import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const CONTINENT_BG: Record<string, string> = {
  "North America": "Северна Америка",
  "South America": "Южна Америка",
  "Europe": "Европа",
  "Africa": "Африка",
  "Asia": "Азия",
  "Australia/Oceania": "Австралия / Океания",
};

const FLOWER_DATA: Record<string, { name: string; color: string; desc: string; hex: string }[]> = {
  "North America": [
    { name: "Дива Прерийна Роза", color: "Розово", desc: "Символ на любов и безкрайни равнини.", hex: "#ffb6c1" },
    { name: "Калифорнийски Мак", color: "Оранжево", desc: "Щатско цвете, улавящо златното слънце.", hex: "#ffa500" },
    { name: "Трилиум", color: "Бяло", desc: "Горска красота с три отличителни венчелистчета.", hex: "#f0f8ff" },
    { name: "Черноока Сюзан", color: "Жълто", desc: "Ливадно растение с тъмно сърце.", hex: "#ffd700" },
    { name: "Лупина", color: "Лилаво", desc: "Планински виолетови класове, извисяващи се гордо.", hex: "#8a2be2" }
  ],
  "South America": [
    { name: "Амазонска Орхидея", color: "Магента", desc: "Екзотична и дълбоко сложна красота.", hex: "#a32cc4" },
    { name: "Страстен Цвят", color: "Виолетово", desc: "Духовна и изящно сплетена природа.", hex: "#ee82ee" },
    { name: "Хеликония", color: "Червено/Оранжево", desc: "Тропически огън, пронизващ гората.", hex: "#ff4500" },
    { name: "Пуя Раймонди", color: "Сребристо-Синьо", desc: "Древната кралица на Андите.", hex: "#b0c4de" },
    { name: "Ангелска Тромпа", color: "Бяло/Жълто", desc: "Драматични камбани, висящи в здрача.", hex: "#ffffe0" }
  ],
  "Europe": [
    { name: "Английска Роза", color: "Червено", desc: "Класически романтизъм и бодлива грация.", hex: "#dc143c" },
    { name: "Лавандула", color: "Лилаво", desc: "Ароматната душа на Прованс.", hex: "#e6e6fa" },
    { name: "Лале", color: "Различни", desc: "Холандски символ на пристигането на пролетта.", hex: "#ff69b4" },
    { name: "Еделвайс", color: "Бяло", desc: "Алпийска чистота и непоколебима издръжливост.", hex: "#f8f8ff" },
    { name: "Ирис", color: "Синьо-Виолетово", desc: "Френски символ на вярата и мъдростта.", hex: "#483d8b" }
  ],
  "Africa": [
    { name: "Кралска Протея", color: "Розово/Кремаво", desc: "Величествената корона на нос Добра Надежда.", hex: "#ff6b6b" },
    { name: "Райска Птица", color: "Оранжево/Синьо", desc: "Екзотичен полет, замразен във времето.", hex: "#ff8c00" },
    { name: "Баобаб Цвят", color: "Бяло", desc: "Свещеният цвят на дървото на живота.", hex: "#fffff0" },
    { name: "Пламтяща Лилия", color: "Червено/Жълто", desc: "Национален огън, пълзящ по храстите.", hex: "#ff0000" },
    { name: "Африканска Виолетка", color: "Лилаво", desc: "Миниатюрна красота в прохладната сянка.", hex: "#9400d3" }
  ],
  "Asia": [
    { name: "Черешов Цвят", color: "Бледо Розово", desc: "Мимолетната красота на японската пролет.", hex: "#ffb7c5" },
    { name: "Свещен Лотос", color: "Розово/Бяло", desc: "Свещен израстване от тинявите води.", hex: "#ffc0cb" },
    { name: "Хризантема", color: "Златно", desc: "Имперският символ на есента.", hex: "#daa520" },
    { name: "Плумерия", color: "Бяло/Жълто", desc: "Тропически аромат на топъл бриз.", hex: "#fffff0" },
    { name: "Синьо Мак", color: "Небесно Синьо", desc: "Хималайска рядкост, докосваща небето.", hex: "#87ceeb" }
  ],
  "Australia/Oceania": [
    { name: "Варата", color: "Тъмночервено", desc: "Смело червено сърце на австралийския храсталак.", hex: "#dc143c" },
    { name: "Кенгурова Лапа", color: "Червено/Зелено", desc: "Уникална кадифена текстура на запада.", hex: "#8b0000" },
    { name: "Пустинен Грах на Стърт", color: "Червено/Черно", desc: "Драматични сълзи върху суха земя.", hex: "#800000" },
    { name: "Златна Акация", color: "Жълто", desc: "Национален пух от чиста слънчева светлина.", hex: "#ffd700" },
    { name: "Орхидея от Кукутаун", color: "Розово", desc: "Тропическа елегантност в жегата.", hex: "#da70d6" }
  ]
};

interface Props {
  continent: string;
  onClose: () => void;
}

const FlowerPanel = ({ continent, onClose }: Props) => {
  const flowers = FLOWER_DATA[continent] || FLOWER_DATA["Asia"];
  const displayName = CONTINENT_BG[continent] || continent;

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
            <h3 className="font-serif text-2xl text-primary">{displayName}</h3>
            <button
              data-testid="button-close-panel"
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
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
                    className="w-4 h-4 rounded-full shadow-sm flex-shrink-0"
                    style={{ backgroundColor: flower.hex, boxShadow: `0 0 10px ${flower.hex}80` }}
                  />
                  <h4 className="font-serif text-lg text-foreground/90">{flower.name}</h4>
                </div>
                <p className="text-xs text-primary/60 pl-7 mb-1 uppercase tracking-wider">{flower.color}</p>
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
