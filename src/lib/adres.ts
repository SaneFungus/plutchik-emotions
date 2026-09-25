import { EMOTIONS } from "../tresc/emocje"
import type { Emotion } from "../tresc/typy"

// ─── Adres strony: zakładka i otwarta karta emocji ─────────────────
// Link do wysłania studentom, np. #katalog albo #katalog/gniew (otwiera kartę Gniewu).
// Hash, nie ścieżka: GitHub Pages serwuje jeden plik, a hash nie wymaga przekierowań.
export type View = "shuffle" | "dyads" | "catalog" | "manifesto"
const VIEW_SLUGS: Record<View, string> = { shuffle: "losuj", dyads: "diady", catalog: "katalog", manifesto: "teoria" }

// Polska nazwa bez ogonków: Radość → radosc, Wstręt → wstret
const slugOf = (e: Emotion) => e.name.pl.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

export const hashFor = (view: View, emotion?: Emotion | null) =>
  `#${VIEW_SLUGS[view]}${emotion ? `/${slugOf(emotion)}` : ""}`

export const parseHash = (hash: string): { view: View | null; emotion: Emotion | null } => {
  const [v, e] = decodeURIComponent(hash.replace(/^#\/?/, "")).toLowerCase().split("/")
  const view = (Object.keys(VIEW_SLUGS) as View[]).find((k) => VIEW_SLUGS[k] === v) ?? null
  // przyjmujemy też angielski identyfikator (#katalog/anger)
  const emotion = e ? EMOTIONS.find((x) => slugOf(x) === e || x.id.toLowerCase() === e) ?? null : null
  return { view, emotion: view ? emotion : null }
}
