import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { termini } from '../data/Lessico'

const categorie = ["Tutte", ...new Set(termini.map(t => t.categoria))]

export default function Lessico() {
    const [filtro, setFiltro] = useState("Tutte")
    const [ricerca, setRicerca] = useState('')
    const [lettereAperte, setLettereAperte] = useState(new Set())

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

    // Raggruppa per prima lettera
    const gruppiPerLettera = useMemo(() => {
        const map = {}
        terminiFiltrati.forEach(t => {
            const lettera = t.termine[0].toUpperCase()
            if (!map[lettera]) map[lettera] = []
            map[lettera].push(t)
        })
        return map
    }, [terminiFiltrati])

    const lettereDisponibili = Object.keys(gruppiPerLettera).sort()

    // Se c'è una ricerca attiva o un filtro, apri tutto automaticamente
    const attivaFiltro = ricerca.trim() || filtro !== "Tutte"

    function toggleLettera(lettera) {
        setLettereAperte(prev => {
            const next = new Set(prev)
            if (next.has(lettera)) next.delete(lettera)
            else next.add(lettera)
            return next
        })
    }

    function isAperta(lettera) {
        return attivaFiltro || lettereAperte.has(lettera)
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="text-center mb-10">
                <p className="text-xs tracking-widest text-stone-500 uppercase mb-3">Filosofia Applicata</p>
                <h1 className="text-3xl font-bold text-stone-900 mb-3 tracking-wide">
                    <span className="text-[#d97757]"> Parole </span><span className='text-stone-900 dark:text-stone-100'>e</span><span className="text-[#d97757]"> Concetti</span>
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

            {/* Navigazione rapida lettere */}
            {!attivaFiltro && (
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => {
                        const haTermini = !!gruppiPerLettera[l]
                        return (
                            <button
                                key={l}
                                onClick={() => haTermini && toggleLettera(l)}
                                title={haTermini ? undefined : '0 termini'}
                                className={`w-7 h-7 text-xs font-semibold rounded transition-colors ${haTermini
                                    ? isAperta(l)
                                        ? 'bg-[#d97757] text-white border border-[#d97757] cursor-pointer'
                                        : 'bg-white dark:bg-stone-900 text-stone-500 border border-stone-300 hover:border-[#d97757] hover:text-[#d97757] cursor-pointer'
                                    : 'bg-stone-50 dark:bg-stone-900 text-stone-300 dark:text-stone-700 border border-stone-200 dark:border-stone-800 cursor-default'
                                }`}
                            >
                                {l}
                            </button>
                        )
                    })}
                </div>
            )}

            {/* Accordion per lettera */}
            <div className="space-y-2">
                {lettereDisponibili.map(lettera => {
                    const voci = gruppiPerLettera[lettera]
                    const aperta = isAperta(lettera)
                    return (
                        <div key={lettera} className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
                            {/* Header lettera */}
                            <button
                                onClick={() => toggleLettera(lettera)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-[#d97757] w-6 text-left">{lettera}</span>
                                    <span className="text-xs text-stone-400">{voci.length} {voci.length === 1 ? 'termine' : 'termini'}</span>
                                </div>
                                <span className={`text-stone-400 text-xs transition-transform duration-200 ${aperta ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {/* Lista termini */}
                            {aperta && (
                                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                                    {voci.map(t => (
                                        <Link
                                            key={t.id}
                                            to={`/lessico/${t.id}`}
                                            className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-stone-950 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors group"
                                        >
                                            {/* Bordo colore a sinistra */}
                                            <div className={`w-1 h-8 rounded-full shrink-0 ${t.colore.split(' ')[0].replace('border-', 'bg-')}`} />

                                            {/* Nome + categoria */}
                                            <div className="flex-1 min-w-0">
                                                <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-[#d97757] transition-colors">
                                                    {t.termine}
                                                </span>
                                                <span className={`ml-2 text-xs px-1.5 py-0.5 border rounded ${t.colore}`}>
                                                    {t.categoria}
                                                </span>
                                            </div>

                                            {/* Preview definizione */}
                                            <p className="hidden sm:block text-xs text-stone-400 italic truncate max-w-xs">
                                                {t.definizione.slice(0, 80)}{t.definizione.length > 80 ? '…' : ''}
                                            </p>

                                            {/* Autori */}
                                            <div className="hidden md:flex gap-1 shrink-0">
                                                {t.autori.slice(0, 2).map(a => (
                                                    <span key={a} className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 px-1.5 py-0.5 rounded">
                                                        {a.charAt(0).toUpperCase() + a.slice(1)}
                                                    </span>
                                                ))}
                                                {t.autori.length > 2 && (
                                                    <span className="text-xs text-stone-400">+{t.autori.length - 2}</span>
                                                )}
                                            </div>

                                            <span className="text-stone-300 dark:text-stone-600 text-xs shrink-0">→</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {terminiFiltrati.length === 0 && (
                <p className="text-center text-stone-400 text-sm py-10">Nessun termine trovato.</p>
            )}

        </div>
    )
}
