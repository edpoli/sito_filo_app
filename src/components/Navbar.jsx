import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../context/DarkMode'

export default function Navbar() {
    const [aperto, setAperto] = useState(false)
    const { dark, toggle } = useDarkMode()

    return (
        <nav className="border-b border-[#e7e0d8] dark:border-stone-800 bg-[#faf8f4] dark:bg-stone-950 px-6 py-4 transition-colors duration-300">
            <div className="flex items-center justify-between">

                <Link to="/" className="font-black text-[#d97757] tracking-wider text-sm uppercase">
                    ♟ Filosofia Applicata
                </Link>

                {/* Mobile: toggle + hamburger */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggle}
                        className="text-stone-500 dark:text-stone-400 hover:text-[#d97757] transition-colors"
                        aria-label="Cambia tema"
                    >
                        {dark ? '☀️' : '🌙'}
                    </button>
                    <button
                        onClick={() => setAperto(!aperto)}
                        className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] transition-colors"
                    >
                        {aperto ? "✕" : "☰"}
                    </button>
                </div>

                {/* Desktop: links + toggle */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Home</Link>
                    <Link to="/Galleria" className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Galleria</Link>
                    <Link to="/mappa" className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Mappa</Link>
                    <Link to="/lessico" className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Parole e Concetti</Link>
                    <Link to="/quiz" className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Quiz</Link>
                    <Link to="/contatti" className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Contatti</Link>
                    <button
                        onClick={toggle}
                        className="text-stone-500 dark:text-stone-400 hover:text-[#d97757] transition-colors border-l border-[#e7e0d8] dark:border-stone-800 pl-6"
                        aria-label="Cambia tema"
                    >
                        {dark ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            {aperto && (
                <div className="md:hidden flex flex-col gap-4 mt-4 pb-2">
                    <Link to="/" onClick={() => setAperto(false)} className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Home</Link>
                    <Link to="/Galleria" onClick={() => setAperto(false)} className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Galleria Filosofica</Link>
                    <Link to="/mappa" onClick={() => setAperto(false)} className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Mappa</Link>
                    <Link to="/lessico" onClick={() => setAperto(false)} className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Parole e Concetti</Link>
                    <Link to="/quiz" onClick={() => setAperto(false)} className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Quiz</Link>
                    <Link to="/contatti" onClick={() => setAperto(false)} className="text-stone-600 dark:text-stone-400 hover:text-[#d97757] text-sm transition-colors">Contatti</Link>
                </div>
            )}
        </nav>
    )
}
