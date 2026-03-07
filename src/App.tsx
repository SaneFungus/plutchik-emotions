import React, { useState, useCallback } from "react"
import {
  Shuffle,
  Combine,
  Eye,
  EyeOff,
  BookOpen,
  LayoutGrid,
  HeartPulse,
  Layers,
  Activity,
  Target,
  AlertTriangle,
  Flame,
  Zap,
  Anchor,
  UserCheck,
  MinusCircle,
  Eye as EyeIcon,
  Maximize2,
  Move,
  Fingerprint,
  BarChart2,
  ArrowRight,
  ArrowDown,
  X
} from "lucide-react"

// ─── Tłumaczenia interfejsu (UI) ─────────────────────────────────
const uiTranslations = {
  pl: {
    title: "Koło Emocji",
    subtitle: "Aparat Aktorski & Teoria Ewolucyjna",
    nav: { shuffle: "LOSUJ", dyads: "DIADY", catalog: "KATALOG", theory: "TEORIA" },
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
      remember: "Pamiętaj: Ciało nie kłamie. Zagraj impuls (napięcie/rozluźnienie), a emocja pojawi się sama.",
      back: "Zamknij",
      stimulus: "Bodziec",
      impulse: "Impuls",
      emotion: "Emocja",
      action: "Działanie",
      bioGoal: "Cel Biologiczny",
      energyScale: "Skala Energii (Intensywność)",
      affect: "Afekt",
      signal: "Sygnał"
    }
  },
  en: {
    title: "Emotion Wheel",
    subtitle: "Actor's Tool & Evolutionary Theory",
    nav: { shuffle: "SHUFFLE", dyads: "DYADS", catalog: "CATALOG", theory: "THEORY" },
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
      remember: "Remember: The body doesn't lie. Play the impulse, and the emotion will appear by itself.",
      back: "Close",
      stimulus: "Stimulus",
      impulse: "Impulse",
      emotion: "Emotion",
      action: "Action",
      bioGoal: "Biological Goal",
      energyScale: "Energy Scale (Intensity)",
      affect: "Affect",
      signal: "Signal"
    }
  }
}

// ─── Data: 8 Basic Emotions + Rich Actor Data ──────────────────────
interface Emotion {
  id: string
  name: { pl: string; en: string }
  desc: { pl: string; en: string }
  stimulus: { pl: string; en: string }
  impulse: { pl: string; en: string }
  action: { pl: string; en: string }
  function: { pl: string; en: string }
  intensity: {
    low: { pl: string; en: string }
    medium: { pl: string; en: string }
    high: { pl: string; en: string }
  }
  vector: { pl: string; en: string }
  signals: { pl: string[]; en: string[] }
  colorClass: string
  bgLightClass: string
  hex: string
  icon: React.ElementType
}

