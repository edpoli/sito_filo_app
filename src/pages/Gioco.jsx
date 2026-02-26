import { useState, useEffect, useRef } from 'react'

// ── PALETTE ───────────────────────────────────────────────────────────────────
const C = {
  bg: '#0a0a0f',
  panel: '#12121a',
  card: '#16161f',
  border: '#252535',
  gold: '#c9a84c',
  text: '#e8e0d0',
  dim: '#6a6a8a',
  red: '#e06060',
  green: '#60c080',
}

// ── DATI FILOSOFI ─────────────────────────────────────────────────────────────
const FILOSOFI_DATA = [
  {
    id: 'derrida', nome: 'Derrida', emoji: '✂️',
    corrente: 'decostruzionismo', colore: '#fb7185',
    stats: { influenza: 70, oscurita: 85, argomentazione: 55 },
    potere: { nome: 'Decostruzione', desc: "Dimezza l'argomentazione avversaria", tipo: 'halve_enemy_arg' },
  },
  {
    id: 'foucault', nome: 'Foucault', emoji: '👁️',
    corrente: 'post-strutturalismo', colore: '#fb923c',
    stats: { influenza: 88, oscurita: 62, argomentazione: 72 },
    potere: { nome: 'Archeologia del sapere', desc: 'Influenza ×1.5', tipo: 'boost_infl' },
  },
  {
    id: 'hegel', nome: 'Hegel', emoji: '🌀',
    corrente: 'idealismo', colore: '#60a5fa',
    stats: { influenza: 78, oscurita: 90, argomentazione: 82 },
    potere: { nome: 'Sintesi Dialettica', desc: 'Se in svantaggio +25 alla stat più bassa', tipo: 'sintesi' },
  },
  {
    id: 'heidegger', nome: 'Heidegger', emoji: '🌲',
    corrente: 'esistenzialismo', colore: '#4ade80',
    stats: { influenza: 75, oscurita: 88, argomentazione: 62 },
    potere: { nome: 'Essere-per-la-morte', desc: 'Silenzia il potere avversario', tipo: 'silence' },
  },
  {
    id: 'wittgenstein', nome: 'Wittgenstein', emoji: '🔷',
    corrente: 'fil. del linguaggio', colore: '#22d3ee',
    stats: { influenza: 72, oscurita: 65, argomentazione: 90 },
    potere: { nome: 'Silenzio Necessario', desc: 'Silenzia il potere avversario', tipo: 'silence' },
  },
  {
    id: 'bodei', nome: 'Bodei', emoji: '🇮🇹',
    corrente: 'fil. italiana', colore: '#a3e635',
    stats: { influenza: 58, oscurita: 45, argomentazione: 78 },
    potere: { nome: 'Passioni e Ragione', desc: 'Raddoppia il bonus del tema', tipo: 'tema_double' },
  },
  {
    id: 'deleuze', nome: 'Deleuze', emoji: '🌿',
    corrente: 'post-strutturalismo', colore: '#34d399',
    stats: { influenza: 68, oscurita: 80, argomentazione: 52 },
    potere: { nome: 'Rizoma', desc: 'Scambia la tua stat migliore con quella avversaria', tipo: 'swap_best' },
  },
  {
    id: 'weil', nome: 'S. Weil', emoji: '✨',
    corrente: 'mistica', colore: '#facc15',
    stats: { influenza: 60, oscurita: 55, argomentazione: 72 },
    potere: { nome: 'Attenzione Mistica', desc: 'Ignora lo svantaggio di corrente', tipo: 'ignore_type' },
  },
  {
    id: 'arendt', nome: 'Arendt', emoji: '⚖️',
    corrente: 'fil. politica', colore: '#a78bfa',
    stats: { influenza: 78, oscurita: 58, argomentazione: 82 },
    potere: { nome: 'Vita Activa', desc: 'Argomentazione ×1.5', tipo: 'boost_arg' },
  },
  {
    id: 'husserl', nome: 'Husserl', emoji: '🔬',
    corrente: 'fenomenologia', colore: '#38bdf8',
    stats: { influenza: 72, oscurita: 82, argomentazione: 80 },
    potere: { nome: 'Epoché', desc: 'Azzera tutti i modificatori — statistiche base pure', tipo: 'reset' },
  },
  {
    id: 'fink', nome: 'E. Fink', emoji: '🎭',
    corrente: 'fenomenologia', colore: '#818cf8',
    stats: { influenza: 45, oscurita: 70, argomentazione: 68 },
    potere: { nome: 'Gioco Cosmologico', desc: 'Il vincitore del round è deciso dal caso', tipo: 'random_win' },
  },
  {
    id: 'jung', nome: 'C.G. Jung', emoji: '☯️',
    corrente: 'psicologia analitica', colore: '#fbbf24',
    stats: { influenza: 82, oscurita: 72, argomentazione: 58 },
    potere: { nome: 'Inconscio Collettivo', desc: "Copia la stat più alta dell'avversario", tipo: 'copy_best' },
  },
  {
    id: 'freud', nome: 'Freud', emoji: '🧠',
    corrente: 'psicoanalisi', colore: '#f87171',
    stats: { influenza: 88, oscurita: 65, argomentazione: 72 },
    potere: { nome: 'Rimozione', desc: 'Tutte le statistiche +15', tipo: 'boost_all' },
  },
]

