import { FaInstagram } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="w-full border-t border-stone-200 dark:border-stone-800 mt-20">
            <div className="max-w-lg mx-auto px-8 py-10 text-center font-serif">

                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                    Filosofia Applicata - Edoardo Poli ©2026
                </p>

                <a
                    href="https://www.instagram.com/filosofia_applicata/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-[#d97757] hover:text-[#c86843] transition-colors duration-200 font-black"
                >
                    <FaInstagram className="text-lg" />
                    <span className="tracking-wide text-sm uppercase">
                        Instagram
                    </span>
                </a>

            </div>
        </footer>
    )
}