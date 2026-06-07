import { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerPanel, { FlowerEntry } from './FlowerPanel';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const R = '/images/gallery-2.png';   // Rose
const O = '/images/gallery-1.png';   // Orchid
const L = '/images/gallery-3.png';   // Lotus
const FL = '/images/gallery-4.png';  // Flame Lily / tropical
const BP = '/images/gallery-5.png';  // Blue Poppy
const PR = '/images/gallery-6.png';  // Protea
const CP = '/images/gallery-7.png';  // Crimson Poppy / red
const LV = '/images/gallery-8.png';  // Lavender
const CB = '/images/gallery-9.png';  // Cherry Blossom

interface CountryData {
  displayName: string;
  flowers: FlowerEntry[];
}

const COUNTRY_DATA: Record<string, CountryData> = {
  "Bulgaria": {
    displayName: "България",
    flowers: [
      { name: "Казанлъшка Роза", desc: "Националният символ на България — розова и ароматна, сърцето на Розовата долина.", hex: "#dc143c", image: R },
      { name: "Лавандула", desc: "Ароматните сини полета на Тракийската равнина.", hex: "#e6e6fa", image: LV },
      { name: "Слънчоглед", desc: "Символ на слънце и жизнерадост, украсяващ полетата.", hex: "#ffd700", image: CP },
    ]
  },
  "Japan": {
    displayName: "Япония",
    flowers: [
      { name: "Черешов Цвят (Сакура)", desc: "Мимолетният символ на японската пролет и преходността на живота.", hex: "#ffb7c5", image: CB },
      { name: "Хризантема", desc: "Имперският цвят на Япония, символ на дълголетие и прераждане.", hex: "#daa520", image: L },
      { name: "Глициния", desc: "Водопади от лилави цветове, обвиващи стари храмове.", hex: "#9370db", image: O },
    ]
  },
  "France": {
    displayName: "Франция",
    flowers: [
      { name: "Лавандула от Прованс", desc: "Безкрайните лилави полета на Прованс — символ на Франция.", hex: "#e6e6fa", image: LV },
      { name: "Ирис", desc: "Кралският символ на Франция (Fleur-de-lis), цвят на вярата и мъдростта.", hex: "#483d8b", image: O },
      { name: "Роза", desc: "Класическата романтична роза, отглеждана из долините на Нормандия.", hex: "#dc143c", image: R },
    ]
  },
  "Netherlands": {
    displayName: "Холандия",
    flowers: [
      { name: "Лале", desc: "Холандският национален символ — в хиляди цветове и форми.", hex: "#ff69b4", image: R },
      { name: "Нарцис", desc: "Хералдът на пролетта, украсяващ кеалите на Амстердам.", hex: "#ffd700", image: CP },
      { name: "Зюмбюл", desc: "Ароматните лилавосини звездички на холандските градини.", hex: "#b0a0d0", image: LV },
    ]
  },
  "United States of America": {
    displayName: "САЩ",
    flowers: [
      { name: "Дива Прерийна Роза", desc: "Символ на любов и широките американски равнини.", hex: "#ffb6c1", image: R },
      { name: "Калифорнийски Мак", desc: "Щатското цвете на Калифорния — огненооранжев и свободен.", hex: "#ffa500", image: CP },
      { name: "Слънчоглед", desc: "Величественото злато на канзаските полета.", hex: "#ffd700", image: FL },
    ]
  },
  "Brazil": {
    displayName: "Бразилия",
    flowers: [
      { name: "Амазонска Орхидея", desc: "Екзотична рядкост от дълбините на Амазония.", hex: "#a32cc4", image: O },
      { name: "Хеликония", desc: "Тропически пламък, блестящ в дъждовната гора.", hex: "#ff4500", image: FL },
      { name: "Страстен Цвят", desc: "Сложен и духовен, с мистична красота.", hex: "#ee82ee", image: O },
    ]
  },
  "South Africa": {
    displayName: "Южна Африка",
    flowers: [
      { name: "Кралска Протея", desc: "Величественият национален цвят на Южна Африка.", hex: "#ff6b6b", image: PR },
      { name: "Пламтяща Лилия", desc: "Национален огън, пълзящ по храстите на савана.", hex: "#ff0000", image: FL },
      { name: "Африканска Виолетка", desc: "Миниатюрна лилава красота от сянката на Кейп.", hex: "#9400d3", image: O },
    ]
  },
  "India": {
    displayName: "Индия",
    flowers: [
      { name: "Свещен Лотос", desc: "Националният цвят на Индия — символ на чистота и просвещение.", hex: "#ffc0cb", image: L },
      { name: "Жасмин", desc: "Ароматният символ на брачните церемонии и преклонението.", hex: "#fffff0", image: CB },
      { name: "Мариголд (Невен)", desc: "Свещеният оранжев цвят на индийските фестивали.", hex: "#ffa500", image: CP },
    ]
  },
  "China": {
    displayName: "Китай",
    flowers: [
      { name: "Пеонова Роза", desc: "Националният цвят на Китай — кралица на цветята.", hex: "#ff69b4", image: R },
      { name: "Хризантема", desc: "Символ на дълголетие и благородство в китайската традиция.", hex: "#daa520", image: L },
      { name: "Слива (Пруна)", desc: "Издръжливостта и надеждата сред зимния студ.", hex: "#ffb6c1", image: CB },
    ]
  },
  "Australia": {
    displayName: "Австралия",
    flowers: [
      { name: "Варата", desc: "Смелото червено сърце на австралийската буш.", hex: "#dc143c", image: FL },
      { name: "Кенгурова Лапа", desc: "Уникална кадифена текстура, ендемична за Западна Австралия.", hex: "#8b0000", image: PR },
      { name: "Златна Акация", desc: "Националният жълт символ на Австралия.", hex: "#ffd700", image: CP },
    ]
  },
  "Russia": {
    displayName: "Русия",
    flowers: [
      { name: "Ромашка", desc: "Националният символ на Русия — бяло и чисто.", hex: "#fffff0", image: CB },
      { name: "Слънчоглед", desc: "Огромните слънчогледови полета на Украина и Русия.", hex: "#ffd700", image: FL },
      { name: "Лале", desc: "Пролетен вестник на степите и парковете.", hex: "#ff6347", image: R },
    ]
  },
  "Italy": {
    displayName: "Италия",
    flowers: [
      { name: "Роза", desc: "Класическата романтична роза на Тоскана.", hex: "#dc143c", image: R },
      { name: "Лилия", desc: "Символ на Флоренция и чистотата на Ренесанса.", hex: "#fffff0", image: CB },
      { name: "Мак", desc: "Алените маково полета на Умбрия.", hex: "#ff0000", image: CP },
    ]
  },
  "Spain": {
    displayName: "Испания",
    flowers: [
      { name: "Карамфил", desc: "Националният цвят на Испания — символ на страстта.", hex: "#dc143c", image: R },
      { name: "Нарцис", desc: "Жълтото пролетно вестничество на иберийските хълмове.", hex: "#ffd700", image: CP },
      { name: "Бугенвилия", desc: "Виолетово-розово водопадите покриват белите стени.", hex: "#ff1493", image: O },
    ]
  },
  "United Kingdom": {
    displayName: "Великобритания",
    flowers: [
      { name: "Английска Роза", desc: "Националният символ на Англия — вечна и елегантна.", hex: "#dc143c", image: R },
      { name: "Лавандула", desc: "Ароматните английски градини в края на юни.", hex: "#e6e6fa", image: LV },
      { name: "Синя Камбанка", desc: "Горскосините килими на англйиската буковина.", hex: "#4169e1", image: BP },
    ]
  },
  "Germany": {
    displayName: "Германия",
    flowers: [
      { name: "Метличина", desc: "Националният цвят на Германия — синьо и скромно.", hex: "#1e90ff", image: BP },
      { name: "Лайка", desc: "Бели цветчета на германските ливади и медицина.", hex: "#fffff0", image: CB },
      { name: "Роза", desc: "Символът на Хамбург и романтиката.", hex: "#ff6b6b", image: R },
    ]
  },
  "Mexico": {
    displayName: "Мексико",
    flowers: [
      { name: "Далия", desc: "Националният цвят на Мексико — многоцветна и богата.", hex: "#ff4500", image: FL },
      { name: "Невен (Цемпоасучитъл)", desc: "Свещеният оранжев цвят на Деня на мъртвите.", hex: "#ffa500", image: CP },
      { name: "Бугенвилия", desc: "Тропическите розови сенки на мексиканските улици.", hex: "#ff1493", image: O },
    ]
  },
  "Peru": {
    displayName: "Перу",
    flowers: [
      { name: "Кантута", desc: "Свещеният цвят на инките — национален символ.", hex: "#ff69b4", image: R },
      { name: "Орхидея на Андите", desc: "Рядка красота от облачните гори на Андите.", hex: "#a32cc4", image: O },
      { name: "Страстен Цвят", desc: "Духовен символ, цъфтящ из амазонките склонове.", hex: "#ee82ee", image: O },
    ]
  },
  "Colombia": {
    displayName: "Колумбия",
    flowers: [
      { name: "Каталея Орхидея", desc: "Националният цвят на Колумбия — кралицата на орхидеите.", hex: "#c471ed", image: O },
      { name: "Хеликония", desc: "Тропическата птица на рая в яркочервено.", hex: "#ff4500", image: FL },
      { name: "Роза от Богота", desc: "Колумбия е световен лидер в износа на рози.", hex: "#dc143c", image: R },
    ]
  },
  "Kenya": {
    displayName: "Кения",
    flowers: [
      { name: "Роза", desc: "Кения е един от най-големите износители на рози в света.", hex: "#dc143c", image: R },
      { name: "Протея", desc: "Величественият цвят на кенийските планини.", hex: "#ff6b6b", image: PR },
      { name: "Лилия Нилска", desc: "Водната лилия на езерата Виктория и Нарок.", hex: "#ffc0cb", image: L },
    ]
  },
  "Morocco": {
    displayName: "Мароко",
    flowers: [
      { name: "Роза от Долината", desc: "Долината на Дадес произвежда уникални марокански рози.", hex: "#ff69b4", image: R },
      { name: "Жасмин", desc: "Ароматът на мароканските пазари и градини.", hex: "#fffff0", image: CB },
      { name: "Лавандула", desc: "Планинска лавандула от Атласките върхове.", hex: "#e6e6fa", image: LV },
    ]
  },
  "Turkey": {
    displayName: "Турция",
    flowers: [
      { name: "Лале", desc: "Именно в Турция е роден лалето преди да стигне Холандия.", hex: "#ff0000", image: R },
      { name: "Роза", desc: "Розите на Анадола са сред най-ароматните в света.", hex: "#dc143c", image: R },
      { name: "Жасмин", desc: "Бял жасмин, обвиващ старите стени на Истанбул.", hex: "#fffff0", image: CB },
    ]
  },
  "Greece": {
    displayName: "Гърция",
    flowers: [
      { name: "Бугенвилия", desc: "Розово-лилавите водопади по белите стени на Санторини.", hex: "#ff1493", image: O },
      { name: "Дива Маргаритка", desc: "Бели маргаритки по олимпийските хълмове.", hex: "#fffff0", image: CB },
      { name: "Мак", desc: "Алените полета на Аттика и Крит.", hex: "#ff0000", image: CP },
    ]
  },
  "Thailand": {
    displayName: "Тайланд",
    flowers: [
      { name: "Орхидея", desc: "Тайланд е водещ износител на тропически орхидеи.", hex: "#c471ed", image: O },
      { name: "Жасмин", desc: "Символ на майчината любов в тайландската традиция.", hex: "#fffff0", image: CB },
      { name: "Лотос", desc: "Свещеният цвят на будистките храмове и езера.", hex: "#ffc0cb", image: L },
    ]
  },
  "Indonesia": {
    displayName: "Индонезия",
    flowers: [
      { name: "Жасмин (Мелати)", desc: "Националният цвят на Индонезия — символ на чистота.", hex: "#fffff0", image: CB },
      { name: "Рафлезия", desc: "Най-голямото цвете в света, расте само в Суматра.", hex: "#8b0000", image: FL },
      { name: "Черешова Орхидея", desc: "Тропическа елегантност сред индонезийската джунгла.", hex: "#da70d6", image: O },
    ]
  },
  "New Zealand": {
    displayName: "Нова Зеландия",
    flowers: [
      { name: "Коурикарека", desc: "Бялото цвете на новозеландските планини.", hex: "#f8f8ff", image: CB },
      { name: "Манука", desc: "Малкото бяло цвете, чиито мед е световно известен.", hex: "#ffc0cb", image: CB },
      { name: "Ратаниа", desc: "Алено дърво цвят, символ на Новата Зеландия.", hex: "#dc143c", image: FL },
    ]
  },
  "Canada": {
    displayName: "Канада",
    flowers: [
      { name: "Западна Анемона", desc: "Провинциалното цвете на Британска Колумбия.", hex: "#dda0dd", image: O },
      { name: "Майски Крин", desc: "Малкото бяло горско цветче на канадската тайга.", hex: "#fffff0", image: CB },
      { name: "Мочурна Роза", desc: "Символ на Алберта — дива и устойчива.", hex: "#ffb6c1", image: R },
    ]
  },
  "Argentina": {
    displayName: "Аржентина",
    flowers: [
      { name: "Цейбо (Ceibo)", desc: "Националният цвят на Аржентина — ярко червен.", hex: "#dc143c", image: FL },
      { name: "Жасмин Жълт", desc: "Ароматно жълто цвете из аржентинските лозя.", hex: "#ffd700", image: CP },
      { name: "Роза Патагонска", desc: "Диви рози, цъфтящи из патагонските пампаси.", hex: "#ff69b4", image: R },
    ]
  },
  "Egypt": {
    displayName: "Египет",
    flowers: [
      { name: "Лотос", desc: "Свещеният цвят на Древен Египет — символ на сътворението.", hex: "#ffc0cb", image: L },
      { name: "Жасмин", desc: "Ароматното бяло цвете на египетските пазари.", hex: "#fffff0", image: CB },
      { name: "Хибискус", desc: "Червен хибискус — основа на популярния каркаде чай.", hex: "#dc143c", image: CP },
    ]
  },
  "Iran": {
    displayName: "Иран",
    flowers: [
      { name: "Роза Ширазка", desc: "Иран е родина на розата — Шираз е прочут с ароматните си рози.", hex: "#dc143c", image: R },
      { name: "Лале", desc: "Персийското лале е вдъхновило холандската лалева мания.", hex: "#ff0000", image: R },
      { name: "Нарцис", desc: "Персийски символ на Новата година (Ноуруз).", hex: "#ffd700", image: CP },
    ]
  },
  "Ukraine": {
    displayName: "Украйна",
    flowers: [
      { name: "Слънчоглед", desc: "Националният символ на Украйна — жълт като слънце.", hex: "#ffd700", image: FL },
      { name: "Калина", desc: "Свещеният цвят на украинската народна песен и традиция.", hex: "#ff0000", image: CP },
      { name: "Роза", desc: "Червена роза — символ на украинската любов.", hex: "#dc143c", image: R },
    ]
  },
  "Poland": {
    displayName: "Полша",
    flowers: [
      { name: "Мак", desc: "Алените полски макове — символ на паметта и свободата.", hex: "#dc143c", image: CP },
      { name: "Метличина", desc: "Сини метличини из полските ниви.", hex: "#4169e1", image: BP },
      { name: "Лале", desc: "Пролетните лалета на варшавските паркове.", hex: "#ff6347", image: R },
    ]
  },
  "Sweden": {
    displayName: "Швеция",
    flowers: [
      { name: "Лингонова Роза", desc: "Дива горска роза из шведската тайга.", hex: "#ffb6c1", image: R },
      { name: "Лалугер", desc: "Националното цвете на Швеция — бяло и скромно.", hex: "#f8f8ff", image: CB },
      { name: "Лавандула", desc: "Скандинавска лавандула от Готланд.", hex: "#e6e6fa", image: LV },
    ]
  },
  "Portugal": {
    displayName: "Португалия",
    flowers: [
      { name: "Лавандула", desc: "Лавандулови полета из Алентежо.", hex: "#e6e6fa", image: LV },
      { name: "Роза", desc: "Португалски рози от Вила Нова де Гая.", hex: "#dc143c", image: R },
      { name: "Жасмин", desc: "Ароматен жасмин, покриващ лисабонските зидове.", hex: "#fffff0", image: CB },
    ]
  },
};

const HAS_DATA_COLOR = "#2d5a2d";
const HAS_DATA_HOVER = "#4a8c4a";
const DEFAULT_COLOR = "#1a2e1a";
const DEFAULT_HOVER = "#2d4a2d";
const SELECTED_COLOR = "#c9a84c";

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  const handleClick = (countryName: string) => {
    if (COUNTRY_DATA[countryName]) {
      setSelectedCountry(countryName);
    }
  };

  return (
    <div className="relative w-full min-h-[520px] bg-card/20 rounded-xl overflow-hidden border border-white/5">
      <div className="text-center pt-4 pb-2">
        <p className="text-xs uppercase tracking-widest text-foreground/40">
          Кликнете върху страна, за да видите нейните характерни цветя
        </p>
      </div>

      <ComposableMap
        projectionConfig={{ scale: 145, center: [10, 15] }}
        className="w-full"
        style={{ height: '520px' }}
      >
        <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={6}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name;
                const hasData = !!COUNTRY_DATA[name];
                const isSelected = selectedCountry === name;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(name)}
                    onMouseEnter={(e) => {
                      if (hasData) {
                        setTooltip({ name, x: e.clientX, y: e.clientY });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill: isSelected ? SELECTED_COLOR : hasData ? HAS_DATA_COLOR : DEFAULT_COLOR,
                        stroke: hasData ? "#3d7a3d" : "#1f3a1f",
                        strokeWidth: hasData ? 0.7 : 0.4,
                        outline: "none",
                        transition: "all 0.2s ease",
                      },
                      hover: {
                        fill: isSelected ? SELECTED_COLOR : hasData ? HAS_DATA_HOVER : DEFAULT_HOVER,
                        stroke: hasData ? "#c9a84c" : "#2d4a2d",
                        strokeWidth: hasData ? 1 : 0.4,
                        outline: "none",
                        cursor: hasData ? "pointer" : "default",
                        filter: hasData ? "drop-shadow(0 0 6px rgba(201,168,76,0.4))" : "none",
                      },
                      pressed: {
                        fill: SELECTED_COLOR,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div className="flex items-center gap-6 justify-center pb-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: HAS_DATA_COLOR, border: '1px solid #3d7a3d' }} />
          <span className="text-xs text-foreground/50 uppercase tracking-widest">Налични данни</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SELECTED_COLOR }} />
          <span className="text-xs text-foreground/50 uppercase tracking-widest">Избрана страна</span>
        </div>
      </div>

      <AnimatePresence>
        {selectedCountry && COUNTRY_DATA[selectedCountry] && (
          <FlowerPanel
            country={selectedCountry}
            displayName={COUNTRY_DATA[selectedCountry].displayName}
            flowers={COUNTRY_DATA[selectedCountry].flowers}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tooltip && !selectedCountry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 pointer-events-none bg-card border border-primary/30 px-3 py-1.5 rounded-sm text-sm font-serif text-primary shadow-lg"
            style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
          >
            {COUNTRY_DATA[tooltip.name]?.displayName || tooltip.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldMap;
