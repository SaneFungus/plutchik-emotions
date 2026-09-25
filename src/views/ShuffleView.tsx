import { Activity, Target } from "lucide-react"
import { uiTranslations } from "../tresc/interfejs"
import type { Emotion, Lang } from "../tresc/typy"

// ─── Zakładka Losuj: koło z bieżącą emocją, impuls i działanie, przycisk losowania ─
type Props = {
  emotion: Emotion
  isSpinning: boolean
  lang: Lang
  isDark: boolean
  onShuffle: () => void
  onOpenEmotion: (item: Emotion, opener: HTMLElement, toBodyDict?: boolean) => void
}

export const ShuffleView = ({ emotion, isSpinning, lang, isDark, onShuffle, onOpenEmotion }: Props) => {
  const t = uiTranslations[lang]
  const nameColor = isDark ? emotion.colorClass : emotion.textLightClass
  return (
    <div className="flex flex-col items-center w-full max-w-lg px-4 animate-fade" key="shuffle-view">
      <div
        className={`w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 border-[8px] sm:border-[12px] rounded-full flex items-center justify-center p-10 sm:p-14 mb-6 sm:mb-8 transition-colors duration-500 relative overflow-hidden ${
          isDark
            ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black"
            : "bg-white border-slate-100 shadow-2xl shadow-slate-300/50"
        } ${emotion.colorClass} ${isSpinning ? "animate-roulette" : ""}`}
      >
        {/* Ikona otwiera okno emocji od razu na "Słowniku Ciała" */}
        <button
          type="button"
          onClick={(e) => onOpenEmotion(emotion, e.currentTarget, true)}
          disabled={isSpinning}
          aria-label={`${t.modal.bodyDictionary}: ${emotion.name[lang]}`}
          title={t.modal.bodyDictionary}
          className="relative z-10 drop-shadow-md rounded-full p-2 cursor-pointer transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current disabled:cursor-default disabled:hover:scale-100"
        >
          <emotion.icon strokeWidth={1.5} className="w-24 h-24 sm:w-32 sm:h-32" />
        </button>
      </div>

      <div className="text-center mb-6 sm:mb-8 w-full transition-opacity duration-300" style={{ opacity: isSpinning ? 0 : 1 }}>
        {/* font-black to już najgrubsza waga kroju — obrys w kolorze tekstu pogrubia litery dalej */}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 sm:mb-3 [-webkit-text-stroke:1px_currentColor] sm:[-webkit-text-stroke:1.5px_currentColor] ${nameColor}`}>
          {emotion.name[lang]}
        </h2>
        <p className={`text-sm sm:text-base md:text-lg leading-tight font-medium mb-6 opacity-80`}>
          {emotion.desc[lang]}
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-left">
          <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
            <Activity className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-widest opacity-70 font-bold mb-0.5">
                {t.modal.impulse}
              </span>
              <span className="text-xs sm:text-sm font-semibold">{emotion.impulse[lang]}</span>
            </div>
          </div>
          <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
            <Target className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-widest opacity-70 font-bold mb-0.5">
                {t.modal.action}
              </span>
              <span className="text-xs sm:text-sm font-semibold">{emotion.action[lang]}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onShuffle}
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
  )
}
