import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── DATI FILOSOFI ────────────────────────────────────────────────────────────

const filosofiQuiz = {
  derrida: {
    nome: "Jacques Derrida",
    anni: "1930–2004",
    corrente: "Decostruzionismo",
    emoji: "✂️",
    colore: "text-rose-400",
    bordo: "border-rose-400",
    bg: "bg-rose-400",
    idea: "Non c'è nulla al di fuori del testo.",
    stats: { coerenza: 55, influenza: 88, opere: 42, chiarezza: 22, memabilita: 85 },
    desc: "Possiedi un istinto decostruttivo innato: dove gli altri vedono certezze, tu percepisci crepe, ambiguità e significati nascosti sotto i significati. Non è nichilismo — è acume. La tua mente è sempre a un passo dal rimettere tutto in discussione. Attenzione però: non tutto nella vita si può rimandare all'infinito. Alcune scelte, temo, hanno una dead-line.",
  },
  foucault: {
    nome: "Michel Foucault",
    anni: "1926–1984",
    corrente: "Post-strutturalismo",
    emoji: "👁️",
    colore: "text-orange-400",
    bordo: "border-orange-400",
    bg: "bg-orange-400",
    idea: "Il potere è ovunque, non perché inglobi tutto, ma perché viene da ovunque.",
    stats: { coerenza: 70, influenza: 95, opere: 18, chiarezza: 68, memabilita: 95 },
    desc: "Hai un radar infallibile per le strutture di potere invisibili. Sai leggere istituzioni, discorsi e ruoli sociali come se fossero testi scritti con inchiostro simpatico. Il tuo superpotere? Non ti lasci ingannare dalle apparenze. Il tuo punto cieco? A volte anche comprare il latte al supermercato rischia di diventare un atto geopolitico.",
  },
  hegel: {
    nome: "Georg W.F. Hegel",
    anni: "1770–1831",
    corrente: "Idealismo tedesco",
    emoji: "🌀",
    colore: "text-blue-400",
    bordo: "border-blue-400",
    bg: "bg-blue-400",
    idea: "Tutto ciò che è reale è razionale, tutto ciò che è razionale è reale.",
    stats: { coerenza: 88, influenza: 95, opere: 14, chiarezza: 18, memabilita: 88 },
    desc: "La tua mente ragiona per sintesi: riesci a trovare la verità nel conflitto tra idee opposte. Dove gli altri vedono contraddizioni, tu vedi dialettica in corso. La storia, per te, ha un senso — e hai la pazienza filosofica di aspettarlo. Il rischio? Potresti spiegare anche la lista della spesa come manifestazione dello Spirito Assoluto.",
  },
  heidegger: {
    nome: "Martin Heidegger",
    anni: "1889–1976",
    corrente: "Esistenzialismo",
    emoji: "🌲",
    colore: "text-green-400",
    bordo: "border-green-400",
    bg: "bg-green-400",
    idea: "Il linguaggio è la casa dell'essere.",
    stats: { coerenza: 72, influenza: 92, opere: 28, chiarezza: 20, memabilita: 90 },
    desc: "Sei un pensatore dell'essere, del radicamento, dell'autenticità. Le domande fondamentali ti attraggono come un sentiero nel bosco — senza necessariamente sapere dove porta. Hai un senso acuto della temporalità e della mortalità come orizzonte di senso. Occhio però: non perderti così tanto nell'Essere da dimenticare di rispondere ai messaggi.",
  },
  wittgenstein: {
    nome: "Ludwig Wittgenstein",
    anni: "1889–1951",
    corrente: "Filosofia del linguaggio",
    emoji: "🔷",
    colore: "text-cyan-400",
    bordo: "border-cyan-400",
    bg: "bg-cyan-400",
    idea: "Ciò di cui non si può parlare si deve tacere.",
    stats: { coerenza: 85, influenza: 90, opere: 8, chiarezza: 60, memabilita: 94 },
    desc: "Hai una tolleranza zero per le parole usate male. Per te, molti problemi filosofici — e non solo — sono confusioni linguistiche in attesa di una buona grammatica. Sei preciso, onesto e non ami le chiacchiere inutili. Il silenzio, per te, non è imbarazzante: è, spesso, la risposta più onesta disponibile.",
  },
  bodei: {
    nome: "Remo Bodei",
    anni: "1938–2019",
    corrente: "Filosofia contemporanea",
    emoji: "🇮🇹",
    colore: "text-lime-400",
    bordo: "border-lime-400",
    bg: "bg-lime-400",
    idea: "Le passioni non sono nemiche della ragione, ma sue alleate necessarie.",
    stats: { coerenza: 88, influenza: 68, opere: 22, chiarezza: 92, memabilita: 65 },
    desc: "Riunisci passione e ragione con una naturalezza rara. Sei radicato nella cultura, nella memoria collettiva e nell'identità senza per questo diventare rigido. Hai il dono di fare filosofia senza smettere di essere umano — e di comunicarla con una chiarezza che molti colleghi ti potrebbero invidiare.",
  },
  deleuze: {
    nome: "Gilles Deleuze",
    anni: "1925–1995",
    corrente: "Post-strutturalismo",
    emoji: "🌿",
    colore: "text-emerald-400",
    bordo: "border-emerald-400",
    bg: "bg-emerald-400",
    idea: "Il pensiero nasce dal caos.",
    stats: { coerenza: 60, influenza: 82, opere: 26, chiarezza: 30, memabilita: 85 },
    desc: "Il tuo pensiero è rizomatico: si ramifica in ogni direzione, rifiuta i centri e le gerarchie. Sei attratto dalla differenza, dal divenire, da ciò che non si lascia classificare. Il mondo, per te, è un flusso da cavalcare, non un sistema da catalogare. Probabilmente trovi le mappe più interessanti dei territori che rappresentano.",
  },
  weil: {
    nome: "Simone Weil",
    anni: "1909–1943",
    corrente: "Filosofia mistica",
    emoji: "✨",
    colore: "text-yellow-400",
    bordo: "border-yellow-400",
    bg: "bg-yellow-400",
    idea: "L'attenzione è la forma più rara e pura della generosità.",
    stats: { coerenza: 80, influenza: 72, opere: 15, chiarezza: 82, memabilita: 88 },
    desc: "Possiedi una rara capacità di attenzione verso l'altro — non simpatia generica, ma presenza autentica. Sai che la vera generosità è farsi vuoto per fare spazio. Hai una coerenza interiore esigente, quasi ascetica. La tua sfida quotidiana? Ricordarti che prendersi cura di sé è parte essenziale del prendersi cura degli altri.",
  },
  arendt: {
    nome: "Hannah Arendt",
    anni: "1906–1975",
    corrente: "Filosofia politica",
    emoji: "⚖️",
    colore: "text-violet-400",
    bordo: "border-violet-400",
    bg: "bg-violet-400",
    idea: "Il male radicale nasce dalla banalità, non dalla mostruosità.",
    stats: { coerenza: 85, influenza: 90, opere: 16, chiarezza: 80, memabilita: 92 },
    desc: "Pensi in modo politico nel senso più nobile: sei convinto che la libertà si eserciti nella sfera pubblica, nel confronto, nell'azione condivisa. Hai orrore per la banalità del male — quella piccola cecità quotidiana che permette grandi orrori. Per te, pensare è già un atto di resistenza, non un lusso intellettuale.",
  },
  husserl: {
    nome: "Edmund Husserl",
    anni: "1859–1938",
    corrente: "Fenomenologia",
    emoji: "🔬",
    colore: "text-sky-400",
    bordo: "border-sky-400",
    bg: "bg-sky-400",
    idea: "Tornare alle cose stesse.",
    stats: { coerenza: 90, influenza: 85, opere: 25, chiarezza: 38, memabilita: 62 },
    desc: "Hai una vocazione fenomenologica: prima di interpretare, vuoi descrivere. Prima di giudicare, vuoi capire come l'esperienza si struttura davvero. Sei metodico, paziente e diffidi profondamente delle semplificazioni. Il tuo motto non dichiarato potrebbe essere: 'Tornare alle cose stesse — ma senza fretta.'",
  },
  fink: {
    nome: "Eugen Fink",
    anni: "1905–1975",
    corrente: "Fenomenologia",
    emoji: "🎭",
    colore: "text-indigo-400",
    bordo: "border-indigo-400",
    bg: "bg-indigo-400",
    idea: "Il gioco è il simbolo del mondo.",
    stats: { coerenza: 80, influenza: 55, opere: 12, chiarezza: 55, memabilita: 60 },
    desc: "Percepisci il mondo come uno spazio simbolico, dove il gioco non è evasione ma rivelazione del cosmo. Sei capace di pensare la libertà, il simbolo e l'esistenza con una profondità che pochi raggiungono. Sei una rarità: una mente che sa stare nel mezzo tra rigore fenomenologico e immaginazione cosmica.",
  },
  jung: {
    nome: "Carl Gustav Jung",
    anni: "1875–1961",
    corrente: "Psicologia analitica",
    emoji: "☯️",
    colore: "text-amber-400",
    bordo: "border-amber-400",
    bg: "bg-amber-400",
    idea: "Finché non rendi consapevole l'inconscio, sarà lui a dirigere la tua vita.",
    stats: { coerenza: 65, influenza: 90, opere: 20, chiarezza: 72, memabilita: 95 },
    desc: "Il tuo inconscio è rumoroso — nel senso migliore. Sei attratto da sogni, simboli, miti e da tutto ciò che parla un linguaggio più antico della logica. Hai un'intuizione delle profondità della psiche che ti rende un interlocutore prezioso nei momenti difficili. Detto tra noi: anche tu hai un'Ombra. È normale, anzi: è il punto di partenza.",
  },
  freud: {
    nome: "Sigmund Freud",
    anni: "1856–1939",
    corrente: "Psicoanalisi",
    emoji: "🧠",
    colore: "text-red-400",
    bordo: "border-red-400",
    bg: "bg-red-400",
    idea: "L'inconscio governa la nostra vita molto più di quanto crediamo.",
    stats: { coerenza: 70, influenza: 97, opere: 24, chiarezza: 75, memabilita: 98 },
    desc: "Sei analiticamente dotato: noti ciò che gli altri preferiscono non vedere, tra lapsus, sogni e comportamenti apparentemente casuali. Per te, la superficie è solo la mappa di ciò che accade in profondità. La tua curiosità per i meccanismi della mente è genuina e spesso illuminante. Un avvertimento: non tutto è un simbolo. A volte un sigaro è solo un sigaro.",
  },
};

