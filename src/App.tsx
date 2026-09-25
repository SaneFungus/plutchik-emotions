import React, { useState, useCallback, useEffect, useRef } from "react"
import {
  Shuffle,
  Combine,
  BookOpen,
  LayoutGrid,
  Layers,
  Activity,
  Target,
  Sun,
  Moon,
  Move,
  Fingerprint,
  BarChart2,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  Drama,
  X
} from "lucide-react"
import { EMOTIONS } from "./tresc/emocje"
import { THEORY } from "./tresc/teoria"
import { getDyad, DYAD_TYPE_LABELS } from "./tresc/diady"
import { uiTranslations, PAGE_TITLE } from "./tresc/interfejs"
import { MECHANISM_STEPS, type Emotion, type L, type MechanismStep } from "./tresc/typy"
import { hashFor, parseHash, type View } from "./lib/adres"
import { loadSettings, saveSettings } from "./lib/ustawienia"
import { DYAD_ALPHA, mixHex } from "./lib/kolory"
import { rich } from "./lib/tekst"

// ─── Sub-components ───────────────────────────────────────────────

// Łańcuch Bodziec → Impuls → Emocja → Działanie → Cel. Cztery etapy (bez "Emocji") to przyciski:
// klik rozwija wyjaśnienie tuż pod etapem (na telefonie) albo pod całym rzędem (od md).
// Świadomie NIE osobny modal: to już jest okno dialogowe, a okno w oknie na telefonie
// zasłania łańcuch, który właśnie się czyta, i komplikuje gest "wstecz".
const EvoChain = ({ emotion, lang, isDark }: { emotion: Emotion, lang: 'pl'|'en', isDark: boolean }) => {
  const t = uiTranslations[lang].modal
  const [open, setOpen] = useState<MechanismStep | null>(null)
  const stepRefs = useRef<Partial<Record<MechanismStep, HTMLButtonElement | null>>>({})
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollToPanel = useRef(false)

  // Nowa emocja = łańcuch od zera
  useEffect(() => { setOpen(null) }, [emotion.id])

  // Po "Dalej" panel przeskakuje niżej — dociągamy go do widoku
  useEffect(() => {
    if (!open || !scrollToPanel.current) return
    scrollToPanel.current = false
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    panelRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" })
  }, [open])

  const labels: Record<MechanismStep, string> = { stimulus: t.stimulus, impulse: t.impulse, action: t.action, function: t.bioGoal }
  const values: Record<MechanismStep, string> = {
    stimulus: emotion.stimulus[lang], impulse: emotion.impulse[lang], action: emotion.action[lang], function: emotion.function[lang],
  }
  const accent = isDark ? "text-teal-400" : "text-teal-700"

  const goNext = (step: MechanismStep) => {
    const next = MECHANISM_STEPS[MECHANISM_STEPS.indexOf(step) + 1]
    if (!next) return
    scrollToPanel.current = true
    setOpen(next)
    stepRefs.current[next]?.focus({ preventScroll: true })
  }

  const stepButton = (step: MechanismStep, variant: string, valueClass: string, value: React.ReactNode) => {
    const isOpen = open === step
    return (
      <button
        ref={(el) => { stepRefs.current[step] = el }}
        type="button"
        id={`mech-${emotion.id}-${step}`}
        aria-expanded={isOpen}
        aria-controls={isOpen ? `mech-panel-${emotion.id}` : undefined}
        onClick={() => setOpen(isOpen ? null : step)}
        className={`group w-full md:w-auto md:flex-1 min-h-11 text-center p-2.5 rounded-lg border cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${variant}`}
        style={isOpen ? { boxShadow: `0 0 0 2px ${emotion.hex}` } : undefined}
      >
        <span className={`flex items-center justify-center gap-1 text-xs uppercase tracking-widest font-bold ${step === "impulse" ? accent : "opacity-70"}`}>
          {labels[step]}
          <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} />
        </span>
        <span className={`block mt-1 ${valueClass}`}>{value}</span>
      </button>
    )
  }

  const panel = (step: MechanismStep) => {
    const next = MECHANISM_STEPS[MECHANISM_STEPS.indexOf(step) + 1]
    return (
      <div
        ref={panelRef}
        key={`panel-${step}`}
        id={`mech-panel-${emotion.id}`}
        role="region"
        aria-labelledby={`mech-${emotion.id}-${step}`}
        className={`w-full md:basis-full md:order-last text-left rounded-xl border border-l-4 p-4 sm:p-5 animate-fade ${isDark ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}
        style={{ borderLeftColor: emotion.hex }}
      >
        <p className="text-xs uppercase tracking-widest font-bold opacity-70">
          {labels[step]} — {values[step]}
        </p>
        <p className="text-sm sm:text-base leading-relaxed mt-2">{emotion.mechanism[step][lang]}</p>
        {next && (
          <button
            type="button"
            onClick={() => goNext(step)}
            className={`mt-3 -ml-2 px-2 min-h-11 inline-flex items-center gap-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-current ${accent} ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-200"}`}
          >
            {t.next}: {labels[next]}
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  const arrow = (k: string) => (
    <ArrowDown key={k} aria-hidden="true" className="opacity-40 w-5 h-5 shrink-0 md:-rotate-90" />
  )

  const neutral = isDark ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-50"

  return (
    <div className={`flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border mb-3 ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
        {stepButton("stimulus", neutral, "font-bold text-sm", emotion.stimulus[lang])}
        {open === "stimulus" && panel("stimulus")}
        {arrow("a1")}

        {stepButton("impulse", isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700" : "bg-slate-50 border-slate-200 hover:bg-slate-100", "italic text-sm font-serif", <>"{emotion.impulse[lang]}"</>)}
        {open === "impulse" && panel("impulse")}
        {arrow("a2")}

        <div className={`w-full md:w-auto text-center md:flex-1 p-3 rounded-xl border border-current ${emotion.bgLightClass} ${isDark ? emotion.colorClass : emotion.textLightClass}`}>
            <span className="text-xs uppercase tracking-widest opacity-70 font-bold">{t.emotion}</span>
            <p className="font-black text-lg leading-tight mt-0.5">{emotion.name[lang]}</p>
        </div>
        {arrow("a3")}

        {stepButton("action", neutral, "font-bold text-sm", emotion.action[lang])}
        {open === "action" && panel("action")}
        {arrow("a4")}

        {stepButton("function", isDark ? "bg-slate-900 border-slate-800 hover:bg-slate-800" : "bg-slate-100 border-slate-200 hover:bg-slate-200", `font-bold text-xs ${accent}`, emotion.function[lang])}
        {open === "function" && panel("function")}
    </div>
  )
}

const IntensityLadder = ({ emotion, lang, isDark }: { emotion: Emotion, lang: 'pl'|'en', isDark: boolean }) => {
  const t = uiTranslations[lang].modal
  return (
    <div className={`p-5 rounded-xl border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
        <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-5 flex items-center gap-2">
            <BarChart2 size={16} /> {t.energyScale}
        </h3>
        {/* Na telefonie: etykieta i nazwa poziomu w jednym wierszu, pasek na całą szerokość pod nimi.
            Od sm: jeden wiersz (etykieta | pasek | nazwa). Stałe szerokości kolumn zjadały pasek do 0 px przy 320 px. */}
        <div className="space-y-4 relative z-10">
            {[
                { label: t.affect, name: emotion.intensity.high[lang], bar: "w-full opacity-100", text: "font-bold" },
                { label: t.emotion, name: emotion.intensity.medium[lang], bar: "w-2/3 opacity-70", text: "font-semibold" },
                { label: t.signal, name: emotion.intensity.low[lang], bar: "w-1/3 opacity-40", text: "opacity-70" },
            ].map((row) => (
                <div key={row.label} className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-1.5">
                    <span className="text-xs opacity-60 sm:w-24 sm:shrink-0 font-medium">{row.label}</span>
                    <span className={`text-sm text-right sm:w-32 sm:shrink-0 sm:order-3 ${row.text}`}>{row.name}</span>
                    <div className={`basis-full sm:basis-auto sm:flex-1 sm:mx-3 sm:order-2 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div className={`h-full bg-current ${row.bar} ${emotion.colorClass}`}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

// ─── App Component ────────────────────────────────────────────────
const App: React.FC = () => {
  // Stan startowy: zakładka i karta z adresu, język i tryb z pamięci przeglądarki
  const [initial] = useState(() => ({ ...parseHash(window.location.hash), ...loadSettings() }))
  const [lang, setLang] = useState<"pl" | "en">(initial.lang ?? "pl")
  const [view, setView] = useState<View>(initial.view ?? "shuffle")
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(
    initial.view === "shuffle" && initial.emotion ? initial.emotion : EMOTIONS[0]
  )
  const [dyadPair, setDyadPair] = useState<[Emotion, Emotion]>([EMOTIONS[0], EMOTIONS[1]])
  const [stageMode, setStageMode] = useState<"light" | "dark">(initial.stage ?? "dark")
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(initial.emotion)

  const toggleLang = () => setLang((l) => (l === "pl" ? "en" : "pl"))
  const toggleStage = () => setStageMode((s) => (s === "light" ? "dark" : "light"))

  useEffect(() => { saveSettings({ lang, stage: stageMode }) }, [lang, stageMode])

  // Język strony dla czytnika ekranu (inaczej czyta polski tekst angielskim głosem) i tytuł karty
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = PAGE_TITLE[lang]
  }, [lang])

  // Wstecz/dalej w przeglądarce albo ręcznie zmieniony adres → ustawiamy zakładkę i kartę z adresu
  useEffect(() => {
    const onPop = () => {
      const { view: v, emotion } = parseHash(window.location.hash)
      const nextView = v ?? "shuffle"
      setView(nextView)
      setSelectedEmotion(emotion)
      if (nextView === "shuffle" && emotion) setCurrentEmotion(emotion)
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  // Pula emocji jeszcze niewylosowanych w bieżącej "talii" (losowanie bez powtórzeń,
  // dopiero po wyczerpaniu wszystkich 8 tasujemy nową talię).
  const shuffleBagRef = useRef<Emotion[]>([])

  const handleShuffle = useCallback(() => {
    setIsSpinning(true)
    setTimeout(() => {
      setCurrentEmotion((prev) => {
        if (shuffleBagRef.current.length === 0) {
          const bag = [...EMOTIONS]
          for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[bag[i], bag[j]] = [bag[j], bag[i]]
          }
          // nowa talia nie może zaczynać się od emocji, na której skończyła się poprzednia
          if (bag.length > 1 && bag[0].id === prev.id) {
            const swapIdx = 1 + Math.floor(Math.random() * (bag.length - 1))
            ;[bag[0], bag[swapIdx]] = [bag[swapIdx], bag[0]]
          }
          shuffleBagRef.current = bag
        }
        return shuffleBagRef.current.shift()!
      })
      setIsSpinning(false)
    }, 400)
  }, [])

  const handleRandomDyad = useCallback(() => {
    const next1 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    let next2 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    while (next1.id === next2.id) {
      next2 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    }
    setDyadPair([next1, next2])
  }, [])

  // ─── Modal: natywny <dialog> (Esc, fokus w środku, tło nieaktywne) + wpis w historii
  // z adresem karty (#katalog/gniew), żeby gest/przycisk "wstecz" na telefonie zamykał okno
  // zamiast wychodzić z aplikacji, a adres dało się skopiować i wysłać.
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const bodyDictRef = useRef<HTMLDivElement>(null)
  const scrollToBodyDictRef = useRef(false)

  const openEmotion = (item: Emotion, opener: HTMLElement, toBodyDict = false) => {
    openerRef.current = opener
    scrollToBodyDictRef.current = toBodyDict
    window.history.pushState({ plutchikModal: true }, "", hashFor(view, item))
    setSelectedEmotion(item)
  }

  const closeModal = useCallback(() => {
    // Okno otwarte kliknięciem (albo odświeżone po kliknięciu) ma pod sobą wpis zakładki — wracamy do niego,
    // popstate zamknie okno. Okno otwarte prosto z linku nie ma pod sobą nic naszego — tylko zmieniamy adres.
    if (window.history.state?.plutchikModal) window.history.back()
    else {
      window.history.replaceState(null, "", hashFor(view))
      setSelectedEmotion(null)
    }
  }, [view])

  useEffect(() => {
    if (!selectedEmotion) return
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
      closeBtnRef.current?.focus() // inaczej przeglądarka fokusuje przewijany kontener
    }
    if (scrollToBodyDictRef.current) {
      scrollToBodyDictRef.current = false
      bodyDictRef.current?.scrollIntoView({ block: "start" })
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
      openerRef.current?.focus()
    }
  }, [selectedEmotion])

  // Przejście między zakładkami z treści (np. z końca Teorii) — zawsze od góry nowego widoku
  // Zmiana zakładki podmienia adres zamiast dopisywać go do historii: "wstecz" nie skacze po zakładkach.
  const changeView = (next: View) => {
    window.history.replaceState(null, "", hashFor(next))
    setView(next)
    setSelectedEmotion(null)
  }

  const goTo = (next: View) => {
    changeView(next)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  const isDark = stageMode === "dark"
  const t = uiTranslations[lang]
  const nameColor = (e: Emotion) => (isDark ? e.colorClass : e.textLightClass)

  return (
    <div
      className={`min-h-screen transition-colors duration-700 p-3 sm:p-6 md:p-8 flex flex-col items-center overflow-x-hidden ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <style>{`
        @keyframes roulette {
          0% { transform: scale(0.9) rotate(0deg); opacity: 0.5; filter: blur(4px); }
          50% { transform: scale(1.05) rotate(180deg); opacity: 0.8; filter: blur(2px); }
          100% { transform: scale(1) rotate(360deg); opacity: 1; filter: blur(0px); }
        }
        .animate-roulette {
          animation: roulette 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slide { animation: slideUp 0.4s ease-out forwards; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          .animate-roulette, .animate-fade, .animate-slide { animation-duration: 1ms; }
        }
      `}</style>

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6 md:mb-8 pt-2">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
            {t.title}
            <span className="text-xs font-normal opacity-60 ml-1 sm:ml-2 border-l border-current pl-1 sm:pl-2">
              PLUTCHIK
            </span>
          </h1>
          <span className="text-xs font-mono opacity-70 uppercase mt-1">
            {t.subtitle}
          </span>
        </div>
        {/* Oba przyciski pokazują to, na co się przełącza (księżyc = włącz ciemny, EN = włącz angielski).
            min-w-11/min-h-11 = 44 px, minimalny cel dotykowy. */}
        <div className="flex gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleStage}
            aria-label={isDark ? t.stageToggle.light : t.stageToggle.dark}
            title={isDark ? t.stageToggle.light : t.stageToggle.dark}
            className={`min-w-11 min-h-11 inline-flex items-center justify-center rounded-full transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {isDark ? <Sun aria-hidden="true" className="w-5 h-5" /> : <Moon aria-hidden="true" className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={toggleLang}
            lang={t.langToggle.lang}
            aria-label={t.langToggle.label}
            title={t.langToggle.label}
            className={`min-w-11 min-h-11 px-3 sm:px-4 inline-flex items-center justify-center rounded-full text-xs font-bold uppercase transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {t.langToggle.lang}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 sm:p-1.5 rounded-2xl w-full max-w-5xl transition-colors overflow-x-auto no-scrollbar scroll-smooth border ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-slate-200/50 border-slate-300/50"
        }`}
      >
        {(
          [
            { id: "shuffle" as const, icon: <Shuffle size={14} />, label: t.nav.shuffle },
            { id: "dyads" as const, icon: <Combine size={14} />, label: t.nav.dyads },
            { id: "catalog" as const, icon: <LayoutGrid size={14} />, label: t.nav.catalog },
            { id: "manifesto" as const, icon: <BookOpen size={14} />, label: t.nav.theory },
          ] as const
        ).map((nav) => (
          <button
            key={nav.id}
            onClick={() => changeView(nav.id)}
            aria-current={view === nav.id ? "page" : undefined}
            className={`flex-1 min-w-0 sm:min-w-[100px] flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 min-h-11 py-1.5 sm:py-3 rounded-xl transition-all font-bold text-xs sm:text-[13px] tracking-wide sm:tracking-widest cursor-pointer ${
              view === nav.id
                ? isDark
                  ? "bg-slate-700 shadow-lg text-white border border-slate-600"
                  : "bg-white shadow-md text-slate-900 border border-slate-200"
                : "opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
            }`}
          >
            {React.cloneElement(nav.icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })}
            <span className="sm:mt-0.5">{nav.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-5xl flex-grow flex flex-col items-center relative">

        {/* ─── SHUFFLE VIEW ─── */}
        {view === "shuffle" && (
          <div className="flex flex-col items-center w-full max-w-lg px-4 animate-fade" key="shuffle-view">
            <div
              className={`w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 border-[8px] sm:border-[12px] rounded-full flex items-center justify-center p-10 sm:p-14 mb-6 sm:mb-8 transition-colors duration-500 relative overflow-hidden ${
                isDark
                  ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black"
                  : "bg-white border-slate-100 shadow-2xl shadow-slate-300/50"
              } ${currentEmotion.colorClass} ${isSpinning ? "animate-roulette" : ""}`}
            >
              {/* Ikona otwiera okno emocji od razu na "Słowniku Ciała" */}
              <button
                type="button"
                onClick={(e) => openEmotion(currentEmotion, e.currentTarget, true)}
                disabled={isSpinning}
                aria-label={`${t.modal.bodyDictionary}: ${currentEmotion.name[lang]}`}
                title={t.modal.bodyDictionary}
                className="relative z-10 drop-shadow-md rounded-full p-2 cursor-pointer transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current disabled:cursor-default disabled:hover:scale-100"
              >
                <currentEmotion.icon strokeWidth={1.5} className="w-24 h-24 sm:w-32 sm:h-32" />
              </button>
            </div>

            <div className="text-center mb-6 sm:mb-8 w-full transition-opacity duration-300" style={{ opacity: isSpinning ? 0 : 1 }}>
              {/* font-black to już najgrubsza waga kroju — obrys w kolorze tekstu pogrubia litery dalej */}
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 sm:mb-3 [-webkit-text-stroke:1px_currentColor] sm:[-webkit-text-stroke:1.5px_currentColor] ${nameColor(currentEmotion)}`}>
                {currentEmotion.name[lang]}
              </h2>
              <p className={`text-sm sm:text-base md:text-lg leading-tight font-medium mb-6 opacity-80`}>
                {currentEmotion.desc[lang]}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-left">
                <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Activity className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 font-bold mb-0.5">
                      {t.modal.impulse}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{currentEmotion.impulse[lang]}</span>
                  </div>
                </div>
                <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Target className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 font-bold mb-0.5">
                      {t.modal.action}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{currentEmotion.action[lang]}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleShuffle}
              disabled={isSpinning}
              className={`w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer border ${
                isDark
                  ? "bg-slate-100 text-slate-900 hover:bg-white border-transparent"
                  : "bg-slate-900 text-white hover:bg-slate-800 border-transparent"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {t.shuffleBtn}
            </button>
          </div>
        )}

        {/* ─── DYADS VIEW (MIKSER) ─── */}
        {view === "dyads" && (() => {
          const result = getDyad(dyadPair[0].id, dyadPair[1].id)
          const Icon1 = dyadPair[0].icon
          const Icon2 = dyadPair[1].icon
          return (
            <div className="w-full flex flex-col items-center animate-fade px-2">
              <div className="text-center mb-6 sm:mb-8 max-w-lg">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest opacity-60 mb-1 sm:mb-2">{t.dyadsTitle}</h2>
                <p className="text-xs sm:text-sm opacity-60 leading-relaxed px-4">{t.dyadsDesc}</p>
              </div>

              <div className="flex justify-center items-center mb-8 sm:mb-12 relative h-40 sm:h-56 w-64 sm:w-96 mx-auto">
                {/* Warstwa koloru — zasada "kalki": przednie kolo to kolor emocji o kryciu 70%.
                    Kolory liczymy tak, jakby pod spodem zawsze bylo biale tlo, i malujemy je
                    jako pelne, zeby w trybie ciemnym granat strony nie przeswitywal:
                    - tylne kolo: kolor emocji,
                    - przednie kolo: 70% koloru emocji + 30% bieli (jasniejszy odcien),
                    - czesc wspolna: 70% przedniego koloru + 30% tylnego. */}
                <div className="absolute inset-0" aria-hidden="true">
                  <div
                    className="absolute left-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: dyadPair[0].hex }}
                  />
                  <div
                    className="absolute right-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden transition-colors duration-500"
                    style={{ backgroundColor: mixHex("#ffffff", dyadPair[1].hex, DYAD_ALPHA) }}
                  >
                    {/* Kopia tylnego kola w pozycji tylnego kola, przycieta do przedniego = czesc wspolna */}
                    <div
                      className="absolute top-0 -left-24 sm:-left-40 w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: mixHex(dyadPair[0].hex, dyadPair[1].hex, DYAD_ALPHA) }}
                    />
                  </div>
                </div>

                {/* Warstwa tresci: ikona i nazwa nad kolorem, bez mieszania */}
                {[dyadPair[0], dyadPair[1]].map((e, i) => {
                  const Icon = i === 0 ? Icon1 : Icon2
                  return (
                    <div
                      key={i}
                      className={`absolute ${i === 0 ? "left-0" : "right-0"} w-40 h-40 sm:w-56 sm:h-56 flex flex-col items-center justify-center p-4 text-slate-950`}
                    >
                      <Icon className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3" strokeWidth={1.5} />
                      <h3 className="text-sm sm:text-xl font-black uppercase tracking-tight text-center">
                        {e.name[lang]}
                      </h3>
                    </div>
                  )
                })}
              </div>

              {/* Result */}
              <div
                className={`w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-[2rem] text-center border-4 shadow-2xl mb-8 sm:mb-10 transition-all duration-500 ${
                  result?.type === "opposite" ? "border-red-500/30" : isDark ? "border-slate-800" : "border-white"
                }`}
                style={{
                  background: result && result.type !== "opposite"
                      ? `linear-gradient(135deg, ${dyadPair[0].hex}22 0%, ${dyadPair[1].hex}22 100%)`
                      : isDark ? "#0f172a" : "#f8fafc",
                }}
              >
                <div className="text-xs font-mono font-bold uppercase tracking-widest opacity-60 mb-2 sm:mb-3">{t.dyadsResult}</div>
                {result ? (
                  <>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-3 sm:mb-4 tracking-tighter break-words hyphens-auto">
                      {result.name[lang]}
                    </h2>
                    <span className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
                        // Tryb zależy od przełącznika w aplikacji (isDark), nie od ustawień systemu —
                        // wariant `dark:` Tailwinda v4 reaguje na system, więc tu go nie używamy.
                        result.type === "primary" ? `bg-emerald-500/20 ${isDark ? "text-emerald-400" : "text-emerald-700"}`
                          : result.type === "secondary" ? `bg-blue-500/20 ${isDark ? "text-blue-400" : "text-blue-700"}`
                          : result.type === "tertiary" ? `bg-purple-500/20 ${isDark ? "text-purple-400" : "text-purple-700"}`
                          : `bg-red-500/20 ${isDark ? "text-red-400" : "text-red-700"}`
                      }`}>
                      {DYAD_TYPE_LABELS[result.type][lang]}
                    </span>
                  </>
                ) : (
                  <h2 className="text-2xl sm:text-3xl font-black uppercase opacity-20">---</h2>
                )}
              </div>

              <button
                onClick={handleRandomDyad}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer ${
                  isDark ? "bg-slate-100 text-slate-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                <Shuffle size={20} className="sm:w-6 sm:h-6" />
                {t.dyadsBtn}
              </button>
            </div>
          )
        })()}

        {/* ─── CATALOG VIEW ─── */}
        {view === "catalog" && (
          <div className="w-full animate-fade pb-8 sm:pb-12 px-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase mb-6 sm:mb-8 text-center tracking-widest opacity-60">
              {t.catalogTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {EMOTIONS.map((item) => (
                // Klikalna jest cała karta, ale semantycznie przyciskiem jest nazwa emocji
                // (jej ::after rozciąga obszar kliknięcia na kartę) — działa z klawiatury i czytnikiem ekranu.
                <div
                  key={item.id}
                  className={`group relative p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer hover:-translate-y-1 active:scale-95 flex flex-col items-start gap-4 h-full justify-between has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-current ${
                    isDark ? "bg-slate-900 border-slate-800 hover:border-slate-600 shadow-md" : "bg-white border-slate-200 hover:border-slate-400 shadow-sm hover:shadow-xl"
                  }`}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl transition-colors ${item.colorClass} ${item.bgLightClass}`}>
                           <item.icon size={28} strokeWidth={2} />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest border px-2 py-1 rounded ${isDark ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                            {item.function[lang]}
                        </span>
                    </div>
                    <h3 className={`font-black uppercase text-xl sm:text-2xl tracking-tight mb-2 ${nameColor(item)}`}>
                      <button
                        type="button"
                        onClick={(e) => openEmotion(item, e.currentTarget)}
                        className="uppercase text-left cursor-pointer focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
                      >
                        {item.name[lang]}
                      </button>
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-70 mb-4 line-clamp-3">
                      {item.desc[lang]}
                    </p>
                  </div>

                  <div className={`w-full pt-4 border-t flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-80 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                      <Move size={14} />
                      <span>{t.modal.movementVector}: {item.vector[lang].split('/')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MANIFESTO / THEORY VIEW ─── */}
        {/* Układ narracyjny w jednej kolumnie (~65 znaków w wierszu) — czytany kciukiem od góry do dołu.
            Każda sekcja ma "etykietę rozdziału" (1/5…), żeby było widać, ile zostało do końca. */}
        {view === "manifesto" && (() => {
          const card = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
          const eyebrow = (n: number, label: L) => (
            <p className="text-xs font-mono font-bold uppercase tracking-widest opacity-70 mb-2">
              {n}/5 · {label[lang]}
            </p>
          )
          const linkBtn = isDark
            ? "text-teal-300 hover:bg-slate-800"
            : "text-teal-800 hover:bg-slate-100"
          return (
            <article className="w-full max-w-2xl animate-fade space-y-5 sm:space-y-6 pb-12 sm:pb-20 px-1 sm:px-0">
              <header className="text-center px-2 mb-2 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{THEORY.title[lang]}</h2>
                <p className="text-sm sm:text-base opacity-80 leading-relaxed mt-2 max-w-xl mx-auto">{THEORY.subtitle[lang]}</p>
              </header>

              {/* 1 — Teza */}
              <section className={`p-5 sm:p-8 rounded-3xl border-l-8 ${isDark ? "bg-slate-900 border-teal-500" : "bg-white border-teal-700 shadow-lg"}`}>
                {eyebrow(1, THEORY.hook.eyebrow)}
                <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight mb-4">{THEORY.hook.title[lang]}</h3>
                {/* Odwrócona kolejność jako obraz, zanim padnie wyjaśnienie */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5 text-sm" aria-hidden="true">
                  <div className={`p-3 rounded-xl border ${isDark ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-600"}`}>
                    <span className="block text-xs uppercase tracking-widest font-bold mb-1">{THEORY.hook.oldOrder[lang]}</span>
                    <span className="font-bold line-through decoration-2">{THEORY.hook.emotionWord[lang]} → {THEORY.hook.bodyWord[lang]}</span>
                  </div>
                  <div className={`p-3 rounded-xl border-2 ${isDark ? "border-teal-500 bg-teal-500/10" : "border-teal-700 bg-teal-50"}`}>
                    <span className={`block text-xs uppercase tracking-widest font-bold mb-1 ${isDark ? "text-teal-300" : "text-teal-800"}`}>{THEORY.hook.newOrder[lang]}</span>
                    <span className="font-black">{THEORY.hook.bodyWord[lang]} → {THEORY.hook.emotionWord[lang]}</span>
                  </div>
                </div>
                <p className="text-base leading-relaxed opacity-90">{rich(THEORY.hook.body[lang])}</p>
              </section>

              {/* 2 — Kontekst */}
              <section className={`p-5 sm:p-8 rounded-3xl border ${card}`}>
                {eyebrow(2, THEORY.context.eyebrow)}
                <h3 className="text-lg sm:text-xl font-black uppercase leading-tight mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="shrink-0 opacity-60" aria-hidden="true" />
                  {THEORY.context.title[lang]}
                </h3>
                <p className="text-base leading-relaxed opacity-90">{THEORY.context.body[lang]}</p>
                <button
                  type="button"
                  onClick={() => goTo("dyads")}
                  className={`mt-3 -ml-2 px-2 min-h-11 inline-flex items-center gap-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-current ${linkBtn}`}
                >
                  <Combine size={16} aria-hidden="true" />
                  {THEORY.context.link[lang]}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </section>

              {/* 3 — Spór */}
              <section className={`p-5 sm:p-8 rounded-3xl border ${card}`}>
                {eyebrow(3, THEORY.debate.eyebrow)}
                <h3 className="text-lg sm:text-xl font-black uppercase leading-tight mb-3 flex items-center gap-2">
                  <Drama size={20} className="shrink-0 opacity-60" aria-hidden="true" />
                  {THEORY.debate.title[lang]}
                </h3>
                <p className="text-base leading-relaxed opacity-90 mb-5">{rich(THEORY.debate.body[lang])}</p>
                {/* Streszczenie sporu w dwóch kolumnach; pozycja aplikacji oznaczona tekstem, nie tylko kolorem */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {THEORY.debate.schools.map((s) => (
                    <li
                      key={s.label.en}
                      className={`p-4 rounded-2xl border-2 ${
                        s.app
                          ? isDark ? "border-teal-500 bg-teal-500/10" : "border-teal-700 bg-teal-50"
                          : isDark ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <span className="block font-black uppercase text-sm">{s.label[lang]}</span>
                      <span className="block text-sm opacity-80 mt-0.5">{s.who[lang]}</span>
                      <span className="block text-sm font-semibold mt-2">{s.steps[lang]}</span>
                      {s.app && (
                        <span className={`inline-flex items-center gap-1 mt-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-teal-300" : "text-teal-800"}`}>
                          <Target size={14} aria-hidden="true" /> {THEORY.debate.appLeans[lang]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4 — Reguły gry: rozwijane karty (natywne <details>: klawiatura i czytnik ekranu za darmo) */}
              <section className={`p-5 sm:p-8 rounded-3xl border ${card}`}>
                {eyebrow(4, THEORY.rules.eyebrow)}
                <h3 className="text-lg sm:text-xl font-black uppercase leading-tight mb-1 flex items-center gap-2">
                  <Layers size={20} className="shrink-0 opacity-60" aria-hidden="true" />
                  {THEORY.rules.title[lang]}
                </h3>
                <p className="text-sm opacity-80 mb-4">{THEORY.rules.hint[lang]}</p>
                <div className="space-y-2">
                  {THEORY.rules.items.map((rule, idx) => (
                    <details
                      key={idx}
                      className={`group rounded-2xl border transition-colors ${isDark ? "border-slate-700 open:bg-slate-800/60" : "border-slate-200 open:bg-slate-50"}`}
                    >
                      <summary
                        className={`list-none [&::-webkit-details-marker]:hidden flex items-start gap-3 p-4 min-h-11 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-current ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}
                      >
                        <span className={`font-black text-lg leading-6 w-6 shrink-0 ${isDark ? "text-amber-400" : "text-amber-700"}`}>{idx + 1}</span>
                        <span className="flex-1 font-bold text-base leading-6">{rule.thesis[lang]}</span>
                        <ChevronDown aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 opacity-60 transition-transform motion-reduce:transition-none group-open:rotate-180" />
                      </summary>
                      <div className="px-4 pb-4 sm:pl-13 space-y-3 animate-fade">
                        <p className="text-sm leading-relaxed opacity-80">
                          <span className="font-bold">Plutchik: </span>{rule.plutchik[lang]}
                        </p>
                        <p className={`text-base leading-relaxed p-3 rounded-xl border-l-4 ${isDark ? "bg-slate-900 border-teal-500" : "bg-white border-teal-700"}`}>
                          <span className={`block text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-teal-300" : "text-teal-800"}`}>
                            {THEORY.rules.onStage[lang]}
                          </span>
                          {rule.stage[lang]}
                        </p>
                        {rule.link && (
                          <button
                            type="button"
                            onClick={() => goTo(rule.link!.view)}
                            className={`-ml-2 px-2 min-h-11 inline-flex items-center gap-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-current ${linkBtn}`}
                          >
                            {rule.link.label[lang]}
                            <ArrowRight size={16} aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* 5 — Powrót do praktyki: główna akcja pełnej szerokości, w zasięgu kciuka */}
              <section className={`p-5 sm:p-8 rounded-3xl border-2 border-dashed text-center ${isDark ? "border-slate-700" : "border-slate-300"}`}>
                {eyebrow(5, THEORY.cta.eyebrow)}
                <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight mb-3">{THEORY.cta.title[lang]}</h3>
                <p className="text-base leading-relaxed opacity-90 mb-6 max-w-xl mx-auto">{THEORY.cta.body[lang]}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => { goTo("shuffle"); handleShuffle() }}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 min-h-14 rounded-2xl text-lg font-black transition-all active:scale-95 shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                      isDark ? "bg-slate-100 text-slate-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    <Shuffle size={20} aria-hidden="true" />
                    {THEORY.cta.draw[lang]}
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo("dyads")}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 min-h-14 rounded-2xl text-lg font-black border-2 transition-all active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                      isDark ? "border-slate-600 hover:bg-slate-800" : "border-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Combine size={20} aria-hidden="true" />
                    {THEORY.cta.dyads[lang]}
                  </button>
                </div>
              </section>
            </article>
          )
        })()}

      </main>

      {/* ─── MODAL (Aktorskie Kompendium) ─── */}
      {selectedEmotion && (
        <dialog
          ref={dialogRef}
          aria-labelledby="emotion-modal-title"
          onCancel={(e) => { e.preventDefault(); closeModal() }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          className="fixed inset-0 z-50 m-0 w-full h-full max-w-none max-h-none open:flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade"
        >
          <div
            className={`w-full max-w-5xl max-h-[95vh] overflow-y-auto overscroll-contain rounded-3xl shadow-2xl animate-slide border ${isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-300 text-slate-900"}`}
          >
            {/* Header Modala */}
            <div className={`p-4 sm:p-8 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md border-b ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/90 border-slate-200'}`}>
              <div className="flex items-center gap-4 min-w-0">
                <div className={`hidden sm:block p-3 rounded-2xl ${selectedEmotion.bgLightClass} ${selectedEmotion.colorClass}`}>
                  <selectedEmotion.icon size={32} strokeWidth={2} />
                </div>
                <div>
                  <h2 id="emotion-modal-title" className={`text-2xl sm:text-4xl font-black uppercase break-words ${nameColor(selectedEmotion)}`}>{selectedEmotion.name[lang]}</h2>
                  <p className="font-serif italic text-xs sm:text-sm opacity-80 mt-1">{t.modal.bioGoal}: <strong className="font-sans">{selectedEmotion.function[lang]}</strong></p>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeModal}
                aria-label={t.modal.back}
                className={`p-3 rounded-xl transition-all border shrink-0 ${isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800 hover:border-slate-500" : "bg-white border-slate-300 hover:bg-slate-100"}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Treść Modala */}
            <div className="p-6 sm:p-8 space-y-8">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t.modal.mechanism}</h3>
                <p className="text-sm opacity-80 mb-4">{t.modal.mechanismHint}</p>
                <EvoChain emotion={selectedEmotion} lang={lang} isDark={isDark} />
                <p className="text-xs opacity-70 text-center italic mt-2">{t.modal.neuroception}</p>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <IntensityLadder emotion={selectedEmotion} lang={lang} isDark={isDark} />

                  <div className={`p-6 rounded-xl border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-blue-500"/> {t.modal.motorics}
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex gap-3 items-center">
                            <ArrowRight size={16} className="text-blue-500" />
                            <span>{t.modal.movementVector}: <strong className="uppercase">{selectedEmotion.vector[lang]}</strong></span>
                        </li>
                        <li className={`pt-3 border-t italic opacity-80 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                          "{selectedEmotion.action[lang]}"
                        </li>
                    </ul>
                  </div>
                </div>

                <div ref={bodyDictRef} className={`p-6 sm:p-8 rounded-xl border h-full scroll-mt-28 sm:scroll-mt-36 ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200 shadow-md"}`}>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                        <Fingerprint size={20} className="text-teal-500" /> {t.modal.bodyDictionary}
                    </h3>
                    <p className="text-xs opacity-60 mb-6">{t.modal.bodyDictDesc}</p>
                    <ul className="space-y-3">
                        {selectedEmotion.signals[lang].map((signal, idx) => (
                            <li key={idx} className="flex gap-3 text-sm items-start">
                                <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: selectedEmotion.hex }}></span>
                                <span className="opacity-90">{signal}</span>
                            </li>
                        ))}
                    </ul>
                </div>
              </div>

              {/* Perspektywa Aktora */}
              <div className={`p-6 rounded-2xl border-2 border-dashed ${isDark ? "bg-slate-900/30 border-slate-700" : "bg-slate-50 border-slate-300"}`}>
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">{t.modal.actorPerspective}</h3>
                  <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                          <span className="text-xs uppercase font-bold opacity-70 block mb-1">{t.modal.bodySignal}</span>
                          <p className="text-lg font-serif italic font-medium">"{selectedEmotion.impulse[lang]}"</p>
                      </div>
                      <div className="flex-1">
                          <span className="text-xs uppercase font-bold opacity-70 block mb-1">{t.modal.scenicGoal}</span>
                          <p className="text-sm font-medium">{selectedEmotion.desc[lang]}</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 text-center w-full max-w-md pb-6 sm:pb-8 flex flex-col items-center gap-4">

        <div className="text-xs opacity-70 hover:opacity-100 transition-opacity text-center mt-2 max-w-md leading-relaxed">
          &copy; 2025 Oskar Hamerski.<br />
          {t.footer.about}<br />
          <span className="font-semibold uppercase tracking-wider text-xs mt-1 inline-block">{t.footer.usage}</span>
        </div>
      </footer>
    </div>
  )
}

export default App
