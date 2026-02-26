import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../context/DarkMode'

const filosofi = [
  {
    id: 'agamben', nome: 'Agamben', emoji: '🏛️', gruppo: 'Biopolitica', anni: '1942–',
    citazione: 'Lo stato di eccezione è il paradigma di governo dominante.',
    connessioni: ['esposito'],
  },
  {
    id: 'arendt', nome: 'Arendt', emoji: '⚖️', gruppo: 'Filosofia Politica', anni: '1906–1975',
    citazione: 'Il male nasce dalla banalità, non dalla mostruosità.',
    connessioni: ['cavarero'],
  },
  {
    id: 'baudrillard', nome: 'Baudrillard', emoji: '🪞', gruppo: 'Post-strutturalismo', anni: '1929–2007',
    citazione: 'Il reale non è più che un pretesto per il modello.',
    connessioni: [],
  },
  {
    id: 'blumenberg', nome: 'Blumenberg', emoji: '📚', gruppo: 'Ermeneutica', anni: '1920–1996',
    citazione: 'I miti sono risposte alle esigenze irriducibili dell\'essere umano.',
    connessioni: [],
  },
  {
    id: 'bodei', nome: 'Remo Bodei', emoji: '🇮🇹', gruppo: 'Filosofia Contemporanea', anni: '1938–2019',
    citazione: 'Le passioni sono alleate necessarie della ragione.',
    connessioni: [],
  },
  {
    id: 'butler', nome: 'Butler', emoji: '🌈', gruppo: 'Teoria queer', anni: '1956–',
    citazione: 'Il genere è una performance, non un\'essenza.',
    connessioni: ['cavarero'],
  },
  {
    id: 'cavarero', nome: 'Cavarero', emoji: '🗣️', gruppo: 'Filosofia femminista', anni: '1947–',
    citazione: 'Ognuno di noi è unico e irripetibile.',
    connessioni: [],
  },
  {
    id: 'deleuze', nome: 'Deleuze', emoji: '🌿', gruppo: 'Post-strutturalismo', anni: '1925–1995',
    citazione: 'Il pensiero nasce dal caos.',
    connessioni: ['derrida'],
  },
  {
    id: 'derrida', nome: 'Derrida', emoji: '✂️', gruppo: 'Decostruzionismo', anni: '1930–2004',
    citazione: "Non c'è nulla al di fuori del testo.",
    connessioni: ['butler'],
  },
  {
    id: 'esposito', nome: 'Esposito', emoji: '🛡️', gruppo: 'Biopolitica', anni: '1950–',
    citazione: 'L\'immunitas è la forma negativa della communitas.',
    connessioni: [],
  },
  {
    id: 'fink', nome: 'Eugen Fink', emoji: '🎭', gruppo: 'Fenomenologia', anni: '1905–1975',
    citazione: 'Il gioco è il simbolo del mondo.',
    connessioni: [],
  },
  {
    id: 'foucault', nome: 'Foucault', emoji: '👁️', gruppo: 'Post-strutturalismo', anni: '1926–1984',
    citazione: 'Il potere è ovunque perché viene da ovunque.',
    connessioni: ['derrida', 'agamben', 'esposito'],
  },
  {
    id: 'freud', nome: 'Freud', emoji: '🧠', gruppo: 'Psicoanalisi', anni: '1856–1939',
    citazione: "L'inconscio governa la nostra vita.",
    connessioni: ['jung', 'deleuze'],
  },
  {
    id: 'han', nome: 'Byung-Chul Han', emoji: '📱', gruppo: 'Filosofia della tecnologia', anni: '1959–',
    citazione: 'La società della trasparenza è una società della sfiducia.',
    connessioni: ['agamben', 'arendt', 'foucault', 'heidegger'],
  },
  {
    id: 'haraway', nome: 'Haraway', emoji: '🤖', gruppo: 'Studi femministi della scienza', anni: '1944–',
    citazione: 'Preferirei essere un cyborg che una dea.',
    connessioni: [],
  },
  {
    id: 'hegel', nome: 'Hegel', emoji: '🌀', gruppo: 'Idealismo', anni: '1770–1831',
    citazione: 'Tutto ciò che è reale è razionale.',
    connessioni: ['marx', 'heidegger', 'nietzsche', 'bodei'],
  },
  {
    id: 'heidegger', nome: 'Heidegger', emoji: '🌲', gruppo: 'Fenomenologia', anni: '1889–1976',
    citazione: "Il linguaggio è la casa dell'essere.",
    connessioni: ['derrida', 'fink', 'arendt', 'levinas', 'patocka', 'agamben'],
  },
  {
    id: 'husserl', nome: 'Husserl', emoji: '🔬', gruppo: 'Fenomenologia', anni: '1859–1938',
    citazione: 'Tornare alle cose stesse.',
    connessioni: ['heidegger', 'fink', 'arendt', 'levinas', 'patocka'],
  },
  {
    id: 'jankelevitch', nome: 'Jankélévitch', emoji: '🎵', gruppo: 'Filosofia morale', anni: '1903–1985',
    citazione: 'L\'ironia è la coscienza di una doppiezza irriducibile.',
    connessioni: [],
  },
  {
    id: 'jung', nome: 'Jung', emoji: '☯️', gruppo: 'Psicoanalisi', anni: '1875–1961',
    citazione: "Finché non rendi consapevole l'inconscio, sarà lui a dirigerti.",
    connessioni: [],
  },
  {
    id: 'levinas', nome: 'Levinas', emoji: '👤', gruppo: 'Fenomenologia', anni: '1906–1995',
    citazione: 'Il volto dell\'altro è la prima parola.',
    connessioni: ['derrida'],
  },
  {
    id: 'marx', nome: 'Marx', emoji: '✊', gruppo: 'Materialismo', anni: '1818–1883',
    citazione: 'I filosofi hanno interpretato il mondo; si tratta di cambiarlo.',
    connessioni: ['foucault'],
  },
  {
    id: 'nietzsche', nome: 'Nietzsche', emoji: '⚡', gruppo: 'Esistenzialismo', anni: '1844–1900',
    citazione: 'Diventa ciò che sei.',
    connessioni: ['heidegger', 'deleuze', 'foucault'],
  },
  {
    id: 'patocka', nome: 'Patočka', emoji: '🌍', gruppo: 'Fenomenologia', anni: '1907–1977',
    citazione: 'Vivere nella verità è il compito fondamentale.',
    connessioni: [],
  },
  {
    id: 'rovelli', nome: 'Rovelli', emoji: '⚛️', gruppo: 'Filosofia della fisica', anni: '1956–',
    citazione: 'Non siamo altro che una rete di relazioni.',
    connessioni: [],
  },
  {
    id: 'weil', nome: 'Simone Weil', emoji: '✨', gruppo: 'Mistica', anni: '1909–1943',
    citazione: "L'attenzione è la forma più rara di generosità.",
    connessioni: [],
  },
  {
    id: 'wittgenstein', nome: 'Wittgenstein', emoji: '🔷', gruppo: 'Filosofia del Linguaggio', anni: '1889–1951',
    citazione: 'Ciò di cui non si può parlare si deve tacere.',
    connessioni: ['derrida'],
  },
]

