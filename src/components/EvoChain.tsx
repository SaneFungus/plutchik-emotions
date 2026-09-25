import { useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react"
import { uiTranslations } from "../tresc/interfejs"
import { MECHANISM_STEPS, type Emotion, type Lang, type MechanismStep } from "../tresc/typy"

// Łańcuch Bodziec → Impuls → Emocja → Działanie → Cel. Cztery etapy (bez "Emocji") to przyciski:
// klik rozwija wyjaśnienie tuż pod etapem (na telefonie) albo pod całym rzędem (od md).
// Świadomie NIE osobny modal: to już jest okno dialogowe, a okno w oknie na telefonie
// zasłania łańcuch, który właśnie się czyta, i komplikuje gest "wstecz".
export const EvoChain = ({ emotion, lang, isDark }: { emotion: Emotion, lang: Lang, isDark: boolean }) => {
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

  const stepButton = (step: MechanismStep, variant: string, valueClass: string, value: ReactNode) => {
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
