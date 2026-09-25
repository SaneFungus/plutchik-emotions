import React, { useState, useCallback, useEffect, useRef } from "react"
import {
  Shuffle,
  Combine,
  BookOpen,
  LayoutGrid,
  Layers,
  Activity,
  Target,
  AlertTriangle,
  Flame,
  Sun,
  Moon,
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
  ChevronDown,
  Drama,
  X
} from "lucide-react"

// ─── Tłumaczenia interfejsu (UI) ─────────────────────────────────
const uiTranslations = {
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
    }
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
  textLightClass: string
  bgLightClass: string
  hex: string
  icon: React.ElementType
}

const EMOTIONS: Emotion[] = [
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
    textLightClass: "text-yellow-700",
    bgLightClass: "bg-yellow-500/10",
    hex: "#eab308",
    icon: Sun,
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
    textLightClass: "text-lime-700",
    bgLightClass: "bg-lime-500/10",
    hex: "#84cc16",
    icon: UserCheck,
  },
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
    textLightClass: "text-emerald-700",
    bgLightClass: "bg-emerald-500/10",
    hex: "#10b981",
    icon: AlertTriangle,
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
    textLightClass: "text-cyan-700",
    bgLightClass: "bg-cyan-500/10",
    hex: "#06b6d4",
    icon: Maximize2,
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
    textLightClass: "text-blue-700",
    bgLightClass: "bg-blue-500/10",
    hex: "#3b82f6",
    icon: Anchor,
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
      low: { pl: "Nuda", en: "Boredom" },
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
        "Pressing lips together (blocking entry)"
      ]
    },
    colorClass: "text-purple-500",
    textLightClass: "text-purple-700",
    bgLightClass: "bg-purple-500/10",
    hex: "#a855f7",
    icon: MinusCircle,
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
    textLightClass: "text-red-700",
    bgLightClass: "bg-red-500/10",
    hex: "#ef4444",
    icon: Flame,
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
    textLightClass: "text-orange-700",
    bgLightClass: "bg-orange-500/10",
    hex: "#f97316",
    icon: EyeIcon,
  },
]

// ─── Mechanizm Powstawania: wyjaśnienia etapów łańcucha ─────────────
// Źródło: Mechanizm_Powstawania_Emocji_Teksty_do_modali.md (etap "Emocja" pomijamy — to nazwa karty)
type MechanismStep = "stimulus" | "impulse" | "action" | "function"
const MECHANISM_STEPS: MechanismStep[] = ["stimulus", "impulse", "action", "function"]

