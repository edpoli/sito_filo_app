import { Link } from 'react-router-dom';
import { filosofi } from '../data/Filosofi';
export default function Enciclopedia() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <p className="text-xs tracking-widest text-amber-500 uppercase mb-3">Filosofia Applicata</p>
                <h1 className="text-5xl font-black text-stone-100 mb-4 leading-tight">
                    Enciclopedia<br />
                    <span className="text-amber-500">Filosofica</span>
                </h1>
                <p className="text-stone-400 text-sm leading-relaxed max-w-sm mx-auto">
                    Esplora i grandi filosofi della storia. Clicca su un nome per scoprire vita, opere e concetti.
                </p>
            </div>

            {/* 🔑 CONCETTO: Link al posto di <a href> */}
            <div className="flex flex-col gap-3">
                {filosofi.map((f) => (
                    <Link
                        key={f.id}
                        to={`/filosofo/${f.id}`}
                        className="flex items-center gap-4 p-5 bg-stone-900 border border-stone-800 rounded-xl hover:border-amber-500 transition-all duration-200 group"
                    >
                        <span className="text-3xl">{f.emoji}</span>
                        <div className="flex-1">
                            <div className="font-bold text-stone-100 text-lg group-hover:text-amber-400 transition-colors">{f.nome}</div>
                            <div className="text-stone-500 text-xs mt-1">{f.anni} · {f.corrente}</div>
                        </div>
                        <span className="text-stone-600 group-hover:text-amber-500 transition-colors">→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
