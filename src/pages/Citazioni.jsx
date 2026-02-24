import { useState, useEffect, useRef } from 'react'

export default function Citazioni() {
    const [schermata, setSchermata] = useState("intro")
    const [citazioni, setCitazioni] = useState([])
    const [cronologia, setCronologia] = useState([])
    const [posizione, setPosizione] = useState(-1)
    const [caricamento, setCaricamento] = useState(false)
    const [errore, setErrore] = useState(null)
    const controllerRef = useRef(null)

    const caricaCitazioni = () => {
        if (controllerRef.current) controllerRef.current.abort()
        controllerRef.current = new AbortController()

        setCaricamento(true)
        setErrore(null)

        fetch("https://philosophersapi.com/api/quotes", {
            signal: controllerRef.current.signal,
        })
            .then(res => {
                if (!res.ok) throw new Error(`Errore HTTP ${res.status}`)
                return res.json()
            })
            .then(dati => {
                if (!Array.isArray(dati) || dati.length === 0) {
                    throw new Error("Nessuna citazione disponibile")
                }
                setCitazioni(dati)
                const primo = Math.floor(Math.random() * dati.length)
                setCronologia([primo])
                setPosizione(0)
                setSchermata("citazioni")
            })
            .catch(err => {
                if (err.name === "AbortError") return // fetch annullata volontariamente
                setErrore("Impossibile caricare le citazioni. Controlla la connessione e riprova.")
                setSchermata("intro")
            })
            .finally(() => setCaricamento(false))
    }

    // Cleanup: annulla fetch se il componente viene smontato
    useEffect(() => {
        return () => controllerRef.current?.abort()
    }, [])

    const nuovaCitazione = () => {
        if (citazioni.length === 0) return
        let nuovoIndice
        // Evita di ripescare la citazione corrente
        do {
            nuovoIndice = Math.floor(Math.random() * citazioni.length)
        } while (nuovoIndice === cronologia[posizione] && citazioni.length > 1)

        const nuovaCronologia = [...cronologia.slice(0, posizione + 1), nuovoIndice]
        setCronologia(nuovaCronologia)
        setPosizione(nuovaCronologia.length - 1)
    }

    const indietro = () => {
        if (posizione > 0) {
            setPosizione(posizione - 1)
        } else {
            setSchermata('intro')
        }
    }

    const avanti = () => {
        if (posizione < cronologia.length - 1) {
            setPosizione(posizione + 1)
        }
    }

    const citazioneCorrente = citazioni[cronologia[posizione]]
    const puoAndareAvanti = posizione < cronologia.length - 1

    return (
        <div className="min-h-screen bg-green-950 text-stone-100 flex items-center justify-center p-8 font-serif">
            <div className="w-full max-w-lg">

                {/* ── INTRO ── */}
                {schermata === "intro" && (
                    <div className="text-center">
                        <p className="text-yellow-200 text-xs tracking-widest uppercase mb-5">La Citazione</p>
                        <h1 className="text-5xl text-[#f5efbb] font-black mb-2">Filosofia</h1>
                        <h2 className="text-5xl font-black text-orange-700 mb-8">Applicata</h2>
                        <p className="text-stone-400 mb-10 text-sm">Una citazione al giorno...</p>

                        {errore && (
                            <p className="text-red-400 text-sm mb-6 bg-red-900/20 border border-red-800 rounded-lg px-4 py-3">
                                {errore}
                            </p>
                        )}

                        <button
                            onClick={caricaCitazioni}
                            disabled={caricamento}
                            className="px-10 py-4 bg-yellow-500 text-zinc-900 rounded-xl font-black text-base hover:bg-yellow-400 transition-all duration-200 font-serif disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {caricamento ? "Caricamento..." : "Inizia →"}
                        </button>
                    </div>
                )}

                {/* ── CITAZIONI ── */}
                {schermata === "citazioni" && (
                    <>
                        <h1 className="text-center font-black text-3xl mb-8 font-mono text-[#f5efbb]">
                            Citazione
                        </h1>

                        <div className="min-h-32">
                            {citazioneCorrente ? (
                                <div className="border-l-4 border-yellow-600 pl-5">
                                    <p className="italic text-stone-200 text-lg leading-relaxed mb-4">
                                        "{citazioneCorrente.quote}"
                                    </p>
                                    <p className="text-stone-300 font-semibold">
                                        {citazioneCorrente.philosopher?.name ?? ""}
                                    </p>
                                    {citazioneCorrente.work && (
                                        <p className="text-yellow-300 text-sm mt-1">
                                            {citazioneCorrente.work}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-stone-500 text-center">Caricamento citazione...</p>
                            )}
                        </div>

                        <div className="flex items-center justify-evenly gap-2 py-10 font-sans">
                            <button
                                onClick={indietro}
                                className="border py-4 px-6 rounded-xl border-orange-800 hover:bg-orange-900 cursor-pointer transition-colors"
                            >
                                Indietro
                            </button>

                            <button
                                onClick={avanti}
                                disabled={!puoAndareAvanti}
                                className="border py-4 px-6 rounded-xl border-orange-800 transition-colors
                                    disabled:opacity-30 disabled:cursor-not-allowed
                                    enabled:hover:bg-orange-900 enabled:cursor-pointer"
                            >
                                Avanti
                            </button>

                            <button
                                onClick={nuovaCitazione}
                                className="border px-6 py-4 rounded-xl border-stone-300 hover:bg-indigo-600 cursor-pointer transition-colors"
                            >
                                Nuova Citazione
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}