const MECHANISM: Record<string, Record<MechanismStep, { pl: string; en: string }>> = {
  JOY: {
    stimulus: {
      pl: "Twój mózg wykrył, że sytuacja jest bezpieczna i korzystna — zdobyłeś coś (uwagę, nagrodę, przewagę) albo zagrożenie właśnie minęło. To sygnał „mam nadmiar” wysyłany przez otoczenie, zanim jeszcze poczujesz samą emocję.",
      en: "Your brain has detected that the situation is safe and advantageous — you've gained something (attention, a reward, an edge), or a threat has just passed. It's an “I have surplus” signal from the environment, arriving before you even feel the emotion.",
    },
    impulse: {
      pl: "Ciało reaguje pierwsze: mięśnie się rozluźniają, klatka piersiowa się otwiera, pojawia się nadmiar energii, który trzeba gdzieś wyładować. To fizjologiczny „wydech ulgi”, domagający się ruchu na zewnątrz i w górę — stąd chęć śmiechu, podskoku, gestykulacji.",
      en: "The body reacts first: muscles loosen, the chest opens, and a surplus of energy appears that needs an outlet. It's the physiological “exhale of relief” that demands movement outward and upward — hence the urge to laugh, jump, or gesture.",
    },
    action: {
      pl: "Nadmiar energii zamienia się w konkretne zachowanie: chcesz być widziany. Głośniejszy śmiech, szersze gesty, opowiadanie o sukcesie — to sygnał do grupy: „jestem silny/atrakcyjny, zbliż się do mnie”.",
      en: "The surplus energy turns into concrete behavior: you want to be seen. Louder laughter, bigger gestures, talking about your win — a signal to the group: “I'm strong and attractive, come closer.”",
    },
    function: {
      pl: "Ewolucyjnie radość istnieje po to, by demonstrować kondycję i zasoby potencjalnym partnerom i sojusznikom. To emocja, która buduje więzi, przyciąga innych i utrwala zachowania prowadzące do sukcesu.",
      en: "Evolutionarily, joy exists to display fitness and resources to potential partners and allies. It's the emotion that builds bonds, attracts others, and reinforces the behaviors that led to success.",
    },
  },
  TRUST: {
    stimulus: {
      pl: "Organizm rozpoznaje osobę lub sytuację jako nieszkodliwą — kogoś „ze swojego plemienia”. To ocena bezpieczeństwa dokonywana zanim świadomie zdecydujesz, że możesz komuś zaufać.",
      en: "The organism recognizes a person or situation as harmless — someone “from your own tribe.” It's a safety assessment made before you consciously decide you can trust someone.",
    },
    impulse: {
      pl: "Napięcie obronne opada, mięśnie twarzy i ciała się rozluźniają, oddech zwalnia. Pojawia się ciepło i chęć zbliżenia — ciało otwiera się, zamiast się bronić.",
      en: "Defensive tension drops, facial and body muscles relax, breathing slows. Warmth appears along with a pull toward closeness — the body opens instead of guarding itself.",
    },
    action: {
      pl: "Rozluźnienie zamienia się w konkretny gest: odsłaniasz wrażliwe miejsca (szyję, dłonie), pochylasz się w stronę drugiej osoby, synchronizujesz z nią ruchy. To fizyczna zgoda na bliskość.",
      en: "Relaxation turns into a concrete gesture: you expose vulnerable spots (neck, palms), lean toward the other person, sync your movements with theirs. It's physical consent to closeness.",
    },
    function: {
      pl: "Zaufanie istnieje po to, by umożliwić współpracę i budowanie trwałych relacji — bez niego niemożliwa byłaby ani opieka nad potomstwem, ani życie w grupie.",
      en: "Trust exists to make cooperation and lasting relationships possible — without it, neither caring for offspring nor living in a group would be possible.",
    },
  },
  FEAR: {
    stimulus: {
      pl: "Ciało wykrywa siłę większą od siebie — coś, co może je zranić lub zniszczyć. Ocena zagrożenia zachodzi błyskawicznie, zanim zdołasz nazwać, co właściwie się dzieje.",
      en: "The body detects a force greater than itself — something that could hurt or destroy it. The threat assessment happens instantly, before you can even name what's happening.",
    },
    impulse: {
      pl: "Serce przyspiesza, oddech płycieje, krew odpływa z kończyn do organów życiowych. Ciało mobilizuje się do jednej z dwóch opcji: uciec albo zamarznąć w bezruchu.",
      en: "The heart races, breathing shallows, blood drains from the limbs toward vital organs. The body mobilizes for one of two options: flee, or freeze in stillness.",
    },
    action: {
      pl: "Napięcie rozładowuje się przez oddalenie od źródła zagrożenia — dosłowną ucieczkę, cofnięcie się, unik albo skulenie osłaniające szyję i brzuch.",
      en: "The tension discharges through distancing from the source of danger — literal flight, stepping back, avoidance, or crouching to shield the neck and belly.",
    },
    function: {
      pl: "Strach istnieje po to, by chronić integralność ciała przed zniszczeniem. To najstarszy i najszybszy mechanizm przetrwania — działa, zanim jeszcze pomyślisz.",
      en: "Fear exists to protect the body's integrity from destruction. It's the oldest and fastest survival mechanism — it acts before you even think.",
    },
  },
  SURPRISE: {
    stimulus: {
      pl: "Coś pojawia się w polu uwagi bez ostrzeżenia — dźwięk, ruch, informacja, której się nie spodziewałeś. Umysł nie ma jeszcze gotowej kategorii, do której mógłby to przypisać.",
      en: "Something appears in your field of attention without warning — a sound, a movement, information you didn't expect. The mind doesn't yet have a ready category to file it under.",
    },
    impulse: {
      pl: "Wszystko na chwilę się zatrzymuje: gwałtowny, krótki wdech, bezruch, szeroko otwarte oczy. To „biała karta” — ciało kasuje bieżące działanie, by w pełni przyjąć nowy bodziec.",
      en: "Everything stops for a moment: a sudden, sharp inhale, stillness, wide-open eyes. It's a “blank slate” — the body cancels its current action to fully take in the new stimulus.",
    },
    action: {
      pl: "Zatrzymanie zamienia się w krótki reset uwagi: cofnięcie się, podniesienie dłoni do twarzy, moment całkowitego bezruchu, zanim ciało zdecyduje, co dalej.",
      en: "The freeze turns into a brief reset of attention: stepping back, raising a hand to the face, a moment of total stillness before the body decides what comes next.",
    },
    function: {
      pl: "Zaskoczenie istnieje po to, by szybko przekierować całą uwagę na nowy, potencjalnie ważny element otoczenia — zanim zdążysz go zignorować.",
      en: "Surprise exists to quickly redirect your entire attention to a new, potentially important element of the environment — before you can ignore it.",
    },
  },
  SADNESS: {
    stimulus: {
      pl: "Coś ważnego zniknęło bezpowrotnie — osoba, szansa, status, złudzenie. Sytuacji nie da się już naprawić działaniem, więc organizm przestawia się na inny tryb.",
      en: "Something important is gone for good — a person, a chance, a status, an illusion. The situation can no longer be fixed by action, so the organism switches to a different mode.",
    },
    impulse: {
      pl: "Ciało robi się ciężkie, klatka piersiowa zapada się do wewnątrz, energia opada. To fizjologiczne wyciszenie — organizm oszczędza siły zamiast walczyć o coś, czego już nie ma.",
      en: "The body feels heavy, the chest caves inward, energy drops. It's a physiological shutdown — the organism conserves strength instead of fighting for something that's already gone.",
    },
    action: {
      pl: "Opadająca energia wychodzi na zewnątrz jako łzy, spowolniony głos, znieruchomienie. To zarazem rozładowanie napięcia i czytelny sygnał dla innych: „potrzebuję pomocy”.",
      en: "The dropping energy surfaces as tears, a slowed voice, stillness. It's both a release of tension and a clear signal to others: “I need help.”",
    },
    function: {
      pl: "Smutek istnieje po to, by przyciągnąć wsparcie grupy i dać czas na przetworzenie straty, zanim organizm na nowo zaangażuje się w życie.",
      en: "Sadness exists to draw the group's support and to allow time to process the loss before the organism re-engages with life.",
    },
  },
  DISGUST: {
    stimulus: {
      pl: "Organizm wykrywa coś potencjalnie szkodliwego — zepsute jedzenie, ale też zachowanie łamiące normy moralne. Mózg traktuje „moralny brud” tym samym mechanizmem, co fizyczną truciznę.",
      en: "The organism detects something potentially harmful — spoiled food, but also behavior that breaks moral norms. The brain treats “moral filth” with the very same mechanism as physical poison.",
    },
    impulse: {
      pl: "Żołądek się kurczy, pojawia się odruch mdłości, twarz automatycznie się marszczy, by zmniejszyć pole oddychania i widzenia — ciało próbuje odciąć się od kontaktu z bodźcem.",
      en: "The stomach contracts, a nauseous reflex appears, the face automatically wrinkles to reduce breathing and viewing exposure — the body tries to cut off contact with the stimulus.",
    },
    action: {
      pl: "Skurcz zamienia się w gest odrzucenia: odwrócenie głowy, zasłonięcie ust lub nosa, cofnięcie tułowia, a w skrajnym przypadku — dosłowne wypluwanie czy wymioty.",
      en: "The contraction turns into a gesture of rejection: turning the head away, covering the mouth or nose, pulling the torso back, or in extreme cases, literal spitting or vomiting.",
    },
    function: {
      pl: "Wstręt istnieje po to, by chronić organizm i grupę przed skażeniem — fizycznym (choroby, trucizny) i społecznym (zachowania niszczące wspólnotę).",
      en: "Disgust exists to protect the organism and the group from contamination — physical (disease, poison) and social (behavior that undermines the community).",
    },
  },
  ANGER: {
    stimulus: {
      pl: "Coś blokuje realizację celu, ale organizm ocenia, że ma dość siły, by to pokonać. To kluczowa różnica względem strachu: tu przeszkoda wydaje się możliwa do przebicia.",
      en: "Something is blocking a goal, but the organism assesses it has enough strength to overcome it. This is the key difference from fear: here the obstacle seems possible to break through.",
    },
    impulse: {
      pl: "Krew napływa do rąk i twarzy, temperatura ciała rośnie, mięśnie się napinają. Adrenalina mobilizuje całe ciało do jednego zadania: przebicia się przez przeszkodę.",
      en: "Blood rushes to the hands and face, body temperature rises, muscles tense. Adrenaline mobilizes the whole body for one task: breaking through the obstacle.",
    },
    action: {
      pl: "Napięcie wyładowuje się do przodu: zaciśnięte pięści, wysunięta żuchwa, podniesiony głos, fizyczny nacisk na przeszkodę lub osobę, która ją reprezentuje.",
      en: "The tension discharges forward: clenched fists, a jutting jaw, a raised voice, physical pressure on the obstacle or the person who represents it.",
    },
    function: {
      pl: "Gniew istnieje po to, by usuwać przeszkody stojące na drodze do zasobów lub bezpieczeństwa — to energia mobilizacji, nie zawsze przemocy.",
      en: "Anger exists to remove obstacles standing in the way of resources or safety — it's mobilizing energy, not always violence.",
    },
  },
  ANTICIPATION: {
    stimulus: {
      pl: "Organizm wchodzi w sytuację z niepewnym wynikiem — coś ważnego może się wydarzyć, ale jeszcze nie wiadomo co. Brak informacji sam w sobie staje się bodźcem.",
      en: "The organism enters a situation with an uncertain outcome — something important may happen, but it's not yet clear what. The lack of information itself becomes the stimulus.",
    },
    impulse: {
      pl: "Źrenice się rozszerzają, mięśnie lekko napinają w gotowości do ruchu, uwaga zawęża się do jednego punktu. Ciało przygotowuje się, by błyskawicznie zareagować na to, co nadejdzie.",
      en: "Pupils dilate, muscles tense slightly in readiness to move, attention narrows to a single point. The body prepares to react instantly to whatever comes next.",
    },
    action: {
      pl: "Napięcie zamienia się w aktywne poszukiwanie: wpatrywanie się w jeden punkt, wiercenie się, pochylanie ciała do przodu, skanowanie wzrokiem otoczenia w poszukiwaniu wskazówek.",
      en: "The tension turns into active searching: staring at one point, fidgeting, leaning the body forward, scanning the environment for clues.",
    },
    function: {
      pl: "Oczekiwanie istnieje po to, by napędzać aktywne zdobywanie informacji o otoczeniu — dzięki niemu organizm nie czeka biernie, tylko przygotowuje się i eksploruje z wyprzedzeniem.",
      en: "Anticipation exists to drive the active gathering of information about the environment — thanks to it, the organism doesn't wait passively but prepares and explores in advance.",
    },
  },
}

// ─── Zakładka Teoria: treść ─────────────────────────────────────────
// Źródło: Zakladka_Teoria__Propozycja_Przebudowy.md. Układ narracyjny zamiast wykładu:
// teza → kontekst → spór → reguły gry → powrót do ćwiczenia. *tekst* = kursywa.
type L = { pl: string; en: string }

