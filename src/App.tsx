import React, { useState, useCallback, useEffect } from "react"
import {
  Shuffle,
  Combine,
  Eye,
  EyeOff,
  BookOpen,
  LayoutGrid,
  HeartPulse,
  Layers,
  Activity,
  Target,
} from "lucide-react"

// ─── Data: 8 Basic Emotions + Actor Data ────────────────────────────
interface Emotion {
  id: string
  name: { pl: string; en: string }
  desc: { pl: string; en: string }
  impulse: { pl: string; en: string }
  action: { pl: string; en: string }
  color: string
  bgColor: string
  hex: string
  symbol: (className: string) => React.ReactNode
}

const EMOTIONS: Emotion[] = [
  {
    id: "JOY",
    name: { pl: "Radość", en: "Joy" },
    desc: {
      pl: "Stan szczęścia. Sygnał bezpieczeństwa i zasobów.",
      en: "State of happiness. Signal of safety and resources.",
    },
    impulse: { pl: "Ekspansja / Energia", en: "Expansion / Energy" },
    action: { pl: "Popisywanie się / Zaloty", en: "Showing off / Courtship" },
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    hex: "#eab308",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="20" fill="currentColor" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="20"
            x2="50"
            y2="5"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
      </svg>
    ),
  },
  {
    id: "TRUST",
    name: { pl: "Zaufanie", en: "Trust" },
    desc: {
      pl: "Akceptacja i otwartość. Decyzja o otwarciu granic.",
      en: "Acceptance and openness. Decision to open boundaries.",
    },
    impulse: { pl: "Rozluźnienie / Ciepło", en: "Relaxation / Warmth" },
    action: { pl: "Więź / Intymność", en: "Bonding / Intimacy" },
    color: "text-lime-500",
    bgColor: "bg-lime-500",
    hex: "#84cc16",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M20,50 Q50,80 80,50 Q50,20 20,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="12" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "FEAR",
    name: { pl: "Strach", en: "Fear" },
    desc: {
      pl: "Reakcja na zagrożenie. Rozpoznanie siły wyższej od siebie.",
      en: "Reaction to a threat. Recognizing a force greater than oneself.",
    },
    impulse: { pl: "Napięcie / Kurczenie się", en: "Tension / Contraction" },
    action: { pl: "Ucieczka / Ochrona", en: "Escape / Protection" },
    color: "text-emerald-600",
    bgColor: "bg-emerald-600",
    hex: "#059669",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M50,90 L20,20 L50,40 L80,20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="65" r="5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "SURPRISE",
    name: { pl: "Zaskoczenie", en: "Surprise" },
    desc: {
      pl: "Reakcja na nowe bodźce. Reset uwagi w celu oceny sytuacji.",
      en: "Reaction to new stimuli. Resetting attention to assess the situation.",
    },
    impulse: { pl: "Wdech / Zatrzymanie", en: "Inhale / Freezing" },
    action: { pl: "Orientacja / Stop", en: "Orientation / Stop" },
    color: "text-cyan-500",
    bgColor: "bg-cyan-500",
    hex: "#06b6d4",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="10 10"
        />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "SADNESS",
    name: { pl: "Smutek", en: "Sadness" },
    desc: {
      pl: "Odczucie utraty. Oszczędzanie energii i wołanie o wsparcie.",
      en: "Feeling of loss. Conserving energy and calling for support.",
    },
    impulse: { pl: "Ciężar / Zapadanie", en: "Heaviness / Sinking" },
    action: { pl: "Reintegracja / Bezruch", en: "Reintegration / Stillness" },
    color: "text-blue-600",
    bgColor: "bg-blue-600",
    hex: "#2563eb",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M50,20 C80,20 80,60 50,90 C20,60 20,20 50,20 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M50,40 C65,40 65,70 50,85 C35,70 35,40 50,40 Z"
          fill="none"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    id: "DISGUST",
    name: { pl: "Wstręt", en: "Disgust" },
    desc: {
      pl: "Odrzucenie szkodliwego bodźca. Ochrona przed zatruciem.",
      en: "Rejection of a harmful stimulus. Protection against poisoning.",
    },
    impulse: { pl: "Mdłości / Odcięcie", en: "Nausea / Cutting off" },
    action: { pl: "Odrzucenie / Wypychanie", en: "Rejection / Pushing away" },
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    hex: "#a855f7",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M30,30 Q50,70 70,30 M20,50 Q50,90 80,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="50" cy="20" r="8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "ANGER",
    name: { pl: "Gniew", en: "Anger" },
    desc: {
      pl: "Reakcja na przeszkodę. Mobilizacja energii do jej pokonania.",
      en: "Reaction to an obstacle. Mobilization of energy to overcome it.",
    },
    impulse: { pl: "Gorąco / Adrenalina", en: "Heat / Adrenaline" },
    action: { pl: "Destrukcja / Atak", en: "Destruction / Attack" },
    color: "text-red-600",
    bgColor: "bg-red-600",
    hex: "#dc2626",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M20,20 L80,80 M80,20 L20,80"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "ANTICIPATION",
    name: { pl: "Przeczuwanie", en: "Anticipation" },
    desc: {
      pl: "Oczekiwanie i badanie terytorium. Skanowanie otoczenia.",
      en: "Expecting and exploring territory. Scanning the environment.",
    },
    impulse: { pl: "Wyostrzenie zmysłów", en: "Sharpening of senses" },
    action: { pl: "Eksploracja / Tropienie", en: "Exploration / Tracking" },
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    hex: "#f97316",
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M20,50 L70,50 M60,30 L80,50 L60,70"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="50" r="8" fill="currentColor" />
      </svg>
    ),
  },
]

