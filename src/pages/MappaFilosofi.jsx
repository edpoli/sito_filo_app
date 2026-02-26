import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const filosofi = [
  {
    id: 'hegel', nome: 'Hegel', emoji: '🌀', gruppo: 'Idealismo', anni: '1770–1831',
    citazione: 'Tutto ciò che è reale è razionale.',
    connessioni: ['marx', 'heidegger', 'nietzsche', 'bodei'],
  },
  {
    id: 'husserl', nome: 'Husserl', emoji: '🔬', gruppo: 'Fenomenologia', anni: '1859–1938',
    citazione: 'Tornare alle cose stesse.',
    connessioni: ['heidegger', 'fink', 'arendt', 'levinas', 'patocka', 'costa'],
  },
  {
    id: 'freud', nome: 'Freud', emoji: '🧠', gruppo: 'Psicoanalisi', anni: '1856–1939',
    citazione: "L'inconscio governa la nostra vita.",
    connessioni: ['jung', 'deleuze'],
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
    id: 'heidegger', nome: 'Heidegger', emoji: '🌲', gruppo: 'Fenomenologia', anni: '1889–1976',
    citazione: "Il linguaggio è la casa dell'essere.",
    connessioni: ['derrida', 'fink', 'arendt', 'levinas', 'patocka', 'agamben'],
  },
  {
    id: 'jung', nome: 'Jung', emoji: '☯️', gruppo: 'Psicoanalisi', anni: '1875–1961',
    citazione: "Finché non rendi consapevole l'inconscio, sarà lui a dirigerti.",
    connessioni: [],
  },
  {
    id: 'wittgenstein', nome: 'Wittgenstein', emoji: '🔷', gruppo: 'Filosofia del Linguaggio', anni: '1889–1951',
    citazione: 'Ciò di cui non si può parlare si deve tacere.',
    connessioni: ['derrida'],
  },
  {
    id: 'arendt', nome: 'Arendt', emoji: '⚖️', gruppo: 'Filosofia Politica', anni: '1906–1975',
    citazione: 'Il male nasce dalla banalità, non dalla mostruosità.',
    connessioni: ['cavarero'],
  },
  {
    id: 'weil', nome: 'Simone Weil', emoji: '✨', gruppo: 'Mistica', anni: '1909–1943',
    citazione: "L'attenzione è la forma più rara di generosità.",
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
    id: 'bodei', nome: 'Remo Bodei', emoji: '🇮🇹', gruppo: 'Filosofia Contemporanea', anni: '1938–2019',
    citazione: 'Le passioni sono alleate necessarie della ragione.',
    connessioni: [],
  },
  {
    id: 'agamben', nome: 'Agamben', emoji: '🏛️', gruppo: 'Biopolitica', anni: '1942–',
    citazione: 'Lo stato di eccezione è il paradigma di governo dominante.',
    connessioni: ['esposito'],
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
    id: 'esposito', nome: 'Esposito', emoji: '🛡️', gruppo: 'Biopolitica', anni: '1950–',
    citazione: 'L\'immunitas è la forma negativa della communitas.',
    connessioni: [],
  },
  {
    id: 'han', nome: 'Byung-Chul Han', emoji: '📱', gruppo: 'Filosofia della tecnologia', anni: '1959–',
    citazione: 'La società della trasparenza è una società della sfiducia.',
    connessioni: ['foucault, arendt, heidegger'],
  },
  {
    id: 'haraway', nome: 'Haraway', emoji: '🤖', gruppo: 'Studi femministi della scienza', anni: '1944–',
    citazione: 'Preferirei essere un cyborg che una dea.',
    connessioni: [],
  },
  {
    id: 'jankelevitch', nome: 'Jankélévitch', emoji: '🎵', gruppo: 'Filosofia morale', anni: '1903–1985',
    citazione: 'L\'ironia è la coscienza di una doppiezza irriducibile.',
    connessioni: [],
  },
  {
    id: 'levinas', nome: 'Levinas', emoji: '👤', gruppo: 'Fenomenologia', anni: '1906–1995',
    citazione: 'Il volto dell\'altro è la prima parola.',
    connessioni: ['derrida'],
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
]

const coloriGruppo = {
  'Idealismo': { bg: '#1e3a5f', bordo: '#60a5fa', testo: '#93c5fd' },
  'Fenomenologia': { bg: '#14432a', bordo: '#34d399', testo: '#6ee7b7' },
  'Psicoanalisi': { bg: '#2d1b69', bordo: '#a78bfa', testo: '#c4b5fd' },
  'Materialismo': { bg: '#7f1d1d', bordo: '#f87171', testo: '#fca5a5' },
  'Esistenzialismo': { bg: '#431407', bordo: '#fb923c', testo: '#fdba74' },
  'Filosofia del Linguaggio': { bg: '#164e63', bordo: '#22d3ee', testo: '#67e8f9' },
  'Filosofia Politica': { bg: '#312e81', bordo: '#818cf8', testo: '#a5b4fc' },
  'Post-strutturalismo': { bg: '#500724', bordo: '#f472b6', testo: '#f9a8d4' },
  'Decostruzionismo': { bg: '#4c0519', bordo: '#fb7185', testo: '#fda4af' },
  'Mistica': { bg: '#451a03', bordo: '#fbbf24', testo: '#fcd34d' },
  'Filosofia Contemporanea': { bg: '#14532d', bordo: '#86efac', testo: '#bbf7d0' },
  'Biopolitica': { bg: '#2d0505', bordo: '#ef4444', testo: '#fca5a5' },
  'Ermeneutica': { bg: '#2d1a00', bordo: '#d97706', testo: '#fcd34d' },
  'Teoria queer': { bg: '#500636', bordo: '#f472b6', testo: '#f9a8d4' },
  'Filosofia femminista': { bg: '#0c2626', bordo: '#2dd4bf', testo: '#5eead4' },
  'Filosofia della tecnologia': { bg: '#1a1a24', bordo: '#64748b', testo: '#94a3b8' },
  'Studi femministi della scienza': { bg: '#0a1f12', bordo: '#16a34a', testo: '#4ade80' },
  'Filosofia morale': { bg: '#261a00', bordo: '#fcd34d', testo: '#fde68a' },
  'Filosofia della fisica': { bg: '#0a1520', bordo: '#7dd3fc', testo: '#bae6fd' },
}

// ID dei filosofi con scheda nell'enciclopedia
const HAI_SCHEDA = new Set([
  'derrida', 'foucault', 'hegel', 'heidegger', 'wittgenstein',
  'bodei', 'deleuze', 'weil', 'arendt', 'husserl', 'fink', 'jung', 'freud',
  'marx', 'nietzsche', 'byung-chul han',
  'agamben', 'baudrillard', 'blumenberg', 'butler', 'cavarero', 'costa',
  'esposito', 'han', 'haraway', 'jankelevitch', 'levinas', 'patocka', 'rovelli',
])

const gruppi = [...new Set(filosofi.map(f => f.gruppo))]

export default function MappaFilosofi() {
  const navigate = useNavigate()
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
    const colori = coloriGruppo[f.gruppo] ?? { bg: '#1a1a2e', bordo: '#334155', testo: '#94a3b8' }

    const stili = {
      neutro: { opacity: 1, borderColor: '#1e293b', background: '#0d0d1a' },
      selezionato: { opacity: 1, borderColor: colori.bordo, background: colori.bg, boxShadow: `0 0 20px ${colori.bordo}44` },
      connesso: { opacity: 1, borderColor: colori.bordo + '88', background: colori.bg + '88' },
      dimmed: { opacity: 0.2, borderColor: '#1e293b', background: '#0d0d1a' },
    }

    return (
      <div
        onClick={() => setSelezionato(selezionato === f.id ? null : f.id)}
        style={{
          border: '1px solid',
          borderRadius: 12,
          padding: '14px',
          cursor: 'pointer',
          transition: 'all 0.25s',
          ...stili[stato],
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 6 }}>{f.emoji}</div>
        <div style={{ fontWeight: 700, fontSize: 13, color: stato === 'dimmed' ? '#475569' : '#f0e6d3', marginBottom: 2 }}>
          {f.nome}
        </div>
        <div style={{ fontSize: 10, color: '#475569', marginBottom: 8 }}>{f.anni}</div>
        <div style={{
          display: 'inline-block', fontSize: 9, padding: '2px 8px',
          borderRadius: 99, border: `1px solid ${colori.bordo}66`,
          color: colori.testo, background: colori.bg, letterSpacing: 0.5,
        }}>
          {f.gruppo}
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#0a0a0f', minHeight: 'calc(100vh - 57px)', color: '#e2e8f0' }}>

      {/* Intestazione pagina */}
      <div style={{ borderBottom: '1px solid #1e293b', padding: '1rem 1.5rem' }}>
        <p style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', margin: '0 0 2px' }}>
          Filosofia Applicata
        </p>
        <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0, color: '#f0e6d3' }}>
          Mappa delle Connessioni
        </h1>
      </div>

      {/* Tab vista */}
      <div style={{ display: 'flex', gap: 8, padding: '1rem 1.5rem', borderBottom: '1px solid #1e293b' }}>
        {['griglia', 'correnti'].map(v => (
          <button
            key={v}
            onClick={() => setVistaAttiva(v)}
            style={{
              padding: '6px 16px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
              fontFamily: 'Georgia, serif', border: '1px solid',
              borderColor: vistaAttiva === v ? '#c9a84c' : '#1e293b',
              background: vistaAttiva === v ? '#c9a84c22' : 'transparent',
              color: vistaAttiva === v ? '#c9a84c' : '#475569',
              transition: 'all 0.2s',
            }}
          >
            {v === 'griglia' ? '📋 Tutti i filosofi' : '🗂️ Per corrente'}
          </button>
        ))}
        {selezionato && (
          <button
            onClick={() => setSelezionato(null)}
            style={{
              marginLeft: 'auto', padding: '6px 16px', borderRadius: 99, fontSize: 12,
              cursor: 'pointer', fontFamily: 'Georgia, serif',
              border: '1px solid #334155', background: 'transparent', color: '#64748b',
            }}
          >
            ✕ Deseleziona
          </button>
        )}
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 57px - 120px)' }}>

        {/* Contenuto principale */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>

          {vistaAttiva === 'griglia' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
              {filosofi.map(f => <CardFilosofo key={f.id} f={f} />)}
            </div>
          )}

          {vistaAttiva === 'correnti' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {gruppi.map(gruppo => {
                const filoGruppo = filosofi.filter(f => f.gruppo === gruppo)
                const colori = coloriGruppo[gruppo] ?? { bordo: '#334155', testo: '#94a3b8', bg: '#1a1a2e' }
                return (
                  <div key={gruppo}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ height: 1, flex: 1, background: colori.bordo + '44' }} />
                      <span style={{ fontSize: 11, color: colori.testo, letterSpacing: 2, textTransform: 'uppercase' }}>
                        {gruppo}
                      </span>
                      <div style={{ height: 1, flex: 1, background: colori.bordo + '44' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                      {filoGruppo.map(f => <CardFilosofo key={f.id} f={f} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Pannello connessioni */}
        {filosofoSelezionato && (
          <div style={{
            width: 260, borderLeft: '1px solid #1e293b',
            background: '#0d0d1a', padding: '1.5rem', overflowY: 'auto',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>{filosofoSelezionato.emoji}</div>
              <h2 style={{ fontSize: 16, fontWeight: 900, color: '#f0e6d3', margin: '0 0 4px' }}>
                {filosofoSelezionato.nome}
              </h2>
              <p style={{ fontSize: 11, color: '#475569', margin: '0 0 12px' }}>{filosofoSelezionato.anni}</p>
              <p style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{filosofoSelezionato.citazione}"
              </p>
              {HAI_SCHEDA.has(filosofoSelezionato.id) && (
                <button
                  onClick={() => navigate(`/filosofo/${filosofoSelezionato.id}`)}
                  style={{
                    marginTop: 12, padding: '6px 16px', borderRadius: 99, fontSize: 11,
                    cursor: 'pointer', fontFamily: 'Georgia, serif',
                    border: '1px solid #c9a84c44', background: '#c9a84c11', color: '#c9a84c',
                  }}
                >
                  Vai alla scheda →
                </button>
              )}
            </div>

            {/* Ha influenzato */}
            {filosofoSelezionato.connessioni.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 9, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
                  Ha influenzato
                </div>
                {filosofoSelezionato.connessioni.map(id => {
                  const c = filosofi.find(f => f.id === id)
                  const colori = coloriGruppo[c?.gruppo] ?? { bordo: '#334155' }
                  return c ? (
                    <div
                      key={id}
                      onClick={() => setSelezionato(id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                        marginBottom: 6, background: '#1a1a2e',
                        border: `1px solid ${colori.bordo}44`,
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{c.emoji}</span>
                      <div>
                        <div style={{ fontSize: 12, color: '#c8b89a', fontWeight: 600 }}>{c.nome}</div>
                        <div style={{ fontSize: 10, color: '#475569' }}>{c.gruppo}</div>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            )}

            {/* Influenzato da */}
            {filosofi.filter(f => f.connessioni.includes(filosofoSelezionato.id)).length > 0 && (
              <div>
                <div style={{ fontSize: 9, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
                  Influenzato da
                </div>
                {filosofi.filter(f => f.connessioni.includes(filosofoSelezionato.id)).map(f => {
                  const colori = coloriGruppo[f.gruppo] ?? { bordo: '#334155' }
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelezionato(f.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                        marginBottom: 6, background: '#1a1a2e',
                        border: `1px solid ${colori.bordo}44`,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{f.emoji}</span>
                      <div>
                        <div style={{ fontSize: 12, color: '#c8b89a', fontWeight: 600 }}>{f.nome}</div>
                        <div style={{ fontSize: 10, color: '#475569' }}>{f.gruppo}</div>
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