const THEORY = {
  title: { pl: "Teoria — ale inaczej", en: "Theory — Differently" },
  subtitle: {
    pl: "Nie po to, żeby zdać egzamin. Po to, żeby zrozumieć, co robi twoje ciało, zanim zdążysz pomyśleć.",
    en: "Not to pass a test. To understand what your body does before you even think.",
  },
  hook: {
    eyebrow: { pl: "Teza", en: "The claim" },
    title: { pl: "Nie musisz poczuć, żeby zagrać", en: "You Don't Have to Feel It to Play It" },
    body: {
      pl: "Przez większość XX wieku aktorów uczono, że emocja jest punktem wyjścia — najpierw poczuj, potem pokaż. Fizjolog William James i duński lekarz Carl Lange zaproponowali odwrotną kolejność: to nie strach każe ci uciekać — to ucieczka (przyspieszony puls, spięte mięśnie, płytki oddech) każe mózgowi nazwać to, co się dzieje, „strachem”. Emocja przychodzi *po* ciele, nie przed nim. Dla aktora to nie ciekawostka z podręcznika — to metoda: zbuduj Impuls (oddech, napięcie, tempo), a Emocja pojawi się sama, bez wymuszania.",
      en: "For most of the 20th century, actors were taught that emotion comes first — feel it, then show it. Physiologist William James and Danish physician Carl Lange proposed the reverse: it isn't fear that makes you run — it's the running (racing pulse, tensed muscles, shallow breath) that makes the brain label what's happening as “fear.” Emotion arrives *after* the body, not before it. For an actor this isn't a textbook curiosity — it's a method: build the Impulse (breath, tension, tempo) and the Emotion will follow on its own, without forcing it.",
    },
    oldOrder: { pl: "Najpierw poczuj", en: "Feel first" },
    newOrder: { pl: "James–Lange", en: "James–Lange" },
    bodyWord: { pl: "Ciało", en: "Body" },
    emotionWord: { pl: "Emocja", en: "Emotion" },
  },
  context: {
    eyebrow: { pl: "Kontekst", en: "Context" },
    title: { pl: "Człowiek, który zrobił mapę uczuć", en: "The Man Who Mapped Feelings" },
    body: {
      pl: "Robert Plutchik, amerykański psycholog, spędził dwie dekady (lata 60.–80. XX wieku) na pytaniu, które brzmi banalnie, dopóki nie spróbujesz na nie odpowiedzieć: ile jest właściwie emocji? Zamiast liczyć słowa w słowniku (angielski ma ich setki), spojrzał na zachowanie — swoje i innych gatunków. Doszedł do ośmiu wzorców reakcji, które da się znaleźć nie tylko u ludzi, ale i u zwierząt: coś, co pozwala uciec przed drapieżnikiem, coś, co przyciąga do partnera, coś, co odpycha od zepsutego jedzenia. Nazwał je emocjami podstawowymi i ułożył w koło — nie dlatego, że lubił ładne diagramy, tylko dlatego, że emocje sąsiadujące na kole mieszają się ze sobą równie łatwo, jak sąsiadujące kolory na palecie.",
      en: "Robert Plutchik, an American psychologist, spent two decades (1960s–80s) chasing a question that sounds trivial until you try to answer it: how many emotions actually exist? Instead of counting words in a dictionary (English has hundreds), he looked at behavior — human and animal. He arrived at eight response patterns found across species: something that lets you flee a predator, something that pulls you toward a mate, something that pushes you away from spoiled food. He called them basic emotions and arranged them in a wheel — not because he liked neat diagrams, but because emotions that sit next to each other on the wheel blend as easily as neighboring colors on a palette.",
    },
    link: { pl: "Zobacz to w praktyce: Diady", en: "See it in practice: Dyads" },
  },
  debate: {
    eyebrow: { pl: "Spór", en: "The debate" },
    title: { pl: "Od środka czy od ciała? Spór, który wciąż trwa", en: "From the Inside or From the Body? A Debate Still Alive" },
    body: {
      pl: "Ta aplikacja łączy dwie teorie, które nie zawsze się ze sobą zgadzają — i warto to przyznać wprost, zamiast udawać, że nauka mówi jednym głosem. Plutchik opisuje emocję jako *ocenę sytuacji*: mózg rozpoznaje bodziec jako korzystny lub groźny, zanim jeszcze cokolwiek poczujesz. James i Lange twierdzą coś mocniejszego: że sama ocena to za mało — emocja *jest* odczytaniem reakcji ciała. To dokładnie ten sam spór, który od stu lat dzieli sale prób. Stanisławski uczył pracy „od środka” — pamięć emocjonalna, wyobraźnia, dopiero potem ciało. Meisner, Grotowski i technika fizyczna uczą odwrotnie — od konkretnego działania i impulsu ciała, emocja ma się pojawić jako efekt uboczny, nie cel. Ta aplikacja stoi bliżej tej drugiej szkoły: każda karta emocji pokazuje najpierw Impuls (co robi ciało), dopiero potem nazwę uczucia.",
      en: "This app combines two theories that don't always agree with each other — and that's worth admitting outright, rather than pretending science speaks with one voice. Plutchik describes emotion as an *assessment of the situation*: the brain recognizes a stimulus as beneficial or threatening before you feel anything. James and Lange make a stronger claim: that assessment alone isn't enough — emotion *is* the reading of the body's reaction. This is exactly the debate that has split rehearsal rooms for a century. Stanislavski taught working “from the inside” — emotional memory and imagination first, the body second. Meisner, Grotowski, and physical-action technique teach the reverse — from concrete action and bodily impulse, with emotion appearing as a by-product, not a goal. This app leans toward the second school: every emotion card shows the Impulse (what the body does) before naming the feeling.",
    },
    schools: [
      {
        label: { pl: "Od środka", en: "From the inside" },
        who: { pl: "Stanisławski", en: "Stanislavski" },
        steps: { pl: "pamięć emocjonalna, wyobraźnia → ciało", en: "emotional memory, imagination → body" },
        app: false,
      },
      {
        label: { pl: "Od ciała", en: "From the body" },
        who: { pl: "Meisner, Grotowski, technika fizyczna", en: "Meisner, Grotowski, physical action" },
        steps: { pl: "działanie, impuls ciała → emocja", en: "action, bodily impulse → emotion" },
        app: true,
      },
    ],
    appLeans: { pl: "Bliżej tej szkoły stoi aplikacja", en: "This app leans this way" },
  },
  rules: {
    eyebrow: { pl: "Reguły gry", en: "Rules of the game" },
    title: { pl: "5 reguł, które warto znać, zanim zaczniesz losować karty", en: "5 Rules Worth Knowing Before You Start Drawing Cards" },
    hint: { pl: "Dotknij reguły, żeby zobaczyć, co znaczy na scenie.", en: "Tap a rule to see what it means on stage." },
    onStage: { pl: "Na scenie", en: "On stage" },
    items: [
      {
        thesis: { pl: "Emocje są wspólne dla wszystkich gatunków.", en: "Emotions are shared across species." },
        plutchik: {
          pl: "Te same wzorce reakcji znajdziesz u człowieka i u zwierzęcia broniącego terytorium.",
          en: "The same response patterns show up in humans and in an animal defending its territory.",
        },
        stage: {
          pl: "Strach czy gniew, które grasz, nie są „kulturowe” — możesz czerpać z najbardziej fizycznej, zwierzęcej wersji impulsu, bez wstydu, że to „za mało subtelne”.",
          en: "The fear or anger you're playing isn't “cultural” — you can draw on the rawest, most animal version of the impulse without worrying it's “too unsubtle.”",
        },
      },
      {
        thesis: { pl: "Jest ich niewiele, reszta to mieszanki.", en: "There are few of them, everything else is a mix." },
        plutchik: {
          pl: "8 podstawowych, wszystko inne — jak zazdrość czy nostalgia — to ich kombinacje.",
          en: "8 basic ones; everything else — jealousy, nostalgia — is a combination.",
        },
        stage: {
          pl: "Skomplikowana postać to nie osobna, tajemnicza emocja do odkrycia — to zwykle dwie znane ci już emocje, zmieszane w niewłaściwych proporcjach.",
          en: "A complicated character isn't some separate, mysterious emotion to discover — it's usually two emotions you already know, mixed in the wrong proportions.",
        },
        link: { view: "dyads", label: { pl: "Zobacz Diady", en: "See the Dyads" } },
      },
      {
        thesis: { pl: "Mają różne natężenie.", en: "They vary in intensity." },
        plutchik: {
          pl: "Każda emocja rozciąga się od słabej do ekstremalnej wersji (np. spokój → radość → euforia).",
          en: "Every emotion spans from mild to extreme (e.g. serenity → joy → ecstasy).",
        },
        stage: {
          pl: "„Zagraj radość” to złe zadanie reżyserskie. „Zagraj radość na 3 z 10, potem na 9 z 10” — to konkretne, mierzalne zadanie aktorskie. Drabinę intensywności znajdziesz na karcie każdej emocji.",
          en: "“Play joy” is a bad direction. “Play joy at 3 out of 10, then at 9 out of 10” is a concrete, playable task. You'll find the intensity ladder on each emotion's card.",
        },
        link: { view: "catalog", label: { pl: "Otwórz Katalog", en: "Open the Catalog" } },
      },
      {
        thesis: { pl: "Emocje mają swoje przeciwieństwa i nie mieszają się z nimi.", en: "Emotions have opposites and don't blend with them." },
        plutchik: {
          pl: "Radość i smutek, zaufanie i wstręt — leżą naprzeciw siebie na kole i wykluczają się w danym momencie.",
          en: "Joy and sadness, trust and disgust sit opposite each other on the wheel and cancel each other out in the moment.",
        },
        stage: {
          pl: "Jeśli scena wymaga gwałtownej zmiany z radości w smutek, to nie jest płynne przejście — to twarde cięcie. Zagraj je jako cięcie, nie jako gradient.",
          en: "If a scene demands a sudden swing from joy to sadness, that's not a smooth transition — it's a hard cut. Play it as a cut, not a gradient.",
        },
      },
      {
        thesis: { pl: "Wszystkie służą przetrwaniu, nawet te „negatywne”.", en: "All of them serve survival, even the “negative” ones." },
        plutchik: {
          pl: "Każda emocja — łącznie ze strachem, wstrętem czy gniewem — ma funkcję biologiczną, żadna nie jest błędem systemu.",
          en: "Every emotion — including fear, disgust, or anger — has a biological function; none of them is a system error.",
        },
        stage: {
          pl: "Najczęstszy błąd młodego aktora to granie gniewu czy strachu jako „utraty kontroli”. To odwrotność prawdy — to najbardziej funkcjonalne, celowe stany, jakie ma ciało. Zagraj cel, nie chaos.",
          en: "The most common beginner mistake is playing anger or fear as “losing control.” It's the opposite of the truth — these are the most functional, purposeful states the body has. Play the purpose, not the chaos.",
        },
      },
    ] as { thesis: L; plutchik: L; stage: L; link?: { view: "dyads" | "catalog"; label: L } }[],
  },
  cta: {
    eyebrow: { pl: "Praktyka", en: "Practice" },
    title: { pl: "Teraz zobacz, jak to działa w ciele", en: "Now See How It Works in the Body" },
    body: {
      pl: "Teoria kończy się tutaj — reszta dzieje się w ćwiczeniu. Wylosuj kartę, przeczytaj Impuls, zanim przeczytasz nazwę emocji, i spróbuj zbudować go w ciele, zanim zdecydujesz, co „grasz”.",
      en: "The theory ends here — the rest happens in practice. Draw a card, read the Impulse before you read the emotion's name, and try building it in your body before deciding what you're “playing.”",
    },
    draw: { pl: "Losuj kartę", en: "Draw a Card" },
    dyads: { pl: "Zobacz Diady", en: "See the Dyads" },
  },
}