const EMOTIONS: Emotion[] = [
  {
    id: "FEAR",
    name: { pl: "Strach", en: "Fear" },
    desc: {
      pl: "Ciało rozpoznaje siłę wyższą od siebie. Priorytetem jest zachowanie integralności poprzez wycofanie.",
      en: "The body recognizes a force greater than itself. Priority is to preserve integrity by withdrawing.",
    },
    stimulus: { pl: "ZAGROŻENIE", en: "THREAT" },
    impulse: { pl: "Napięcie / Alarm", en: "Tension / Alarm" },
    action: { pl: "UCIECZKA / UNIK", en: "ESCAPE / AVOIDANCE" },
    function: { pl: "OCHRONA", en: "PROTECTION" },
    intensity: {
      low: { pl: "Niepokój", en: "Anxiety" },
      medium: { pl: "Strach", en: "Fear" },
      high: { pl: "Przerażenie", en: "Terror" }
    },
    vector: { pl: "DO TYŁU / KURCZENIE SIĘ", en: "BACKWARD / CONTRACTION" },
    signals: {
      pl: [
        "Przyspieszone bicie serca (kołatanie)",
        "Płytki, szybki oddech lub wstrzymywanie powietrza",
        "Bladość twarzy, odpływ krwi z kończyn",
        "Zimny pot (szczególnie na czole i dłoniach)",
        "Drżenie rąk, kolan lub warg",
        "Szeroko otwarte oczy, rozszerzone źrenice",
        "Suchość w ustach (częste przełykanie śliny)",
        "Odruchowe kulenie się (osłanianie szyi/brzucha)"
      ],
      en: [
        "Accelerated heartbeat (palpitations)",
        "Shallow, rapid breathing or holding breath",
        "Pale face, blood draining from limbs",
        "Cold sweat (especially on forehead and palms)",
        "Trembling hands, knees or lips",
        "Wide open eyes, dilated pupils",
        "Dry mouth (frequent swallowing)",
        "Reflexive crouching (shielding neck/belly)"
      ]
    },
    colorClass: "text-emerald-500",
    bgLightClass: "bg-emerald-500/10",
    hex: "#10b981",
    icon: AlertTriangle,
  },
  {
    id: "ANGER",
    name: { pl: "Gniew", en: "Anger" },
    desc: {
      pl: "Organizm rozpoznaje przeszkodę, którą może pokonać. Mobilizacja energii do walki.",
      en: "The organism recognizes an obstacle it can overcome. Mobilization of energy to fight.",
    },
    stimulus: { pl: "PRZESZKODA", en: "OBSTACLE" },
    impulse: { pl: "Gorąco / Adrenalina", en: "Heat / Adrenaline" },
    action: { pl: "ATAK / PRZEBICIE", en: "ATTACK / BREAKTHROUGH" },
    function: { pl: "DESTRUKCJA", en: "DESTRUCTION" },
    intensity: {
      low: { pl: "Irytacja", en: "Annoyance" },
      medium: { pl: "Gniew", en: "Anger" },
      high: { pl: "Wściekłość", en: "Rage" }
    },
    vector: { pl: "DO PRZODU / TARCIE", en: "FORWARD / FRICTION" },
    signals: {
      pl: [
        "Zaciśnięte szczęki, zgrzytanie zębami",
        "Czerwienienie się twarzy i szyi",
        "Rozdęte nozdrza",
        "Zaciśnięte pięści (bielenie knykci)",
        "Wysunięcie żuchwy lub głowy do przodu",
        "Napięcie mięśni ramion i karku",
        "Głośniejszy, szorstki ton głosu",
        "Intensywny kontakt wzrokowy (tunelowe widzenie)"
      ],
      en: [
        "Clenched jaws, grinding teeth",
        "Reddening of face and neck",
        "Flaring nostrils",
        "Clenched fists (whitening knuckles)",
        "Jutting jaw or head forward",
        "Tension in shoulder and neck muscles",
        "Louder, harsh voice tone",
        "Intense eye contact (tunnel vision)"
      ]
    },
    colorClass: "text-red-500",
    bgLightClass: "bg-red-500/10",
    hex: "#ef4444",
    icon: Flame,
  },
  {
    id: "JOY",
    name: { pl: "Radość", en: "Joy" },
    desc: {
      pl: "Sygnał bezpieczeństwa i siły ('Mam zasoby!'). Napędza taniec godowy, flirt i przyciąganie uwagi.",
      en: "Signal of safety and strength ('I have resources!'). Drives mating dance, flirtation, and attracting attention.",
    },
    stimulus: { pl: "SUKCES / ZASOBY", en: "SUCCESS / RESOURCES" },
    impulse: { pl: "Ekspansja / Energia", en: "Expansion / Energy" },
    action: { pl: "POPISYWANIE SIĘ", en: "SHOWING OFF" },
    function: { pl: "WITALNOŚĆ / ZALOTY", en: "VITALITY / COURTSHIP" },
    intensity: {
      low: { pl: "Pogoda ducha", en: "Serenity" },
      medium: { pl: "Radość", en: "Joy" },
      high: { pl: "Ekstaza", en: "Ecstasy" }
    },
    vector: { pl: "W GÓRĘ / NA ZEWNĄTRZ", en: "UPWARD / OUTWARD" },
    signals: {
      pl: [
        "Uniesione kąciki ust (uśmiech angażujący oczy)",
        "Błyszczące, lekko wilgotne oczy",
        "Rozluźniona, otwarta postawa ciała",
        "Podniesiona głowa i klatka piersiowa",
        "Energiczne, płynne gesty",
        "Częsty śmiech, chichot",
        "Eksponowanie szyi i nadgarstków",
        "Sprężysty krok, 'lekkość' ciała"
      ],
      en: [
        "Raised corners of the mouth (smile engaging eyes)",
        "Sparkling, slightly moist eyes",
        "Relaxed, open body posture",
        "Raised head and chest",
        "Energetic, fluid gestures",
        "Frequent laughter, giggling",
        "Exposing neck and wrists",
        "Bouncy step, 'lightness' of body"
      ]
    },
    colorClass: "text-yellow-500",
    bgLightClass: "bg-yellow-500/10",
    hex: "#eab308",
    icon: Zap,
  },
  {
    id: "SADNESS",
    name: { pl: "Smutek", en: "Sadness" },
    desc: {
      pl: "Sygnał dla grupy o potrzebie wsparcia ('Pomóż mi'). Oszczędzanie energii w obliczu nieodwracalnej straty.",
      en: "Signal to the group for support ('Help me'). Conserving energy in the face of irreversible loss.",
    },
    stimulus: { pl: "UTRATA", en: "LOSS" },
    impulse: { pl: "Ciężar / Zapadanie", en: "Heaviness / Sinking" },
    action: { pl: "PŁACZ / BEZRUCH", en: "CRYING / STILLNESS" },
    function: { pl: "REINTEGRACJA", en: "REINTEGRATION" },
    intensity: {
      low: { pl: "Zaduma", en: "Pensiveness" },
      medium: { pl: "Smutek", en: "Sadness" },
      high: { pl: "Rozpacz", en: "Grief" }
    },
    vector: { pl: "W DÓŁ / DO ŚRODKA", en: "DOWNWARD / INWARD" },
    signals: {
      pl: [
        "Opadające kąciki ust i powiek",
        "Wzrok wbity w ziemię lub 'nieobecny'",
        "Zgarbiona sylwetka, zapadnięta klatka piersiowa",
        "Powolne, ociężałe ruchy (letarg)",
        "Cichy, monotonny lub łamiący się głos",
        "Łzy, szklące się oczy",
        "Zasłanianie twarzy dłońmi",
        "Apatia, brak reakcji na bodźce zewnętrzne"
      ],
      en: [
        "Drooping corners of mouth and eyelids",
        "Gaze fixed on the ground or 'absent'",
        "Slumped silhouette, sunken chest",
        "Slow, heavy movements (lethargy)",
        "Quiet, monotone or breaking voice",
        "Tears, glassy eyes",
        "Covering face with hands",
        "Apathy, lack of reaction to external stimuli"
      ]
    },
    colorClass: "text-blue-500",
    bgLightClass: "bg-blue-500/10",
    hex: "#3b82f6",
    icon: Anchor,
  },
  {
    id: "TRUST",
    name: { pl: "Zaufanie", en: "Trust" },
    desc: {
      pl: "Decyzja organizmu o wpuszczeniu kogoś do strefy intymnej. Niezbędna do aktu tworzenia więzi.",
      en: "Organism's decision to let someone into the intimate zone. Essential for bonding.",
    },
    stimulus: { pl: "PRZYJACIEL", en: "FRIEND" },
    impulse: { pl: "Rozluźnienie / Ciepło", en: "Relaxation / Warmth" },
    action: { pl: "OTWARCIE GRANIC", en: "OPENING BOUNDARIES" },
    function: { pl: "WIĘŹ / INTYMNOŚĆ", en: "BONDING / INTIMACY" },
    intensity: {
      low: { pl: "Akceptacja", en: "Acceptance" },
      medium: { pl: "Zaufanie", en: "Trust" },
      high: { pl: "Oddanie", en: "Admiration" }
    },
    vector: { pl: "DO SIEBIE / WCHŁANIANIE", en: "TOWARD SELF / ABSORPTION" },
    signals: {
      pl: [
        "Stały, łagodny kontakt wzrokowy",
        "Odsłonięcie wrażliwych części ciała (szyja, brzuch)",
        "Otwarte dłonie (pokazywanie wnętrza)",
        "Pochylenie ciała w stronę rozmówcy",
        "Synchronizacja ruchów (efekt lustra)",
        "Rozluźnione mięśnie twarzy (brak napięcia)",
        "Spokojny, miarowy oddech",
        "Ciepły, kojący ton głosu"
      ],
      en: [
        "Steady, gentle eye contact",
        "Exposing vulnerable body parts (neck, belly)",
        "Open hands (showing palms)",
        "Leaning body towards the interlocutor",
        "Synchronization of movements (mirror effect)",
        "Relaxed facial muscles (no tension)",
        "Calm, measured breathing",
        "Warm, soothing voice tone"
      ]
    },
    colorClass: "text-lime-500",
    bgLightClass: "bg-lime-500/10",
    hex: "#84cc16",
    icon: UserCheck,
  },
  {
    id: "DISGUST",
    name: { pl: "Wstręt", en: "Disgust" },
    desc: {
      pl: "Ochrona organizmu przed zatruciem fizycznym (jedzenie) lub moralnym (zachowanie).",
      en: "Protection of the organism against physical poisoning (food) or moral poisoning (behavior).",
    },
    stimulus: { pl: "TOKSYNA", en: "TOXIN" },
    impulse: { pl: "Mdłości / Skurcz", en: "Nausea / Contraction" },
    action: { pl: "WYPYCHANIE / PLUCIE", en: "PUSHING AWAY / SPITTING" },
    function: { pl: "ODRZUCENIE", en: "REJECTION" },
    intensity: {
      low: { pl: "Niechęć", en: "Boredom" },
      medium: { pl: "Wstręt", en: "Disgust" },
      high: { pl: "Odraza", en: "Loathing" }
    },
    vector: { pl: "OD SIEBIE / BLOKADA", en: "AWAY FROM SELF / BLOCKING" },
    signals: {
      pl: [
        "Marszczenie nosa",
        "Uniesienie górnej wargi (grymas)",
        "Mrużenie oczu (ograniczenie pola widzenia)",
        "Odwracanie głowy od źródła bodźca",
        "Zasłanianie ust lub nosa dłonią",
        "Odruch wymiotny, przełykanie śliny",
        "Cofanie tułowia (odchylenie w tył)",
        "Zaciskanie ust (blokada przed wniknięciem)"
      ],
      en: [
        "Wrinkling nose",
        "Raising upper lip (sneer)",
        "Squinting eyes (limiting field of vision)",
        "Turning head away from stimulus source",
        "Covering mouth or nose with hand",
        "Gag reflex, swallowing saliva",
        "Retracting torso (leaning back)",
        "Purging lips (blocking entry)"
      ]
    },
    colorClass: "text-purple-500",
    bgLightClass: "bg-purple-500/10",
    hex: "#a855f7",
    icon: MinusCircle,
  },
  {
    id: "ANTICIPATION",
    name: { pl: "Oczekiwanie", en: "Anticipation" },
    desc: {
      pl: "Aktywne poszukiwanie informacji. Przygotowanie ciała na to, co dopiero nadejdzie.",
      en: "Active search for information. Preparing the body for what is yet to come.",
    },
    stimulus: { pl: "NIEZNANE TERYTORIUM", en: "UNKNOWN TERRITORY" },
    impulse: { pl: "Wyostrzenie zmysłów", en: "Sharpening of senses" },
    action: { pl: "SKANOWANIE / TROPIENIE", en: "SCANNING / TRACKING" },
    function: { pl: "EKSPLORACJA", en: "EXPLORATION" },
    intensity: {
      low: { pl: "Ciekawość", en: "Interest" },
      medium: { pl: "Oczekiwanie", en: "Anticipation" },
      high: { pl: "Czujność", en: "Vigilance" }
    },
    vector: { pl: "DO PRZODU (Głowa)", en: "FORWARD (Head)" },
    signals: {
      pl: [
        "Rozszerzone źrenice (chęć chłonięcia informacji)",
        "Lekkie napięcie mięśni (gotowość do startu)",
        "Oblizywanie ust (z niepokoju lub ekscytacji)",
        "Wiercenie się, tupanie, bębnienie palcami",
        "Wpatrywanie się w jeden punkt (np. drzwi, telefon)",
        "Pochylenie głowy lub tułowia do przodu",
        "Wstrzymywanie oddechu w kluczowych momentach",
        "Skanowanie otoczenia wzrokiem"
      ],
      en: [
        "Dilated pupils (desire to absorb information)",
        "Slight muscle tension (readiness to start)",
        "Licking lips (from anxiety or excitement)",
        "Fidgeting, tapping, drumming fingers",
        "Staring at one point (e.g., door, phone)",
        "Leaning head or torso forward",
        "Holding breath at key moments",
        "Scanning the environment with eyes"
      ]
    },
    colorClass: "text-orange-500",
    bgLightClass: "bg-orange-500/10",
    hex: "#f97316",
    icon: EyeIcon,
  },
  {
    id: "SURPRISE",
    name: { pl: "Zaskoczenie", en: "Surprise" },
    desc: {
      pl: "Nagły reset uwagi ('Biała karta'). Przerwanie działania, by ocenić nowy bodziec.",
      en: "Sudden reset of attention ('Blank slate'). Interrupting action to assess a new stimulus.",
    },
    stimulus: { pl: "NAGŁY OBIEKT", en: "SUDDEN OBJECT" },
    impulse: { pl: "Wdech / Zatrzymanie", en: "Inhale / Freezing" },
    action: { pl: "STOP / RESET", en: "STOP / RESET" },
    function: { pl: "ORIENTACJA", en: "ORIENTATION" },
    intensity: {
      low: { pl: "Roztargnienie", en: "Distraction" },
      medium: { pl: "Zaskoczenie", en: "Surprise" },
      high: { pl: "Szok", en: "Amazement" }
    },
    vector: { pl: "STOP / ROZSZERZENIE", en: "STOP / EXPANSION" },
    signals: {
      pl: [
        "Gwałtowne otwarcie ust (opadnięcie żuchwy)",
        "Wysoko uniesione brwi (zmarszczki na czole)",
        "Szeroko otwarte oczy (widoczne białka)",
        "Nagły, krótki wdech (gasp)",
        "Chwilowe zamarcie w bezruchu (reakcja 'freeze')",
        "Odruchowe cofnięcie się (krok w tył)",
        "Podniesienie dłoni do ust lub klatki piersiowej",
        "Rozluźnienie mięśni po chwili (jeśli brak zagrożenia)"
      ],
      en: [
        "Sudden opening of mouth (jaw drop)",
        "High raised eyebrows (wrinkles on forehead)",
        "Wide open eyes (visible whites)",
        "Sudden, short inhale (gasp)",
        "Momentary freezing in stillness ('freeze' reaction)",
        "Reflexive stepping back",
        "Raising hands to mouth or chest",
        "Relaxation of muscles after a moment (if no threat)"
      ]
    },
    colorClass: "text-cyan-500",
    bgLightClass: "bg-cyan-500/10",
    hex: "#06b6d4",
    icon: Maximize2,
  },
]

