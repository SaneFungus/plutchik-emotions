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
  TriangleAlert, // Zmienione z AlertTriangle
  Flame,
  Zap,
  Anchor,
  UserCheck,
  CircleMinus,   // Zmienione z MinusCircle
  Eye as EyeIcon,
  Maximize,      // Zmienione z Maximize2
  Move,
  X,
  User,
  Focus,
  Compass,
  Wind,
  Info
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
      bioGoal: "Cel Biologiczny",
      movementVector: "Wektor ruchu",
      introNote: "Pamiętaj — to nie są recepty. To propozycje wejścia. Każda zaczyna się od neutralnego stania, z zamkniętymi oczami, po kilku oddechach.",
      bodyInSpace: "Ciało-w-przestrzeni",
      attentionQuality: "Jakość uwagi",
      internalLandscape: "Wewnętrzny krajobraz",
      breath: "Oddech",
      impulse: "Impuls",
      action: "Działanie"
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
      bioGoal: "Biological Goal",
      movementVector: "Movement Vector",
      introNote: "Remember — these are not prescriptions. They are entry proposals. Each starts from a neutral standing position, eyes closed, after a few breaths.",
      bodyInSpace: "Body-in-space",
      attentionQuality: "Quality of attention",
      internalLandscape: "Internal landscape",
      breath: "Breath",
      impulse: "Impulse",
      action: "Action"
    }
  }
}

// ─── Data: 8 Basic Emotions + New Actor Instructions ─────────────
interface Emotion {
  id: string
  name: { pl: string; en: string }
  desc: { pl: string; en: string }
  impulse: { pl: string; en: string }
  action: { pl: string; en: string }
  function: { pl: string; en: string }
  vector: { pl: string; en: string }
  colorClass: string
  bgLightClass: string
  hex: string
  icon: React.ElementType
  actorGuide: {
    body: { pl: string; en: string }
    attention: { pl: string; en: string }
    internal: { pl: string; en: string }
    breath: { pl: string; en: string }
  }
}

