import type { Lang } from "../tresc/typy"

// ─── Ustawienia zapamiętane w przeglądarce (język, tryb jasny/ciemny) ─
// try/catch: w trybie prywatnym albo przy zablokowanych danych strony dostęp do pamięci rzuca błąd.
const SETTINGS_KEY = "plutchik-settings"
export type Stage = "light" | "dark"
type Settings = { lang?: Lang; stage?: Stage }

export const loadSettings = (): Settings => {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}")
    return {
      lang: s.lang === "en" || s.lang === "pl" ? s.lang : undefined,
      stage: s.stage === "light" || s.stage === "dark" ? s.stage : undefined,
    }
  } catch {
    return {}
  }
}

export const saveSettings = (s: Settings) => {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)) } catch { /* bez pamięci działa jak dotąd */ }
}