// coloriGruppo: bordo = colore vivido, bg = sfondo pastello chiaro, testo = testo scuro su sfondo chiaro
const coloriGruppo = {
  'Idealismo': { bg: '#eff6ff', bordo: '#3b82f6', testo: '#1d4ed8' },
  'Fenomenologia': { bg: '#f0fdf4', bordo: '#22c55e', testo: '#15803d' },
  'Psicoanalisi': { bg: '#faf5ff', bordo: '#a855f7', testo: '#7e22ce' },
  'Materialismo': { bg: '#fef2f2', bordo: '#ef4444', testo: '#b91c1c' },
  'Esistenzialismo': { bg: '#fff7ed', bordo: '#f97316', testo: '#c2410c' },
  'Filosofia del Linguaggio': { bg: '#ecfeff', bordo: '#06b6d4', testo: '#0e7490' },
  'Filosofia Politica': { bg: '#eef2ff', bordo: '#6366f1', testo: '#4338ca' },
  'Post-strutturalismo': { bg: '#fdf2f8', bordo: '#ec4899', testo: '#be185d' },
  'Decostruzionismo': { bg: '#fff1f2', bordo: '#f43f5e', testo: '#be123c' },
  'Mistica': { bg: '#fffbeb', bordo: '#f59e0b', testo: '#b45309' },
  'Filosofia Contemporanea': { bg: '#f0fdf4', bordo: '#4ade80', testo: '#166534' },
  'Biopolitica': { bg: '#fef2f2', bordo: '#ef4444', testo: '#b91c1c' },
  'Ermeneutica': { bg: '#fffbeb', bordo: '#d97706', testo: '#92400e' },
  'Teoria queer': { bg: '#fdf2f8', bordo: '#f472b6', testo: '#be185d' },
  'Filosofia femminista': { bg: '#f0fdfa', bordo: '#2dd4bf', testo: '#0f766e' },
  'Filosofia della tecnologia': { bg: '#f8fafc', bordo: '#64748b', testo: '#334155' },
  'Studi femministi della scienza': { bg: '#f0fdf4', bordo: '#16a34a', testo: '#14532d' },
  'Filosofia morale': { bg: '#fefce8', bordo: '#eab308', testo: '#713f12' },
  'Filosofia della fisica': { bg: '#f0f9ff', bordo: '#38bdf8', testo: '#0c4a6e' },
}