const EMOTIONS: Emotion[] = [
  {
    id: "JOY",
    name: { pl: "Radość", en: "Joy" },
    desc: {
      pl: "Sygnał bezpieczeństwa i siły. Napędza ekspansję, taniec i przyciąganie uwagi.",
      en: "Signal of safety and strength. Drives expansion, dance, and attracting attention.",
    },
    impulse: { pl: "Ekspansja / Energia", en: "Expansion / Energy" },
    action: { pl: "POPISYWANIE SIĘ", en: "SHOWING OFF" },
    function: { pl: "WITALNOŚĆ / ZALOTY", en: "VITALITY / COURTSHIP" },
    vector: { pl: "W GÓRĘ / NA ZEWNĄTRZ", en: "UPWARD / OUTWARD" },
    colorClass: "text-yellow-500",
    bgLightClass: "bg-yellow-500/10",
    hex: "#eab308",
    icon: Zap,
    actorGuide: {
      body: {
        pl: "Poczuj podłogę pod stopami — a potem poczuj, że coś cię od niej lekko odrywa. Nie unosisz się — ale ciężar staje się mniejszy. Klatka piersiowa rozszerza się, jakby w środku robiło się więcej miejsca. Ręce oddalają się od tułowia — nie dlatego, że je unosisz, ale dlatego, że ciało chce zajmować więcej przestrzeni.",
        en: "Feel the floor under your feet — and then feel something slightly lifting you from it. You are not floating — but the weight becomes less. The chest expands, as if making more room inside. Arms move away from the torso — not because you lift them, but because the body wants to take up more space."
      },
      attention: {
        pl: "Otwórz oczy. Widzisz szeroko — nie szukasz niczego konkretnego, ale wszystko jest ciekawe. Wzrok jest miękki, nieostry. Kąty pokoju, kolor ścian, światło — wszystko jest lekko jaśniejsze niż powinno.",
        en: "Open your eyes. You see broadly — you're not looking for anything specific, but everything is interesting. The gaze is soft, unfocused. Corners of the room, wall color, light — everything is slightly brighter than it should be."
      },
      internal: {
        pl: "W środku klatki piersiowej jest ciepło, które się rozprzestrzenia. Nie gorąco — ciepło. Jakby coś dojrzałego, pełnego. To ciepło ma ruch — nie chce zostać w środku. Chce się dzielić, przelewać na zewnątrz.",
        en: "In the middle of the chest there is a warmth that spreads. Not hot — warm. Like something ripe, full. This warmth has movement — it doesn't want to stay inside. It wants to share, to pour out."
      },
      breath: {
        pl: "Pełny, łatwy. Wydech dłuższy niż wdech. Można powiedzieć, że oddech się „uśmiecha”.",
        en: "Full, easy. Exhale longer than inhale. You could say the breath is 'smiling'."
      }
    }
  },
  {
    id: "TRUST",
    name: { pl: "Zaufanie", en: "Trust" },
    desc: {
      pl: "Decyzja organizmu o wpuszczeniu kogoś do strefy intymnej. Niezbędna do tworzenia więzi.",
      en: "Organism's decision to let someone into the intimate zone. Essential for bonding.",
    },
    impulse: { pl: "Rozluźnienie / Ciepło", en: "Relaxation / Warmth" },
    action: { pl: "OTWARCIE GRANIC", en: "OPENING BOUNDARIES" },
    function: { pl: "WIĘŹ / INTYMNOŚĆ", en: "BONDING / INTIMACY" },
    vector: { pl: "DO SIEBIE / WCHŁANIANIE", en: "TOWARD SELF / ABSORPTION" },
    colorClass: "text-lime-500",
    bgLightClass: "bg-lime-500/10",
    hex: "#84cc16",
    icon: UserCheck,
    actorGuide: {
      body: {
        pl: "Przód ciała mięknie. Brzuch, klatka piersiowa, gardło — te miejsca, które zwykle chronisz, odpuszczają osłonę. Poczuj, że jesteś lekko nachylony do przodu — nie dlatego, że się pochylasz, ale dlatego, że coś przed tobą jest warte zbliżenia się. Stopy są stabilne. Ziemia trzyma.",
        en: "The front of the body softens. Belly, chest, throat — those places you usually protect, drop their guard. Feel that you are leaning slightly forward — not because you are bending, but because something in front of you is worth getting closer to. Feet are stable. The ground holds you."
      },
      attention: {
        pl: "Uwaga jest spokojna i skoncentrowana — ale nie czujna. Nie skanujesz zagrożeń. Patrzysz na to, co przed tobą, z taką jakością uwagi, z jaką patrzysz na kogoś, kto śpi i komu ufasz. Nie musisz śledzić — możesz po prostu być z.",
        en: "Attention is calm and focused — but not vigilant. You are not scanning for threats. You look at what's in front of you with the quality of attention you use when looking at someone sleeping whom you trust. You don't have to track — you can just be with."
      },
      internal: {
        pl: "Poczuj, że masz ciężar — ale to jest dobry ciężar. Ciężar kogoś, kto wie, gdzie stoi. Wewnątrz jest coś solidnego, cichego, stabilnego. Jakbyś miał w środku coś, co nie musi się bronić, bo wie, że jest bezpieczne.",
        en: "Feel that you have weight — but it's a good weight. The weight of someone who knows where they stand. Inside there is something solid, quiet, stable. As if you had something inside that doesn't need to defend itself, because it knows it's safe."
      },
      breath: {
        pl: "Wolny. Głęboki. Brzuszny. Oddech kogoś, kto nie musi się spieszyć.",
        en: "Slow. Deep. Abdominal. The breath of someone who doesn't have to rush."
      }
    }
  },
  {
    id: "FEAR",
    name: { pl: "Strach", en: "Fear" },
    desc: {
      pl: "Ciało rozpoznaje siłę wyższą od siebie. Priorytetem jest przetrwanie poprzez wycofanie.",
      en: "The body recognizes a force greater than itself. Priority is survival by withdrawing.",
    },
    impulse: { pl: "Napięcie / Alarm", en: "Tension / Alarm" },
    action: { pl: "UCIECZKA / UNIK", en: "ESCAPE / AVOIDANCE" },
    function: { pl: "OCHRONA", en: "PROTECTION" },
    vector: { pl: "DO TYŁU / KURCZENIE SIĘ", en: "BACKWARD / CONTRACTION" },
    colorClass: "text-emerald-500",
    bgLightClass: "bg-emerald-500/10",
    hex: "#10b981",
    icon: TriangleAlert, // Poprawione
    actorGuide: {
      body: {
        pl: "Ciężar przenosi się do góry — z brzucha do klatki, z klatki do ramion, z ramion do głowy. Stopy tracą kontakt z podłogą — nie fizycznie, ale jakościowo. Jakbyś mógł potrzebować uciec i ciało się już szykuje. Wszystko się lekko zacieśnia, kurczy. Nie zamykasz się — zbierasz się. Ciało chce być mniejsze, szybsze, gotowe.",
        en: "Weight moves up — from the belly to the chest, from the chest to the shoulders, from the shoulders to the head. Feet lose contact with the floor — not physically, but qualitatively. As if you might need to run and the body is already preparing. Everything slightly tightens, shrinks. You don't close yourself — you gather yourself. The body wants to be smaller, faster, ready."
      },
      attention: {
        pl: "Widzenie peryferykiem nagle staje się bardzo aktywne. Szukasz. Nie wiesz czego — ale coś jest na granicy pola widzenia i jeszcze się nie ujawniło. Wzrok jest ostry, skacze. Uszy słyszą więcej niż zwykle.",
        en: "Peripheral vision suddenly becomes very active. You are searching. You don't know for what — but something is on the edge of your field of vision and hasn't revealed itself yet. The gaze is sharp, jumping. Ears hear more than usual."
      },
      internal: {
        pl: "Jest coś, co nadchodzi, ale nie wiesz co. Jeszcze nie. Gdzieś w żołądku lub w klatce pojawia się chłód, napięcie, elektryczność. Nie ból — napięcie czegoś, co czeka na informację, której jeszcze nie ma.",
        en: "There is something coming, but you don't know what. Not yet. Somewhere in the stomach or chest there is a coldness, tension, electricity. Not pain — the tension of something waiting for information that isn't there yet."
      },
      breath: {
        pl: "Płytki, wysoko w klatce. Albo wstrzymany — jakbyś nasłuchiwał i oddech by ci przeszkadzał.",
        en: "Shallow, high in the chest. Or held — as if you were listening and the breath would interfere."
      }
    }
  },
  {
    id: "SURPRISE",
    name: { pl: "Zaskoczenie", en: "Surprise" },
    desc: {
      pl: "Nagły reset uwagi ('Biała karta'). Przerwanie działania, by ocenić nowy bodziec.",
      en: "Sudden reset of attention ('Blank slate'). Interrupting action to assess a new stimulus.",
    },
    impulse: { pl: "Wdech / Zatrzymanie", en: "Inhale / Freezing" },
    action: { pl: "STOP / RESET", en: "STOP / RESET" },
    function: { pl: "ORIENTACJA", en: "ORIENTATION" },
    vector: { pl: "STOP / ROZSZERZENIE", en: "STOP / EXPANSION" },
    colorClass: "text-cyan-500",
    bgLightClass: "bg-cyan-500/10",
    hex: "#06b6d4",
    icon: Maximize, // Poprawione
    actorGuide: {
      body: {
        pl: "Nagłe zatrzymanie. Coś, co robiłeś — jakikolwiek ruch, jakikolwiek plan — nagle zostaje przerwane. Ciało się otwiera gwałtownie: oczy szerzej, klatka szerzej, ręce lekko od tułowia. Jakbyś nagle musiał pomieścić więcej niż przed chwilą. Poczuj ten moment powiększenia.",
        en: "Sudden stop. Whatever you were doing — any movement, any plan — is suddenly interrupted. The body opens violently: eyes wider, chest wider, arms slightly away from the torso. As if you suddenly had to accommodate more than a moment ago. Feel this moment of enlargement."
      },
      attention: {
        pl: "Rama, przez którą patrzyłeś na świat, właśnie pękła. Wszystko jest nowe. Uwaga jest całkowicie otwarta, pusta, receptywna — nie szuka jeszcze, bo nie wie, czego szukać. To jest czysty odbiór, przed interpretacją. Dziecko widzi tak, kiedy widzi coś pierwszy raz.",
        en: "The frame through which you looked at the world just broke. Everything is new. Attention is completely open, empty, receptive — not searching yet, because it doesn't know what to look for. This is pure reception, before interpretation. A child sees like this when seeing something for the first time."
      },
      internal: {
        pl: "W środku jest chwilowa pustka — ale nie straszna. Jasna pustka. Jak flash aparatu — wszystko bieleje na sekundę, a potem świat wraca, ale inny. Między starą ramą a nową jest moment, w którym nie masz żadnej ramy. Zostań w tym momencie.",
        en: "Inside there is a momentary emptiness — but not scary. A bright emptiness. Like a camera flash — everything turns white for a second, and then the world returns, but different. Between the old frame and the new one is a moment where you have no frame. Stay in this moment."
      },
      breath: {
        pl: "Gwałtowny, krótki wdech. A potem pauza. Ciało czeka, co będzie dalej.",
        en: "Sudden, short inhale. And then a pause. The body waits for what's next."
      }
    }
  },
  {
    id: "SADNESS",
    name: { pl: "Smutek", en: "Sadness" },
    desc: {
      pl: "Oszczędzanie energii w obliczu straty i naturalny sygnał dla grupy o potrzebie wsparcia.",
      en: "Conserving energy in the face of loss and a natural signal to the group for support.",
    },
    impulse: { pl: "Ciężar / Zapadanie", en: "Heaviness / Sinking" },
    action: { pl: "PŁACZ / BEZRUCH", en: "CRYING / STILLNESS" },
    function: { pl: "REINTEGRACJA", en: "REINTEGRATION" },
    vector: { pl: "W DÓŁ / DO ŚRODKA", en: "DOWNWARD / INWARD" },
    colorClass: "text-blue-500",
    bgLightClass: "bg-blue-500/10",
    hex: "#3b82f6",
    icon: Anchor,
    actorGuide: {
      body: {
        pl: "Ciężar wraca. Ale nie taki jak w zaufaniu — tamten był stabilny. Ten ciągnie w dół. Ramiona opadają, głowa ciężeje, klatka się zamyka — nie jako obrona, lecz jako wycofanie. Ciało traci zainteresowanie przestrzenią. Nie chcesz zajmować miejsca. Nie dlatego, że się boisz — dlatego, że nie ma po co.",
        en: "The weight returns. But not like in trust — that was stable. This pulls down. Shoulders drop, head gets heavy, chest closes — not as a defense, but as a withdrawal. The body loses interest in space. You don't want to take up space. Not because you're afraid — because there's no point."
      },
      attention: {
        pl: "Pole widzenia się zwęża. Obrzeża pokoju tracą znaczenie, rozmywają się. Wzrok opada — ku dołowi, ku podłodze, ku dłoniom. Albo wzrok staje się wewnętrzny — patrzysz, ale nie widzisz tego, co jest przed tobą. Widzisz coś, czego tu nie ma.",
        en: "Field of vision narrows. The edges of the room lose meaning, blur. The gaze drops — downwards, towards the floor, towards the hands. Or the gaze becomes internal — you look, but you don't see what's in front of you. You see something that isn't here."
      },
      internal: {
        pl: "Coś odeszło. Albo odchodzi. W środku klatki piersiowej jest ciężar, który nie jest fizyczny — jest to ciężar nieobecności. Jakby coś, co było pełne, stało się puste, i ta pustka ma wagę. Wszystko lekko zwalnia. Czas staje się gęsty.",
        en: "Something is gone. Or is leaving. Inside the chest there is a weight that is not physical — it is the weight of absence. As if something that was full became empty, and this emptiness has weight. Everything slows down slightly. Time becomes thick."
      },
      breath: {
        pl: "Wolny, ale płytki. Wdechy są niechętne, jakby ciało nie chciało napełniać się powietrzem. Wydechy długie, westchnięcia.",
        en: "Slow, but shallow. Inhales are reluctant, as if the body doesn't want to fill with air. Exhales long, sighs."
      }
    }
  },
  {
    id: "DISGUST",
    name: { pl: "Wstręt", en: "Disgust" },
    desc: {
      pl: "Ochrona organizmu przed zatruciem fizycznym (jedzenie) lub moralnym (zachowanie).",
      en: "Protection of the organism against physical poisoning (food) or moral poisoning (behavior).",
    },
    impulse: { pl: "Mdłości / Skurcz", en: "Nausea / Contraction" },
    action: { pl: "WYPYCHANIE / PLUCIE", en: "PUSHING AWAY / SPITTING" },
    function: { pl: "ODRZUCENIE", en: "REJECTION" },
    vector: { pl: "OD SIEBIE / BLOKADA", en: "AWAY FROM SELF / BLOCKING" },
    colorClass: "text-purple-500",
    bgLightClass: "bg-purple-500/10",
    hex: "#a855f7",
    icon: CircleMinus, // Poprawione
    actorGuide: {
      body: {
        pl: "Ciało odwraca się od. Nie do tyłu — od. Nos, górna warga, twarz odwracają się pierwsze. Potem ramiona. Potem tułów. To jest gest granicy: coś przekroczyło próg tego, co mogę przyjąć, i ciało to wypycha. Poczuj, że twoja skóra staje się barierą — nie chce przepuścić.",
        en: "The body turns away from. Not backwards — away from. Nose, upper lip, face turn first. Then shoulders. Then torso. This is a gesture of boundary: something has crossed the threshold of what I can accept, and the body pushes it out. Feel that your skin becomes a barrier — it doesn't want to let it through."
      },
      attention: {
        pl: "Paradoksalnie ostra — widzisz bardzo dokładnie to, od czego się odwracasz. Wzrok jest skupiony na źródle, ale z jakością „za dużo, za blisko”. A potem odwraca się. Nie chcesz tego widzieć, ale nie możesz nie widzieć.",
        en: "Paradoxically sharp — you see very clearly what you are turning away from. The gaze is focused on the source, but with a quality of 'too much, too close'. And then it turns away. You don't want to see it, but you can't not see it."
      },
      internal: {
        pl: "Coś jest nie tak. Nie niebezpieczne jak w strachu — złe. Skażone. Wewnątrz jest ruch wypychania — z żołądka, z gardła. Jakby ciało chciało wyrzucić coś, co się do niego dostało. Granica między mną a nie-mną staje się bardzo ostra, twarda.",
        en: "Something is wrong. Not dangerous like in fear — bad. Contaminated. Inside there is a pushing movement — from the stomach, from the throat. As if the body wanted to throw out something that got into it. The boundary between me and not-me becomes very sharp, hard."
      },
      breath: {
        pl: "Wydech dominuje. Silny, przez nos. Ciało chce pozbyć się powietrza, które było blisko tego źródła. Wdech jest niechętny — nie chcę wpuszczać.",
        en: "Exhale dominates. Strong, through the nose. The body wants to get rid of the air that was near this source. Inhale is reluctant — I don't want to let it in."
      }
    }
  },
  {
    id: "ANGER",
    name: { pl: "Gniew", en: "Anger" },
    desc: {
      pl: "Organizm rozpoznaje przeszkodę, którą może pokonać. Szybka mobilizacja energii do walki.",
      en: "The organism recognizes an obstacle it can overcome. Rapid mobilization of energy to fight.",
    },
    impulse: { pl: "Gorąco / Adrenalina", en: "Heat / Adrenaline" },
    action: { pl: "ATAK / PRZEBICIE", en: "ATTACK / BREAKTHROUGH" },
    function: { pl: "DESTRUKCJA", en: "DESTRUCTION" },
    vector: { pl: "DO PRZODU / TARCIE", en: "FORWARD / FRICTION" },
    colorClass: "text-red-500",
    bgLightClass: "bg-red-500/10",
    hex: "#ef4444",
    icon: Flame,
    actorGuide: {
      body: {
        pl: "Energia idzie do przodu. Klatka piersiowa pręży się, szczęka się zaciska, ręce mają energię — nie do uderzenia (to jest za daleko), ale do trzymania, chwytania, ustalania. Ciało zajmuje więcej przestrzeni, ale inaczej niż w radości — radość rozszerza się we wszystkie strony, gniew rozszerza się ku. Jest cel. Może jeszcze nie wiesz jaki — ale ciało już wie, w którym kierunku.",
        en: "Energy goes forward. Chest puffs out, jaw clenches, hands have energy — not to hit (that's too far), but to hold, grab, set. The body takes up more space, but differently than in joy — joy expands in all directions, anger expands towards. There is a target. Maybe you don't know what yet — but the body already knows in which direction."
      },
      attention: {
        pl: "Bardzo wąska, bardzo ostra. Laserowa. Wszystko poza obiektem gniewu traci ostrość, staje się nieistotne. Widzisz jedno — i widzisz to z przenikliwością, z którą normalnie nie patrzysz. Gniew jest jak reflektor: oświetla z brutalną jasnością to, na co jest skierowany, i pogrąża w ciemności resztę.",
        en: "Very narrow, very sharp. Laser-like. Everything outside the object of anger loses focus, becomes irrelevant. You see one thing — and you see it with a piercing quality with which you normally don't look. Anger is like a spotlight: it illuminates with brutal brightness what it is aimed at, and plunges the rest into darkness."
      },
      internal: {
        pl: "Ciepło, ale inne niż w radości. Gorąco. Ciśnienie. Coś w środku rośnie i szuka ujścia. Granica została naruszona — i ciało to wie, zanim umysł zrozumie dlaczego. Jest poczucie „nie” — głębokie, cielesne, niepodważalne. Nie „nie chcę” — „NIE”.",
        en: "Warmth, but different than in joy. Hot. Pressure. Something inside grows and seeks an outlet. A boundary has been breached — and the body knows it before the mind understands why. There is a feeling of 'no' — deep, bodily, undeniable. Not 'I don't want to' — 'NO'."
      },
      breath: {
        pl: "Mocny, przez nos, z widocznym wysiłkiem. Jakby powietrze nie chciało się wpuścić wystarczająco szybko. Nozdrzowe.",
        en: "Strong, through the nose, with visible effort. As if the air didn't want to let itself in fast enough. Nostril-focused."
      }
    }
  },
  {
    id: "ANTICIPATION",
    name: { pl: "Oczekiwanie", en: "Anticipation" },
    desc: {
      pl: "Aktywne poszukiwanie informacji. Przygotowanie ciała na to, co dopiero nadejdzie.",
      en: "Active search for information. Preparing the body for what is yet to come.",
    },
    impulse: { pl: "Wyostrzenie zmysłów", en: "Sharpening of senses" },
    action: { pl: "SKANOWANIE / TROPIENIE", en: "SCANNING / TRACKING" },
    function: { pl: "EKSPLORACJA", en: "EXPLORATION" },
    vector: { pl: "DO PRZODU (Głowa)", en: "FORWARD (Head)" },
    colorClass: "text-orange-500",
    bgLightClass: "bg-orange-500/10",
    hex: "#f97316",
    icon: EyeIcon,
    actorGuide: {
      body: {
        pl: "Ciężar przenosi się na przodostopy. Ciało pochyla się lekko do przodu — nie ku czemuś konkretnemu, ale ku temu, co będzie. Jest gotowość, sprężystość. Nie napięcie strachu — raczej napięcie łucznika, który naciągnął cięciwę i jeszcze nie puścił. Ciało jest zorganizowane, czujne, zestrzelone.",
        en: "Weight shifts to the balls of the feet. The body leans slightly forward — not towards something specific, but towards what will be. There is readiness, elasticity. Not the tension of fear — rather the tension of an archer who has drawn the bowstring and hasn't let go yet. The body is organized, alert, aligned."
      },
      attention: {
        pl: "Skanowanie. Oczy są aktywne, ale nie niespokojne — szukają z przyjemnością. Uwaga jest zorientowana na przyszłość: nie na to, co jest, ale na to, co zaraz się pojawi. Jest to jakość uwagi myśliwego, który widzi ślady i odczytuje kierunek.",
        en: "Scanning. Eyes are active, but not anxious — they search with pleasure. Attention is oriented towards the future: not on what is, but on what is about to appear. It's the quality of attention of a hunter seeing tracks and reading the direction."
      },
      internal: {
        pl: "Coś się zbliża. Jeszcze nie wiesz co — ale poruszasz się w jego stronę. W środku jest coś cienistego, lekkiego, naładowanego. Nie niepokój — elektryczność. Jakby powietrze przed burzą: nic się jeszcze nie dzieje, ale wszystko jest naładowane tym, że zaraz się wydarzy.",
        en: "Something is approaching. You don't know what yet — but you move towards it. Inside there is something shadowy, light, charged. Not anxiety — electricity. Like the air before a storm: nothing is happening yet, but everything is charged with the fact that it's about to happen."
      },
      breath: {
        pl: "Lekko wstrzymany. Nie z lęku — z gotowości. Oddech kogoś, kto nasłuchuje, kiedy usłyszy sygnał.",
        en: "Slightly held. Not out of fear — out of readiness. The breath of someone listening for a signal."
      }
    }
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
            <button
              onClick={() => !isSpinning && setSelectedEmotion(currentEmotion)}
              disabled={isSpinning}
              className={`w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 border-[8px] sm:border-[12px] rounded-full flex items-center justify-center p-10 sm:p-14 mb-2 transition-all duration-500 relative overflow-hidden ${
                isDark
                  ? "bg-slate-900 border-slate-800 hover:border-slate-700 shadow-2xl shadow-black"
                  : "bg-white border-slate-100 hover:border-slate-200 shadow-2xl shadow-slate-300/50"
              } ${currentEmotion.colorClass} ${isSpinning ? "animate-roulette cursor-default" : "hover:scale-[1.02] active:scale-95 cursor-pointer"}`}
            >
              <div className="relative z-10 drop-shadow-md">
                <currentEmotion.icon strokeWidth={1.5} className="w-24 h-24 sm:w-32 sm:h-32" />
              </div>
            </button>
            <div className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-bold mb-6 sm:mb-8 transition-opacity duration-300 ${isSpinning ? 'opacity-0' : 'opacity-40'}`}>
              {lang === 'pl' ? 'Kliknij okrąg, aby zobaczyć instrukcje' : 'Click the circle to view instructions'}
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
          
          const textShadowStyle = isDark 
            ? '0 2px 10px rgba(0,0,0,0.9), 0 0 5px rgba(0,0,0,0.8)' 
            : '0 2px 10px rgba(255,255,255,1), 0 0 5px rgba(255,255,255,0.9)';

          return (
            <div className="w-full flex flex-col items-center animate-fade px-2">
              <div className="text-center mb-6 sm:mb-8 max-w-lg">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest opacity-40 mb-1 sm:mb-2">{t.dyadsTitle}</h2>
                <p className="text-xs sm:text-sm opacity-60 leading-relaxed px-4">{t.dyadsDesc}</p>
              </div>

              <div className="flex justify-center items-center mb-8 sm:mb-12 relative h-40 sm:h-56 w-full max-w-[16rem] sm:max-w-sm mx-auto">
                <div
                  className="absolute left-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full border-[6px] sm:border-[8px] opacity-80 transition-all duration-500 bg-transparent"
                  style={{ borderColor: dyadPair[0].hex }}
                />
                
                <div
                  className="absolute right-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full border-[6px] sm:border-[8px] opacity-80 transition-all duration-500 bg-transparent"
                  style={{ borderColor: dyadPair[1].hex }}
                />

                <div className="absolute left-0 w-40 h-40 sm:w-56 sm:h-56 flex flex-col items-center justify-center p-4 z-10 pointer-events-none">
                  <Icon1 className={`w-10 h-10 sm:w-14 sm:h-14 mb-1 sm:mb-2 ${dyadPair[0].colorClass}`} strokeWidth={2} style={{ filter: `drop-shadow(0 2px 4px ${isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'})` }} />
                  <h3 
                    className={`text-xs sm:text-lg font-black uppercase tracking-tight text-center ${dyadPair[0].colorClass}`}
                    style={{ textShadow: textShadowStyle }}
                  >
                    {dyadPair[0].name[lang]}
                  </h3>
                </div>

                <div className="absolute right-0 w-40 h-40 sm:w-56 sm:h-56 flex flex-col items-center justify-center p-4 z-10 pointer-events-none">
                  <Icon2 className={`w-10 h-10 sm:w-14 sm:h-14 mb-1 sm:mb-2 ${dyadPair[1].colorClass}`} strokeWidth={2} style={{ filter: `drop-shadow(0 2px 4px ${isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'})` }} />
                  <h3 
                    className={`text-xs sm:text-lg font-black uppercase tracking-tight text-center ${dyadPair[1].colorClass}`}
                    style={{ textShadow: textShadowStyle }}
                  >
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

      {/* ─── MODAL (Aktorskie Kompendium - Nowy Format) ─── */}
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

            {/* Treść Modala - Instrukcje Aktorskie */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Note Banner */}
              <div className={`p-4 rounded-2xl border flex gap-4 items-start ${isDark ? "bg-amber-500/10 border-amber-500/20 text-amber-200" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                <Info size={20} className="shrink-0 mt-0.5 opacity-80" />
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {t.modal.introNote}
                </p>
              </div>

              {/* Grid 4 Aspektów */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* 1. Ciało-w-przestrzeni */}
                <section className={`p-5 sm:p-6 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <h3 className={`flex items-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 ${selectedEmotion.colorClass}`}>
                    <User size={18} />
                    {t.modal.bodyInSpace}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    {selectedEmotion.actorGuide.body[lang]}
                  </p>
                </section>

                {/* 2. Jakość uwagi */}
                <section className={`p-5 sm:p-6 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <h3 className={`flex items-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 ${selectedEmotion.colorClass}`}>
                    <Focus size={18} />
                    {t.modal.attentionQuality}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    {selectedEmotion.actorGuide.attention[lang]}
                  </p>
                </section>

                {/* 3. Wewnętrzny krajobraz */}
                <section className={`p-5 sm:p-6 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <h3 className={`flex items-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 ${selectedEmotion.colorClass}`}>
                    <Compass size={18} />
                    {t.modal.internalLandscape}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    {selectedEmotion.actorGuide.internal[lang]}
                  </p>
                </section>

                {/* 4. Oddech */}
                <section className={`p-5 sm:p-6 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <h3 className={`flex items-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 ${selectedEmotion.colorClass}`}>
                    <Wind size={18} />
                    {t.modal.breath}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    {selectedEmotion.actorGuide.breath[lang]}
                  </p>
                </section>

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