// *tekst* → kursywa (jedyne formatowanie potrzebne w tekstach teorii)
const rich = (text: string) =>
  text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.length > 2 && part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part
  )

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
  return dyads[pair] || null
}

// Krycie przedniego kola w diadzie (zmierzone na wzorcu: ok. 70%)
const DYAD_ALPHA = 0.7

// Kolor `top` o kryciu `alpha` polozony na kolorze `base` (zwykla przezroczystosc)
const mixHex = (base: string, top: string, alpha: number) => {
  const ch = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16)
  return "#" + [0, 1, 2]
    .map(i => Math.round(ch(base, i) * (1 - alpha) + ch(top, i) * alpha).toString(16).padStart(2, "0"))
    .join("")
}

// ─── Sub-components ───────────────────────────────────────────────

// Łańcuch Bodziec → Impuls → Emocja → Działanie → Cel. Cztery etapy (bez "Emocji") to przyciski:
// klik rozwija wyjaśnienie tuż pod etapem (na telefonie) albo pod całym rzędem (od md).
// Świadomie NIE osobny modal: to już jest okno dialogowe, a okno w oknie na telefonie
// zasłania łańcuch, który właśnie się czyta, i komplikuje gest "wstecz".
const EvoChain = ({ emotion, lang, isDark }: { emotion: Emotion, lang: 'pl'|'en', isDark: boolean }) => {
  const t = uiTranslations[lang].modal
  const [open, setOpen] = useState<MechanismStep | null>(null)
  const stepRefs = useRef<Partial<Record<MechanismStep, HTMLButtonElement | null>>>({})
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollToPanel = useRef(false)

  // Nowa emocja = łańcuch od zera
  useEffect(() => { setOpen(null) }, [emotion.id])

  // Po "Dalej" panel przeskakuje niżej — dociągamy go do widoku
  useEffect(() => {
    if (!open || !scrollToPanel.current) return
    scrollToPanel.current = false
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    panelRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" })
  }, [open])

  const labels: Record<MechanismStep, string> = { stimulus: t.stimulus, impulse: t.impulse, action: t.action, function: t.bioGoal }
  const values: Record<MechanismStep, string> = {
    stimulus: emotion.stimulus[lang], impulse: emotion.impulse[lang], action: emotion.action[lang], function: emotion.function[lang],
  }
  const accent = isDark ? "text-teal-400" : "text-teal-700"

  const goNext = (step: MechanismStep) => {
    const next = MECHANISM_STEPS[MECHANISM_STEPS.indexOf(step) + 1]
    if (!next) return
    scrollToPanel.current = true
    setOpen(next)
    stepRefs.current[next]?.focus({ preventScroll: true })
  }

  const stepButton = (step: MechanismStep, variant: string, valueClass: string, value: React.ReactNode) => {
    const isOpen = open === step
    return (
      <button
        ref={(el) => { stepRefs.current[step] = el }}
        type="button"
        id={`mech-${emotion.id}-${step}`}
        aria-expanded={isOpen}
        aria-controls={isOpen ? `mech-panel-${emotion.id}` : undefined}
        onClick={() => setOpen(isOpen ? null : step)}
        className={`group w-full md:w-auto md:flex-1 min-h-11 text-center p-2.5 rounded-lg border cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${variant}`}
        style={isOpen ? { boxShadow: `0 0 0 2px ${emotion.hex}` } : undefined}
      >
        <span className={`flex items-center justify-center gap-1 text-xs uppercase tracking-widest font-bold ${step === "impulse" ? accent : "opacity-70"}`}>
          {labels[step]}
          <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} />
        </span>
        <span className={`block mt-1 ${valueClass}`}>{value}</span>
      </button>
    )
  }

  const panel = (step: MechanismStep) => {
    const next = MECHANISM_STEPS[MECHANISM_STEPS.indexOf(step) + 1]
    return (
      <div
        ref={panelRef}
        key={`panel-${step}`}
        id={`mech-panel-${emotion.id}`}
        role="region"
        aria-labelledby={`mech-${emotion.id}-${step}`}
        className={`w-full md:basis-full md:order-last text-left rounded-xl border border-l-4 p-4 sm:p-5 animate-fade ${isDark ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}
        style={{ borderLeftColor: emotion.hex }}
      >
        <p className="text-xs uppercase tracking-widest font-bold opacity-70">
          {labels[step]} — {values[step]}
        </p>
        <p className="text-sm sm:text-base leading-relaxed mt-2">{MECHANISM[emotion.id][step][lang]}</p>
        {next && (
          <button
            type="button"
            onClick={() => goNext(step)}
            className={`mt-3 -ml-2 px-2 min-h-11 inline-flex items-center gap-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-current ${accent} ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-200"}`}
          >
            {t.next}: {labels[next]}
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  const arrow = (k: string) => (
    <ArrowDown key={k} aria-hidden="true" className="opacity-40 w-5 h-5 shrink-0 md:-rotate-90" />
  )

  const neutral = isDark ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-50"

  return (
    <div className={`flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border mb-3 ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
        {stepButton("stimulus", neutral, "font-bold text-sm", emotion.stimulus[lang])}
        {open === "stimulus" && panel("stimulus")}
        {arrow("a1")}

        {stepButton("impulse", isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700" : "bg-slate-50 border-slate-200 hover:bg-slate-100", "italic text-sm font-serif", <>"{emotion.impulse[lang]}"</>)}
        {open === "impulse" && panel("impulse")}
        {arrow("a2")}

        <div className={`w-full md:w-auto text-center md:flex-1 p-3 rounded-xl border border-current ${emotion.bgLightClass} ${isDark ? emotion.colorClass : emotion.textLightClass}`}>
            <span className="text-xs uppercase tracking-widest opacity-70 font-bold">{t.emotion}</span>
            <p className="font-black text-lg leading-tight mt-0.5">{emotion.name[lang]}</p>
        </div>
        {arrow("a3")}

        {stepButton("action", neutral, "font-bold text-sm", emotion.action[lang])}
        {open === "action" && panel("action")}
        {arrow("a4")}

        {stepButton("function", isDark ? "bg-slate-900 border-slate-800 hover:bg-slate-800" : "bg-slate-100 border-slate-200 hover:bg-slate-200", `font-bold text-xs ${accent}`, emotion.function[lang])}
        {open === "function" && panel("function")}
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
                    <div className={`basis-full sm:basis-auto sm:flex-1 sm:mx-3 sm:order-2 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div className={`h-full bg-current ${row.bar} ${emotion.colorClass}`}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

// ─── Adres strony: zakładka i otwarta karta emocji ─────────────────
// Link do wysłania studentom, np. #katalog albo #katalog/gniew (otwiera kartę Gniewu).
// Hash, nie ścieżka: GitHub Pages serwuje jeden plik, a hash nie wymaga przekierowań.
type View = "shuffle" | "dyads" | "catalog" | "manifesto"
const VIEW_SLUGS: Record<View, string> = { shuffle: "losuj", dyads: "diady", catalog: "katalog", manifesto: "teoria" }

// Polska nazwa bez ogonków: Radość → radosc, Wstręt → wstret
const slugOf = (e: Emotion) => e.name.pl.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

const hashFor = (view: View, emotion?: Emotion | null) =>
  `#${VIEW_SLUGS[view]}${emotion ? `/${slugOf(emotion)}` : ""}`

const parseHash = (hash: string): { view: View | null; emotion: Emotion | null } => {
  const [v, e] = decodeURIComponent(hash.replace(/^#\/?/, "")).toLowerCase().split("/")
  const view = (Object.keys(VIEW_SLUGS) as View[]).find((k) => VIEW_SLUGS[k] === v) ?? null
  // przyjmujemy też angielski identyfikator (#katalog/anger)
  const emotion = e ? EMOTIONS.find((x) => slugOf(x) === e || x.id.toLowerCase() === e) ?? null : null
  return { view, emotion: view ? emotion : null }
}

// ─── Ustawienia zapamiętane w przeglądarce (język, tryb jasny/ciemny) ─
// try/catch: w trybie prywatnym albo przy zablokowanych danych strony dostęp do pamięci rzuca błąd.
const SETTINGS_KEY = "plutchik-settings"
type Settings = { lang?: "pl" | "en"; stage?: "light" | "dark" }

const loadSettings = (): Settings => {
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

const saveSettings = (s: Settings) => {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)) } catch { /* bez pamięci działa jak dotąd */ }
}

const PAGE_TITLE = { pl: "8 emocji Roberta Plutchika", en: "Robert Plutchik's 8 Emotions" }

// ─── App Component ────────────────────────────────────────────────
const App: React.FC = () => {
  // Stan startowy: zakładka i karta z adresu, język i tryb z pamięci przeglądarki
  const [initial] = useState(() => ({ ...parseHash(window.location.hash), ...loadSettings() }))
  const [lang, setLang] = useState<"pl" | "en">(initial.lang ?? "pl")
  const [view, setView] = useState<View>(initial.view ?? "shuffle")
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(
    initial.view === "shuffle" && initial.emotion ? initial.emotion : EMOTIONS[0]
  )
  const [dyadPair, setDyadPair] = useState<[Emotion, Emotion]>([EMOTIONS[0], EMOTIONS[1]])
  const [stageMode, setStageMode] = useState<"light" | "dark">(initial.stage ?? "dark")
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(initial.emotion)

  const toggleLang = () => setLang((l) => (l === "pl" ? "en" : "pl"))
  const toggleStage = () => setStageMode((s) => (s === "light" ? "dark" : "light"))

  useEffect(() => { saveSettings({ lang, stage: stageMode }) }, [lang, stageMode])

  // Język strony dla czytnika ekranu (inaczej czyta polski tekst angielskim głosem) i tytuł karty
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = PAGE_TITLE[lang]
  }, [lang])

  // Wstecz/dalej w przeglądarce albo ręcznie zmieniony adres → ustawiamy zakładkę i kartę z adresu
  useEffect(() => {
    const onPop = () => {
      const { view: v, emotion } = parseHash(window.location.hash)
      const nextView = v ?? "shuffle"
      setView(nextView)
      setSelectedEmotion(emotion)
      if (nextView === "shuffle" && emotion) setCurrentEmotion(emotion)
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  // Pula emocji jeszcze niewylosowanych w bieżącej "talii" (losowanie bez powtórzeń,
  // dopiero po wyczerpaniu wszystkich 8 tasujemy nową talię).
  const shuffleBagRef = useRef<Emotion[]>([])

  const handleShuffle = useCallback(() => {
    setIsSpinning(true)
    setTimeout(() => {
      setCurrentEmotion((prev) => {
        if (shuffleBagRef.current.length === 0) {
          const bag = [...EMOTIONS]
          for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[bag[i], bag[j]] = [bag[j], bag[i]]
          }
          // nowa talia nie może zaczynać się od emocji, na której skończyła się poprzednia
          if (bag.length > 1 && bag[0].id === prev.id) {
            const swapIdx = 1 + Math.floor(Math.random() * (bag.length - 1))
            ;[bag[0], bag[swapIdx]] = [bag[swapIdx], bag[0]]
          }
          shuffleBagRef.current = bag
        }
        return shuffleBagRef.current.shift()!
      })
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

  // ─── Modal: natywny <dialog> (Esc, fokus w środku, tło nieaktywne) + wpis w historii
  // z adresem karty (#katalog/gniew), żeby gest/przycisk "wstecz" na telefonie zamykał okno
  // zamiast wychodzić z aplikacji, a adres dało się skopiować i wysłać.
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const bodyDictRef = useRef<HTMLDivElement>(null)
  const scrollToBodyDictRef = useRef(false)

  const openEmotion = (item: Emotion, opener: HTMLElement, toBodyDict = false) => {
    openerRef.current = opener
    scrollToBodyDictRef.current = toBodyDict
    window.history.pushState({ plutchikModal: true }, "", hashFor(view, item))
    setSelectedEmotion(item)
  }

  const closeModal = useCallback(() => {
    // Okno otwarte kliknięciem (albo odświeżone po kliknięciu) ma pod sobą wpis zakładki — wracamy do niego,
    // popstate zamknie okno. Okno otwarte prosto z linku nie ma pod sobą nic naszego — tylko zmieniamy adres.
    if (window.history.state?.plutchikModal) window.history.back()
    else {
      window.history.replaceState(null, "", hashFor(view))
      setSelectedEmotion(null)
    }
  }, [view])

  useEffect(() => {
    if (!selectedEmotion) return
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
      closeBtnRef.current?.focus() // inaczej przeglądarka fokusuje przewijany kontener
    }
    if (scrollToBodyDictRef.current) {
      scrollToBodyDictRef.current = false
      bodyDictRef.current?.scrollIntoView({ block: "start" })
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
      openerRef.current?.focus()
    }
  }, [selectedEmotion])

  // Przejście między zakładkami z treści (np. z końca Teorii) — zawsze od góry nowego widoku
  // Zmiana zakładki podmienia adres zamiast dopisywać go do historii: "wstecz" nie skacze po zakładkach.
  const changeView = (next: View) => {
    window.history.replaceState(null, "", hashFor(next))
    setView(next)
    setSelectedEmotion(null)
  }

  const goTo = (next: View) => {
    changeView(next)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  const isDark = stageMode === "dark"
  const t = uiTranslations[lang]
  const nameColor = (e: Emotion) => (isDark ? e.colorClass : e.textLightClass)

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
        @media (prefers-reduced-motion: reduce) {
          .animate-roulette, .animate-fade, .animate-slide { animation-duration: 1ms; }
        }
      `}</style>

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6 md:mb-8 pt-2">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
            {t.title}
            <span className="text-xs font-normal opacity-60 ml-1 sm:ml-2 border-l border-current pl-1 sm:pl-2">
              PLUTCHIK
            </span>
          </h1>
          <span className="text-xs font-mono opacity-70 uppercase mt-1">
            {t.subtitle}
          </span>
        </div>
        {/* Oba przyciski pokazują to, na co się przełącza (księżyc = włącz ciemny, EN = włącz angielski).
            min-w-11/min-h-11 = 44 px, minimalny cel dotykowy. */}
        <div className="flex gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleStage}
            aria-label={isDark ? t.stageToggle.light : t.stageToggle.dark}
            title={isDark ? t.stageToggle.light : t.stageToggle.dark}
            className={`min-w-11 min-h-11 inline-flex items-center justify-center rounded-full transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {isDark ? <Sun aria-hidden="true" className="w-5 h-5" /> : <Moon aria-hidden="true" className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={toggleLang}
            lang={t.langToggle.lang}
            aria-label={t.langToggle.label}
            title={t.langToggle.label}
            className={`min-w-11 min-h-11 px-3 sm:px-4 inline-flex items-center justify-center rounded-full text-xs font-bold uppercase transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {t.langToggle.lang}
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
            onClick={() => changeView(nav.id)}
            aria-current={view === nav.id ? "page" : undefined}
            className={`flex-1 min-w-0 sm:min-w-[100px] flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 min-h-11 py-1.5 sm:py-3 rounded-xl transition-all font-bold text-xs sm:text-[13px] tracking-wide sm:tracking-widest cursor-pointer ${
              view === nav.id
                ? isDark
                  ? "bg-slate-700 shadow-lg text-white border border-slate-600"
                  : "bg-white shadow-md text-slate-900 border border-slate-200"
                : "opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
            }`}
          >
            {React.cloneElement(nav.icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })}
            <span className="sm:mt-0.5">{nav.label}</span>
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
              {/* Ikona otwiera okno emocji od razu na "Słowniku Ciała" */}
              <button
                type="button"
                onClick={(e) => openEmotion(currentEmotion, e.currentTarget, true)}
                disabled={isSpinning}
                aria-label={`${t.modal.bodyDictionary}: ${currentEmotion.name[lang]}`}
                title={t.modal.bodyDictionary}
                className="relative z-10 drop-shadow-md rounded-full p-2 cursor-pointer transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current disabled:cursor-default disabled:hover:scale-100"
              >
                <currentEmotion.icon strokeWidth={1.5} className="w-24 h-24 sm:w-32 sm:h-32" />
              </button>
            </div>

            <div className="text-center mb-6 sm:mb-8 w-full transition-opacity duration-300" style={{ opacity: isSpinning ? 0 : 1 }}>
              {/* font-black to już najgrubsza waga kroju — obrys w kolorze tekstu pogrubia litery dalej */}
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 sm:mb-3 [-webkit-text-stroke:1px_currentColor] sm:[-webkit-text-stroke:1.5px_currentColor] ${nameColor(currentEmotion)}`}>
                {currentEmotion.name[lang]}
              </h2>
              <p className={`text-sm sm:text-base md:text-lg leading-tight font-medium mb-6 opacity-80`}>
                {currentEmotion.desc[lang]}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-left">
                <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Activity className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 font-bold mb-0.5">
                      {t.modal.impulse}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{currentEmotion.impulse[lang]}</span>
                  </div>
                </div>
                <div className={`flex-1 p-3 rounded-2xl flex items-start gap-3 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Target className="w-5 h-5 opacity-40 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 font-bold mb-0.5">
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
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest opacity-60 mb-1 sm:mb-2">{t.dyadsTitle}</h2>
                <p className="text-xs sm:text-sm opacity-60 leading-relaxed px-4">{t.dyadsDesc}</p>
              </div>

              <div className="flex justify-center items-center mb-8 sm:mb-12 relative h-40 sm:h-56 w-64 sm:w-96 mx-auto">
                {/* Warstwa koloru — zasada "kalki": przednie kolo to kolor emocji o kryciu 70%.
                    Kolory liczymy tak, jakby pod spodem zawsze bylo biale tlo, i malujemy je
                    jako pelne, zeby w trybie ciemnym granat strony nie przeswitywal:
                    - tylne kolo: kolor emocji,
                    - przednie kolo: 70% koloru emocji + 30% bieli (jasniejszy odcien),
                    - czesc wspolna: 70% przedniego koloru + 30% tylnego. */}
                <div className="absolute inset-0" aria-hidden="true">
                  <div
                    className="absolute left-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: dyadPair[0].hex }}
                  />
                  <div
                    className="absolute right-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden transition-colors duration-500"
                    style={{ backgroundColor: mixHex("#ffffff", dyadPair[1].hex, DYAD_ALPHA) }}
                  >
                    {/* Kopia tylnego kola w pozycji tylnego kola, przycieta do przedniego = czesc wspolna */}
                    <div
                      className="absolute top-0 -left-24 sm:-left-40 w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: mixHex(dyadPair[0].hex, dyadPair[1].hex, DYAD_ALPHA) }}
                    />
                  </div>
                </div>

                {/* Warstwa tresci: ikona i nazwa nad kolorem, bez mieszania */}
                {[dyadPair[0], dyadPair[1]].map((e, i) => {
                  const Icon = i === 0 ? Icon1 : Icon2
                  return (
                    <div
                      key={i}
                      className={`absolute ${i === 0 ? "left-0" : "right-0"} w-40 h-40 sm:w-56 sm:h-56 flex flex-col items-center justify-center p-4 text-slate-950`}
                    >
                      <Icon className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3" strokeWidth={1.5} />
                      <h3 className="text-sm sm:text-xl font-black uppercase tracking-tight text-center">
                        {e.name[lang]}
                      </h3>
                    </div>
                  )
                })}
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
                <div className="text-xs font-mono font-bold uppercase tracking-widest opacity-60 mb-2 sm:mb-3">{t.dyadsResult}</div>
                {result ? (
                  <>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-3 sm:mb-4 tracking-tighter break-words hyphens-auto">
                      {result.name[lang]}
                    </h2>
                    <span className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
                        // Tryb zależy od przełącznika w aplikacji (isDark), nie od ustawień systemu —
                        // wariant `dark:` Tailwinda v4 reaguje na system, więc tu go nie używamy.
                        result.type === "primary" ? `bg-emerald-500/20 ${isDark ? "text-emerald-400" : "text-emerald-700"}`
                          : result.type === "secondary" ? `bg-blue-500/20 ${isDark ? "text-blue-400" : "text-blue-700"}`
                          : result.type === "tertiary" ? `bg-purple-500/20 ${isDark ? "text-purple-400" : "text-purple-700"}`
                          : `bg-red-500/20 ${isDark ? "text-red-400" : "text-red-700"}`
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
            <h2 className="text-xl sm:text-2xl font-black uppercase mb-6 sm:mb-8 text-center tracking-widest opacity-60">
              {t.catalogTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {EMOTIONS.map((item) => (
                // Klikalna jest cała karta, ale semantycznie przyciskiem jest nazwa emocji
                // (jej ::after rozciąga obszar kliknięcia na kartę) — działa z klawiatury i czytnikiem ekranu.
                <div
                  key={item.id}
                  className={`group relative p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer hover:-translate-y-1 active:scale-95 flex flex-col items-start gap-4 h-full justify-between has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-current ${
                    isDark ? "bg-slate-900 border-slate-800 hover:border-slate-600 shadow-md" : "bg-white border-slate-200 hover:border-slate-400 shadow-sm hover:shadow-xl"
                  }`}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl transition-colors ${item.colorClass} ${item.bgLightClass}`}>
                           <item.icon size={28} strokeWidth={2} />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest border px-2 py-1 rounded ${isDark ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                            {item.function[lang]}
                        </span>
                    </div>
                    <h3 className={`font-black uppercase text-xl sm:text-2xl tracking-tight mb-2 ${nameColor(item)}`}>
                      <button
                        type="button"
                        onClick={(e) => openEmotion(item, e.currentTarget)}
                        className="uppercase text-left cursor-pointer focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
                      >
                        {item.name[lang]}
                      </button>
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-70 mb-4 line-clamp-3">
                      {item.desc[lang]}
                    </p>
                  </div>
                  
                  <div className={`w-full pt-4 border-t flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-80 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                      <Move size={14} />
                      <span>{t.modal.movementVector}: {item.vector[lang].split('/')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MANIFESTO / THEORY VIEW ─── */}
        {/* Układ narracyjny w jednej kolumnie (~65 znaków w wierszu) — czytany kciukiem od góry do dołu.
            Każda sekcja ma "etykietę rozdziału" (1/5…), żeby było widać, ile zostało do końca. */}
        {view === "manifesto" && (() => {
          const card = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
          const eyebrow = (n: number, label: L) => (
            <p className="text-xs font-mono font-bold uppercase tracking-widest opacity-70 mb-2">
              {n}/5 · {label[lang]}
            </p>
          )
          const linkBtn = isDark
            ? "text-teal-300 hover:bg-slate-800"
            : "text-teal-800 hover:bg-slate-100"
          return (
            <article className="w-full max-w-2xl animate-fade space-y-5 sm:space-y-6 pb-12 sm:pb-20 px-1 sm:px-0">
              <header className="text-center px-2 mb-2 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{THEORY.title[lang]}</h2>
                <p className="text-sm sm:text-base opacity-80 leading-relaxed mt-2 max-w-xl mx-auto">{THEORY.subtitle[lang]}</p>
              </header>

              {/* 1 — Teza */}
              <section className={`p-5 sm:p-8 rounded-3xl border-l-8 ${isDark ? "bg-slate-900 border-teal-500" : "bg-white border-teal-700 shadow-lg"}`}>
                {eyebrow(1, THEORY.hook.eyebrow)}
                <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight mb-4">{THEORY.hook.title[lang]}</h3>
                {/* Odwrócona kolejność jako obraz, zanim padnie wyjaśnienie */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5 text-sm" aria-hidden="true">
                  <div className={`p-3 rounded-xl border ${isDark ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-600"}`}>
                    <span className="block text-xs uppercase tracking-widest font-bold mb-1">{THEORY.hook.oldOrder[lang]}</span>
                    <span className="font-bold line-through decoration-2">{THEORY.hook.emotionWord[lang]} → {THEORY.hook.bodyWord[lang]}</span>
                  </div>
                  <div className={`p-3 rounded-xl border-2 ${isDark ? "border-teal-500 bg-teal-500/10" : "border-teal-700 bg-teal-50"}`}>
                    <span className={`block text-xs uppercase tracking-widest font-bold mb-1 ${isDark ? "text-teal-300" : "text-teal-800"}`}>{THEORY.hook.newOrder[lang]}</span>
                    <span className="font-black">{THEORY.hook.bodyWord[lang]} → {THEORY.hook.emotionWord[lang]}</span>
                  </div>
                </div>
                <p className="text-base leading-relaxed opacity-90">{rich(THEORY.hook.body[lang])}</p>
              </section>

              {/* 2 — Kontekst */}
              <section className={`p-5 sm:p-8 rounded-3xl border ${card}`}>
                {eyebrow(2, THEORY.context.eyebrow)}
                <h3 className="text-lg sm:text-xl font-black uppercase leading-tight mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="shrink-0 opacity-60" aria-hidden="true" />
                  {THEORY.context.title[lang]}
                </h3>
                <p className="text-base leading-relaxed opacity-90">{THEORY.context.body[lang]}</p>
                <button
                  type="button"
                  onClick={() => goTo("dyads")}
                  className={`mt-3 -ml-2 px-2 min-h-11 inline-flex items-center gap-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-current ${linkBtn}`}
                >
                  <Combine size={16} aria-hidden="true" />
                  {THEORY.context.link[lang]}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </section>

              {/* 3 — Spór */}
              <section className={`p-5 sm:p-8 rounded-3xl border ${card}`}>
                {eyebrow(3, THEORY.debate.eyebrow)}
                <h3 className="text-lg sm:text-xl font-black uppercase leading-tight mb-3 flex items-center gap-2">
                  <Drama size={20} className="shrink-0 opacity-60" aria-hidden="true" />
                  {THEORY.debate.title[lang]}
                </h3>
                <p className="text-base leading-relaxed opacity-90 mb-5">{rich(THEORY.debate.body[lang])}</p>
                {/* Streszczenie sporu w dwóch kolumnach; pozycja aplikacji oznaczona tekstem, nie tylko kolorem */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {THEORY.debate.schools.map((s) => (
                    <li
                      key={s.label.en}
                      className={`p-4 rounded-2xl border-2 ${
                        s.app
                          ? isDark ? "border-teal-500 bg-teal-500/10" : "border-teal-700 bg-teal-50"
                          : isDark ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <span className="block font-black uppercase text-sm">{s.label[lang]}</span>
                      <span className="block text-sm opacity-80 mt-0.5">{s.who[lang]}</span>
                      <span className="block text-sm font-semibold mt-2">{s.steps[lang]}</span>
                      {s.app && (
                        <span className={`inline-flex items-center gap-1 mt-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-teal-300" : "text-teal-800"}`}>
                          <Target size={14} aria-hidden="true" /> {THEORY.debate.appLeans[lang]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4 — Reguły gry: rozwijane karty (natywne <details>: klawiatura i czytnik ekranu za darmo) */}
              <section className={`p-5 sm:p-8 rounded-3xl border ${card}`}>
                {eyebrow(4, THEORY.rules.eyebrow)}
                <h3 className="text-lg sm:text-xl font-black uppercase leading-tight mb-1 flex items-center gap-2">
                  <Layers size={20} className="shrink-0 opacity-60" aria-hidden="true" />
                  {THEORY.rules.title[lang]}
                </h3>
                <p className="text-sm opacity-80 mb-4">{THEORY.rules.hint[lang]}</p>
                <div className="space-y-2">
                  {THEORY.rules.items.map((rule, idx) => (
                    <details
                      key={idx}
                      className={`group rounded-2xl border transition-colors ${isDark ? "border-slate-700 open:bg-slate-800/60" : "border-slate-200 open:bg-slate-50"}`}
                    >
                      <summary
                        className={`list-none [&::-webkit-details-marker]:hidden flex items-start gap-3 p-4 min-h-11 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-current ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}
                      >
                        <span className={`font-black text-lg leading-6 w-6 shrink-0 ${isDark ? "text-amber-400" : "text-amber-700"}`}>{idx + 1}</span>
                        <span className="flex-1 font-bold text-base leading-6">{rule.thesis[lang]}</span>
                        <ChevronDown aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 opacity-60 transition-transform motion-reduce:transition-none group-open:rotate-180" />
                      </summary>
                      <div className="px-4 pb-4 sm:pl-13 space-y-3 animate-fade">
                        <p className="text-sm leading-relaxed opacity-80">
                          <span className="font-bold">Plutchik: </span>{rule.plutchik[lang]}
                        </p>
                        <p className={`text-base leading-relaxed p-3 rounded-xl border-l-4 ${isDark ? "bg-slate-900 border-teal-500" : "bg-white border-teal-700"}`}>
                          <span className={`block text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-teal-300" : "text-teal-800"}`}>
                            {THEORY.rules.onStage[lang]}
                          </span>
                          {rule.stage[lang]}
                        </p>
                        {rule.link && (
                          <button
                            type="button"
                            onClick={() => goTo(rule.link!.view)}
                            className={`-ml-2 px-2 min-h-11 inline-flex items-center gap-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-current ${linkBtn}`}
                          >
                            {rule.link.label[lang]}
                            <ArrowRight size={16} aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* 5 — Powrót do praktyki: główna akcja pełnej szerokości, w zasięgu kciuka */}
              <section className={`p-5 sm:p-8 rounded-3xl border-2 border-dashed text-center ${isDark ? "border-slate-700" : "border-slate-300"}`}>
                {eyebrow(5, THEORY.cta.eyebrow)}
                <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight mb-3">{THEORY.cta.title[lang]}</h3>
                <p className="text-base leading-relaxed opacity-90 mb-6 max-w-xl mx-auto">{THEORY.cta.body[lang]}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => { goTo("shuffle"); handleShuffle() }}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 min-h-14 rounded-2xl text-lg font-black transition-all active:scale-95 shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                      isDark ? "bg-slate-100 text-slate-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    <Shuffle size={20} aria-hidden="true" />
                    {THEORY.cta.draw[lang]}
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo("dyads")}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 min-h-14 rounded-2xl text-lg font-black border-2 transition-all active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                      isDark ? "border-slate-600 hover:bg-slate-800" : "border-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Combine size={20} aria-hidden="true" />
                    {THEORY.cta.dyads[lang]}
                  </button>
                </div>
              </section>
            </article>
          )
        })()}

      </main>

      {/* ─── MODAL (Aktorskie Kompendium) ─── */}
      {selectedEmotion && (
        <dialog
          ref={dialogRef}
          aria-labelledby="emotion-modal-title"
          onCancel={(e) => { e.preventDefault(); closeModal() }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          className="fixed inset-0 z-50 m-0 w-full h-full max-w-none max-h-none open:flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade"
        >
          <div
            className={`w-full max-w-5xl max-h-[95vh] overflow-y-auto overscroll-contain rounded-3xl shadow-2xl animate-slide border ${isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-300 text-slate-900"}`}
          >
            {/* Header Modala */}
            <div className={`p-4 sm:p-8 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md border-b ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/90 border-slate-200'}`}>
              <div className="flex items-center gap-4 min-w-0">
                <div className={`hidden sm:block p-3 rounded-2xl ${selectedEmotion.bgLightClass} ${selectedEmotion.colorClass}`}>
                  <selectedEmotion.icon size={32} strokeWidth={2} />
                </div>
                <div>
                  <h2 id="emotion-modal-title" className={`text-2xl sm:text-4xl font-black uppercase break-words ${nameColor(selectedEmotion)}`}>{selectedEmotion.name[lang]}</h2>
                  <p className="font-serif italic text-xs sm:text-sm opacity-80 mt-1">{t.modal.bioGoal}: <strong className="font-sans">{selectedEmotion.function[lang]}</strong></p>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeModal}
                aria-label={t.modal.back}
                className={`p-3 rounded-xl transition-all border shrink-0 ${isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800 hover:border-slate-500" : "bg-white border-slate-300 hover:bg-slate-100"}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Treść Modala */}
            <div className="p-6 sm:p-8 space-y-8">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t.modal.mechanism}</h3>
                <p className="text-sm opacity-80 mb-4">{t.modal.mechanismHint}</p>
                <EvoChain emotion={selectedEmotion} lang={lang} isDark={isDark} />
                <p className="text-xs opacity-70 text-center italic mt-2">{t.modal.neuroception}</p>
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

                <div ref={bodyDictRef} className={`p-6 sm:p-8 rounded-xl border h-full scroll-mt-28 sm:scroll-mt-36 ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200 shadow-md"}`}>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                        <Fingerprint size={20} className="text-teal-500" /> {t.modal.bodyDictionary}
                    </h3>
                    <p className="text-xs opacity-60 mb-6">{t.modal.bodyDictDesc}</p>
                    <ul className="space-y-3">
                        {selectedEmotion.signals[lang].map((signal, idx) => (
                            <li key={idx} className="flex gap-3 text-sm items-start">
                                <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: selectedEmotion.hex }}></span>
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
                          <span className="text-xs uppercase font-bold opacity-70 block mb-1">{t.modal.bodySignal}</span>
                          <p className="text-lg font-serif italic font-medium">"{selectedEmotion.impulse[lang]}"</p>
                      </div>
                      <div className="flex-1">
                          <span className="text-xs uppercase font-bold opacity-70 block mb-1">{t.modal.scenicGoal}</span>
                          <p className="text-sm font-medium">{selectedEmotion.desc[lang]}</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 text-center w-full max-w-md pb-6 sm:pb-8 flex flex-col items-center gap-4">
        
        <div className="text-xs opacity-70 hover:opacity-100 transition-opacity text-center mt-2 max-w-md leading-relaxed">
          {lang === "pl" ? (
            <>
              &copy; 2025 Oskar Hamerski.<br />
              Interaktywne narzędzie dydaktyczne opracowane dla studentów Wydziału Aktorskiego Akademii Teatralnej w Warszawie.<br />
              <span className="font-semibold uppercase tracking-wider text-xs mt-1 inline-block">Do użytku edukacyjnego</span>
            </>
          ) : (
            <>
              &copy; 2025 Oskar Hamerski.<br />
              Interactive educational tool developed for the students of the Acting Department at the Theatre Academy in Warsaw.<br />
              <span className="font-semibold uppercase tracking-wider text-xs mt-1 inline-block">For educational use</span>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}

export default App
