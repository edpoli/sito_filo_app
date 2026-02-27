import { useParams, useNavigate, Link } from 'react-router-dom'
import { filosofi } from '../data/Filosofi'

const lessicoMap = {
    "Decostruzione": "decostruzione",
    "Différance": "differance",
    "Logocentrismo": "logocentrismo",
    "Biopotere": "biopotere",
    "Episteme": "episteme",
    "Panopticon": "panopticon",
    "Dialettica": "dialettica",
    "Spirito Assoluto": "spirito-assoluto",
    "Aufhebung": "aufhebung",
    "Geist": "spirito-assoluto",
    "Esserci (Dasein)": "dasein",
    "Cura": "cura",
    "Giochi linguistici": "giochi-linguistici",
    "Rizoma": "rizoma",
    "Divenire": "divenire",
    "Piano di immanenza": "piano-di-immanenza",
    "Corpo senza organi": "corpo-senza-organi",
    "Sradicamento": "sradicamento",
    "Banalità del male": "banalita-del-male",
    "Vita activa": "vita-activa",
    "Intenzionalità": "intenzionalita",
    "Epoché": "epoche",
    "Mondo della vita": "mondo-della-vita",
    "Gioco cosmologico": "gioco-cosmologico",
    "Inconscio collettivo": "inconscio-collettivo",
    "Individuazione": "individuazione",
    "Es, Io, Super-io": "es-io-superio",
    "Dialettica materialista": "dialettica-materialista",
    "Alienazione": "alienazione",
    "Volontà di potenza": "volonta-di-potenza",
    "Oltreuomo": "oltreuomo",
    "Eterno ritorno": "eterno-ritorno",
    "Nichilismo": "nichilismo",
    "Homo sacer": "homo-sacer",
    "Stato di eccezione": "stato-di-eccezione",
    "Simulacri": "simulacri",
    "Metaforologia": "metaforologia",
    "Performatività di genere": "performativita-di-genere",
    "Singolarità plurale": "singolarita-plurale",
    "Immunitas": "immunitas",
    "Società della stanchezza": "societa-della-stanchezza",
    "Cyborg": "cyborg",
    "Ironia": "ironia",
    "Volto": "volto-dell-altro",
    "Cura dell'anima": "cura-dell-anima",
}

export default function DettaglioFilosofo() {
    // 🔑 CONCETTO: useParams legge l'ID dall'URL
    // Se l'URL è /filosofo/platone → id = "platone"
    const { id } = useParams();

    // 🔑 CONCETTO: useNavigate per tornare indietro via codice
    const navigate = useNavigate();

    // Cerca il filosofo nell'array usando l'id dall'URL
    const f = filosofi.find((fil) => fil.id === id);

    // 🔑 CONCETTO: rendering condizionale — se non esiste mostra 404
    if (!f) {
        return (
            <div className="text-center py-20">
                <p className="text-stone-400">Filosofo non trovato.</p>
                <Link to="/" className="text-[#d97757] underline mt-4 block">Torna alla home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">

            {/* Bottone indietro — useNavigate(-1) = torna alla pagina precedente */}
            <button
                onClick={() => navigate(-1)}
                className="text-stone-500 hover:text-[#d97757] transition-colors mb-8 text-sm flex items-center gap-2"
            >
                ← Indietro
            </button>

            {/* Header */}
            <div className={`border-l-4 ${f.colore.split(" ")[0]} pl-5 mb-8`}>
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h1 className="text-4xl font-black text-stone-900 dark:text-stone-100 mb-1">{f.nome}</h1>
                <p className="text-stone-500 text-sm">{f.anni} · {f.corrente}</p>
            </div>

            {/* Citazione */}
            <div className="bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl p-5 mb-6 shadow-lg shadow-stone-300/60 dark:shadow-xl dark:shadow-black/50">
                <p className={`italic text-sm ${f.colore.split(" ")[1]}`}>"{f.citazione}"</p>
            </div>

            {/* Bio */}
            <div className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm mb-8 space-y-4">
                {f.bio.split('\n\n').map((paragrafo, i) => (
                    <p key={i}>{paragrafo}</p>
                ))}
            </div>

            {/* Opere */}
            <div className="mb-6">
                <h2 className="text-xs tracking-widest text-stone-500 uppercase mb-3">Opere principali</h2>
                <div className="flex flex-wrap gap-2">
                    {f.opere.map((o) => (
                        <span key={o} className="text-xs bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-3 py-1.5 rounded-full border border-stone-400 dark:border-stone-700">
                            {o}
                        </span>
                    ))}
                </div>
            </div>

            {/* Concetti */}
            <div>
                <h2 className="text-xs tracking-widest text-stone-500 uppercase mb-3">Concetti chiave</h2>
                <div className="flex flex-wrap gap-2">
                    {f.concetti.map((c) => {
                        const lessicoId = lessicoMap[c]
                        return lessicoId ? (
                            <Link
                                key={c}
                                to={`/lessico/${lessicoId}`}
                                className={`text-xs px-3 py-1.5 rounded-full border ${f.colore} hover:opacity-70 transition-opacity`}
                            >
                                {c} →
                            </Link>
                        ) : (
                            <span key={c} className={`text-xs px-3 py-1.5 rounded-full border ${f.colore} opacity-60`}>
                                {c}
                            </span>
                        )
                    })}
                </div>
            </div>

            {/* Link agli altri filosofi */}
            <div className="mt-10 pt-8 border-t border-stone-400 dark:border-stone-800">
                <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest mb-4">Altri filosofi</p>
                <div className="flex flex-wrap gap-2">
                    {filosofi
                        .filter((fil) => fil.id !== id)
                        .map((fil) => (
                            <Link
                                key={fil.id}
                                to={`/filosofo/${fil.id}`}
                                className="text-sm text-stone-500 hover:text-[#d97757] transition-colors"
                            >
                                {fil.nome} →
                            </Link>
                        ))}
                </div>
            </div>

        </div>
    );
}
