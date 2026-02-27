import { useState } from 'react'
import { Link } from 'react-router-dom'
import { filosofi } from '../data/Filosofi'

export default function Galleria() {
    const [ricerca, setRicerca] = useState('')

    const filosofiFiltrati = ricerca.trim() === ''
        ? filosofi
        : filosofi.filter(f => {
            const q = ricerca.toLowerCase()
            return (
                f.nome.toLowerCase().includes(q) ||
                f.corrente.toLowerCase().includes(q) ||
                f.citazione.toLowerCase().includes(q) ||
                f.concetti.some(c => c.toLowerCase().includes(q))
            )
        })

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="text-center mb-12">
                <p className="text-xs tracking-widest text-stone-500 uppercase mb-3">Filosofia Applicata</p>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-wide">
                    Galleria <span className="text-[#d97757]">Filosofica</span>
                </h1>
                <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto mb-4" />
                <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
                    Guardare il mondo da diverse prospettive. Seleziona un pensatore per esplorarne vita, opere e concetti fondamentali.
                </p>
            </div>

            {/* Barra di ricerca */}
            <div className="relative max-w-sm mx-auto mb-8">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-sm">🔍</span>
                <input
                    type="text"
                    value={ricerca}
                    onChange={e => setRicerca(e.target.value)}
                    placeholder="Cerca filosofo, corrente, concetto…"
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
                <p className="text-center text-xs text-stone-400 mb-6">
                    {filosofiFiltrati.length === 0
                        ? 'Nessun risultato trovato'
                        : `${filosofiFiltrati.length} risultat${filosofiFiltrati.length === 1 ? 'o' : 'i'}`}
                </p>
            )}

            {/* Griglia card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filosofiFiltrati.map((f) => (
                    <Link
                        key={f.id}
                        to={`/filosofo/${f.id}`}
                        className={`group flex flex-col p-5 bg-stone-100 dark:bg-stone-900 border ${f.colore.split(" ")[0]} rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-all duration-200 shadow-lg shadow-stone-300/60 dark:shadow-xl dark:shadow-black/50 scale-90 hover:scale-100`}
                    >
                        {/* Emoji + nome */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl leading-none">{f.emoji}</span>
                            <div>
                                <div className={`font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:${f.colore.split(" ")[1]} transition-colors`}>
                                    {f.nome}
                                </div>
                                <div className="text-stone-600 dark:text-stone-400 text-xs">{f.anni}</div>
                            </div>
                        </div>

                        {/* Corrente */}
                        <div className={`text-xs px-2 py-0.5 border rounded ${f.colore} self-start mb-3 tracking-wide`}>
                            {f.corrente}
                        </div>

                        {/* Citazione */}
                        <p className="text-stone-500 text-xs italic leading-relaxed flex-1">
                            "{f.citazione}"
                        </p>

                        {/* Concetti */}
                        <div className="flex flex-wrap gap-1 mt-3">
                            {f.concetti.slice(0, 2).map((c) => (
                                <span key={c} className="text-xs bg-stone-200 dark:bg-stone-800 text-stone-500 px-2 py-0.5 rounded border border-stone-400 dark:border-stone-700">
                                    {c}
                                </span>
                            ))}
                            {f.concetti.length > 2 && (
                                <span className="text-xs text-stone-400">+{f.concetti.length - 2}</span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}
