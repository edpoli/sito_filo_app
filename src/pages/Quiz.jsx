import { useState } from 'react'


const domande = [{
    id: 1,
    testo: "Se ti dicono 'mondo', tu pensi...?",
    risposte: [
        { testo: "C'è un mondo sensibile e uno sovrasensibile", filosofo: "platone" },
        { testo: "C'è un solo mondo, questo!", filosofo: "nietzsche" },
        { testo: "Il mondo è un'illusione", filosofo: "schopenhauer" }
    ]
},

{
    id: 2,
    testo: "Che rapporto hai con il tempo?",
    risposte: [
        { testo: "Buono, tanto è l'immagine mobile dell'eternità", filosofo: "platone" },
        { testo: "Sempre uguale!", filosofo: "nietzsche" },
        { testo: "Il tempo è ciò che mi limita ", filosofo: "schopenhauer" }
    ]
},

{
    id: 3,
    testo: "Quando ti parlano d'arte come reagisci?",
    risposte: [
        { testo: "L'arte andrebbe bandita!", filosofo: "platone" },
        { testo: "Non c'è niente di meglio", filosofo: "nietzsche" },
        { testo: "Mi darebbe un sollievo momentaneo dalla noia e dal dolore", filosofo: "schopenhauer" }
    ]
},

{
    id: 4,
    testo: "Come ti descriveresti?",
    risposte: [
        { testo: "Un filosofo vero", filosofo: "platone" },
        { testo: "Una persona esplosiva", filosofo: "nietzsche" },
        { testo: "Un po' pessimista", filosofo: "schopenhauer" }
    ]
},

{
    id: 5,
    testo: "Se son d'umore nero allora scrivo...?",
    risposte: [
        { testo: "Dialoghi", filosofo: "platone" },
        { testo: "Aforismi", filosofo: "nietzsche" },
        { testo: "Saggi", filosofo: "schopenhauer" }
    ]
},


]

const filosofi = {
    platone: {
        nome: "Platone",
        anni: "428–348 a.C.",
        emoji: "🏛️",
        idea: "La realtà è solo un’ombra della verità ",
        desc: "Sei orientato verso l’ideale. Cerchi coerenza, verità e significati profondi anche nelle situazioni più quotidiane. Hai una naturale inclinazione a guardare “oltre le apparenze” e a interrogarti su ciò che è giusto in senso assoluto. Talvolta rischi di essere un po’ troppo esigente con la realtà — che, come sai, è solo una copia imperfetta.",
        colore: "text-sky-400",
        bordo: "border-sky-400",
        bg: "bg-sky-400",
    },
    nietzsche: {
        nome: " Friedrich Nietzsche",
        anni: "1844–1900",
        emoji: "💣",
        idea: "Diventa ciò che sei",
        desc: "Spirito critico e indipendente, non accetti valori preconfezionati. Ti distingui per energia, determinazione e una certa intensità di pensiero. Ami mettere in discussione ciò che gli altri danno per scontato. Attenzione solo a non trasformare ogni discussione in una rivoluzione personale.",
        colore: "text-yellow-200",
        bordo: "border-yellow-400",
        bg: "bg-yellow-400",
    },

    schopenhauer: {
        nome: "Arthur Schopenhauer",
        anni: "1788–1860 d.C.",
        emoji: "🕰️",
        idea: "La vita oscilla come un pendolo tra il dolore e la noia.",
        desc: "Lucido osservatore della natura umana, possiedi una sensibilità profonda e una vena riflessiva. Comprendi i limiti e le contraddizioni dell’esistenza, ma sai anche apprezzare i momenti di quiete e contemplazione. Il tuo realismo può sembrare severo, ma nasconde grande consapevolezza.",
        colore: "text-violet-200",
        bordo: "border-violet-900",
        bg: "bg-violet-900",
    },
};

