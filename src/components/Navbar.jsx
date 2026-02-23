import { Link } from 'react-router-dom'
import Quiz from '../pages/Quiz';
export default function Navbar() {
    return (
        <nav className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">

            <Link to="/" className="font-black text-amber-500 tracking-wider text-sm uppercase">
                ♟ Filosofia Applicata
            </Link>

            <Link to="/quiz" className='font-black text-stone-100 tracking-wider text-sm uppercase'> Quiz </Link>
            <Link to="/citazioni" className='font-black text-stone-100 tracking-wider text-sm uppercase'> Citazioni API </Link>


            <Link to="/" className="text-stone-500 hover:text-stone-300 text-xs transition-colors">
                Tutti i filosofi
            </Link>
        </nav>
    );
}
