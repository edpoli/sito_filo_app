import { useState } from 'react'
import { Link } from 'react-router-dom'
import { termini } from '../data/Lessico'

const categorie = ["Tutte", ...new Set(termini.map(t => t.categoria))]

export default function Lessico() {
    const [filtro, setFiltro] = useState("Tutte")
    const [ricerca, setRicerca] = useState('')

    const terminiFiltrati = termini
        .filter(t => filtro === "Tutte" || t.categoria === filtro)
        .filter(t => {
            if (!ricerca.trim()) return true
            const q = ricerca.toLowerCase()
            return (
                t.termine.toLowerCase().includes(q) ||
                t.categoria.toLowerCase().includes(q) ||
                t.definizione.toLowerCase().includes(q) ||
                t.autori.some(a => a.toLowerCase().includes(q))
            )
        })

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="text-center mb-10">
                <p className="text-xs tracking-widest text-stone-500 uppercase mb-3">Filosofia Applicata</p>
                <h1 className="text-3xl font-bold text-stone-900 mb-3 tracking-wide">
                    <span className="text-[#d97757]"> Parole </span>  <span className='text-stone-900 dark:text-stone-100' > e </span> <span className="text-[#d97757]">Concetti</span>
                </h1>
                <div className="w-12 h-px bg-stone-300 mx-auto mb-4" />
                <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
                    I concetti fondamentali. Seleziona un termine per esplorarne definizione, uso e storia.
                </p>
            </div>

            {/* Barra di ricerca */}
            <div className="relative max-w-sm mx-auto mb-6">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-sm">🔍</span>
                <input
                    type="text"
                    value={ricerca}
                    onChange={e => setRicerca(e.target.value)}
                    placeholder="Cerca termine, autore, definizione…"
                    className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#d97757] transition-colors"
                />
                {ricerca && (
                    <button
                        onClick={() => setRicerca('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs cursor-pointer"
                    >
                        ✕
                    </button>
                )}
            </div>

            {ricerca && (
                <p className="text-center text-xs text-stone-400 mb-4">
                    {terminiFiltrati.length === 0
                        ? 'Nessun risultato trovato'
                        : `${terminiFiltrati.length} risultat${terminiFiltrati.length === 1 ? 'o' : 'i'}`}
                </p>
            )}

            {/* Filtro categorie */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categorie.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFiltro(cat)}
                        className={`text-xs px-3 py-1.5 rounded border transition-colors cursor-pointer ${filtro === cat
                            ? "border-[#d97757] text-[#d97757] bg-[#d97757]/10"
                            : "border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700"
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
                        className={`group flex flex-col p-5 bg-white dark:bg-stone-900 shadow-sm border ${t.colore.split(" ")[0]} rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-200 scale-90 hover:scale-100`}
                    >
                        {/* Nome termine */}
                        <div className={`font-semibold text-sm text-stone-900 dark:text-stone-200  group-hover:${t.colore.split(" ")[1]} transition-colors mb-3`}>
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
                                <span key={a} className="text-xs bg-stone-100 dark:bg-black text-stone-500 dark:text-stone-500 px-2 py-0.5 rounded border border-stone-200">
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