// ── TEMI ──────────────────────────────────────────────────────────────────────
const TEMI = [
  {
    id: 'liberta', nome: 'Libertà', emoji: '🕊️',
    desc: 'Esalta chi pensa la libertà come azione politica',
    mod: { arendt: 1.25, hegel: 1.15, heidegger: 1.1, weil: 1.1, foucault: 0.85, freud: 0.9 },
  },
  {
    id: 'morte', nome: 'Morte', emoji: '💀',
    desc: 'Territorio di Heidegger e della psiche profonda',
    mod: { heidegger: 1.35, weil: 1.2, freud: 1.15, jung: 1.1, bodei: 0.85, wittgenstein: 0.9 },
  },
  {
    id: 'potere', nome: 'Potere', emoji: '👑',
    desc: 'Arena del controllo e della sorveglianza',
    mod: { foucault: 1.3, arendt: 1.2, hegel: 1.1, derrida: 1.05, fink: 0.8, weil: 0.85 },
  },
  {
    id: 'linguaggio', nome: 'Linguaggio', emoji: '💬',
    desc: 'Il dominio della parola e del silenzio',
    mod: { wittgenstein: 1.35, derrida: 1.25, heidegger: 1.1, foucault: 1.05, freud: 0.85, jung: 0.9 },
  },
  {
    id: 'giustizia', nome: 'Giustizia', emoji: '⚖️',
    desc: 'Il campo del diritto e dell\'etica politica',
    mod: { arendt: 1.2, hegel: 1.2, weil: 1.15, bodei: 1.1, deleuze: 0.85, fink: 0.9 },
  },
  {
    id: 'inconscio', nome: 'Inconscio', emoji: '🌙',
    desc: 'Le profondità della psiche',
    mod: { freud: 1.3, jung: 1.3, deleuze: 1.1, derrida: 1.05, husserl: 0.8, wittgenstein: 0.85 },
  },
  {
    id: 'tempo', nome: 'Tempo', emoji: '⏳',
    desc: 'La temporalità come struttura dell\'esistenza',
    mod: { heidegger: 1.25, hegel: 1.15, husserl: 1.15, bodei: 1.1, fink: 1.2, wittgenstein: 0.9 },
  },
  {
    id: 'arte', nome: 'Arte', emoji: '🎨',
    desc: 'La dimensione estetica del pensiero',
    mod: { deleuze: 1.25, fink: 1.3, jung: 1.15, weil: 1.1, wittgenstein: 1.05, husserl: 0.9 },
  },
]

// ── VANTAGGI DI CORRENTE ──────────────────────────────────────────────────────
// chiave batte valore (+15% alla stat selezionata)
const TYPE_ADV = {
  'idealismo': 'esistenzialismo',
  'esistenzialismo': 'fenomenologia',
  'fenomenologia': 'fil. del linguaggio',
  'fil. del linguaggio': 'post-strutturalismo',
  'post-strutturalismo': 'fil. politica',
  'fil. politica': 'mistica',
  'mistica': 'psicologia analitica',
  'psicologia analitica': 'psicoanalisi',
  'psicoanalisi': 'decostruzionismo',
  'decostruzionismo': 'idealismo',
}

// ── LOGICA ────────────────────────────────────────────────────────────────────
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }
function randTema() { return TEMI[Math.floor(Math.random() * TEMI.length)] }
function getMazzi() {
  const sh = shuffle(FILOSOFI_DATA)
  return { mG1: sh.slice(0, 4), mG2: sh.slice(4, 8) }
}

