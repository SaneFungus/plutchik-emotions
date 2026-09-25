import { Move } from "lucide-react"
import { EMOTIONS } from "../tresc/emocje"
import { uiTranslations } from "../tresc/interfejs"
import type { Emotion, Lang } from "../tresc/typy"

// ─── Zakładka Katalog: 8 kart emocji, każda otwiera okno emocji ─
type Props = {
  lang: Lang
  onOpenEmotion: (item: Emotion, opener: HTMLElement) => void
}

export const CatalogView = ({ lang, onOpenEmotion }: Props) => {
  const t = uiTranslations[lang]
  return (
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
            className="group relative p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer hover:-translate-y-1 active:scale-95 flex flex-col items-start gap-4 h-full justify-between has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-current bg-white border-slate-200 hover:border-slate-400 shadow-sm not-dark:hover:shadow-xl dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-600 dark:shadow-md"
          >
            <div className="w-full">
              <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl transition-colors ${item.colorClass} ${item.bgLightClass}`}>
                     <item.icon size={28} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest border px-2 py-1 rounded border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      {item.function[lang]}
                  </span>
              </div>
              <h3 className={`font-black uppercase text-xl sm:text-2xl tracking-tight mb-2 ${item.nameClass}`}>
                <button
                  type="button"
                  onClick={(e) => onOpenEmotion(item, e.currentTarget)}
                  className="uppercase text-left cursor-pointer focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
                >
                  {item.name[lang]}
                </button>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed opacity-70 mb-4 line-clamp-3">
                {item.desc[lang]}
              </p>
            </div>

            <div className="w-full pt-4 border-t flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-80 border-slate-100 dark:border-slate-800">
                <Move size={14} />
                <span>{t.modal.movementVector}: {item.vector[lang].split('/')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