// ─── Dyads Logic ──────────────────────────────────────────────────
interface DyadResult {
  name: { pl: string; en: string }
  type: "primary" | "secondary" | "tertiary" | "opposite"
}

const getDyad = (e1Id: string, e2Id: string): DyadResult | null => {
  if (e1Id === e2Id) return null
  const pair = [e1Id, e2Id].sort().join("+")
  const dyads: Record<string, DyadResult> = {
    "JOY+TRUST": { name: { pl: "Miłość", en: "Love" }, type: "primary" },
    "FEAR+TRUST": {
      name: { pl: "Uległość", en: "Submission" },
      type: "primary",
    },
    "FEAR+SURPRISE": {
      name: { pl: "Poruszenie", en: "Alarm" },
      type: "primary",
    },
    "SADNESS+SURPRISE": {
      name: { pl: "Rozczarowanie", en: "Disappointment" },
      type: "primary",
    },
    "DISGUST+SADNESS": { name: { pl: "Żal", en: "Remorse" }, type: "primary" },
    "ANGER+DISGUST": {
      name: { pl: "Zawiść", en: "Contempt/Envy" },
      type: "primary",
    },
    "ANGER+ANTICIPATION": {
      name: { pl: "Agresja", en: "Aggression" },
      type: "primary",
    },
    "ANTICIPATION+JOY": {
      name: { pl: "Optymizm", en: "Optimism" },
      type: "primary",
    },
    "FEAR+JOY": {
      name: { pl: "Poczucie winy", en: "Guilt" },
      type: "secondary",
    },
    "SURPRISE+TRUST": {
      name: { pl: "Ciekawość", en: "Curiosity" },
      type: "secondary",
    },
    "FEAR+SADNESS": {
      name: { pl: "Rozpacz", en: "Despair" },
      type: "secondary",
    },
    "DISGUST+SURPRISE": {
      name: { pl: "Szok", en: "Shock" },
      type: "secondary",
    },
    "ANGER+SADNESS": {
      name: { pl: "Cierpienie", en: "Misery" },
      type: "secondary",
    },
    "ANTICIPATION+DISGUST": {
      name: { pl: "Cynizm", en: "Cynicism" },
      type: "secondary",
    },
    "ANGER+JOY": { name: { pl: "Duma", en: "Pride" }, type: "secondary" },
    "ANTICIPATION+TRUST": {
      name: { pl: "Fatalizm", en: "Fatalism" },
      type: "secondary",
    },
    "JOY+SURPRISE": {
      name: { pl: "Zachwyt", en: "Delight" },
      type: "tertiary",
    },
    "SADNESS+TRUST": {
      name: { pl: "Sentymentalizm", en: "Sentimentality" },
      type: "tertiary",
    },
    "DISGUST+FEAR": { name: { pl: "Wstyd", en: "Shame" }, type: "tertiary" },
    "ANGER+SURPRISE": {
      name: { pl: "Oburzenie", en: "Outrage" },
      type: "tertiary",
    },
    "ANTICIPATION+SADNESS": {
      name: { pl: "Pesymizm", en: "Pessimism" },
      type: "tertiary",
    },
    "DISGUST+JOY": {
      name: { pl: "Patologia", en: "Morbidness" },
      type: "tertiary",
    },
    "ANGER+TRUST": {
      name: { pl: "Dominacja", en: "Dominance" },
      type: "tertiary",
    },
    "ANTICIPATION+FEAR": {
      name: { pl: "Lęk", en: "Anxiety" },
      type: "tertiary",
    },
    "JOY+SADNESS": {
      name: { pl: "Konflikt", en: "Conflict" },
      type: "opposite",
    },
    "DISGUST+TRUST": {
      name: { pl: "Konflikt", en: "Conflict" },
      type: "opposite",
    },
    "ANGER+FEAR": {
      name: { pl: "Konflikt", en: "Conflict" },
      type: "opposite",
    },
    "ANTICIPATION+SURPRISE": {
      name: { pl: "Konflikt", en: "Conflict" },
      type: "opposite",
    },
  }
  return dyads[pair] || null
}