// ─── Dyads Logic ──────────────────────────────────────────────────
interface DyadResult {
  name: { pl: string; en: string }
  type: "primary" | "secondary" | "tertiary" | "opposite"
}

const getDyad = (e1Id: string, e2Id: string): DyadResult | null => {
  if (e1Id === e2Id) return null
  const pair = [e1Id, e2Id].sort().join("+")
  const dyads: Record<string, DyadResult> = {
    "JOY+TRUST": { name: { pl: "Miłość", en: "Love" }, type: "primary" },
    "FEAR+TRUST": { name: { pl: "Uległość", en: "Submission" }, type: "primary" },
    "FEAR+SURPRISE": { name: { pl: "Poruszenie", en: "Alarm" }, type: "primary" },
    "SADNESS+SURPRISE": { name: { pl: "Rozczarowanie", en: "Disappointment" }, type: "primary" },
    "DISGUST+SADNESS": { name: { pl: "Żal", en: "Remorse" }, type: "primary" },
    "ANGER+DISGUST": { name: { pl: "Zawiść", en: "Contempt/Envy" }, type: "primary" },
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
  return dyads[pair] || null
}

// ─── Sub-components ───────────────────────────────────────────────

const EvoChain = ({ emotion, lang, isDark }: { emotion: Emotion, lang: 'pl'|'en', isDark: boolean }) => {
  const t = uiTranslations[lang].modal
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between gap-3 p-4 rounded-xl border mb-6 ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
        <div className="text-center flex-1">
            <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">{t.stimulus}</span>
            <p className="font-bold text-sm mt-1">{emotion.stimulus[lang]}</p>
        </div>
        <ArrowRight className="hidden md:block opacity-40 w-5 h-5" />
        <ArrowDown className="md:hidden opacity-40 w-5 h-5" />
        
        <div className={`text-center flex-1 p-2 rounded-lg border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>{t.impulse}</span>
            <p className="italic text-sm mt-1 font-serif">"{emotion.impulse[lang]}"</p>
        </div>
        <ArrowRight className="hidden md:block opacity-40 w-5 h-5" />
        <ArrowDown className="md:hidden opacity-40 w-5 h-5" />

        <div className={`text-center flex-1 p-3 rounded-xl border border-current ${emotion.bgLightClass} ${emotion.colorClass}`}>
            <span className="text-[10px] uppercase tracking-widest opacity-70 font-bold">{t.emotion}</span>
            <p className="font-black text-lg leading-tight mt-0.5">{emotion.name[lang]}</p>
        </div>
        <ArrowRight className="hidden md:block opacity-40 w-5 h-5" />
        <ArrowDown className="md:hidden opacity-40 w-5 h-5" />

        <div className="text-center flex-1">
            <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">{t.action}</span>
            <p className="font-bold text-sm mt-1">{emotion.action[lang]}</p>
        </div>
        <ArrowRight className="hidden md:block opacity-40 w-5 h-5" />
        <ArrowDown className="md:hidden opacity-40 w-5 h-5" />

        <div className={`text-center flex-1 p-2 rounded-lg ${isDark ? "bg-slate-900" : "bg-slate-100"}`}>
            <span className="text-[9px] uppercase tracking-widest opacity-60 font-bold">{t.bioGoal}</span>
            <p className={`font-bold text-xs mt-1 ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>{emotion.function[lang]}</p>
        </div>
    </div>
  )
}

const IntensityLadder = ({ emotion, lang, isDark }: { emotion: Emotion, lang: 'pl'|'en', isDark: boolean }) => {
  const t = uiTranslations[lang].modal
  return (
    <div className={`p-5 rounded-xl border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
        <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-5 flex items-center gap-2">
            <BarChart2 size={16} /> {t.energyScale}
        </h3>
        <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
                <span className="text-xs opacity-60 w-24 font-medium">{t.affect}</span>
                <div className={`flex-1 mx-3 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div className={`h-full w-full opacity-100 bg-current ${emotion.colorClass}`}></div>
                </div>
                <span className="text-sm font-bold w-32 text-right">{emotion.intensity.high[lang]}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs opacity-60 w-24 font-medium">{t.emotion}</span>
                <div className={`flex-1 mx-3 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div className={`h-full w-2/3 opacity-70 bg-current ${emotion.colorClass}`}></div>
                </div>
                <span className="text-sm font-semibold w-32 text-right">{emotion.intensity.medium[lang]}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs opacity-60 w-24 font-medium">{t.signal}</span>
                <div className={`flex-1 mx-3 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div className={`h-full w-1/3 opacity-40 bg-current ${emotion.colorClass}`}></div>
                </div>
                <span className="text-sm opacity-70 w-32 text-right">{emotion.intensity.low[lang]}</span>
            </div>
        </div>
    </div>
  )
}

// ─── App Component ────────────────────────────────────────────────
const App: React.FC = () => {
  const [lang, setLang] = useState<"pl" | "en">("pl")
  const [view, setView] = useState<"shuffle" | "dyads" | "manifesto" | "catalog">("shuffle")
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(EMOTIONS[0])
  const [dyadPair, setDyadPair] = useState<[Emotion, Emotion]>([EMOTIONS[0], EMOTIONS[1]])
  const [stageMode, setStageMode] = useState<"light" | "dark">("dark")
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null)

  const toggleLang = () => setLang((l) => (l === "pl" ? "en" : "pl"))
  const toggleStage = () => setStageMode((s) => (s === "light" ? "dark" : "light"))

  const handleShuffle = useCallback(() => {
    setIsSpinning(true)
    setTimeout(() => {
      const next = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
      setCurrentEmotion(next)
      setIsSpinning(false)
    }, 400)
  }, [])

  const handleRandomDyad = useCallback(() => {
    const next1 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    let next2 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    while (next1.id === next2.id) {
      next2 = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]
    }
    setDyadPair([next1, next2])
  }, [])

  const isDark = stageMode === "dark"
  const t = uiTranslations[lang]

  return (
    <div
      className={`min-h-screen transition-colors duration-700 p-3 sm:p-6 md:p-8 flex flex-col items-center overflow-x-hidden ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <style>{`
        @keyframes roulette {
          0% { transform: scale(0.9) rotate(0deg); opacity: 0.5; filter: blur(4px); }
          50% { transform: scale(1.05) rotate(180deg); opacity: 0.8; filter: blur(2px); }
          100% { transform: scale(1) rotate(360deg); opacity: 1; filter: blur(0px); }
        }
        .animate-roulette {
          animation: roulette 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slide { animation: slideUp 0.4s ease-out forwards; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6 md:mb-8 pt-2">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
            {t.title}
            <span className="text-[10px] sm:text-xs font-normal opacity-40 ml-1 sm:ml-2 border-l border-current pl-1 sm:pl-2">
              PLUTCHIK
            </span>
          </h1>
          <span className="text-[9px] sm:text-[10px] font-mono opacity-50 uppercase mt-1">
            {t.subtitle}
          </span>
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={toggleStage}
            className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 border ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {isDark ? <Eye size={16} className="sm:w-5 sm:h-5" /> : <EyeOff size={16} className="sm:w-5 sm:h-5" />}
          </button>
          <button
            onClick={toggleLang}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 border ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {lang}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 sm:p-1.5 rounded-2xl w-full max-w-5xl transition-colors overflow-x-auto no-scrollbar scroll-smooth border ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-slate-200/50 border-slate-300/50"
        }`}
      >
        {(
          [
            { id: "shuffle" as const, icon: <Shuffle size={14} />, label: t.nav.shuffle },
            { id: "dyads" as const, icon: <Combine size={14} />, label: t.nav.dyads },
            { id: "catalog" as const, icon: <LayoutGrid size={14} />, label: t.nav.catalog },
            { id: "manifesto" as const, icon: <BookOpen size={14} />, label: t.nav.theory },
          ] as const
        ).map((nav) => (
          <button
            key={nav.id}
            onClick={() => { setView(nav.id); setSelectedEmotion(null); }}
            className={`flex-1 min-w-[75px] sm:min-w-[100px] flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 rounded-xl transition-all font-bold text-[9px] sm:text-[11px] tracking-widest cursor-pointer ${
              view === nav.id
                ? isDark
                  ? "bg-slate-700 shadow-lg text-white border border-slate-600"
                  : "bg-white shadow-md text-slate-900 border border-slate-200"
                : "opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
            }`}
          >
            {React.cloneElement(nav.icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })}
            <span className="mt-0.5">{nav.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-5xl flex-grow flex flex-col items-center relative">
        
        {/* ─── SHUFFLE VIEW ─── */}
        {view === "shuffle" && (
          <div className="flex flex-col items-center w-full max-w-lg px-4 animate-fade" key="shuffle-view">
            <div
              className={`w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 border-[8px] sm:border-[12px] rounded-full flex items-center justify-center p-10 sm:p-14 mb-6 sm:mb-8 transition-colors duration-500 relative overflow-hidden ${
                isDark
                  ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black"
                  : "bg-white border-slate-100 shadow-2xl shadow-slate-300/50"
              } ${currentEmotion.colorClass} ${isSpinning ? "animate-roulette" : ""}`}
            >
              <div className="relative z-10 drop-shadow-md">
                <currentEmotion.icon strokeWidth={1.5} className="w-24 h-24 sm:w-32 sm:h-32" />
              </div>
            </div>

            <div className="text-center mb-6 sm:mb-8 w-full transition-opacity duration-300" style={{ opacity: isSpinning ? 0 : 1 }}>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3 ${currentEmotion.colorClass}`}>
                {currentEmotion.name[lang]}
              </h2>
              <p className={`text-sm sm:text-base md:text-lg leading-tight font-medium mb-6 opacity-80`}>
                {currentEmotion.desc[lang]}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-left">
                <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Activity className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                      {t.modal.impulse}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{currentEmotion.impulse[lang]}</span>
                  </div>
                </div>
                <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Target className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                      {t.modal.action}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{currentEmotion.action[lang]}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleShuffle}
              disabled={isSpinning}
              className={`w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer border ${
                isDark
                  ? "bg-slate-100 text-slate-900 hover:bg-white border-transparent"
                  : "bg-slate-900 text-white hover:bg-slate-800 border-transparent"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {t.shuffleBtn}
            </button>
          </div>
        )}

        {/* ─── DYADS VIEW (MIKSER) ─── */}
        {view === "dyads" && (() => {
          const result = getDyad(dyadPair[0].id, dyadPair[1].id)
          const Icon1 = dyadPair[0].icon
          const Icon2 = dyadPair[1].icon
          return (
            <div className="w-full flex flex-col items-center animate-fade px-2">
              <div className="text-center mb-6 sm:mb-8 max-w-lg">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest opacity-40 mb-1 sm:mb-2">{t.dyadsTitle}</h2>
                <p className="text-xs sm:text-sm opacity-60 leading-relaxed px-4">{t.dyadsDesc}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-6 mb-8 w-full max-w-3xl">
                {/* Emotion 1 */}
                <div className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl w-full sm:w-2/5 border-2 shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                  <Icon1 className={`w-16 h-16 sm:w-20 sm:h-20 mb-4 ${dyadPair[0].colorClass}`} strokeWidth={1.5} />
                  <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight text-center ${dyadPair[0].colorClass}`}>
                    {dyadPair[0].name[lang]}
                  </h3>
                </div>

                <div className="text-3xl sm:text-4xl font-black opacity-20 flex items-center justify-center py-2 sm:py-0">+</div>

                {/* Emotion 2 */}
                <div className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl w-full sm:w-2/5 border-2 shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                  <Icon2 className={`w-16 h-16 sm:w-20 sm:h-20 mb-4 ${dyadPair[1].colorClass}`} strokeWidth={1.5} />
                  <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight text-center ${dyadPair[1].colorClass}`}>
                    {dyadPair[1].name[lang]}
                  </h3>
                </div>
              </div>

              {/* Result */}
              <div
                className={`w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-[2rem] text-center border-4 shadow-2xl mb-8 sm:mb-10 transition-all duration-500 ${
                  result?.type === "opposite" ? "border-red-500/30" : isDark ? "border-slate-800" : "border-white"
                }`}
                style={{
                  background: result && result.type !== "opposite"
                      ? `linear-gradient(135deg, ${dyadPair[0].hex}22 0%, ${dyadPair[1].hex}22 100%)`
                      : isDark ? "#0f172a" : "#f8fafc",
                }}
              >
                <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest opacity-60 mb-2 sm:mb-3">{t.dyadsResult}</div>
                {result ? (
                  <>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-3 sm:mb-4 tracking-tighter break-words hyphens-auto">
                      {result.name[lang]}
                    </h2>
                    <span className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-sm ${
                        result.type === "primary" ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                          : result.type === "secondary" ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                          : result.type === "tertiary" ? "bg-purple-500/20 text-purple-700 dark:text-purple-400"
                          : "bg-red-500/20 text-red-700 dark:text-red-400"
                      }`}>
                      {lang === "pl"
                        ? result.type === "primary" ? "Podstawowa" : result.type === "secondary" ? "Drugorzędna" : result.type === "tertiary" ? "Trzeciorzędna" : "Przeciwieństwo (Konflikt)"
                        : result.type === "primary" ? "Primary" : result.type === "secondary" ? "Secondary" : result.type === "tertiary" ? "Tertiary" : "Opposite (Conflict)"}
                    </span>
                  </>
                ) : (
                  <h2 className="text-2xl sm:text-3xl font-black uppercase opacity-20">---</h2>
                )}
              </div>

              <button
                onClick={handleRandomDyad}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer ${
                  isDark ? "bg-slate-100 text-slate-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                <Shuffle size={20} className="sm:w-6 sm:h-6" />
                {t.dyadsBtn}
              </button>
            </div>
          )
        })()}

        {/* ─── CATALOG VIEW ─── */}
        {view === "catalog" && (
          <div className="w-full animate-fade pb-8 sm:pb-12 px-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase mb-6 sm:mb-8 text-center tracking-widest opacity-40">
              {t.catalogTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {EMOTIONS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEmotion(item)}
                  className={`group relative p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer hover:-translate-y-1 active:scale-95 flex flex-col items-start gap-4 h-full justify-between ${
                    isDark ? "bg-slate-900 border-slate-800 hover:border-slate-600 shadow-md" : "bg-white border-slate-200 hover:border-slate-400 shadow-sm hover:shadow-xl"
                  }`}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl transition-colors ${item.colorClass} ${item.bgLightClass}`}>
                           <item.icon size={28} strokeWidth={2} />
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-widest border px-2 py-1 rounded ${isDark ? "border-slate-700 text-slate-500" : "border-slate-200 text-slate-500"}`}>
                            {item.function[lang]}
                        </span>
                    </div>
                    <h3 className={`font-black uppercase text-xl sm:text-2xl tracking-tight mb-2 ${item.colorClass}`}>
                      {item.name[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-70 mb-4 line-clamp-3">
                      {item.desc[lang]}
                    </p>
                  </div>
                  
                  <div className={`w-full pt-4 border-t flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide opacity-80 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                      <Move size={14} />
                      <span>{t.modal.movementVector}: {item.vector[lang].split('/')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MANIFESTO / THEORY VIEW ─── */}
        {view === "manifesto" && (
          <div className="w-full max-w-3xl animate-fade space-y-6 sm:space-y-8 pb-12 sm:pb-20 px-2 sm:px-0">
            <section className={`p-6 sm:p-8 rounded-3xl border-l-8 ${isDark ? "bg-slate-900 border-slate-500" : "bg-white border-slate-800 shadow-lg"}`}>
              <h3 className="text-xl sm:text-2xl font-black uppercase mb-3 sm:mb-4 flex items-center gap-2">
                <BookOpen size={24} className="text-slate-500 shrink-0" />
                {lang === "pl" ? "Teoria Emocji Plutchika" : "Plutchik's Theory of Emotions"}
              </h3>
              <p className="text-sm sm:text-base opacity-90 leading-relaxed mb-4">
                {lang === "pl"
                  ? "W latach 1960-1980 amerykański psycholog Robert Plutchik opracował ewolucyjną teorię emocji. Zaproponował istnienie 8 emocji podstawowych. Są one wrodzone i bezpośrednio odnoszą się do zachowań adaptacyjnych, które mają na celu pomoc w przetrwaniu."
                  : "Between 1960-1980, American psychologist Robert Plutchik developed an evolutionary theory of emotion. He proposed the existence of 8 basic emotions. They are innate and directly relate to adaptive behaviors aimed at helping in survival."}
              </p>
              <p className={`text-[10px] sm:text-xs uppercase tracking-widest font-bold inline-block px-3 py-1.5 rounded-lg ${isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
                {lang === "pl" ? "Z nich wynikają wszystkie inne emocje." : "All other emotions stem from them."}
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <section className={`p-5 sm:p-6 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
                <h4 className="font-black uppercase text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                  <Combine size={18} className="text-blue-500 shrink-0" />
                  {lang === "pl" ? "Podstawowa idea i Diady" : "Basic Idea and Dyads"}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed opacity-80">
                  {lang === "pl"
                    ? "Możemy przeżywać mieszaninę pierwotnych emocji. Łączenie ich w jedność tworzy bardziej złożone emocje zwane diadami. Emocje przeciwległe na kole są emocjami przeciwnymi i według Plutchika nie możemy doświadczać ich jednocześnie (tworzą konflikt)."
                    : "We can experience a mixture of primary emotions. Combining them into one creates more complex emotions called dyads. Opposite emotions on the wheel are contradictory and according to Plutchik, we cannot experience them at the same time (they create a conflict)."}
                </p>
              </section>

              <section className={`p-5 sm:p-6 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
                <h4 className="font-black uppercase text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                  <HeartPulse size={18} className="text-red-500 shrink-0" />
                  {lang === "pl" ? "Znaczenie dla przetrwania" : "Importance for Survival"}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed opacity-80">
                  {lang === "pl"
                    ? "Wydarzenia uruchamiają adekwatne emocje, co z kolei powoduje konkretne działania pasujące do bodźca. Na przykład: zjedzenie trującego obiektu aktywuje wstręt, co skutkuje wymiotowaniem, by pozbyć się zagrożenia."
                    : "Events trigger adequate emotions, which in turn cause specific actions matching the stimulus. For example: eating a toxic object activates disgust, which results in vomiting to get rid of the threat."}
                </p>
              </section>
            </div>

            <section className={`p-6 sm:p-8 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
              <h4 className="font-black uppercase text-sm sm:text-base mb-5 sm:mb-6 flex items-center gap-2">
                <Layers size={18} className="text-amber-500 shrink-0" />
                {lang === "pl" ? "10 Postulatów Plutchika" : "10 Postulates of Plutchik"}
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm opacity-80">
                {[
                  { pl: "Emocje występują na wszystkich poziomach ewolucji.", en: "Emotions apply to all evolutionary levels." },
                  { pl: "Mają ewolucyjne podłoże i u różnych gatunków rozwinęły różne formy ekspresji.", en: "They have an evolutionary basis and evolved different forms of expression." },
                  { pl: "Pełnią rolę adaptacyjną, pomagając przetrwać zagrożenia.", en: "They play an adaptive role, helping to survive threats." },
                  { pl: "Mimo różnic, można zidentyfikować wspólne wzorce u gatunków.", en: "Despite differences, common patterns can be identified across species." },
                  { pl: "Istnieje niewielka liczba podstawowych, pierwotnych emocji.", en: "There is a small number of basic, primary emotions." },
                  { pl: "Wszystkie inne emocje to kombinacje i mieszaniny podstawowych.", en: "All other emotions are combinations and mixtures of the basic ones." },
                  { pl: "Pierwotne emocje to hipotetyczne konstrukty i stany idealne.", en: "Primary emotions are hypothetical constructs and ideal states." },
                  { pl: "Można je scharakteryzować jako pary biegunowych przeciwieństw.", en: "They can be characterized as pairs of polar opposites." },
                  { pl: "Emocje różnią się stopniem podobieństwa do siebie.", en: "Emotions vary in their degree of similarity to one another." },
                  { pl: "Każda emocja ma różne stopnie natężenia i pobudzenia.", en: "Each emotion can exist in varying degrees of intensity and arousal." },
                ].map((postulate, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="font-black text-amber-500 w-4 shrink-0 mt-0.5">{idx + 1}.</span>
                    <span className="leading-relaxed">{postulate[lang]}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

      </main>

      {/* ─── MODAL (Aktorskie Kompendium) ─── */}
      {selectedEmotion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade" onClick={() => setSelectedEmotion(null)}>
          <div 
            className={`w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl animate-slide border ${isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-300 text-slate-900"}`} 
            onClick={e => e.stopPropagation()}
          >
            {/* Header Modala */}
            <div className={`p-6 sm:p-8 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md border-b ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/90 border-slate-200'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${selectedEmotion.bgLightClass} ${selectedEmotion.colorClass}`}>
                  <selectedEmotion.icon size={32} strokeWidth={2} />
                </div>
                <div>
                  <h2 className={`text-2xl sm:text-4xl font-black uppercase ${selectedEmotion.colorClass}`}>{selectedEmotion.name[lang]}</h2>
                  <p className="font-serif italic text-xs sm:text-sm opacity-80 mt-1">{t.modal.bioGoal}: <strong className="font-sans">{selectedEmotion.function[lang]}</strong></p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEmotion(null)} 
                className={`p-3 rounded-xl transition-all border ${isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800 hover:border-slate-500" : "bg-white border-slate-300 hover:bg-slate-100"}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Treść Modala */}
            <div className="p-6 sm:p-8 space-y-8">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">{t.modal.mechanism}</h3>
                <EvoChain emotion={selectedEmotion} lang={lang} isDark={isDark} />
                <p className="text-[10px] sm:text-xs opacity-50 text-center italic mt-2">{t.modal.neuroception}</p>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <IntensityLadder emotion={selectedEmotion} lang={lang} isDark={isDark} />
                  
                  <div className={`p-6 rounded-xl border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-blue-500"/> {t.modal.motorics}
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex gap-3 items-center">
                            <ArrowRight size={16} className="text-blue-500" />
                            <span>{t.modal.movementVector}: <strong className="uppercase">{selectedEmotion.vector[lang]}</strong></span>
                        </li>
                        <li className={`pt-3 border-t italic opacity-80 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                          "{selectedEmotion.action[lang]}"
                        </li>
                    </ul>
                  </div>
                </div>

                <div className={`p-6 sm:p-8 rounded-xl border h-full ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200 shadow-md"}`}>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                        <Fingerprint size={20} className="text-teal-500" /> {t.modal.bodyDictionary}
                    </h3>
                    <p className="text-xs opacity-60 mb-6">{t.modal.bodyDictDesc}</p>
                    <ul className="space-y-3">
                        {selectedEmotion.signals[lang].map((signal, idx) => (
                            <li key={idx} className="flex gap-3 text-sm items-start">
                                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${selectedEmotion.colorClass.replace('text-', 'bg-')}`}></span>
                                <span className="opacity-90">{signal}</span>
                            </li>
                        ))}
                    </ul>
                </div>
              </div>

              {/* Perspektywa Aktora */}
              <div className={`p-6 rounded-2xl border-2 border-dashed ${isDark ? "bg-slate-900/30 border-slate-700" : "bg-slate-50 border-slate-300"}`}>
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">{t.modal.actorPerspective}</h3>
                  <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                          <span className="text-[10px] uppercase font-bold opacity-50 block mb-1">{t.modal.bodySignal}</span>
                          <p className="text-lg font-serif italic font-medium">"{selectedEmotion.impulse[lang]}"</p>
                      </div>
                      <div className="flex-1">
                          <span className="text-[10px] uppercase font-bold opacity-50 block mb-1">{t.modal.scenicGoal}</span>
                          <p className="text-sm font-medium">{selectedEmotion.desc[lang]}</p>
                      </div>
                      <div className={`flex-1 md:pl-6 flex items-center md:border-l ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
                          <p className="text-xs italic opacity-70">
                              {t.modal.remember}
                          </p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 text-center w-full max-w-md pb-6 sm:pb-8 flex flex-col items-center gap-4">
        <div
          className={`text-[9px] sm:text-[10px] font-mono px-3 py-1.5 sm:px-4 sm:py-2 rounded border inline-block ${
            isDark ? "border-slate-800 text-slate-500 bg-slate-900/50" : "border-slate-300 text-slate-500 bg-white"
          }`}
        >
          {lang === "pl" ? "MODEL TRÓJWYMIAROWY:" : "3D MODEL:"}
          <span className="ml-1 opacity-80 break-words font-bold">
            {lang === "pl" ? "Intensywność, Podobieństwo, Przeciwieństwo." : "Intensity, Similarity, Polarity."}
          </span>
        </div>
        
        <div className="text-[10px] sm:text-[11px] opacity-40 hover:opacity-80 transition-opacity text-center mt-2 max-w-md leading-relaxed">
          {lang === "pl" ? (
            <>
              &copy; 2025 Oskar Hamerski.<br />
              Interaktywne narzędzie dydaktyczne opracowane dla studentów Wydziału Aktorskiego Akademii Teatralnej w Warszawie.<br />
              <span className="font-semibold uppercase tracking-wider text-[9px] mt-1 inline-block">Do użytku edukacyjnego</span>
            </>
          ) : (
            <>
              &copy; 2025 Oskar Hamerski.<br />
              Interactive educational tool developed for the students of the Acting Department at the Theatre Academy in Warsaw.<br />
              <span className="font-semibold uppercase tracking-wider text-[9px] mt-1 inline-block">For educational use</span>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}

export default App
