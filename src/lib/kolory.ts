// Krycie przedniego kola w diadzie (zmierzone na wzorcu: ok. 70%)
export const DYAD_ALPHA = 0.7

// Kolor `top` o kryciu `alpha` polozony na kolorze `base` (zwykla przezroczystosc)
export const mixHex = (base: string, top: string, alpha: number) => {
  const ch = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16)
  return "#" + [0, 1, 2]
    .map(i => Math.round(ch(base, i) * (1 - alpha) + ch(top, i) * alpha).toString(16).padStart(2, "0"))
    .join("")
}