function calcolaStats(carta, tema, usaPotere, silenced, resettato, enemyCarta) {
  if (resettato) return { ...carta.stats }
  let s = { ...carta.stats }
  const mod = tema.mod[carta.id] ?? 1.0
  let effMod = mod
  if (usaPotere && !silenced && carta.potere.tipo === 'tema_double') {
    effMod = 1 + (mod - 1) * 2
  }
  s.influenza = Math.round(s.influenza * effMod)
  s.oscurita = Math.round(s.oscurita * effMod)
  s.argomentazione = Math.round(s.argomentazione * effMod)
  if (usaPotere && !silenced) {
    const t = carta.potere.tipo
    if (t === 'boost_infl') s.influenza = Math.round(s.influenza * 1.5)
    if (t === 'boost_arg') s.argomentazione = Math.round(s.argomentazione * 1.5)
    if (t === 'boost_all') { s.influenza += 15; s.oscurita += 15; s.argomentazione += 15 }
    if (t === 'copy_best' && enemyCarta) {
      const best = Object.keys(enemyCarta.stats).reduce((a, b) => enemyCarta.stats[a] > enemyCarta.stats[b] ? a : b)
      if (enemyCarta.stats[best] > s[best]) s[best] = enemyCarta.stats[best]
    }
  }
  return s
}

function risolviRound({ cartaG1, cartaG2, stat, tema, potereG1, potereG2 }) {
  const silG1 = potereG2 && cartaG2.potere.tipo === 'silence'
  const silG2 = potereG1 && cartaG1.potere.tipo === 'silence'
  const effP1 = potereG1 && !silG1
  const effP2 = potereG2 && !silG2
  const effetti = []
  if (silG1) effetti.push(`🔇 ${cartaG2.nome} silenzia il potere di ${cartaG1.nome}`)
  if (silG2) effetti.push(`🔇 ${cartaG1.nome} silenzia il potere di ${cartaG2.nome}`)

  // Gioco cosmologico — priorità massima
  if (effP1 && cartaG1.potere.tipo === 'random_win') {
    const w = Math.random() < 0.5 ? 1 : 2
    return { winner: w, v1: '?', v2: '?', tipoRel: 'neutro', effetti: [...effetti, '🎭 Gioco Cosmologico: esito casuale!'] }
  }
  if (effP2 && cartaG2.potere.tipo === 'random_win') {
    const w = Math.random() < 0.5 ? 1 : 2
    return { winner: w, v1: '?', v2: '?', tipoRel: 'neutro', effetti: [...effetti, '🎭 Gioco Cosmologico: esito casuale!'] }
  }

  const reset1 = effP2 && cartaG2.potere.tipo === 'reset'
  const reset2 = effP1 && cartaG1.potere.tipo === 'reset'
  if (reset1) effetti.push(`🔬 Epoché di ${cartaG2.nome}: modificatori azzerati per G1`)
  if (reset2) effetti.push(`🔬 Epoché di ${cartaG1.nome}: modificatori azzerati per G2`)

  let s1 = calcolaStats(cartaG1, tema, effP1, silG1, reset1, cartaG2)
  let s2 = calcolaStats(cartaG2, tema, effP2, silG2, reset2, cartaG1)

  // Dimezza argomentazione nemica
  if (effP1 && cartaG1.potere.tipo === 'halve_enemy_arg') {
    s2.argomentazione = Math.round(s2.argomentazione * 0.5)
    effetti.push(`✂️ Decostruzione: argomentazione di ${cartaG2.nome} dimezzata`)
  }
  if (effP2 && cartaG2.potere.tipo === 'halve_enemy_arg') {
    s1.argomentazione = Math.round(s1.argomentazione * 0.5)
    effetti.push(`✂️ Decostruzione: argomentazione di ${cartaG1.nome} dimezzata`)
  }

  // Rizoma — scambio stat migliore
  if (effP1 && cartaG1.potere.tipo === 'swap_best') {
    const best = Object.keys(s1).reduce((a, b) => s1[a] > s1[b] ? a : b)
    const tmp = s1[best]; s1[best] = s2[best]; s2[best] = tmp
    effetti.push(`🌿 Rizoma: scambio di ${best}`)
  }
  if (effP2 && cartaG2.potere.tipo === 'swap_best') {
    const best = Object.keys(s2).reduce((a, b) => s2[a] > s2[b] ? a : b)
    const tmp = s2[best]; s2[best] = s1[best]; s1[best] = tmp
    effetti.push(`🌿 Rizoma: scambio di ${best}`)
  }

  // Sintesi Dialettica — se in svantaggio, +25 alla stat più debole
  const pre1 = s1[stat], pre2 = s2[stat]
  if (effP1 && cartaG1.potere.tipo === 'sintesi' && pre1 < pre2) {
    const weak = Object.keys(s1).reduce((a, b) => s1[a] < s1[b] ? a : b)
    s1[weak] += 25
    effetti.push(`🌀 Sintesi Dialettica: +25 a ${weak} di ${cartaG1.nome}`)
  }
  if (effP2 && cartaG2.potere.tipo === 'sintesi' && pre2 < pre1) {
    const weak = Object.keys(s2).reduce((a, b) => s2[a] < s2[b] ? a : b)
    s2[weak] += 25
    effetti.push(`🌀 Sintesi Dialettica: +25 a ${weak} di ${cartaG2.nome}`)
  }

  // Vantaggio di corrente
  const tipoRel = TYPE_ADV[cartaG1.corrente] === cartaG2.corrente ? 'vantaggio'
    : TYPE_ADV[cartaG2.corrente] === cartaG1.corrente ? 'svantaggio' : 'neutro'
  const ignoreType = (effP1 && cartaG1.potere.tipo === 'ignore_type') || (effP2 && cartaG2.potere.tipo === 'ignore_type')

  let v1 = s1[stat], v2 = s2[stat]
  if (!ignoreType) {
    if (tipoRel === 'vantaggio') { v1 = Math.round(v1 * 1.15); effetti.push('💥 Vantaggio di corrente per G1 (+15%)') }
    if (tipoRel === 'svantaggio') { v2 = Math.round(v2 * 1.15); effetti.push('💥 Vantaggio di corrente per G2 (+15%)') }
  } else if (tipoRel !== 'neutro') {
    effetti.push('✨ Attenzione Mistica: svantaggio di tipo ignorato')
  }

  const winner = v1 > v2 ? 1 : v2 > v1 ? 2 : 0
  return { winner, v1, v2, tipoRel: ignoreType ? 'neutro' : tipoRel, effetti }
}

