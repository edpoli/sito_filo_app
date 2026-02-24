import { useState } from 'react'
import { Link } from 'react-router-dom'
import { termini } from '../data/Lessico'

const categorie = ["Tutte", ...new Set(termini.map(t => t.categoria))]

export default function Lessico() {
    const [filtro, setFiltro] = useState("Tutte")

    const terminiFiltrati = filtro === "Tutte"
        ? termini
        : termini.filter(t => t.categoria === filtro)

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="text-center mb-10">
                <p className="text-xs tracking-widest text-stone-500 uppercase mb-3">Filosofia Applicata</p>
                <h1 className="text-3xl font-bold text-stone-100 mb-3 tracking-wide">
                    Lessico <span className="text-amber-500">Filosofico</span>
                </h1>
                <div className="w-12 h-px bg-stone-700 mx-auto mb-4" />
                <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
                    I concetti fondamentali. Seleziona un termine per esplorarne definizione, uso e storia.
                </p>
            </div>

            {/* Filtro categorie */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categorie.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFiltro(cat)}
                        className={`text-xs px-3 py-1.5 rounded border transition-colors cursor-pointer ${filtro === cat
                            ? "border-amber-500 text-amber-500 bg-amber-500/10"
                            : "border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Griglia card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {terminiFiltrati.map((t) => (
                    <Link
                        key={t.id}
                        to={`/lessico/${t.id}`}
                        className={`group flex flex-col p-5 bg-stone-900 border ${t.colore.split(" ")[0]} rounded-lg hover:bg-stone-800/70 transition-all duration-200`}
                    >
                        {/* Nome termine */}
                        <div className={`font-semibold text-sm text-stone-100 group-hover:${t.colore.split(" ")[1]} transition-colors mb-3`}>
                            {t.termine}
                        </div>

                        {/* Categoria */}
                        <div className={`text-xs px-2 py-0.5 border rounded ${t.colore} self-start mb-3 tracking-wide`}>
                            {t.categoria}
                        </div>

                        {/* Preview definizione */}
                        <p className="text-stone-500 text-xs italic leading-relaxed flex-1">
                            {t.definizione.slice(0, 120)}{t.definizione.length > 120 ? "…" : ""}
                        </p>

                        {/* Autori */}
                        <div className="flex flex-wrap gap-1 mt-3">
                            {t.autori.map((a) => (
                                <span key={a} className="text-xs bg-stone-800 text-stone-500 px-2 py-0.5 rounded border border-stone-700">
                                    {a.charAt(0).toUpperCase() + a.slice(1)}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}