// ─── App Component ────────────────────────────────────────────────
const App: React.FC = () => {
  const [lang, setLang] = useState<"pl" | "en">("pl")
  const [view, setView] = useState<
    "shuffle" | "dyads" | "manifesto" | "catalog"
  >("shuffle")
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(EMOTIONS[0])
  const [dyadPair, setDyadPair] = useState<[Emotion, Emotion]>([
    EMOTIONS[0],
    EMOTIONS[1],
  ])
  const [stageMode, setStageMode] = useState<"light" | "dark">("light")
  const [isSpinning, setIsSpinning] = useState(false)

  const toggleLang = () => setLang((l) => (l === "pl" ? "en" : "pl"))
  const toggleStage = () =>
    setStageMode((s) => (s === "light" ? "dark" : "light"))

  const handleShuffle = useCallback(() => {
    setIsSpinning(true)
    setTimeout(() => {
      const next = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
      setCurrentEmotion(next)
      setIsSpinning(false)
    }, 400) // Czas trwania animacji losowania
  }, [])

  const handleRandomDyad = useCallback(() => {
    const next1 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    let next2 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    while (next1.id === next2.id) {
      next2 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    }
    setDyadPair([next1, next2])
  }, [])

  const isDark = stageMode === "dark"

  return (
    <div
      className={`min-h-screen transition-colors duration-700 p-3 sm:p-6 md:p-8 flex flex-col items-center overflow-x-hidden ${
        isDark ? "bg-stone-950 text-stone-100" : "bg-stone-100 text-stone-900"
      }`}
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Niestandardowe style dla animacji obrotu ruletki */}
      <style>{`
        @keyframes roulette {
          0% { transform: scale(0.9) rotate(0deg); opacity: 0.5; filter: blur(4px); }
          50% { transform: scale(1.05) rotate(180deg); opacity: 0.8; filter: blur(2px); }
          100% { transform: scale(1) rotate(360deg); opacity: 1; filter: blur(0px); }
        }
        .animate-roulette {
          animation: roulette 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-6 md:mb-8 pt-2">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
            {lang === "pl" ? "Koło Emocji" : "Emotion Wheel"}
            <span className="text-[10px] sm:text-xs font-normal opacity-40 ml-1 sm:ml-2 border-l border-current pl-1 sm:pl-2">
              PLUTCHIK
            </span>
          </h1>
          <span className="text-[9px] sm:text-[10px] font-mono opacity-50 uppercase mt-1">
            {lang === "pl"
              ? "Aparat Aktorski & Teoria Ewolucyjna"
              : "Actor's Tool & Evolutionary Theory"}
          </span>
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={toggleStage}
            className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
              isDark ? "bg-stone-800 text-stone-200" : "bg-white text-stone-800"
            }`}
          >
            {isDark ? (
              <Eye size={16} className="sm:w-5 sm:h-5" />
            ) : (
              <EyeOff size={16} className="sm:w-5 sm:h-5" />
            )}
          </button>
          <button
            onClick={toggleLang}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
              isDark ? "bg-stone-800 text-stone-200" : "bg-white text-stone-800"
            }`}
          >
            {lang}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 sm:p-1.5 rounded-2xl w-full max-w-4xl transition-colors overflow-x-auto no-scrollbar scroll-smooth ${
          isDark ? "bg-stone-900" : "bg-stone-200/80"
        }`}
      >
        {(
          [
            {
              id: "shuffle" as const,
              icon: <Shuffle size={14} />,
              label: { pl: "LOSUJ", en: "SHUFFLE" },
            },
            {
              id: "dyads" as const,
              icon: <Combine size={14} />,
              label: { pl: "DIADY", en: "DYADS" },
            },
            {
              id: "catalog" as const,
              icon: <LayoutGrid size={14} />,
              label: { pl: "KATALOG", en: "CATALOG" },
            },
            {
              id: "manifesto" as const,
              icon: <BookOpen size={14} />,
              label: { pl: "TEORIA", en: "THEORY" },
            },
          ] as const
        ).map((nav) => (
          <button
            key={nav.id}
            onClick={() => setView(nav.id)}
            className={`flex-1 min-w-[75px] sm:min-w-[100px] flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 rounded-xl transition-all font-bold text-[9px] sm:text-[11px] tracking-widest cursor-pointer ${
              view === nav.id
                ? isDark
                  ? "bg-stone-700 shadow-lg text-white"
                  : "bg-white shadow-md text-stone-900"
                : "opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {React.cloneElement(nav.icon, {
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4",
            })}
            <span className="mt-0.5">{nav.label[lang]}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-4xl flex-grow flex flex-col items-center">
        {/* ─── SHUFFLE VIEW ─── */}
        {view === "shuffle" && (
          <div
            className="flex flex-col items-center w-full max-w-lg px-4"
            key="shuffle-view"
          >
            <div
              className={`w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 border-[8px] sm:border-[12px] rounded-full flex items-center justify-center p-10 sm:p-14 mb-6 sm:mb-8 transition-colors duration-500 relative overflow-hidden ${
                isDark
                  ? "bg-stone-900 border-stone-800 shadow-2xl shadow-black"
                  : "bg-white border-stone-100 shadow-2xl shadow-stone-300/50"
              } ${currentEmotion.color} ${isSpinning ? "animate-roulette" : ""}`}
            >
              <div className="relative z-10 w-full h-full drop-shadow-md">
                {currentEmotion.symbol("w-full h-full")}
              </div>
            </div>

            <div
              className="text-center mb-6 sm:mb-8 w-full transition-opacity duration-300"
              style={{ opacity: isSpinning ? 0 : 1 }}
            >
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3 ${currentEmotion.color}`}
              >
                {currentEmotion.name[lang]}
              </h2>
              <p
                className={`text-sm sm:text-base md:text-lg leading-tight font-medium mb-6 ${isDark ? "text-stone-400" : "text-stone-600"}`}
              >
                {currentEmotion.desc[lang]}
              </p>

              {/* Sekcja Somatyczna / Aktorska (Z drugiego pliku) */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-left">
                <div
                  className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-stone-900/50 border-stone-800" : "bg-white border-stone-200 shadow-sm"}`}
                >
                  <Activity className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                      {lang === "pl" ? "Impuls z ciała" : "Body Impulse"}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">
                      {currentEmotion.impulse[lang]}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-stone-900/50 border-stone-800" : "bg-white border-stone-200 shadow-sm"}`}
                >
                  <Target className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                      {lang === "pl" ? "Akcja / Zadanie" : "Action / Task"}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">
                      {currentEmotion.action[lang]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleShuffle}
              disabled={isSpinning}
              className={`w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer ${
                isDark
                  ? "bg-stone-100 text-stone-900 hover:bg-white"
                  : "bg-stone-900 text-white hover:bg-stone-800"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {lang === "pl" ? "LOSUJ EMOCJĘ" : "RANDOM EMOTION"}
            </button>
          </div>
        )}

        {/* ─── DYADS VIEW (MIKSER) ─── */}
        {view === "dyads" &&
          (() => {
            const result = getDyad(dyadPair[0].id, dyadPair[1].id)

            return (
              <div className="w-full flex flex-col items-center animate-slide-up px-2">
                <div className="text-center mb-6 sm:mb-8 max-w-lg">
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest opacity-40 mb-1 sm:mb-2">
                    {lang === "pl" ? "Mieszanina Emocji" : "Emotion Mixture"}
                  </h2>
                  <p className="text-xs sm:text-sm opacity-60 leading-relaxed px-4">
                    {lang === "pl"
                      ? "Emocje łączą się w diady tworząc złożone stany emocjonalne."
                      : "Emotions combine into dyads creating complex emotional states."}
                  </p>
                </div>

                {/* Mikser (Emocja 1 + Emocja 2) */}
                <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-6 mb-8 w-full max-w-3xl">
                  {/* Emotion 1 */}
                  <div
                    className={`flex flex-col items-center p-4 sm:p-6 rounded-3xl w-full sm:w-2/5 border-2 shadow-sm ${isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"}`}
                  >
                    <div
                      className={`w-20 h-20 sm:w-28 sm:h-28 mb-3 sm:mb-4 ${dyadPair[0].color}`}
                    >
                      {dyadPair[0].symbol("w-full h-full")}
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-black uppercase tracking-tight text-center ${dyadPair[0].color}`}
                    >
                      {dyadPair[0].name[lang]}
                    </h3>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black opacity-20 flex items-center justify-center py-2 sm:py-0">
                    +
                  </div>

                  {/* Emotion 2 */}
                  <div
                    className={`flex flex-col items-center p-4 sm:p-6 rounded-3xl w-full sm:w-2/5 border-2 shadow-sm ${isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"}`}
                  >
                    <div
                      className={`w-20 h-20 sm:w-28 sm:h-28 mb-3 sm:mb-4 ${dyadPair[1].color}`}
                    >
                      {dyadPair[1].symbol("w-full h-full")}
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-black uppercase tracking-tight text-center ${dyadPair[1].color}`}
                    >
                      {dyadPair[1].name[lang]}
                    </h3>
                  </div>
                </div>

                {/* Resulting Dyad z Gradientem */}
                <div
                  className={`w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-[2rem] text-center border-4 shadow-2xl mb-8 sm:mb-10 transition-all duration-500 ${
                    result?.type === "opposite"
                      ? "border-red-500/30"
                      : isDark
                        ? "border-stone-800"
                        : "border-white"
                  }`}
                  style={{
                    background:
                      result && result.type !== "opposite"
                        ? `linear-gradient(135deg, ${dyadPair[0].hex}22 0%, ${dyadPair[1].hex}22 100%)`
                        : isDark
                          ? "#1c1917"
                          : "#f5f5f4", // fallbacks
                  }}
                >
                  <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest opacity-60 mb-2 sm:mb-3">
                    {lang === "pl" ? "WYNIK (DIADA)" : "RESULT (DYAD)"}
                  </div>
                  {result ? (
                    <>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-3 sm:mb-4 tracking-tighter break-words hyphens-auto">
                        {result.name[lang]}
                      </h2>
                      <span
                        className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-sm ${
                          result.type === "primary"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                            : result.type === "secondary"
                              ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                              : result.type === "tertiary"
                                ? "bg-purple-500/20 text-purple-700 dark:text-purple-400"
                                : "bg-red-500/20 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {lang === "pl"
                          ? result.type === "primary"
                            ? "Podstawowa"
                            : result.type === "secondary"
                              ? "Drugorzędna"
                              : result.type === "tertiary"
                                ? "Trzeciorzędna"
                                : "Przeciwieństwo (Konflikt)"
                          : result.type === "primary"
                            ? "Primary"
                            : result.type === "secondary"
                              ? "Secondary"
                              : result.type === "tertiary"
                                ? "Tertiary"
                                : "Opposite (Conflict)"}
                      </span>
                    </>
                  ) : (
                    <h2 className="text-2xl sm:text-3xl font-black uppercase opacity-20">
                      ---
                    </h2>
                  )}
                </div>

                <div className="flex gap-4 w-full sm:w-auto">
                  <button
                    onClick={handleRandomDyad}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer ${
                      isDark
                        ? "bg-stone-100 text-stone-900 hover:bg-white"
                        : "bg-stone-900 text-white hover:bg-stone-800"
                    }`}
                  >
                    <Shuffle size={20} className="sm:w-6 sm:h-6" />
                    {lang === "pl" ? "LOSUJ PARĘ" : "RANDOM PAIR"}
                  </button>
                </div>
              </div>
            )
          })()}

        {/* ─── CATALOG VIEW ─── */}
        {view === "catalog" && (
          <div className="w-full animate-fade-in pb-8 sm:pb-12 px-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase mb-6 sm:mb-8 text-center tracking-widest opacity-40">
              {lang === "pl" ? "Katalog Podstawowy" : "Primary Catalog"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {EMOTIONS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setCurrentEmotion(item)
                    setView("shuffle")
                  }}
                  className={`group relative p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 flex flex-row sm:flex-col items-center sm:text-center gap-4 ${
                    isDark
                      ? "bg-stone-900 border-stone-800 hover:border-stone-600"
                      : "bg-white border-stone-200 hover:border-stone-900 shadow-sm hover:shadow-xl"
                  }`}
                >
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 p-2 sm:p-2.5 rounded-2xl transition-colors shrink-0 ${item.color} ${isDark ? "bg-black" : "bg-stone-50"}`}
                  >
                    {item.symbol("w-full h-full")}
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <h3
                      className={`font-black uppercase text-base sm:text-lg tracking-tight mb-1 sm:mb-2 ${item.color}`}
                    >
                      {item.name[lang]}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] leading-snug opacity-70 mb-2">
                      {item.desc[lang]}
                    </p>
                    <div className="inline-block px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-[8px] sm:text-[9px] uppercase font-bold tracking-wider opacity-60">
                      {item.action[lang]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MANIFESTO / THEORY VIEW ─── */}
        {view === "manifesto" && (
          <div className="w-full max-w-3xl animate-fade-in space-y-6 sm:space-y-8 pb-12 sm:pb-20 px-2 sm:px-0">
            {/* Intro Section */}
            <section
              className={`p-5 sm:p-8 rounded-3xl border-l-8 ${isDark ? "bg-stone-900 border-stone-500" : "bg-white border-stone-800 shadow-lg"}`}
            >
              <h3 className="text-lg sm:text-xl font-black uppercase mb-3 sm:mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-stone-500 shrink-0" />
                {lang === "pl"
                  ? "Teoria Emocji Plutchika"
                  : "Plutchik's Theory of Emotions"}
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed mb-3 sm:mb-4">
                {lang === "pl"
                  ? "W latach 1960-1980 amerykański psycholog Robert Plutchik opracował ewolucyjną teorię emocji. Zaproponował istnienie 8 emocji podstawowych. Są one wrodzone i bezpośrednio odnoszą się do zachowań adaptacyjnych, które mają na celu pomoc w przetrwaniu."
                  : "Between 1960-1980, American psychologist Robert Plutchik developed an evolutionary theory of emotion. He proposed the existence of 8 basic emotions. They are innate and directly relate to adaptive behaviors aimed at helping in survival."}
              </p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-50 font-bold bg-stone-500/10 inline-block px-3 py-1.5 rounded-lg">
                {lang === "pl"
                  ? "Z nich wynikają wszystkie inne emocje."
                  : "All other emotions stem from them."}
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Core Idea */}
              <section
                className={`p-5 sm:p-6 rounded-3xl ${isDark ? "bg-stone-900 border border-stone-800" : "bg-stone-50 border border-stone-200 shadow-sm"}`}
              >
                <h4 className="font-black uppercase text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2">
                  <Combine size={18} className="text-blue-500 shrink-0" />
                  {lang === "pl"
                    ? "Podstawowa idea i Diady"
                    : "Basic Idea and Dyads"}
                </h4>
                <p className="text-[11px] sm:text-xs leading-relaxed opacity-80">
                  {lang === "pl"
                    ? "Możemy przeżywać mieszaninę pierwotnych emocji. Łączenie ich w jedność tworzy bardziej złożone emocje zwane diadami. Emocje przeciwległe na kole są emocjami przeciwnymi i według Plutchika nie możemy doświadczać ich jednocześnie (tworzą konflikt)."
                    : "We can experience a mixture of primary emotions. Combining them into one creates more complex emotions called dyads. Opposite emotions on the wheel are contradictory and according to Plutchik, we cannot experience them at the same time (they create a conflict)."}
                </p>
              </section>

              {/* Survival */}
              <section
                className={`p-5 sm:p-6 rounded-3xl ${isDark ? "bg-stone-900 border border-stone-800" : "bg-stone-50 border border-stone-200 shadow-sm"}`}
              >
                <h4 className="font-black uppercase text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2">
                  <HeartPulse size={18} className="text-red-500 shrink-0" />
                  {lang === "pl"
                    ? "Znaczenie dla przetrwania"
                    : "Importance for Survival"}
                </h4>
                <p className="text-[11px] sm:text-xs leading-relaxed opacity-80">
                  {lang === "pl"
                    ? "Wydarzenia uruchamiają adekwatne emocje, co z kolei powoduje konkretne działania pasujące do bodźca. Na przykład: zjedzenie trującego obiektu aktywuje wstręt, co skutkuje wymiotowaniem, by pozbyć się zagrożenia."
                    : "Events trigger adequate emotions, which in turn cause specific actions matching the stimulus. For example: eating a toxic object activates disgust, which results in vomiting to get rid of the threat."}
                </p>
              </section>
            </div>

            {/* Postulates */}
            <section
              className={`p-5 sm:p-6 md:p-8 rounded-3xl ${isDark ? "bg-stone-900 border border-stone-800" : "bg-white border border-stone-200 shadow-md"}`}
            >
              <h4 className="font-black uppercase text-xs sm:text-sm mb-5 sm:mb-6 flex items-center gap-2">
                <Layers size={18} className="text-amber-500 shrink-0" />
                {lang === "pl"
                  ? "10 Postulatów Plutchika"
                  : "10 Postulates of Plutchik"}
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4 text-[11px] sm:text-xs opacity-80">
                {[
                  {
                    pl: "Emocje występują na wszystkich poziomach ewolucji (ludzie i zwierzęta).",
                    en: "Emotions apply to all evolutionary levels (humans and animals).",
                  },
                  {
                    pl: "Mają ewolucyjne podłoże i u różnych gatunków rozwinęły różne formy ekspresji.",
                    en: "They have an evolutionary basis and evolved different forms of expression.",
                  },
                  {
                    pl: "Pełnią rolę adaptacyjną, pomagając przetrwać zagrożenia.",
                    en: "They play an adaptive role, helping to survive threats.",
                  },
                  {
                    pl: "Mimo różnic, można zidentyfikować wspólne wzorce u gatunków.",
                    en: "Despite differences, common patterns can be identified across species.",
                  },
                  {
                    pl: "Istnieje niewielka liczba podstawowych, pierwotnych emocji.",
                    en: "There is a small number of basic, primary emotions.",
                  },
                  {
                    pl: "Wszystkie inne emocje to kombinacje i mieszaniny podstawowych.",
                    en: "All other emotions are combinations and mixtures of the basic ones.",
                  },
                  {
                    pl: "Pierwotne emocje to hipotetyczne konstrukty i stany idealne.",
                    en: "Primary emotions are hypothetical constructs and ideal states.",
                  },
                  {
                    pl: "Można je scharakteryzować jako pary biegunowych przeciwieństw.",
                    en: "They can be characterized as pairs of polar opposites.",
                  },
                  {
                    pl: "Emocje różnią się stopniem podobieństwa do siebie.",
                    en: "Emotions vary in their degree of similarity to one another.",
                  },
                  {
                    pl: "Każda emocja ma różne stopnie natężenia i pobudzenia.",
                    en: "Each emotion can exist in varying degrees of intensity and arousal.",
                  },
                ].map((postulate, idx) => (
                  <li key={idx} className="flex gap-2.5 sm:gap-3 items-start">
                    <span className="font-black text-amber-500 w-3 sm:w-4 shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <span className="leading-relaxed">{postulate[lang]}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 text-center w-full max-w-md pb-6 sm:pb-8">
        <div
          className={`text-[9px] sm:text-[10px] font-mono px-3 py-1.5 sm:px-4 sm:py-2 rounded border inline-block ${
            isDark
              ? "border-stone-800 text-stone-500"
              : "border-stone-200 text-stone-400"
          }`}
        >
          {lang === "pl" ? "MODEL TRÓJWYMIAROWY:" : "3D MODEL:"}
          <span className="ml-1 opacity-80 break-words">
            {lang === "pl"
              ? "Intensywność, Podobieństwo, Przeciwieństwo."
              : "Intensity, Similarity, Polarity."}
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
