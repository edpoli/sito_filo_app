import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="text-center py-20">
            <p className="text-6xl mb-4">🤔</p>
            <h1 className="text-2xl font-black text-stone-100 mb-2">Pagina non trovata</h1>
            <p className="text-stone-500 text-sm mb-6">Forse era un'illusione. Platone avrebbe concordato.</p>
            <Link to="/" className="text-amber-500 underline">Torna alla home</Link>
        </div>
    );
}