import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [aperto, setAperto] = useState(false)

    return (
        <nav className="border-b border-stone-800 px-6 py-4">
            <div className="flex items-center justify-between">


                <Link to="/" className="font-black text-amber-500 tracking-wider text-sm uppercase">
                    ♟ Filosofia Applicata
                </Link>


                <button
                    onClick={() => setAperto(!aperto)}
                    className="md:hidden text-stone-400 hover:text-amber-500 transition-colors"
                >
                    {aperto ? "✕" : "☰"}
                </button>

                {/* Links — visibili su desktop, nascosti su mobile */}
                <div className="hidden md:flex gap-6">
                    <Link to="/" className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Home</Link>
                    <Link to="/enciclopedia" className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Enciclopedia</Link>
                    <Link to="/lessico" className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Lessico</Link>
                    <Link to="/quiz" className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Quiz</Link>
                    <Link to="/citazioni" className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Citazioni</Link>
                    <Link to="/contatti" className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Contatti</Link>
                </div>
            </div>

            {/* Menu mobile — appare solo quando aperto */}
            {aperto && (
                <div className="md:hidden flex flex-col gap-4 mt-4 pb-2">
                    <Link to="/" onClick={() => setAperto(false)} className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Home</Link>
                    <Link to="/enciclopedia" onClick={() => setAperto(false)} className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Enciclopedia</Link>
                    <Link to="/lessico" onClick={() => setAperto(false)} className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Lessico</Link>
                    <Link to="/quiz" onClick={() => setAperto(false)} className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Quiz</Link>
                    <Link to="/citazioni" onClick={() => setAperto(false)} className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Citazioni</Link>
                    <Link to="/contatti" onClick={() => setAperto(false)} className="text-stone-400 hover:text-amber-500 text-sm transition-colors">Contatti</Link>
                </div>
            )}
        </nav>
    )
}