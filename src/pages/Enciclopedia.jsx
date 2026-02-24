import { Link } from 'react-router-dom'
import { filosofi } from '../data/Filosofi'

export default function Enciclopedia() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="text-center mb-12">
                <p className="text-xs tracking-widest text-stone-500 uppercase mb-3">Filosofia Applicata</p>
                <h1 className="text-3xl font-bold text-stone-100 mb-3 tracking-wide">
                    Enciclopedia <span className="text-amber-500">Filosofica</span>
                </h1>
                <div className="w-12 h-px bg-stone-700 mx-auto mb-4" />
                <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
                    Tredici autori, tredici visioni del mondo. Seleziona un pensatore per esplorarne vita, opere e concetti fondamentali.
                </p>
            </div>

            {/* Griglia card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filosofi.map((f) => (
                    <Link
                        key={f.id}
                        to={`/filosofo/${f.id}`}
                        className={`group flex flex-col p-5 bg-stone-900 border ${f.colore.split(" ")[0]} rounded-lg hover:bg-stone-800/70 transition-all duration-200`}
                    >
                        {/* Emoji + nome */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl leading-none">{f.emoji}</span>
                            <div>
                                <div className={`font-semibold text-sm text-stone-100 group-hover:${f.colore.split(" ")[1]} transition-colors`}>
                                    {f.nome}
                                </div>
                                <div className="text-stone-600 text-xs">{f.anni}</div>
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
                                <span key={c} className="text-xs bg-stone-800 text-stone-500 px-2 py-0.5 rounded border border-stone-700">
                                    {c}
                                </span>
                            ))}
                            {f.concetti.length > 2 && (
                                <span className="text-xs text-stone-700">+{f.concetti.length - 2}</span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}
