import React, { useState, useCallback, useEffect, useRef } from "react"
import { Shuffle, Combine, BookOpen, LayoutGrid, Sun, Moon } from "lucide-react"
import { EMOTIONS } from "./tresc/emocje"
import { uiTranslations, PAGE_TITLE } from "./tresc/interfejs"
import type { Emotion } from "./tresc/typy"
import { hashFor, parseHash, type View } from "./lib/adres"
import { loadSettings, saveSettings } from "./lib/ustawienia"
import { ShuffleView } from "./views/ShuffleView"
import { DyadsView } from "./views/DyadsView"
import { CatalogView } from "./views/CatalogView"
import { TheoryView } from "./views/TheoryView"
import { EmotionModal } from "./components/EmotionModal"

// ─── App Component ────────────────────────────────────────────────
// Stan całej aplikacji (język, tryb, zakładka, wylosowane emocje, otwarte okno),
// nagłówek, nawigacja i stopka. Same zakładki leżą w src/views, okno emocji w src/components.
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

  // ─── Okno emocji: wpis w historii z adresem karty (#katalog/gniew), żeby gest/przycisk
  // "wstecz" na telefonie zamykał okno zamiast wychodzić z aplikacji, a adres dało się
  // skopiować i wysłać. Samo okno (<dialog>) jest w components/EmotionModal.
  const openerRef = useRef<HTMLElement | null>(null)
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
        {view === "shuffle" && (
          <ShuffleView
            emotion={currentEmotion}
            isSpinning={isSpinning}
            lang={lang}
            isDark={isDark}
            onShuffle={handleShuffle}
            onOpenEmotion={openEmotion}
          />
        )}
        {view === "dyads" && (
          <DyadsView pair={dyadPair} lang={lang} isDark={isDark} onRandomPair={handleRandomDyad} />
        )}
        {view === "catalog" && (
          <CatalogView lang={lang} isDark={isDark} onOpenEmotion={openEmotion} />
        )}
        {view === "manifesto" && (
          <TheoryView
            lang={lang}
            isDark={isDark}
            onGoTo={goTo}
            onDraw={() => { goTo("shuffle"); handleShuffle() }}
          />
        )}
      </main>

      {selectedEmotion && (
        <EmotionModal
          emotion={selectedEmotion}
          lang={lang}
          isDark={isDark}
          onClose={closeModal}
          openerRef={openerRef}
          scrollToBodyDictRef={scrollToBodyDictRef}
        />
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