function cpuScegliCarta(mazzo, tema) {
  return mazzo.reduce((best, c) => {
    const score = (c.stats.influenza + c.stats.oscurita + c.stats.argomentazione) * (tema.mod[c.id] ?? 1.0)
    const bScore = (best.stats.influenza + best.stats.oscurita + best.stats.argomentazione) * (tema.mod[best.id] ?? 1.0)
    return score > bScore ? c : best
  })
}

function cpuScegliStat(carta, tema) {
  const mod = tema.mod[carta.id] ?? 1.0
  const scores = {
    influenza: carta.stats.influenza * mod,
    oscurita: carta.stats.oscurita * mod,
    argomentazione: carta.stats.argomentazione * mod,
  }
  return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)
}

// ── STILI ─────────────────────────────────────────────────────────────────────
function btnStyle(variant = 'gold', size = 'md') {
  return {
    padding: size === 'sm' ? '6px 14px' : '10px 24px',
    background: variant === 'gold' ? C.gold : 'transparent',
    color: variant === 'gold' ? '#0a0a0f' : C.gold,
    border: `2px solid ${C.gold}`,
    borderRadius: '8px',
    fontSize: size === 'sm' ? '12px' : '14px',
    fontFamily: 'Georgia, serif',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
}

// ── COMPONENTI ────────────────────────────────────────────────────────────────
function CartaFilosofo({ carta, selected, dimmed, onClick, tema, showStats }) {
  const mod = tema ? (tema.mod[carta.id] ?? 1.0) : 1.0
  return (
    <div
      onClick={onClick}
      style={{
        width: 128,
        minHeight: 180,
        background: selected ? '#1e1e30' : C.card,
        border: `2px solid ${selected ? carta.colore : carta.colore + '55'}`,
        borderRadius: '10px',
        padding: '12px 10px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        transform: selected ? 'scale(1.07) translateY(-3px)' : 'scale(1)',
        boxShadow: selected ? `0 0 16px ${carta.colore}55` : 'none',
        opacity: dimmed ? 0.35 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        position: 'relative',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {mod > 1.02 && (
        <div style={{ position: 'absolute', top: 4, right: 5, fontSize: '9px', color: C.green, fontWeight: 'bold' }}>
          ▲{Math.round((mod - 1) * 100)}%
        </div>
      )}
      {mod < 0.98 && (
        <div style={{ position: 'absolute', top: 4, right: 5, fontSize: '9px', color: C.red, fontWeight: 'bold' }}>
          ▼{Math.round((1 - mod) * 100)}%
        </div>
      )}
      <div style={{ fontSize: '28px', lineHeight: 1 }}>{carta.emoji}</div>
      <div style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center', color: C.text, lineHeight: 1.2 }}>
        {carta.nome}
      </div>
      <div style={{
        fontSize: '8px',
        border: `1px solid ${carta.colore}`,
        color: carta.colore,
        borderRadius: '3px',
        padding: '1px 5px',
        textAlign: 'center',
        lineHeight: 1.4,
      }}>
        {carta.corrente}
      </div>
      {showStats && (
        <div style={{ width: '100%', marginTop: '6px' }}>
          {[['influenza', 'INF'], ['oscurita', 'OSC'], ['argomentazione', 'ARG']].map(([k, lbl]) => {
            const val = Math.round(carta.stats[k] * mod)
            return (
              <div key={k} style={{ fontSize: '9px', color: C.dim, marginBottom: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
                  <span>{lbl}</span>
                  <span style={{ color: carta.colore }}>{val}</span>
                </div>
                <div style={{ height: '3px', background: C.border, borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${Math.min(val, 100)}%`, background: carta.colore, borderRadius: '2px' }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
      <div style={{ fontSize: '8px', color: C.dim, textAlign: 'center', marginTop: 'auto', paddingTop: '4px', fontStyle: 'italic' }}>
        ⚡ {carta.potere.nome}
      </div>
    </div>
  )
}

function ModalitaScreen({ onScegli }) {
  const [hov, setHov] = useState(null)
  return (
    <div style={{
      minHeight: '100vh', background: C.bg, color: C.text,
      fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '24px', boxSizing: 'border-box',
    }}>
      <div style={{ fontSize: '12px', color: C.gold, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px' }}>
        Enciclopedia Filosofica
      </div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: C.gold, marginBottom: '6px', textAlign: 'center' }}>
        ♟ Duello Filosofico
      </div>
      <div style={{ fontSize: '14px', color: C.dim, fontStyle: 'italic', marginBottom: '48px', textAlign: 'center' }}>
        13 filosofi. 8 temi. Chi prevale nel combattimento delle idee?
      </div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'cpu', emoji: '🤖', nome: 'vs CPU', sub: 'Affronta un avversario semi-intelligente' },
          { id: 'pvp', emoji: '👥', nome: 'Due Giocatori', sub: 'Stesso schermo — passatevi il dispositivo' },
        ].map(m => (
          <div
            key={m.id}
            onClick={() => onScegli(m.id)}
            onMouseEnter={() => setHov(m.id)}
            onMouseLeave={() => setHov(null)}
            style={{
              background: hov === m.id ? '#1a1a2a' : C.panel,
              border: `2px solid ${hov === m.id ? C.gold : C.border}`,
              borderRadius: '16px', padding: '40px 48px', cursor: 'pointer',
              textAlign: 'center', transition: 'all 0.2s', minWidth: '200px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{m.emoji}</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: C.gold, marginBottom: '8px' }}>{m.nome}</div>
            <div style={{ fontSize: '13px', color: C.dim }}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '48px', fontSize: '11px', color: C.dim, textAlign: 'center', maxWidth: '400px', lineHeight: 1.7 }}>
        4 filosofi a testa · 10 round · tema casuale ogni round<br />
        Vince chi cattura tutte le carte nemiche — o ne ha di più dopo 10 round
      </div>
    </div>
  )
}

function PvpPassaSchermo({ onContinua }) {
  return (
    <div style={{
      minHeight: '100vh', background: C.bg, color: C.text, fontFamily: 'Georgia, serif',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
    }}>
      <div style={{ fontSize: '64px' }}>🤫</div>
      <div style={{ fontSize: '22px', fontWeight: 'bold', color: C.gold }}>Passa il dispositivo</div>
      <div style={{ fontSize: '14px', color: C.dim, textAlign: 'center', maxWidth: '300px' }}>
        Giocatore 1 ha scelto. Non mostrare lo schermo a Giocatore 2 prima del click.
      </div>
      <button onClick={onContinua} style={btnStyle()}>
        Giocatore 2: scegli la tua carta →
      </button>
    </div>
  )
}

// ── COMPONENTE PRINCIPALE ─────────────────────────────────────────────────────
export default function Gioco() {
  const [modalita, setModalita] = useState(null)
  const [mazzoG1, setMazzoG1] = useState([])
  const [mazzoG2, setMazzoG2] = useState([])
  const [cartaG1, setCartaG1] = useState(null)
  const [cartaG2, setCartaG2] = useState(null)
  const [statScelta, setStatScelta] = useState(null)
  const [potereG1, setPotereG1] = useState(false)
  const [potereG2, setPotereG2] = useState(false)
  const [tema, setTema] = useState(null)
  // fasi: 'selezione' | 'cpu_pensa' | 'combattimento' | 'risultato'
  const [fase, setFase] = useState('selezione')
  // pvpStep: 'g1' | 'passa' | 'g2' | 'stat'
  const [pvpStep, setPvpStep] = useState('g1')
  const [round, setRound] = useState(1)
  const [risultato, setRisultato] = useState(null)
  const [log, setLog] = useState([])
  const [partitaFinita, setPartitaFinita] = useState(false)
  const combatFired = useRef(false)

  function initGame(mod) {
    const { mG1, mG2 } = getMazzi()
    setMazzoG1(mG1); setMazzoG2(mG2)
    setTema(randTema())
    setCartaG1(null); setCartaG2(null); setStatScelta(null)
    setPotereG1(false); setPotereG2(false)
    setFase('selezione'); setRound(1); setLog([]); setRisultato(null)
    setPartitaFinita(false); setPvpStep('g1')
    combatFired.current = false
    setModalita(mod)
  }

  // CPU sceglie dopo 1.5s
  useEffect(() => {
    if (fase !== 'cpu_pensa' || modalita !== 'cpu') return
    const timer = setTimeout(() => {
      const scelta = cpuScegliCarta(mazzoG2, tema)
      const usaPotere = Math.random() > 0.35
      setCartaG2(scelta)
      setPotereG2(usaPotere)
      combatFired.current = false
      setFase('combattimento')
    }, 1500)
    return () => clearTimeout(timer)
  }, [fase, modalita, mazzoG2, tema])

  // Risoluzione combattimento
  useEffect(() => {
    if (fase !== 'combattimento' || !cartaG1 || !cartaG2 || !statScelta || combatFired.current) return
    combatFired.current = true

    const res = risolviRound({ cartaG1, cartaG2, stat: statScelta, tema, potereG1, potereG2 })
    setRisultato(res)

    let newG1 = [...mazzoG1]
    let newG2 = [...mazzoG2]
    if (res.winner === 1) {
      newG2 = newG2.filter(c => c.id !== cartaG2.id)
      newG1 = [...newG1, { ...cartaG2 }]
    } else if (res.winner === 2) {
      newG1 = newG1.filter(c => c.id !== cartaG1.id)
      newG2 = [...newG2, { ...cartaG1 }]
    }

    setMazzoG1(newG1)
    setMazzoG2(newG2)

    const riga = `R${round}: ${cartaG1.nome} vs ${cartaG2.nome} [${statScelta}] → ${res.winner === 0 ? 'Pareggio' : `G${res.winner} vince (${res.v1} vs ${res.v2})`}`
    setLog(prev => [...prev, riga])

    const fine = newG1.length === 0 || newG2.length === 0 || round >= 10
    setPartitaFinita(fine)
    setFase('risultato')
  }, [fase]) // eslint-disable-line

  function prossimoRound() {
    setCartaG1(null); setCartaG2(null); setStatScelta(null)
    setPotereG1(false); setPotereG2(false); setRisultato(null)
    setTema(randTema()); setRound(r => r + 1); setPvpStep('g1')
    combatFired.current = false
    setFase('selezione')
  }

  if (!modalita) return <ModalitaScreen onScegli={initGame} />

  const isPvp = modalita === 'pvp'
  const nomeG2 = isPvp ? 'Giocatore 2' : 'CPU'

  // Schermata "passa il dispositivo" PvP
  if (isPvp && pvpStep === 'passa') {
    return <PvpPassaSchermo onContinua={() => setPvpStep('g2')} />
  }

  const isG2Step = isPvp && pvpStep === 'g2'
  const isStatStep = isPvp && pvpStep === 'stat'

  // In G2 step mostriamo il mazzo di G2, altrimenti quello di G1
  const mazzoAttivo = isG2Step ? mazzoG2 : mazzoG1
  const cartaAttiva = isG2Step ? cartaG2 : cartaG1
  const setCarta = isG2Step ? setCartaG2 : setCartaG1
  const potereAttivo = isG2Step ? potereG2 : potereG1
  const setPotere = isG2Step ? setPotereG2 : setPotereG1

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      color: C.text,
      fontFamily: 'Georgia, serif',
      padding: '16px',
      boxSizing: 'border-box',
    }}>

      {/* INTESTAZIONE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ color: C.gold, fontWeight: 'bold', fontSize: '16px' }}>♟ Duello Filosofico</span>
          <span style={{ color: C.dim, fontSize: '12px', marginLeft: '12px' }}>
            Round {round}/10 · {isPvp ? 'PvP' : 'vs CPU'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: C.dim }}>
            G1 <span style={{ color: C.text, fontWeight: 'bold' }}>{mazzoG1.length} ♟</span>
          </span>
          <span style={{ fontSize: '12px', color: C.dim }}>
            {nomeG2} <span style={{ color: C.text, fontWeight: 'bold' }}>{mazzoG2.length} ♟</span>
          </span>
          <button onClick={() => setModalita(null)} style={btnStyle('outline', 'sm')}>✕ Esci</button>
        </div>
      </div>

      {/* TEMA CORRENTE */}
      {tema && (
        <div style={{
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: '10px',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '24px' }}>{tema.emoji}</span>
          <div>
            <div style={{ fontSize: '10px', color: C.gold, textTransform: 'uppercase', letterSpacing: '1px' }}>Tema del round</div>
            <div style={{ fontWeight: 'bold' }}>
              {tema.nome}{' '}
              <span style={{ fontSize: '12px', color: C.dim, fontStyle: 'italic', fontWeight: 'normal' }}>
                — {tema.desc}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* RISULTATO ROUND */}
      {fase === 'risultato' && risultato && (
        <div style={{
          background: C.panel,
          border: `2px solid ${risultato.winner === 0 ? C.dim : risultato.winner === 1 ? C.green : C.red}`,
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: risultato.winner === 0 ? C.dim : risultato.winner === 1 ? C.green : C.red,
            marginBottom: '10px',
          }}>
            {risultato.winner === 0
              ? '🤝 Pareggio!'
              : risultato.winner === 1
              ? '✅ Giocatore 1 vince il round!'
              : `${isPvp ? '✅ Giocatore 2' : '🤖 CPU'} vince il round!`}
          </div>

          {/* Carte in campo */}
          {cartaG1 && cartaG2 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <CartaFilosofo carta={cartaG1} tema={tema} showStats />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{ fontSize: '28px', color: C.dim }}>⚔️</div>
                <div style={{ fontSize: '11px', color: C.dim, textTransform: 'uppercase', letterSpacing: '1px' }}>{statScelta}</div>
                <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
                  <span style={{ color: risultato.winner === 1 ? C.green : C.text }}>{risultato.v1}</span>
                  {' vs '}
                  <span style={{ color: risultato.winner === 2 ? C.green : C.text }}>{risultato.v2}</span>
                </div>
                {risultato.tipoRel === 'vantaggio' && <div style={{ fontSize: '10px', color: C.green }}>G1 vantaggio di corrente</div>}
                {risultato.tipoRel === 'svantaggio' && <div style={{ fontSize: '10px', color: C.red }}>G2 vantaggio di corrente</div>}
              </div>
              <CartaFilosofo carta={cartaG2} tema={tema} showStats />
            </div>
          )}

          {/* Effetti */}
          {risultato.effetti?.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              {risultato.effetti.map((e, i) => (
                <div key={i} style={{ fontSize: '11px', color: C.dim, fontStyle: 'italic' }}>{e}</div>
              ))}
            </div>
          )}

          {/* Punteggi aggiornati */}
          <div style={{ fontSize: '13px', color: C.dim, marginBottom: '16px' }}>
            G1: <b style={{ color: C.text }}>{mazzoG1.length} carte</b> · {nomeG2}: <b style={{ color: C.text }}>{mazzoG2.length} carte</b>
          </div>

          {!partitaFinita ? (
            <button onClick={prossimoRound} style={btnStyle()}>Prossimo round →</button>
          ) : (
            <div>
              <div style={{ color: C.gold, marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
                {mazzoG1.length > mazzoG2.length
                  ? '🏆 Giocatore 1 vince la partita!'
                  : mazzoG2.length > mazzoG1.length
                  ? `🏆 ${nomeG2} vince la partita!`
                  : '🤝 Pareggio finale!'}
              </div>
              <div style={{ fontSize: '13px', color: C.dim, marginBottom: '16px' }}>
                G1: {mazzoG1.length} carte · {nomeG2}: {mazzoG2.length} carte
              </div>
              <button onClick={() => setModalita(null)} style={btnStyle()}>Nuova partita</button>
            </div>
          )}
        </div>
      )}

      {/* CPU STA PENSANDO */}
      {fase === 'cpu_pensa' && (
        <div style={{
          background: C.panel, border: `1px solid ${C.border}`,
          borderRadius: '10px', padding: '16px', marginBottom: '16px', textAlign: 'center',
        }}>
          <div style={{ color: C.dim, fontStyle: 'italic', fontSize: '14px' }}>🤖 La CPU sta pensando...</div>
        </div>
      )}

      {/* FASE SELEZIONE */}
      {fase === 'selezione' && (
        <div>
          {/* Intestazione turno */}
          <div style={{ fontSize: '11px', color: C.dim, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            {isStatStep
              ? 'Giocatore 1 — scegli la statistica del duello:'
              : isG2Step
              ? 'Giocatore 2 — scegli la tua carta:'
              : 'Giocatore 1 — scegli la tua carta:'}
          </div>

          {/* Selezione carta (non mostrata nel passo stat) */}
          {!isStatStep && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              {mazzoAttivo.map(c => (
                <CartaFilosofo
                  key={c.id}
                  carta={c}
                  selected={cartaAttiva?.id === c.id}
                  dimmed={false}
                  onClick={() => setCarta(c)}
                  tema={tema}
                  showStats
                />
              ))}
            </div>
          )}

          {/* Toggle potere */}
          {cartaAttiva && !isStatStep && (
            <div style={{
              background: C.panel,
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
              padding: '10px 14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <input
                type="checkbox"
                id="potere-toggle"
                checked={potereAttivo}
                onChange={e => setPotere(e.target.checked)}
                style={{ marginTop: '2px', cursor: 'pointer', accentColor: cartaAttiva.colore }}
              />
              <label htmlFor="potere-toggle" style={{ fontSize: '12px', color: C.dim, cursor: 'pointer', lineHeight: 1.5 }}>
                <span style={{ color: cartaAttiva.colore, fontWeight: 'bold' }}>⚡ {cartaAttiva.potere.nome}</span>{' '}
                — {cartaAttiva.potere.desc}
              </label>
            </div>
          )}

          {/* Selezione statistica: CPU mode (dopo carta) o PvP stat step */}
          {((!isPvp && cartaG1) || isStatStep) && (
            <div style={{ marginBottom: '16px' }}>
              {!isStatStep && (
                <div style={{ fontSize: '11px', color: C.dim, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  Scegli la statistica del duello:
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[['influenza', '🔥', 'Influenza'], ['oscurita', '🌑', 'Oscurità'], ['argomentazione', '🧩', 'Argomentazione']].map(([k, ico, lbl]) => (
                  <button
                    key={k}
                    onClick={() => setStatScelta(k)}
                    style={btnStyle(statScelta === k ? 'gold' : 'outline', 'sm')}
                  >
                    {ico} {lbl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pulsanti di conferma */}
          {/* CPU mode: carta + stat selezionate */}
          {!isPvp && cartaG1 && statScelta && (
            <button onClick={() => setFase('cpu_pensa')} style={btnStyle()}>
              Sfida la CPU ⚔️
            </button>
          )}
          {/* PvP G1 conferma */}
          {isPvp && !isG2Step && !isStatStep && cartaG1 && (
            <button onClick={() => setPvpStep('passa')} style={btnStyle()}>
              Conferma e passa il dispositivo →
            </button>
          )}
          {/* PvP G2 conferma */}
          {isPvp && isG2Step && cartaG2 && (
            <button onClick={() => setPvpStep('stat')} style={btnStyle()}>
              Conferma →
            </button>
          )}
          {/* PvP scelta stat */}
          {isPvp && isStatStep && statScelta && (
            <button
              onClick={() => { combatFired.current = false; setFase('combattimento') }}
              style={btnStyle()}
            >
              Combatti! ⚔️
            </button>
          )}
        </div>
      )}

      {/* LOG DI PARTITA */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '10px', color: C.dim, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
          Log di partita
        </div>
        <div style={{
          background: '#0d0d18',
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          padding: '10px 12px',
          maxHeight: '110px',
          overflowY: 'auto',
          fontSize: '11px',
          lineHeight: 1.8,
        }}>
          {log.length === 0
            ? <span style={{ color: C.dim, fontStyle: 'italic' }}>Il duello ha inizio...</span>
            : [...log].reverse().map((r, i) => (
              <div key={i} style={{ color: i === 0 ? C.text : C.dim }}>{r}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
