import { ArrowRight, BookOpen, ChevronDown, Combine, Drama, Layers, Shuffle, Target } from "lucide-react"
import { THEORY } from "../tresc/teoria"
import type { L, Lang } from "../tresc/typy"
import { rich } from "../lib/tekst"

// ─── Zakładka Teoria ─────────────────────────────────────────────
// Układ narracyjny w jednej kolumnie (~65 znaków w wierszu) — czytany kciukiem od góry do dołu.
// Każda sekcja ma "etykietę rozdziału" (1/5…), żeby było widać, ile zostało do końca.
type Props = {
  lang: Lang
  isDark: boolean
  onGoTo: (view: "shuffle" | "dyads" | "catalog") => void
  onDraw: () => void
}

export const TheoryView = ({ lang, isDark, onGoTo, onDraw }: Props) => {
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
          onClick={() => onGoTo("dyads")}
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
                    onClick={() => onGoTo(rule.link!.view)}
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
            onClick={onDraw}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 min-h-14 rounded-2xl text-lg font-black transition-all active:scale-95 shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
              isDark ? "bg-slate-100 text-slate-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            <Shuffle size={20} aria-hidden="true" />
            {THEORY.cta.draw[lang]}
          </button>
          <button
            type="button"
            onClick={() => onGoTo("dyads")}
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
}
