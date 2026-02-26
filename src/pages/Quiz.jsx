import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { filosofiQuiz } from "../data/FilosofiQuiz";

const punteggiIniziali = {
  derrida: 0, foucault: 0, hegel: 0, heidegger: 0, wittgenstein: 0,
  bodei: 0, deleuze: 0, weil: 0, arendt: 0, husserl: 0, fink: 0, jung: 0, freud: 0,
};

// ─── DOMANDE ─────────────────────────────────────────────────────────────────

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
          ? "border-[#d97757] bg-[#d97757]/10 text-stone-900 dark:text-stone-100"
          : "border-stone-300 dark:border-stone-700 bg-transparent text-stone-700 dark:text-stone-300 hover:border-stone-400 hover:bg-stone-50 dark:hover:border-stone-600 dark:hover:bg-stone-800"
        }`}
    >
      <span className={`mr-3 ${selezionata ? "text-[#d97757]" : "text-stone-400"}`}>
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

  useEffect(() => {
    const t = setTimeout(() => setAnimato(true), 150);
    return () => clearTimeout(t);
  }, []);

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
      <h2 className="text-3xl font-black text-stone-900 dark:text-stone-100 leading-tight mb-1">{f.nome}</h2>
      <p className="text-stone-500 text-sm mb-8">{f.anni}</p>

      {/* Card statistiche */}
      <div className={`border ${f.bordo} rounded-2xl p-6 mb-6 text-left bg-stone-50 dark:bg-stone-800`}>
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
              <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${f.bg} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: animato ? `${f.stats[key]}%` : "0%" }}
                />
              </div>
            )}
            {tipo === "numero" && (
              <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
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
      <div className={`border-l-4 ${f.bordo} bg-stone-50 dark:bg-stone-800 rounded-r-xl p-5 mb-8 text-left`}>
        <p className={`italic text-sm mb-3 ${f.colore}`}>"{f.idea}"</p>
        <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm">{f.desc}</p>
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
          onClick={onRicomincia}
          className="flex-1 py-3 px-5 bg-transparent border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 rounded-xl font-semibold font-serif text-sm hover:border-stone-400 hover:text-stone-700 dark:hover:border-stone-500 dark:hover:text-stone-200 transition-all duration-200"
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

  const vincitoreId = finito
    ? Object.entries(punteggi).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-serif text-stone-900 dark:text-stone-100">
      <div className="w-full max-w-lg">

        {/* ── SCHERMATA INTRO ── */}
        {schermata === "intro" && (
          <div className="text-center">
            <p className="text-[#d97757] text-xs tracking-widest uppercase mb-3">
              Quiz filosofico
            </p>
            <h1 className="text-5xl text-stone-900 dark:text-stone-100 font-black mb-2">Filosofia</h1>
            <h2 className="text-5xl font-black text-[#d97757] mb-6">Applicata</h2>
            <p className="text-stone-500 mb-3 text-sm max-w-xs mx-auto">
              10 domande per scoprire a quale dei 13 grandi pensatori ti avvicini di più.
            </p>
            <p className="text-stone-400 text-xs mb-10">
              Nessuna risposta giusta. Solo scelte rivelatrici.
            </p>
            <button
              onClick={() => setSchermata("quiz")}
              className="px-10 py-4 bg-[#d97757] text-white rounded-xl font-black text-base hover:bg-[#c86843] transition-all duration-200 font-serif"
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
              <p className="text-[#d97757] text-xs tracking-widest uppercase mb-1">
                Quiz filosofico
              </p>
              <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100">Quale filosofo sei?</h1>
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
                    <span className="text-xs text-[#d97757]">
                      {Math.round((indiceDomanda / domande.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1 bg-stone-200 dark:bg-stone-700 rounded-full">
                    <div
                      className="h-full bg-[#d97757] rounded-full transition-all duration-500"
                      style={{ width: `${(indiceDomanda / domande.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Domanda */}
                <h2 className="text-stone-900 dark:text-stone-100 text-xl font-bold mb-6 leading-snug">
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
                    className="py-4 w-full px-6 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 font-bold font-serif hover:border-stone-400 hover:text-stone-700 dark:hover:border-stone-500 dark:hover:text-stone-200 transition-all duration-200"
                  >
                    ← Indietro
                  </button>
                  <button
                    onClick={avanti}
                    disabled={rispostaCorrente === undefined}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 font-serif
                      ${rispostaCorrente !== undefined
                        ? "bg-[#d97757] text-white cursor-pointer hover:bg-[#c86843]"
                        : "bg-transparent border border-stone-200 dark:border-stone-700 text-stone-300 dark:text-stone-600 cursor-not-allowed"
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
