import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TESTO = "Filosofia Applicata"

export default function Home() {
    const [visibile, setVisibile] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibile(v => {
                if (v >= TESTO.length) { clearInterval(interval); return v }
                return v + 1
            })
        }, 80)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center p-8 font-serif">
            <div className="w-full max-w-lg text-center">

                <p className="text-[#d97757] text-xs tracking-widest uppercase mb-5">
                    Benvenuto su
                </p>

                <div className="mb-8">
                    <h1 className="text-5xl font-black text-stone-900 dark:text-stone-100 mb-2">
                        {TESTO.slice(0, Math.min(visibile, 9))}
                        {visibile < 10 && <span className="animate-pulse">|</span>}
                    </h1>
                    {visibile >= 10 && (
                        <h2 className="text-5xl font-black text-[#d97757]">
                            {TESTO.slice(10, visibile)}
                            {visibile < TESTO.length && <span className="animate-pulse">|</span>}
                        </h2>
                    )}
                </div>

                <p className="text-stone-600 dark:text-stone-400 mb-12 text-sm leading-relaxed">
                    Esplora i grandi filosofi della storia, impara i concetti e come sono tra loro legati e scopri a quale filosofo ti avvicini.
                </p>

                {/* Link alle tre sezioni */}
                <div className="flex flex-col gap-3">
                    <Link
                        to="/Galleria"
                        className="px-8 py-4 bg-transparent border border-[#d33f0e] text-stone-700 dark:text-stone-100 hover:text-stone-100 rounded-xl font-black text-base hover:bg-[#d33f0e] transition-all duration-200"
                    >
                        🏛️ Galleria Filosofica
                    </Link>
                    <Link
                        to="/lessico"
                        className="px-8 py-4 bg-transparent border border-[#d97757] text-[#d97757] rounded-xl font-black text-base hover:bg-[#d97757] hover:text-white transition-all duration-200"
                    >
                        💡 Parole e concetti
                    </Link>
                    <Link
                        to="/mappa"
                        className="px-8 py-4 bg-transparent border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 rounded-xl font-black text-base hover:bg-stone-300 hover:border-stone-400 hover:text-stone-700 dark:hover:bg-stone-700 dark:hover:border-stone-500 dark:hover:text-stone-200 transition-all duration-200"
                    >
                        🔗 Mappa delle connessioni
                    </Link>
                </div>

            </div>
        </div>
    )
}
