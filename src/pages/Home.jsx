import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="min-h-screen bg-green-950 text-stone-100 flex items-center justify-center p-8 font-serif">
            <div className="w-full max-w-lg text-center">

                <p className="text-yellow-600 text-xs tracking-widest uppercase mb-5">
                    Benvenuto su
                </p>
                <h1 className="text-5xl text-slate-100 font-black mb-2">Filosofia</h1>
                <h2 className="text-5xl font-black text-orange-700 mb-8">Applicata</h2>
                <p className="text-stone-400 mb-12 text-sm leading-relaxed">
                    Esplora i grandi filosofi della storia, scopri a quale ti avvicini di più e leggi le loro citazioni.
                </p>

                {/* Link alle tre sezioni */}
                <div className="flex flex-col gap-3">
                    <Link
                        to="/enciclopedia"
                        className="px-8 py-4 bg-yellow-500 text-zinc-900 rounded-xl font-black text-base hover:bg-yellow-400 transition-all duration-200"
                    >
                        🏛️ Enciclopedia Filosofica
                    </Link>
                    <Link
                        to="/lessico"
                        className="px-8 py-4 bg-transparent border border-amber-500 text-amber-400 rounded-xl font-black text-base hover:bg-amber-500 hover:text-zinc-900 transition-all duration-200"
                    >
                        💡 Parole e concetti
                    </Link>
                    <Link
                        to="/mappa"
                        className="px-8 py-4 bg-transparent border border-stone-600 text-stone-400 rounded-xl font-black text-base hover:border-stone-400 hover:text-stone-200 transition-all duration-200"
                    >
                        🔗 Mappa delle connessioni
                    </Link>
                </div>

            </div>
        </div>
    )
}