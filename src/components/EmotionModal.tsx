import { useEffect, useRef, type RefObject } from "react"
import { Activity, ArrowRight, Fingerprint, X } from "lucide-react"
import { uiTranslations } from "../tresc/interfejs"
import type { Emotion, Lang } from "../tresc/typy"
import { EvoChain } from "./EvoChain"
import { IntensityLadder } from "./IntensityLadder"

// ─── Okno emocji (Aktorskie Kompendium) ───────────────────────────
// Natywny <dialog>: Esc, fokus w środku, tło nieaktywne. Otwieranie i zamykanie
// (razem z wpisem w historii przeglądarki) prowadzi App — tu tylko pokazujemy okno.
type Props = {
  emotion: Emotion
  lang: Lang
  onClose: () => void
  // Element, który otworzył okno — po zamknięciu wraca na niego fokus
  openerRef: RefObject<HTMLElement | null>
  // Ustawione przez ikonę w Losowaniu: okno ma się otworzyć od razu na Słowniku Ciała
  scrollToBodyDictRef: RefObject<boolean>
}

export const EmotionModal = ({ emotion, lang, onClose, openerRef, scrollToBodyDictRef }: Props) => {
  const t = uiTranslations[lang]
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const bodyDictRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [emotion, openerRef, scrollToBodyDictRef])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="emotion-modal-title"
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="fixed inset-0 z-50 m-0 w-full h-full max-w-none max-h-none open:flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade"
    >
      <div
        className="w-full max-w-5xl max-h-[95vh] overflow-y-auto overscroll-contain rounded-3xl shadow-2xl animate-slide border bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
      >
        {/* Header Modala */}
        <div className="p-4 sm:p-8 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md border-b bg-slate-50/90 border-slate-200 dark:bg-slate-950/80 dark:border-slate-800">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`hidden sm:block p-3 rounded-2xl ${emotion.bgLightClass} ${emotion.colorClass}`}>
              <emotion.icon size={32} strokeWidth={2} />
            </div>
            <div>
              <h2 id="emotion-modal-title" className={`text-2xl sm:text-4xl font-black uppercase break-words ${emotion.nameClass}`}>{emotion.name[lang]}</h2>
              <p className="font-serif italic text-xs sm:text-sm opacity-80 mt-1">{t.modal.bioGoal}: <strong className="font-sans">{emotion.function[lang]}</strong></p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.modal.back}
            className="p-3 rounded-xl transition-all border shrink-0 bg-white border-slate-300 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:border-slate-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Treść Modala */}
        <div className="p-6 sm:p-8 space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t.modal.mechanism}</h3>
            <p className="text-sm opacity-80 mb-4">{t.modal.mechanismHint}</p>
            <EvoChain emotion={emotion} lang={lang} />
            <p className="text-xs opacity-70 text-center italic mt-2">{t.modal.neuroception}</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <IntensityLadder emotion={emotion} lang={lang} />

              <div className="p-6 rounded-xl border bg-white border-slate-200 not-dark:shadow-sm dark:bg-slate-900/50 dark:border-slate-800">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-blue-500"/> {t.modal.motorics}
                </h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex gap-3 items-center">
                        <ArrowRight size={16} className="text-blue-500" />
                        <span>{t.modal.movementVector}: <strong className="uppercase">{emotion.vector[lang]}</strong></span>
                    </li>
                    <li className="pt-3 border-t italic opacity-80 border-slate-100 dark:border-slate-800">
                      "{emotion.action[lang]}"
                    </li>
                </ul>
              </div>
            </div>

            <div ref={bodyDictRef} className="p-6 sm:p-8 rounded-xl border h-full scroll-mt-28 sm:scroll-mt-36 bg-white border-slate-200 not-dark:shadow-md dark:bg-slate-900 dark:border-slate-700">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                    <Fingerprint size={20} className="text-teal-500" /> {t.modal.bodyDictionary}
                </h3>
                <p className="text-xs opacity-60 mb-6">{t.modal.bodyDictDesc}</p>
                <ul className="space-y-3">
                    {emotion.signals[lang].map((signal, idx) => (
                        <li key={idx} className="flex gap-3 text-sm items-start">
                            <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: emotion.hex }}></span>
                            <span className="opacity-90">{signal}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* Perspektywa Aktora */}
          <div className="p-6 rounded-2xl border-2 border-dashed bg-slate-50 border-slate-300 dark:bg-slate-900/30 dark:border-slate-700">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">{t.modal.actorPerspective}</h3>
              <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                      <span className="text-xs uppercase font-bold opacity-70 block mb-1">{t.modal.bodySignal}</span>
                      <p className="text-lg font-serif italic font-medium">"{emotion.impulse[lang]}"</p>
                  </div>
                  <div className="flex-1">
                      <span className="text-xs uppercase font-bold opacity-70 block mb-1">{t.modal.scenicGoal}</span>
                      <p className="text-sm font-medium">{emotion.desc[lang]}</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
