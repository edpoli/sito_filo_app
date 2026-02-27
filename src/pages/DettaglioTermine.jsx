import { useParams, useNavigate, Link } from 'react-router-dom'
import { termini } from '../data/Lessico'
import { filosofi } from '../data/Filosofi'

export default function DettaglioTermine() {
    const { id } = useParams()
    const navigate = useNavigate()

    const t = termini.find(termine => termine.id === id)

    if (!t) {
        return (
            <div className="text-center py-20">
                <p className="text-stone-400">Termine non trovato.</p>
                <Link to="/lessico" className="text-[#d97757] underline mt-4 block">Torna al lessico</Link>
            </div>
        )
    }

    const autoriCollegati = t.autori
        .map(aid => filosofi.find(f => f.id === aid))
        .filter(Boolean)

    const stessaCategoria = termini.filter(term => term.id !== id && term.categoria === t.categoria)

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">

            {/* Bottone indietro */}
            <button
                onClick={() => navigate(-1)}
                className="text-stone-500 hover:text-[#d97757] transition-colors mb-8 text-sm flex items-center gap-2"
            >
                ← Indietro
            </button>

            {/* Header */}
            <div className={`border-l-4 ${t.colore.split(" ")[0]} pl-5 mb-8`}>
                <div className={`text-xs tracking-widest uppercase mb-2 ${t.colore.split(" ")[1]}`}>
                    {t.categoria}
                </div>
                <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-1">{t.termine}</h1>
            </div>

            {/* Definizione */}
            <div className="mb-8">
                <h2 className="text-xs tracking-widest text-stone-500 uppercase mb-3">Definizione</h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm">{t.definizione}</p>
            </div>

            {/* Uso */}
            <div className="mb-8">
                <h2 className="text-xs tracking-widest text-stone-500 uppercase mb-3">Uso</h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm">{t.uso}</p>
            </div>

            {/* Storia */}
            <div className="mb-8">
                <h2 className="text-xs tracking-widest text-stone-500 uppercase mb-3">Storia</h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm">{t.storia}</p>
            </div>

            {/* Autori collegati */}
            {autoriCollegati.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs tracking-widest text-stone-500 uppercase mb-4">
                        Autori che usano questo concetto
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {autoriCollegati.map(f => (
                            <Link
                                key={f.id}
                                to={`/filosofo/${f.id}`}
                                className={`flex items-center gap-3 px-4 py-3 bg-white dark:bg-stone-900 border ${f.colore.split(" ")[0]} rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group`}
                            >
                                <span className="text-xl leading-none">{f.emoji}</span>
                                <div>
                                    <div className={`text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:${f.colore.split(" ")[1]} transition-colors`}>
                                        {f.nome}
                                    </div>
                                    <div className="text-xs text-stone-400">{f.anni}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Termini della stessa categoria */}
            <div className="mt-10 pt-8 border-t border-stone-200 dark:border-stone-800 space-y-5">
                {stessaCategoria.length > 0 && (
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">
                            Altri termini — {t.categoria}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {stessaCategoria.map(term => (
                                <Link
                                    key={term.id}
                                    to={`/lessico/${term.id}`}
                                    className={`text-xs px-3 py-1.5 rounded-full border ${term.colore} hover:opacity-70 transition-opacity`}
                                >
                                    {term.termine} →
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <Link
                    to="/lessico"
                    className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-[#d97757] transition-colors"
                >
                    ← Torna al vocabolario
                </Link>
            </div>

        </div>
    )
}
