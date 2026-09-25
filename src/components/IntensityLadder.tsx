import { BarChart2 } from "lucide-react"
import { uiTranslations } from "../tresc/interfejs"
import type { Emotion, Lang } from "../tresc/typy"

// Drabina intensywności: od słabej (Sygnał) do skrajnej (Afekt) wersji emocji
export const IntensityLadder = ({ emotion, lang }: { emotion: Emotion, lang: Lang }) => {
  const t = uiTranslations[lang].modal
  return (
    <div className="p-5 rounded-xl border relative overflow-hidden bg-white border-slate-200 not-dark:shadow-sm dark:bg-slate-900 dark:border-slate-700">
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
                    <div className={`basis-full sm:basis-auto sm:flex-1 sm:mx-3 sm:order-2 h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800`}>
                        <div className={`h-full bg-current ${row.bar} ${emotion.colorClass}`}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