const HAI_SCHEDA = new Set([
  'derrida', 'foucault', 'hegel', 'heidegger', 'wittgenstein',
  'bodei', 'deleuze', 'weil', 'arendt', 'husserl', 'fink', 'jung', 'freud',
  'marx', 'nietzsche',
  'agamben', 'baudrillard', 'blumenberg', 'butler', 'cavarero',
  'esposito', 'han', 'haraway', 'jankelevitch', 'levinas', 'patocka', 'rovelli',
])

const gruppi = [...new Set(filosofi.map(f => f.gruppo))]

export default function MappaFilosofi() {
  const navigate = useNavigate()
  const { dark } = useDarkMode()
  const [selezionato, setSelezionato] = useState(null)
  const [vistaAttiva, setVistaAttiva] = useState('griglia')

  const filosofoSelezionato = filosofi.find(f => f.id === selezionato)

  const connessi = selezionato
    ? [
      ...(filosofi.find(f => f.id === selezionato)?.connessioni ?? []),
      ...filosofi.filter(f => f.connessioni.includes(selezionato)).map(f => f.id),
    ]
    : []

  const getStato = f => {
    if (!selezionato) return 'neutro'
    if (f.id === selezionato) return 'selezionato'
    if (connessi.includes(f.id)) return 'connesso'
    return 'dimmed'
  }

  function CardFilosofo({ f }) {
    const stato = getStato(f)
    const colori = coloriGruppo[f.gruppo] ?? { bg: '#f8fafc', bordo: '#cbd5e1', testo: '#64748b' }

    // Solo i colori dinamici restano inline
    const stiliDinamici = stato === 'selezionato'
      ? { borderColor: colori.bordo, background: dark ? colori.bordo + '22' : colori.bg, boxShadow: `0 0 16px ${colori.bordo}44` }
      : stato === 'connesso'
        ? { borderColor: colori.bordo + '99', background: dark ? colori.bordo + '15' : colori.bg }
        : {}

    return (
      <div
        onClick={() => setSelezionato(selezionato === f.id ? null : f.id)}
        className={`scale-90 hover:scale-100 rounded-xl p-3.5 cursor-pointer transition-all duration-[250ms] border shadow-lg shadow-stone-300/60 dark:shadow-xl dark:shadow-black/50
          ${stato === 'dimmed' ? 'opacity-25' : ''}
          ${stato === 'neutro' || stato === 'dimmed'
            ? 'border-stone-400 dark:border-stone-800 bg-stone-100 dark:bg-stone-900'
            : 'border-transparent'
          }`}
        style={stiliDinamici}
      >
        <div className="text-[28px] mb-1.5">{f.emoji}</div>
        <div className={`font-bold text-[13px] mb-0.5 ${stato === 'dimmed' ? 'text-stone-400 dark:text-stone-600' : 'text-stone-900 dark:text-stone-100'}`}>
          {f.nome}
        </div>
        <div className="text-[10px] text-stone-500 mb-2">{f.anni}</div>
        {/* Badge gruppo — colori sempre dinamici */}
        <div style={{
          display: 'inline-block', fontSize: 9, padding: '2px 8px',
          borderRadius: 99, border: `1px solid ${colori.bordo}66`,
          color: dark ? colori.bordo : colori.testo,
          background: dark ? colori.bordo + '18' : colori.bg,
          letterSpacing: 0.5,
        }}>
          {f.gruppo}
        </div>
      </div>
    )
  }

  return (
    <div className="font-serif bg-[#faf8f4] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-[calc(100vh-57px)] transition-colors duration-300">

      {/* Intestazione */}
      <div className="border-b border-[#e7e0d8] dark:border-stone-800 px-6 py-4">
        <p className="text-[10px] tracking-[3px] text-[#d97757] uppercase mb-0.5">
          Filosofia Applicata
        </p>
        <h1 className="text-xl font-black">Mappa delle Connessioni</h1>
      </div>

      {/* Tab vista */}
      <div className="flex gap-2 px-6 py-4 border-b border-[#e7e0d8] dark:border-stone-800">
        {['griglia', 'correnti'].map(v => (
          <button
            key={v}
            onClick={() => setVistaAttiva(v)}
            className={`px-4 py-1.5 rounded-full text-xs cursor-pointer font-serif border transition-all duration-200
              ${vistaAttiva === v
                ? 'border-[#d97757] bg-[#d97757]/10 text-[#d97757]'
                : 'border-[#e7e0d8] dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600'
              }`}
          >
            {v === 'griglia' ? '📋 Tutti i filosofi' : '🗂️ Per corrente'}
          </button>
        ))}
        {selezionato && (
          <button
            onClick={() => setSelezionato(null)}
            className="ml-auto px-4 py-1.5 rounded-full text-xs cursor-pointer font-serif border border-[#e7e0d8] dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            ✕ Deseleziona
          </button>
        )}
      </div>

      <div className="flex min-h-[calc(100vh-57px-120px)]">

        {/* Contenuto principale */}
        <div className="flex-1 p-6 overflow-y-auto">

          {vistaAttiva === 'griglia' && (
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
              {filosofi.map(f => <CardFilosofo key={f.id} f={f} />)}
            </div>
          )}

          {vistaAttiva === 'correnti' && (
            <div className="flex flex-col gap-6">
              {gruppi.map(gruppo => {
                const filoGruppo = filosofi.filter(f => f.gruppo === gruppo)
                const colori = coloriGruppo[gruppo] ?? { bordo: '#e7e0d8', testo: '#78716c' }
                return (
                  <div key={gruppo}>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div style={{ height: 1, flex: 1, background: colori.bordo + '66' }} />
                      <span style={{ fontSize: 11, color: dark ? colori.bordo : colori.testo, letterSpacing: 2, textTransform: 'uppercase' }}>
                        {gruppo}
                      </span>
                      <div style={{ height: 1, flex: 1, background: colori.bordo + '66' }} />
                    </div>
                    <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                      {filoGruppo.map(f => <CardFilosofo key={f.id} f={f} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Pannello connessioni laterale */}
        {filosofoSelezionato && (
          <div className="w-[260px] border-l border-[#e7e0d8] dark:border-stone-800 bg-[#faf8f4] dark:bg-stone-950 p-6 overflow-y-auto">
            <div className="text-center mb-5">
              <div className="text-[44px] mb-2">{filosofoSelezionato.emoji}</div>
              <h2 className="text-base font-black mb-1">{filosofoSelezionato.nome}</h2>
              <p className="text-[11px] text-stone-500 mb-3">{filosofoSelezionato.anni}</p>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 italic leading-relaxed">
                "{filosofoSelezionato.citazione}"
              </p>
              {HAI_SCHEDA.has(filosofoSelezionato.id) && (
                <button
                  onClick={() => navigate(`/filosofo/${filosofoSelezionato.id}`)}
                  className="mt-3 px-4 py-1.5 rounded-full text-[11px] cursor-pointer font-serif border border-[#d97757]/30 bg-[#d97757]/10 text-[#d97757] hover:bg-[#d97757]/20 transition-colors"
                >
                  Vai alla scheda →
                </button>
              )}
            </div>

            {/* Ha influenzato */}
            {filosofoSelezionato.connessioni.length > 0 && (
              <div className="mb-5">
                <div className="text-[9px] text-stone-400 tracking-[2px] uppercase mb-2.5">
                  Ha influenzato
                </div>
                {filosofoSelezionato.connessioni.map(id => {
                  const c = filosofi.find(f => f.id === id)
                  const colori = coloriGruppo[c?.gruppo] ?? { bordo: '#e7e0d8' }
                  return c ? (
                    <div
                      key={id}
                      onClick={() => setSelezionato(id)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer mb-1.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                      style={{ border: `1px solid ${colori.bordo}44` }}
                    >
                      <span className="text-[18px]">{c.emoji}</span>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">{c.nome}</div>
                        <div className="text-[10px] text-stone-500">{c.gruppo}</div>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            )}

            {/* Influenzato da */}
            {filosofi.filter(f => f.connessioni.includes(filosofoSelezionato.id)).length > 0 && (
              <div>
                <div className="text-[9px] text-stone-400 tracking-[2px] uppercase mb-2.5">
                  Influenzato da
                </div>
                {filosofi.filter(f => f.connessioni.includes(filosofoSelezionato.id)).map(f => {
                  const colori = coloriGruppo[f.gruppo] ?? { bordo: '#e7e0d8' }
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelezionato(f.id)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer mb-1.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                      style={{ border: `1px solid ${colori.bordo}44` }}
                    >
                      <span className="text-[18px]">{f.emoji}</span>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">{f.nome}</div>
                        <div className="text-[10px] text-stone-500">{f.gruppo}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