const punteggiIniziali = {
  derrida: 0, foucault: 0, hegel: 0, heidegger: 0, wittgenstein: 0,
  bodei: 0, deleuze: 0, weil: 0, arendt: 0, husserl: 0, fink: 0, jung: 0, freud: 0,
};

// ─── DOMANDE ─────────────────────────────────────────────────────────────────
// Distribuzione: 13 filosofi su 40 slot (10 domande × 4 risposte)
// 12 filosofi appaiono 3 volte, foucault appare 4 volte (slot extra)

const domande = [
  {
    id: 1,
    testo: "Un amico ti racconta un sogno strano. Tu...",
    risposte: [
      { testo: "Noti che ogni simbolo rimanda a un altro, in una catena senza fine", filosofo: "derrida" },
      { testo: "Cerchi di descrivere l'esperienza così com'è, prima di interpretare", filosofo: "husserl" },
      { testo: "Sei già a metà seduta: vuoi trovare l'archetipo nascosto nel racconto", filosofo: "jung" },
      { testo: "Ascolti con attenzione clinica: ogni dettaglio potrebbe essere un sintomo rivelatore", filosofo: "freud" },
    ],
  },
  {
    id: 2,
    testo: "Stai leggendo un saggio ostico. Qual è il tuo primo pensiero?",
    risposte: [
      { testo: "Chi ha il potere di scrivere così, e perché la società lo autorizza?", filosofo: "foucault" },
      { testo: "Se non riesco a capirlo, il problema è probabilmente nel linguaggio", filosofo: "wittgenstein" },
      { testo: "Ogni grande contraddizione porta in sé la propria soluzione", filosofo: "hegel" },
      { testo: "Cerco le passioni dell'autore: nessun testo nasce dal nulla, c'è sempre una storia", filosofo: "bodei" },
    ],
  },
  {
    id: 3,
    testo: "Come vivi il tuo rapporto con le radici culturali?",
    risposte: [
      { testo: "Le radici danno il suolo per costruire — non le sento come catene", filosofo: "bodei" },
      { testo: "Le radici? Un ostacolo al divenire. Meglio il rizoma!", filosofo: "deleuze" },
      { testo: "Apparteniamo a una terra e a un linguaggio prima ancora di sceglierlo", filosofo: "heidegger" },
      { testo: "Le radici che non nutrono diventano sradicamento — la peggiore sofferenza umana", filosofo: "weil" },
    ],
  },
  {
    id: 4,
    testo: "Vedi un funzionario che esegue ordini senza mai riflettere. Pensi...",
    risposte: [
      { testo: "È l'immagine del male ordinario: l'assenza di pensiero è la vera pericolosità", filosofo: "arendt" },
      { testo: "Provo compassione: è sradicato, lontano da sé stesso e dal mondo", filosofo: "weil" },
      { testo: "Mi chiedo che ruolo stia recitando nel grande gioco dell'esistenza", filosofo: "fink" },
      { testo: "È la realizzazione dello Stato: l'individuo che trova il suo posto nel tutto razionale", filosofo: "hegel" },
    ],
  },
  {
    id: 5,
    testo: "Se dovessi descrivere il tuo stile di scrittura, diresti...",
    risposte: [
      { testo: "Stratificato: le parole significano sempre più di quanto sembrano dire", filosofo: "derrida" },
      { testo: "Clinico e preciso, con attenzione ai lapsus e alle contraddizioni latenti", filosofo: "freud" },
      { testo: "Minimalista: se non si può dire chiaramente, meglio tacere", filosofo: "wittgenstein" },
      { testo: "Descrittivo e metodico: prima bisogna vedere con precisione, poi — e solo poi — interpretare", filosofo: "husserl" },
    ],
  },
  {
    id: 6,
    testo: "In vacanza, la tua meta ideale sarebbe...",
    risposte: [
      { testo: "Un vecchio manicomio o prigione storica: dove il potere si vede ancora", filosofo: "foucault" },
      { testo: "Un museo di arte primitiva: pieno di simboli dell'inconscio collettivo", filosofo: "jung" },
      { testo: "Un posto tranquillo dove osservare come la coscienza percepisce il nuovo", filosofo: "husserl" },
      { testo: "Un teatro antico o un labirinto: luoghi dove il gioco del cosmo è ancora visibile", filosofo: "fink" },
    ],
  },
  {
    id: 7,
    testo: "Guardando un tramonto, la mente va a...",
    risposte: [
      { testo: "All'essere che si rivela nella natura — l'apertura silenziosa del Dasein", filosofo: "heidegger" },
      { testo: "All'inevitabile ritorno della luce: ogni tramonto porta la propria negazione", filosofo: "hegel" },
      { testo: "Alle passioni che quel paesaggio ha acceso in generazioni prima di me", filosofo: "bodei" },
      { testo: "Al divenire puro: questo cielo non è mai lo stesso, e nemmeno io sono lo stesso", filosofo: "deleuze" },
    ],
  },
  {
    id: 8,
    testo: "Come gestisci i tuoi desideri?",
    risposte: [
      { testo: "I desideri sono macchine: producono, si connettono, si trasformano", filosofo: "deleuze" },
      { testo: "Li trasformo in attenzione verso l'altro — è lì che trovo il senso vero", filosofo: "weil" },
      { testo: "Li osservo: ogni desiderio rivela qualcosa del mio inconscio profondo", filosofo: "freud" },
      { testo: "Li analizzo con sospetto: spesso il linguaggio del desiderio inganna — serve chiarezza", filosofo: "wittgenstein" },
    ],
  },
  {
    id: 9,
    testo: "Cosa ti affascina di più nel concetto di gioco?",
    risposte: [
      { testo: "È uno spazio di libertà: anche la politica, nel bene e nel male, è un gioco", filosofo: "arendt" },
      { testo: "Il gioco è il simbolo del cosmo: il mondo stesso gioca, e noi con lui", filosofo: "fink" },
      { testo: "Il gioco ha regole, e le regole sono sempre strutture di potere mascherate", filosofo: "foucault" },
      { testo: "Nel gioco affiorano gli archetipi: è individuazione travestita da svago", filosofo: "jung" },
    ],
  },
  {
    id: 10,
    testo: "Per pensare davvero, hai bisogno di...",
    risposte: [
      { testo: "Una biblioteca labirintica: ogni libro rimanda a un altro, all'infinito", filosofo: "derrida" },
      { testo: "Una piazza pubblica: il pensiero nasce dal confronto con gli altri", filosofo: "arendt" },
      { testo: "Un sentiero nel bosco: il pensiero cammina, non si siede", filosofo: "heidegger" },
      { testo: "Un archivio storico: pensare significa capire i discorsi che ci hanno formato", filosofo: "foucault" },
    ],
  },
];