// --- COMPONENTE: singola risposta ---
function Risposta({ testo, onClick, selezionata }) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-5 py-4 mb-3 rounded-xl border transition-all duration-200 font-serif text-base cursor-pointer
        ${selezionata
                    ? "border-yellow-500 bg-amber-700 text-slate-100"
                    : "border-zinc-700 bg-transparent text-stone-300 hover:border-zinc-500"
                }`}
        >
            {selezionata ? "▶ " : "○ "}{testo}
        </button>
    );
}

// --- COMPONENTE: risultato finale ---
function Risultato({ punteggi, onRicomincia }) {
    const vincitore = Object.entries(punteggi).sort((a, b) => b[1] - a[1])[0][0];
    const f = filosofi[vincitore];

    return (
        <div className="text-center">
            <div className="text-6xl mb-4">{f.emoji}</div>
            <p className={`text-xs tracking-widest uppercase mb-2 ${f.colore}`}>Sei...</p>
            <h2 className="text-4xl font-black text-stone-100 mb-1">{f.nome}</h2>
            <p className="text-amber-400 mb-6">{f.anni}</p>

            <div className={`bg-indigo-950 border-l-4 ${f.bordo} rounded-xl p-5 mb-8 text-left`}>
                <p className={`italic text-sm mb-3 ${f.colore}`}>"{f.idea}"</p>
                <p className="text-slate-300 leading-relaxed text-sm">{f.desc}</p>
            </div>

            <button
                onClick={onRicomincia}
                className="px-8 py-3 bg-transparent border border-yellow-500 text-yellow-500 rounded-lg font-bold font-serif hover:bg-yellow-500 hover:text-zinc-900 transition-all duration-200"
            >
                Ricomincia
            </button>
        </div>
    );
}

// --- COMPONENTE PRINCIPALE ---
export default function Quiz() {
    const [schermata, setSchermata] = useState("intro");
    const [indiceDomanda, setIndiceDomanda] = useState(0);
    const [risposte, setRisposte] = useState({});
    const [punteggi, setPunteggi] = useState({ platone: 0, nietzsche: 0, schopenhauer: 0 });
    const [finito, setFinito] = useState(false);


    const domanda = domande[indiceDomanda];
    const rispostaCorrente = risposte[indiceDomanda];

    const seleziona = (filosofo, i) => {
        setRisposte({ ...risposte, [indiceDomanda]: i });
        setPunteggi({ ...punteggi, [filosofo]: punteggi[filosofo] + 1 });
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
            setSchermata('intro');
        }
    };

    const ricomincia = () => {
        setIndiceDomanda(0);
        setRisposte({});
        setPunteggi({ platone: 0, nietzsche: 0, schopenhauer: 0 });
        setFinito(false);
        setSchermata("intro");
    };

    return (


        <div className="min-h-screen bg-green-950 dark:bg-green-950 text-zinc-600 dark:text-stone-100 flex items-center justify-center p-8 font-serif">
            <div className="w-full max-w-lg">



                {schermata === "intro" ? (
                    // SCHERMATA INIZIALE
                    <div className="text-center">
                        <p className="text-yellow-600 dark:text-yellow-200 text-xs tracking-widest uppercase mb-2">Quiz filosofico</p>
                        <h1 className="text-5xl text-[#f5efbb] font-black mb-2">Filosofia</h1>
                        <h2 className="text-5xl font-black dark:text-orange-700 text-orange-700 mb-8">Applicata</h2>
                        <p className="text-stone-400 dark:text-stone-400 mb-10 text-sm">Scopri a quale grande filosofo ti avvicini di più</p>
                        <button
                            onClick={() => setSchermata("quiz")}
                            className="px-10 py-4 bg-yellow-500 dark:text-zinc-900 text-zinc-900 rounded-xl font-black text-base hover:bg-yellow-400 transition-all duration-200 font-serif"
                        >
                            Inizia →
                        </button>
                    </div>

                ) : (
                    <>
                        {/* HEADER */}
                        <div className="text-center mb-10">
                            <p className="text-yellow-200 dark:text-yellow-200 text-xs tracking-widest uppercase mb-2">Quiz filosofico</p>
                            <h1 className="text-3xl font-black text-slate-100  dark:text-stone-100">Quale filosofo sei?</h1>
                        </div>

                        {/* QUIZ o RISULTATO */}
                        {finito ? (
                            <Risultato punteggi={punteggi} onRicomincia={ricomincia} />
                        ) : (
                            <div>
                                {/* Barra progresso */}
                                <div className="mb-8">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs dark:text-slate-600 text-slate-100">Domanda {indiceDomanda + 1} di {domande.length}</span>
                                        <span className="text-xs text-amber-200 dark:text-slate-100">{Math.round((indiceDomanda / domande.length) * 100)}%</span>
                                    </div>
                                    <div className="h-1   bg-zinc-200 rounded-full">
                                        <div
                                            className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                                            style={{ width: `${(indiceDomanda / domande.length) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Domanda */}
                                <h2 className="text-zinc-300 dark:text-stone-100 text-xl font-bold mb-6 leading-snug">{domanda.testo}</h2>

                                {/* Risposte */}
                                {domanda.risposte.map((r, i) => (
                                    <Risposta
                                        key={i}
                                        testo={r.testo}
                                        selezionata={rispostaCorrente === i}
                                        onClick={() => seleziona(r.filosofo, i)}
                                    />
                                ))}

                                {/* Bottone avanti/indietro */}
                                <div className='flex gap-2'>

                                    <button
                                        onClick={indietro}
                                        className="mt-2 py-4 w-full px-6 rounded-xl border border-zinc-400 dark:border-zinc-700 text-amber-200 dark:text-stone-300 font-bold font-serif hover:border-zinc-500 transition-all duration-200"
                                    >
                                        ← Indietro
                                    </button>


                                    <button
                                        onClick={avanti}
                                        disabled={rispostaCorrente === undefined}
                                        className={`mt-2 w-full py-4 rounded-xl font-bold text-base transition-all duration-200 font-serif
                ${rispostaCorrente !== undefined
                                                ? "bg-orange-800 text-slate-200 dark:text-slate-300 cursor-pointer hover:bg-orange-900"
                                                : "bg-transparent border border-zinc-700 text-amber-200 dark:text-slate-200 cursor-not-allowed"
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

