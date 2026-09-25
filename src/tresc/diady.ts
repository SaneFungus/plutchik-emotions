import type { L } from "./typy"

// ─── Diady: co powstaje z połączenia dwóch emocji ───────────────────
// primary = emocje sąsiadujące na kole, secondary = co drugą, tertiary = co trzecią,
// opposite = naprzeciw siebie (nie mieszają się — "Konflikt").
export type DyadType = "primary" | "secondary" | "tertiary" | "opposite"

export interface DyadResult {
  name: L
  type: DyadType
}

// Klucz = identyfikatory dwóch emocji w kolejności alfabetycznej, połączone "+"
const DYADS: Record<string, DyadResult> = {
  "JOY+TRUST": { name: { pl: "Miłość", en: "Love" }, type: "primary" },
  "FEAR+TRUST": { name: { pl: "Uległość", en: "Submission" }, type: "primary" },
  "FEAR+SURPRISE": { name: { pl: "Poruszenie", en: "Alarm" }, type: "primary" },
  "SADNESS+SURPRISE": { name: { pl: "Rozczarowanie", en: "Disappointment" }, type: "primary" },
  "DISGUST+SADNESS": { name: { pl: "Żal", en: "Remorse" }, type: "primary" },
  "ANGER+DISGUST": { name: { pl: "Pogarda", en: "Contempt" }, type: "primary" },
  "ANGER+ANTICIPATION": { name: { pl: "Agresja", en: "Aggression" }, type: "primary" },
  "ANTICIPATION+JOY": { name: { pl: "Optymizm", en: "Optimism" }, type: "primary" },
  "FEAR+JOY": { name: { pl: "Poczucie winy", en: "Guilt" }, type: "secondary" },
  "SURPRISE+TRUST": { name: { pl: "Ciekawość", en: "Curiosity" }, type: "secondary" },
  "FEAR+SADNESS": { name: { pl: "Rozpacz", en: "Despair" }, type: "secondary" },
  "DISGUST+SURPRISE": { name: { pl: "Szok", en: "Shock" }, type: "secondary" },
  "ANGER+SADNESS": { name: { pl: "Cierpienie", en: "Misery" }, type: "secondary" },
  "ANTICIPATION+DISGUST": { name: { pl: "Cynizm", en: "Cynicism" }, type: "secondary" },
  "ANGER+JOY": { name: { pl: "Duma", en: "Pride" }, type: "secondary" },
  "ANTICIPATION+TRUST": { name: { pl: "Fatalizm", en: "Fatalism" }, type: "secondary" },
  "JOY+SURPRISE": { name: { pl: "Zachwyt", en: "Delight" }, type: "tertiary" },
  "SADNESS+TRUST": { name: { pl: "Sentymentalizm", en: "Sentimentality" }, type: "tertiary" },
  "DISGUST+FEAR": { name: { pl: "Wstyd", en: "Shame" }, type: "tertiary" },
  "ANGER+SURPRISE": { name: { pl: "Oburzenie", en: "Outrage" }, type: "tertiary" },
  "ANTICIPATION+SADNESS": { name: { pl: "Pesymizm", en: "Pessimism" }, type: "tertiary" },
  "DISGUST+JOY": { name: { pl: "Patologia", en: "Morbidness" }, type: "tertiary" },
  "ANGER+TRUST": { name: { pl: "Dominacja", en: "Dominance" }, type: "tertiary" },
  "ANTICIPATION+FEAR": { name: { pl: "Lęk", en: "Anxiety" }, type: "tertiary" },
  "JOY+SADNESS": { name: { pl: "Konflikt", en: "Conflict" }, type: "opposite" },
  "DISGUST+TRUST": { name: { pl: "Konflikt", en: "Conflict" }, type: "opposite" },
  "ANGER+FEAR": { name: { pl: "Konflikt", en: "Conflict" }, type: "opposite" },
  "ANTICIPATION+SURPRISE": { name: { pl: "Konflikt", en: "Conflict" }, type: "opposite" },
}

// Nazwa rodzaju diady na plakietce pod wynikiem
export const DYAD_TYPE_LABELS: Record<DyadType, L> = {
  primary: { pl: "Podstawowa", en: "Primary" },
  secondary: { pl: "Drugorzędna", en: "Secondary" },
  tertiary: { pl: "Trzeciorzędna", en: "Tertiary" },
  opposite: { pl: "Przeciwieństwo (Konflikt)", en: "Opposite (Conflict)" },
}

export const getDyad = (e1Id: string, e2Id: string): DyadResult | null => {
  if (e1Id === e2Id) return null
  return DYADS[[e1Id, e2Id].sort().join("+")] || null
}