// ─── COMPONENTE: singola risposta ─────────────────────────────────────────────

function Risposta({ testo, onClick, selezionata }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 mb-3 rounded-xl border transition-all duration-200 font-serif text-base cursor-pointer
        ${selezionata
          ? "border-yellow-500 bg-yellow-500/10 text-stone-100"
          : "border-stone-700 bg-transparent text-stone-300 hover:border-stone-500 hover:bg-stone-800/30"
        }`}
    >
      <span className={`mr-3 ${selezionata ? "text-yellow-400" : "text-stone-600"}`}>
        {selezionata ? "▶" : "○"}
      </span>
      {testo}
    </button>
  );
}

// ─── COMPONENTE: risultato finale ─────────────────────────────────────────────

function Risultato({ vincitoreId, onRicomincia }) {
  const f = filosofiQuiz[vincitoreId];
  const [animato, setAnimato] = useState(false);
  const [copiato, setCopiato] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimato(true), 150);
    return () => clearTimeout(t);
  }, []);

  const condividi = async () => {
    const testo = `Sono ${f.emoji} ${f.nome} nel quiz filosofico di Filosofia Applicata!\n"${f.idea}"`
    if (navigator.share) {
      try {
        await navigator.share({ title: "Quiz Filosofico – Filosofia Applicata", text: testo })
      } catch { /* annullato dall'utente */ }
    } else {
      try {
        await navigator.clipboard.writeText(testo)
        setCopiato(true)
        setTimeout(() => setCopiato(false), 2000)
      } catch { /* silent fail */ }
    }
  }

  const statsConfig = [
    { key: "coerenza", label: "Coerenza", tipo: "bar" },
    { key: "influenza", label: "Influenza", tipo: "bar" },
    { key: "opere", label: "N° Opere", tipo: "numero" },
    { key: "chiarezza", label: "Chiarezza", tipo: "bar" },
    { key: "memabilita", label: "Memabilità", tipo: "bar" },
  ];

  return (
    <div className="text-center">
      {/* Badge corrente */}
      <p className={`text-xs tracking-widest uppercase mb-4 ${f.colore}`}>
        {f.corrente}
      </p>

      {/* Emoji + nome */}
      <div className="text-7xl mb-3 leading-none">{f.emoji}</div>
      <p className="text-stone-400 text-xs tracking-widest uppercase mb-1">Sei...</p>
      <h2 className="text-3xl font-black text-stone-100 leading-tight mb-1">{f.nome}</h2>
      <p className="text-stone-500 text-sm mb-8">{f.anni}</p>

      {/* Card statistiche stile gioco da tavolo */}
      <div className={`border ${f.bordo} rounded-2xl p-6 mb-6 text-left bg-black/20`}>
        <p className={`text-xs tracking-widest uppercase mb-5 font-bold ${f.colore}`}>
          Statistiche
        </p>

        {statsConfig.map(({ key, label, tipo }) => (
          <div key={key} className="mb-4">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs text-stone-500 uppercase tracking-widest">{label}</span>
              <span className={`text-sm font-bold tabular-nums ${f.colore}`}>
                {tipo === "numero" ? `${f.stats[key]} opere` : f.stats[key]}
              </span>
            </div>
            {tipo === "bar" && (
              <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${f.bg} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: animato ? `${f.stats[key]}%` : "0%" }}
                />
              </div>
            )}
            {tipo === "numero" && (
              <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${f.bg} opacity-60 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: animato ? `${Math.min(f.stats[key] * 2, 100)}%` : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Descrizione personalizzata */}
      <div className={`border-l-4 ${f.bordo} bg-stone-900/60 rounded-r-xl p-5 mb-8 text-left`}>
        <p className={`italic text-sm mb-3 ${f.colore}`}>"{f.idea}"</p>
        <p className="text-stone-300 leading-relaxed text-sm">{f.desc}</p>
      </div>

      {/* Azioni */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to={`/filosofo/${vincitoreId}`}
          className={`flex-1 py-3 px-5 rounded-xl border ${f.bordo} ${f.colore} font-semibold font-serif text-sm hover:bg-white/5 transition-all duration-200 text-center`}
        >
          Scopri di più →
        </Link>
        <button
          onClick={condividi}
          className="flex-1 py-3 px-5 bg-transparent border border-stone-600 text-stone-400 rounded-xl font-semibold font-serif text-sm hover:border-stone-400 hover:text-stone-200 transition-all duration-200"
        >
          {copiato ? "Copiato ✓" : "Condividi"}
        </button>
        <button
          onClick={onRicomincia}
          className="flex-1 py-3 px-5 bg-transparent border border-stone-600 text-stone-400 rounded-xl font-semibold font-serif text-sm hover:border-stone-400 hover:text-stone-200 transition-all duration-200"
        >
          Ricomincia
        </button>
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPALE ────────────────────────────────────────────────────

export default function Quiz() {
  const [schermata, setSchermata] = useState("intro");
  const [indiceDomanda, setIndiceDomanda] = useState(0);
  const [risposte, setRisposte] = useState({});
  const [punteggi, setPunteggi] = useState({ ...punteggiIniziali });
  const [finito, setFinito] = useState(false);

  const domanda = domande[indiceDomanda];
  const rispostaCorrente = risposte[indiceDomanda];

  const seleziona = (filosofo, indiceRisposta) => {
    // Se c'era già una risposta per questa domanda, sottrai il punto al filosofo precedente
    const nuoviPunteggi = { ...punteggi };
    if (rispostaCorrente !== undefined) {
      const vecchioFilosofo = domande[indiceDomanda].risposte[rispostaCorrente].filosofo;
      nuoviPunteggi[vecchioFilosofo] -= 1;
    }
    nuoviPunteggi[filosofo] += 1;
    setRisposte({ ...risposte, [indiceDomanda]: indiceRisposta });
    setPunteggi(nuoviPunteggi);
  };

  const avanti = () => {
    if (indiceDomanda < domande.length - 1) {
      setIndiceDomanda(indiceDomanda + 1);
    } else {
      setFinito(true);
    }
  };

  const indietro = () => {
    if (indiceDomanda > 0) {
      setIndiceDomanda(indiceDomanda - 1);
    } else {
      setSchermata("intro");
    }
  };

  const ricomincia = () => {
    setIndiceDomanda(0);
    setRisposte({});
    setPunteggi({ ...punteggiIniziali });
    setFinito(false);
    setSchermata("intro");
  };

  // Calcola vincitore solo quando il quiz è finito
  const vincitoreId = finito
    ? Object.entries(punteggi).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  return (
    <div className="min-h-screen bg-green-950 text-stone-100 flex items-center justify-center p-6 font-serif">
      <div className="w-full max-w-lg">

        {/* ── SCHERMATA INTRO ── */}
        {schermata === "intro" && (
          <div className="text-center">
            <p className="text-yellow-200 text-xs tracking-widest uppercase mb-3">
              Quiz filosofico
            </p>
            <h1 className="text-5xl text-[#f5efbb] font-black mb-2">Filosofia</h1>
            <h2 className="text-5xl font-black text-orange-700 mb-6">Applicata</h2>
            <p className="text-stone-400 mb-3 text-sm max-w-xs mx-auto">
              10 domande per scoprire a quale dei 13 grandi pensatori ti avvicini di più.
            </p>
            <p className="text-stone-600 text-xs mb-10">
              Nessuna risposta giusta. Solo scelte rivelatrici.
            </p>
            <button
              onClick={() => setSchermata("quiz")}
              className="px-10 py-4 bg-yellow-500 text-zinc-900 rounded-xl font-black text-base hover:bg-yellow-400 transition-all duration-200 font-serif"
            >
              Inizia →
            </button>
          </div>
        )}

        {/* ── SCHERMATA QUIZ ── */}
        {schermata === "quiz" && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-yellow-200 text-xs tracking-widest uppercase mb-1">
                Quiz filosofico
              </p>
              <h1 className="text-2xl font-black text-stone-100">Quale filosofo sei?</h1>
            </div>

            {finito ? (
              <Risultato
                punteggi={punteggi}
                vincitoreId={vincitoreId}
                onRicomincia={ricomincia}
              />
            ) : (
              <div>
                {/* Barra progresso */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-stone-400">
                      Domanda {indiceDomanda + 1} di {domande.length}
                    </span>
                    <span className="text-xs text-amber-400">
                      {Math.round((indiceDomanda / domande.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1 bg-stone-800 rounded-full">
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${(indiceDomanda / domande.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Domanda */}
                <h2 className="text-stone-100 text-xl font-bold mb-6 leading-snug">
                  {domanda.testo}
                </h2>

                {/* Risposte */}
                {domanda.risposte.map((r, i) => (
                  <Risposta
                    key={i}
                    testo={r.testo}
                    selezionata={rispostaCorrente === i}
                    onClick={() => seleziona(r.filosofo, i)}
                  />
                ))}

                {/* Navigazione */}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={indietro}
                    className="py-4 w-full px-6 rounded-xl border border-stone-700 text-stone-400 font-bold font-serif hover:border-stone-500 hover:text-stone-200 transition-all duration-200"
                  >
                    ← Indietro
                  </button>
                  <button
                    onClick={avanti}
                    disabled={rispostaCorrente === undefined}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 font-serif
                      ${rispostaCorrente !== undefined
                        ? "bg-orange-800 text-stone-200 cursor-pointer hover:bg-orange-700"
                        : "bg-transparent border border-stone-700 text-stone-600 cursor-not-allowed"
                      }`}
                  >
                    {indiceDomanda < domande.length - 1 ? "Avanti →" : "Scopri il risultato →"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
