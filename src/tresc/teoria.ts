import type { L } from "./typy"

// ─── Zakładka Teoria: treść ─────────────────────────────────────────
// Źródło: Zakladka_Teoria__Propozycja_Przebudowy.md. Układ narracyjny zamiast wykładu:
// teza → kontekst → spór → reguły gry → powrót do ćwiczenia. *tekst* = kursywa.
export const THEORY = {
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
