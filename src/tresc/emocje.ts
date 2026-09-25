import { Sun, UserCheck, AlertTriangle, Maximize2, Anchor, MinusCircle, Flame, Eye as EyeIcon } from "lucide-react"
import type { Emotion } from "./typy"

// ─── 8 emocji podstawowych Plutchika ────────────────────────────────
// Kolejność = kolejność na kole i w Katalogu. Każda emocja ma tu komplet danych:
// - stimulus/impulse/action/function — krótkie hasła łańcucha na karcie,
// - mechanism — rozwinięcie każdego z tych haseł (źródło:
//   Mechanizm_Powstawania_Emocji_Teksty_do_modali.md),
// - intensity — drabina od słabej do skrajnej wersji,
// - signals — Słownik Ciała (8 sygnałów).
// Klasy kolorów to nazwy klas Tailwinda — muszą być wpisane w całości (Tailwind szuka ich w tekście
// plików). colorClass = kolor ikony i pasków, nameClass = kolor nazwy emocji w trybie jasnym i ciemnym.
export const EMOTIONS: Emotion[] = [
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
    mechanism: {
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
    nameClass: "text-yellow-700 dark:text-yellow-500",
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
    mechanism: {
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
    nameClass: "text-lime-700 dark:text-lime-500",
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
    mechanism: {
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
    nameClass: "text-emerald-700 dark:text-emerald-500",
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
    mechanism: {
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
    nameClass: "text-cyan-700 dark:text-cyan-500",
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
    mechanism: {
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
    nameClass: "text-blue-700 dark:text-blue-500",
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
    mechanism: {
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
    nameClass: "text-purple-700 dark:text-purple-500",
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
    mechanism: {
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
    nameClass: "text-red-700 dark:text-red-500",
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
    mechanism: {
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
    nameClass: "text-orange-700 dark:text-orange-500",
    bgLightClass: "bg-orange-500/10",
    hex: "#f97316",
    icon: EyeIcon,
  },
]
