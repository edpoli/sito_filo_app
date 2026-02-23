import { useState, useEffect } from 'react'



export default function Citazioni() {
    const [schermata, setSchermata] = useState("intro");
    const [citazioni, setCitazioni] = useState([])

    const [cronologia, setCronologia] = useState([])
    const [posizione, setPosizione] = useState(-1)

    // inizializza con la prima citazione casuale
    useEffect(() => {
        fetch("https://philosophersapi.com/api/quotes")
            .then(res => res.json())
            .then(dati => {
                setCitazioni(dati)
                const primo = Math.floor(Math.random() * dati.length)
                setCronologia([primo])
                setPosizione(0)
            })
            .catch(err => {
                console.log("errore", err)
            })
    }, [])

    const nuovaCitazione = () => {
        const nuovoIndice = Math.floor(Math.random() * citazioni.length)
        // taglia tutto quello che viene dopo la posizione corrente
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

    // la citazione corrente
    const citazioneCasuale = citazioni[cronologia[posizione]]
    return (

        <div className="min-h-screen bg-green-950 text-stone-100 flex items-center justify-center p-8 font-serif">
            <div className="w-full max-w-lg">

                {schermata === "intro" ? (
                    // SCHERMATA INIZIALE
                    <div className="text-center">
                        <p className="text-yellow-600 dark:text-yellow-200 text-xs tracking-widest uppercase mb-5">LA CITAZIONE</p>
                        <h1 className="text-5xl text-[#f5efbb] font-black mb-2">Filosofia</h1>
                        <h2 className="text-5xl font-black dark:text-orange-700 text-orange-700 mb-8">Applicata</h2>
                        <p className="text-stone-400 dark:text-stone-400 mb-10 text-sm">Una citazione al giorno...</p>
                        <button
                            onClick={() => setSchermata("quiz")}
                            className="px-10 py-4 bg-yellow-500 dark:text-zinc-900 text-zinc-900 rounded-xl font-black text-base hover:bg-yellow-400 transition-all duration-200 font-serif"
                        >
                            Inizia →
                        </button>
                    </div>

                ) : (
                    <>

                        <h1 className=' text-center font-black text-3xl mb-5 font-mono p-8 text-[#f5efbb]'>
                            Citazione
                        </h1>

                        <div>
                            {citazioneCasuale && <div>
                                <p className='italic'>"{citazioneCasuale.quote}"</p>
                                <p> {citazioneCasuale.philosopher?.name} </p>
                                <p className='text-yellow-300 mt-2'>{citazioneCasuale?.work}</p>
                            </div>}
                        </div>



                        <div className='flex items-center justify-evenly gap-2 py-10 font-sans'>

                            <div className='text-center'>
                                <button
                                    className='w-full border  py-4 px-6 rounded-xl border-orange-800  hover:bg-orange-900 cursor-pointer'
                                    onClick={indietro}>
                                    Indietro
                                </button>
                            </div>

                            <div className='tex-center'>
                                <button
                                    onClick={avanti}

                                    className={posizione === cronologia.length - 1 ? " w-full opacity-30 cursor-not-allowed border px-6 py-4 rounded-xl border-orange-800 hover:bg-amber-900" : "w-full  border  py-4 px-6 rounded-xl border-orange-800  hover:bg-orange-900 cursor-pointer"}
                                >Avanti
                                </button>
                            </div>

                            <div className='text-center'>
                                <button
                                    className='w-full border px-6 py-4 rounded-xl  border-stone-300 hover:bg-indigo-600 cursor-pointer'
                                    onClick={nuovaCitazione}>
                                    Nuova Citazione
                                </button>
                            </div>

                        </div>



                    </>
                )}
            </div>
        </div>

    )
}



