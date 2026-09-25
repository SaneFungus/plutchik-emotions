// *tekst* → kursywa (jedyne formatowanie potrzebne w tekstach teorii)
export const rich = (text: string) =>
  text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.length > 2 && part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part
  )
