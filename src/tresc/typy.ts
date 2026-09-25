import type { ElementType } from "react"

// Tekst w obu językach aplikacji
export type L = { pl: string; en: string }
export type Lang = keyof L

// Etapy łańcucha Bodziec → Impuls → (Emocja) → Działanie → Cel, które da się rozwinąć.
// "Emocja" nie ma tu miejsca — to nazwa karty, nie etap do wyjaśnienia.
export type MechanismStep = "stimulus" | "impulse" | "action" | "function"
export const MECHANISM_STEPS: MechanismStep[] = ["stimulus", "impulse", "action", "function"]

export interface Emotion {
  id: string
  name: L
  desc: L
  stimulus: L
  impulse: L
  action: L
  function: L
  // Co dzieje się na każdym etapie łańcucha — tekst rozwijany na karcie emocji
  mechanism: Record<MechanismStep, L>
  intensity: {
    low: L
    medium: L
    high: L
  }
  vector: L
  signals: { pl: string[]; en: string[] }
  colorClass: string
  textLightClass: string
  bgLightClass: string
  hex: string
  icon: ElementType
}
