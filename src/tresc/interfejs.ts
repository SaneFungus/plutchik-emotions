// ─── Tłumaczenia interfejsu (UI) ─────────────────────────────────
// Napisy na przyciskach, nagłówkach i w oknie emocji. Treść emocji, diad i teorii
// leży w osobnych plikach obok.
export const uiTranslations = {
  pl: {
    title: "Koło Emocji",
    subtitle: "Aparat Aktorski & Teoria Ewolucyjna",
    nav: { shuffle: "LOSUJ", dyads: "DIADY", catalog: "KATALOG", theory: "TEORIA" },
    stageToggle: { light: "Włącz tryb jasny", dark: "Włącz tryb ciemny" },
    // Przycisk języka opisany w języku, na który przełącza — tak przeczyta go czytnik ekranu
    langToggle: { lang: "en", label: "Switch to English" },
    shuffleBtn: "LOSUJ EMOCJĘ",
    dyadsTitle: "Mieszanina Emocji",
    dyadsDesc: "Emocje łączą się w diady tworząc złożone stany emocjonalne.",
    dyadsResult: "WYNIK (DIADA)",
    dyadsBtn: "LOSUJ PARĘ",
    catalogTitle: "Katalog Podstawowy",
    modal: {
      mechanism: "Mechanizm Powstawania (Teoria Plutchika & Jamesa-Langego)",
      neuroception: "*Neurocepcja: Ciało reaguje na bodziec (impuls) szybciej niż umysł nada mu nazwę (emocja).",
      motorics: "Motoryka",
      movementVector: "Wektor ruchu",
      bodyDictionary: "Słownik Ciała (Sygnały Somatyczne)",
      bodyDictDesc: "Zewnętrzne i wewnętrzne objawy fizjologiczne. Skorzystaj z nich, by zbudować wiarygodną reakcję postaci.",
      actorPerspective: "Perspektywa Aktora",
      bodySignal: "Sygnał z ciała (Co czuję?)",
      scenicGoal: "Cel sceniczny (Zadanie)",
      back: "Zamknij",
      stimulus: "Bodziec",
      impulse: "Impuls",
      emotion: "Emocja",
      action: "Działanie",
      bioGoal: "Cel Biologiczny",
      energyScale: "Skala Energii (Intensywność)",
      affect: "Afekt",
      signal: "Sygnał",
      mechanismHint: "Dotknij etapu, żeby zobaczyć, co dzieje się w tej emocji.",
      next: "Dalej"
    },
    footer: {
      about: "Interaktywne narzędzie dydaktyczne opracowane dla studentów Wydziału Aktorskiego Akademii Teatralnej w Warszawie.",
      usage: "Do użytku edukacyjnego",
    },
  },
  en: {
    title: "Emotion Wheel",
    subtitle: "Actor's Tool & Evolutionary Theory",
    nav: { shuffle: "SHUFFLE", dyads: "DYADS", catalog: "CATALOG", theory: "THEORY" },
    stageToggle: { light: "Switch to light mode", dark: "Switch to dark mode" },
    langToggle: { lang: "pl", label: "Przełącz na polski" },
    shuffleBtn: "RANDOM EMOTION",
    dyadsTitle: "Emotion Mixture",
    dyadsDesc: "Emotions combine into dyads creating complex emotional states.",
    dyadsResult: "RESULT (DYAD)",
    dyadsBtn: "RANDOM PAIR",
    catalogTitle: "Primary Catalog",
    modal: {
      mechanism: "Mechanism of Origin (Plutchik & James-Lange Theory)",
      neuroception: "*Neuroception: The body reacts to a stimulus faster than the mind names it.",
      motorics: "Motorics",
      movementVector: "Movement Vector",
      bodyDictionary: "Body Dictionary (Somatic Signals)",
      bodyDictDesc: "External and internal physiological symptoms. Use them to build a credible character reaction.",
      actorPerspective: "Actor's Perspective",
      bodySignal: "Body Signal (What do I feel?)",
      scenicGoal: "Scenic Goal (Task)",
      back: "Close",
      stimulus: "Stimulus",
      impulse: "Impulse",
      emotion: "Emotion",
      action: "Action",
      bioGoal: "Biological Goal",
      energyScale: "Energy Scale (Intensity)",
      affect: "Affect",
      signal: "Signal",
      mechanismHint: "Tap a stage to see what happens in this emotion.",
      next: "Next"
    },
    footer: {
      about: "Interactive educational tool developed for the students of the Acting Department at the Theatre Academy in Warsaw.",
      usage: "For educational use",
    },
  }
}

export type UI = (typeof uiTranslations)["pl"]

// Tytuł karty przeglądarki
export const PAGE_TITLE = { pl: "8 emocji Roberta Plutchika", en: "Robert Plutchik's 8 Emotions" }
