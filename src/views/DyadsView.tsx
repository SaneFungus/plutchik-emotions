import { Shuffle } from "lucide-react"
import { getDyad, DYAD_TYPE_LABELS } from "../tresc/diady"
import { uiTranslations } from "../tresc/interfejs"
import type { Emotion, Lang } from "../tresc/typy"
import { DYAD_ALPHA, mixHex } from "../lib/kolory"

// ─── Zakładka Diady (mikser): dwa nakładające się koła i nazwa emocji złożonej ─
type Props = {
  pair: [Emotion, Emotion]
  lang: Lang
  isDark: boolean
  onRandomPair: () => void
}

export const DyadsView = ({ pair, lang, isDark, onRandomPair }: Props) => {
  const t = uiTranslations[lang]
  const result = getDyad(pair[0].id, pair[1].id)
  const Icon1 = pair[0].icon
  const Icon2 = pair[1].icon
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
            style={{ backgroundColor: pair[0].hex }}
          />
          <div
            className="absolute right-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden transition-colors duration-500"
            style={{ backgroundColor: mixHex("#ffffff", pair[1].hex, DYAD_ALPHA) }}
          >
            {/* Kopia tylnego kola w pozycji tylnego kola, przycieta do przedniego = czesc wspolna */}
            <div
              className="absolute top-0 -left-24 sm:-left-40 w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-colors duration-500"
              style={{ backgroundColor: mixHex(pair[0].hex, pair[1].hex, DYAD_ALPHA) }}
            />
          </div>
        </div>

        {/* Warstwa tresci: ikona i nazwa nad kolorem, bez mieszania */}
        {[pair[0], pair[1]].map((e, i) => {
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
              ? `linear-gradient(135deg, ${pair[0].hex}22 0%, ${pair[1].hex}22 100%)`
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
        onClick={onRandomPair}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer ${
          isDark ? "bg-slate-100 text-slate-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        <Shuffle size={20} className="sm:w-6 sm:h-6" />
        {t.dyadsBtn}
      </button>
    </div>
  )
}
