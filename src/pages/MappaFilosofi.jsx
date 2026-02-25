import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { filosofiMappa, coloreDa } from '../data/FilosofiMappa'
import { filosofiQuiz } from '../data/FilosofiQuiz'

// ─── Utility ──────────────────────────────────────────────────────────────────

function calcolaLinee() {
  const viste = new Set()
  const linee = []
  filosofiMappa.forEach(f => {
    f.connessioni.forEach(toId => {
      const key = [f.id, toId].sort().join('|')
      if (!viste.has(key)) {
        viste.add(key)
        linee.push({ from: f.id, to: toId })
      }
    })
  })
  return linee
}

const LINEE = calcolaLinee()

function getFilosofo(id) {
  return filosofiMappa.find(f => f.id === id)
}

function useWindowWidth() {
  const [w, setW] = useState(() => window.innerWidth)
  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return w
}

const STATS_CONFIG = [
  { key: 'coerenza',   label: 'Coerenza' },
  { key: 'influenza',  label: 'Influenza' },
  { key: 'chiarezza',  label: 'Chiarezza' },
  { key: 'memabilita', label: 'Memabilità' },
]

// ─── Card filosofo ─────────────────────────────────────────────────────────────
function CardFilosofo({ f, isSelected, isDimmed, onClick, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const colore = coloreDa(f.colore)
  const cardW = isMobile ? 80 : 120
  const scale = isSelected ? 1.07 : hovered ? 1.03 : 1

  return (
    <div
      onClick={() => onClick(f.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: `${f.posizione.x}%`,
        top: `${f.posizione.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: `${cardW}px`,
        opacity: isDimmed ? 0.12 : 1,
        transition: 'transform 0.25s ease, opacity 0.3s ease',
        cursor: 'pointer',
        zIndex: isSelected ? 10 : hovered ? 5 : 1,
        userSelect: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: '#0d0d1a',
          border: `2px solid ${isSelected ? colore : colore + '50'}`,
          borderRadius: isMobile ? '7px' : '10px',
          padding: isMobile ? '7px 5px 6px' : '10px 8px 8px',
          boxShadow: isSelected
            ? `0 0 18px ${colore}60, 0 0 36px ${colore}25, inset 0 0 12px ${colore}10`
            : hovered ? `0 0 10px ${colore}30` : '0 2px 10px rgba(0,0,0,0.5)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <div style={{ fontSize: isMobile ? '20px' : '28px', textAlign: 'center', lineHeight: 1, marginBottom: isMobile ? '4px' : '7px' }}>
          {f.emoji}
        </div>
        <div style={{ fontWeight: 700, fontSize: isMobile ? '9px' : '11px', color: isSelected ? '#ffffff' : '#e2e8f0', textAlign: 'center', lineHeight: 1.2, marginBottom: '2px' }}>
          {f.nomeBreve}
        </div>
        <div style={{ fontSize: isMobile ? '8px' : '10px', color: '#64748b', textAlign: 'center', marginBottom: isMobile ? '0' : '7px' }}>
          {f.anni}
        </div>
        {/* Badge corrente: solo desktop */}
        {!isMobile && (
          <div style={{ fontSize: '9px', border: `1px solid ${colore}70`, color: colore, borderRadius: '4px', padding: '1px 4px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.5 }}>
            {f.corrente}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Barra statistica riusabile ────────────────────────────────────────────────
function StatBar({ label, valore, colore, animato, compact = false }) {
  return (
    <div style={{ marginBottom: compact ? '8px' : '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: compact ? '3px' : '5px' }}>
        <span style={{ fontSize: compact ? '9px' : '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </span>
        <span style={{ fontSize: compact ? '10px' : '11px', fontWeight: 700, color: colore, fontVariantNumeric: 'tabular-nums' }}>
          {valore}
        </span>
      </div>
      <div style={{ height: compact ? '4px' : '5px', background: '#1e1e30', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: '9999px', background: colore, width: animato ? `${valore}%` : '0%', transition: 'width 0.9s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </div>
    </div>
  )
}

// ─── Pannello desktop ──────────────────────────────────────────────────────────
function Pannello({ filosofo, onChiudi, onSeleziona }) {
  const navigate = useNavigate()
  const colore = coloreDa(filosofo.colore)
  const dq = filosofiQuiz[filosofo.id]
  const [animato, setAnimato] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimato(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <aside style={{ width: '300px', flexShrink: 0, backgroundColor: '#08080f', borderLeft: '1px solid #111126', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ padding: '20px' }}>

        <button onClick={onChiudi} style={{ color: '#475569', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'block', marginBottom: '16px' }}>
          ✕ Chiudi
        </button>

        <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: colore, margin: '0 0 8px 0' }}>
          {filosofo.corrente}
        </p>
        <div style={{ fontSize: '56px', lineHeight: 1, marginBottom: '10px' }}>{filosofo.emoji}</div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 2px 0', lineHeight: 1.3 }}>{filosofo.nome}</h2>
        <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px 0' }}>{filosofo.anni}</p>

        {/* Statistiche */}
        {dq && (
          <div style={{ border: `1px solid ${colore}55`, borderRadius: '12px', padding: '16px', marginBottom: '16px', background: 'rgba(0,0,0,0.2)' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: colore, margin: '0 0 14px 0' }}>
              Statistiche
            </p>
            {STATS_CONFIG.map(({ key, label }) => (
              <StatBar key={key} label={label} valore={dq.stats[key]} colore={colore} animato={animato} />
            ))}
          </div>
        )}

        {/* Citazione + descrizione */}
        {dq && (
          <div style={{ borderLeft: `3px solid ${colore}`, borderRadius: '0 8px 8px 0', background: 'rgba(255,255,255,0.03)', padding: '12px 14px', marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', fontStyle: 'italic', color: colore, margin: '0 0 8px 0', lineHeight: 1.5 }}>"{dq.idea}"</p>
            <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{dq.desc}</p>
          </div>
        )}

        {/* Connessioni */}
        <p style={{ fontSize: '9px', letterSpacing: '0.12em', color: '#334155', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
          Connessioni
        </p>
        {filosofo.connessioni.length === 0 ? (
          <p style={{ fontSize: '11px', color: '#334155', marginBottom: '16px' }}>Nessuna connessione diretta</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
            {filosofo.connessioni.map(id => {
              const conn = getFilosofo(id)
              if (!conn) return null
              return <BtnConnessione key={id} conn={conn} colore={coloreDa(conn.colore)} onClick={() => onSeleziona(id)} />
            })}
          </div>
        )}

        <BtnDettaglio colore={colore} onClick={() => navigate(`/filosofo/${filosofo.id}`)} />
      </div>
    </aside>
  )
}

// ─── Pannello mobile (bottom sheet) ───────────────────────────────────────────
function PannelloMobile({ filosofo, onChiudi, onSeleziona }) {
  const navigate = useNavigate()
  const colore = coloreDa(filosofo.colore)
  const dq = filosofiQuiz[filosofo.id]
  const [visible, setVisible] = useState(false)
  const [animato, setAnimato] = useState(false)

  useEffect(() => {
    // Due frame per garantire che il browser registri lo stato iniziale
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    const t = setTimeout(() => setAnimato(true), 250)
    return () => { cancelAnimationFrame(raf); clearTimeout(t) }
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        maxHeight: '60%',
        backgroundColor: '#08080f',
        borderTop: `2px solid ${colore}60`,
        borderRadius: '16px 16px 0 0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 20,
      }}
    >
      {/* Handle + chiudi */}
      <div style={{ flexShrink: 0, padding: '10px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: '32px', height: '4px', borderRadius: '2px', background: '#1e2035' }} />
        <button onClick={onChiudi} style={{ position: 'absolute', right: '16px', color: '#475569', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}>
          ✕
        </button>
      </div>

      {/* Corpo scrollabile */}
      <div style={{ overflowY: 'auto', padding: '12px 16px 28px' }}>

        {/* Header: emoji + info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ fontSize: '44px', lineHeight: 1, flexShrink: 0 }}>{filosofo.emoji}</div>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: colore, margin: '0 0 2px 0' }}>
              {filosofo.corrente}
            </p>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 1px 0', lineHeight: 1.2 }}>
              {filosofo.nome}
            </h2>
            <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>{filosofo.anni}</p>
          </div>
        </div>

        {/* Statistiche compatte */}
        {dq && (
          <div style={{ border: `1px solid ${colore}40`, borderRadius: '10px', padding: '12px', marginBottom: '12px', background: 'rgba(0,0,0,0.2)' }}>
            <p style={{ fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: colore, margin: '0 0 10px 0' }}>
              Statistiche
            </p>
            {STATS_CONFIG.map(({ key, label }) => (
              <StatBar key={key} label={label} valore={dq.stats[key]} colore={colore} animato={animato} compact />
            ))}
          </div>
        )}

        {/* Connessioni come chip */}
        {filosofo.connessioni.length > 0 && (
          <>
            <p style={{ fontSize: '8px', letterSpacing: '0.1em', color: '#334155', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              Connessioni
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
              {filosofo.connessioni.map(id => {
                const conn = getFilosofo(id)
                if (!conn) return null
                const c = coloreDa(conn.colore)
                return (
                  <ChipConnessione key={id} conn={conn} colore={c} onClick={() => onSeleziona(id)} />
                )
              })}
            </div>
          </>
        )}

        <BtnDettaglio colore={colore} onClick={() => navigate(`/filosofo/${filosofo.id}`)} />
      </div>
    </div>
  )
}

// ─── Bottoni riusabili ─────────────────────────────────────────────────────────
function BtnConnessione({ conn, colore, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '6px', background: hov ? '#0f0f1e' : 'none', border: '1px solid #1a1a2e', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'background 0.15s' }}
    >
      <span style={{ fontSize: '18px' }}>{conn.emoji}</span>
      <div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#e2e8f0' }}>{conn.nomeBreve}</div>
        <div style={{ fontSize: '10px', color: colore }}>{conn.corrente}</div>
      </div>
    </button>
  )
}

function ChipConnessione({ conn, colore, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '20px', background: hov ? `${colore}18` : 'none', border: `1px solid ${colore}45`, cursor: 'pointer', transition: 'background 0.15s' }}
    >
      <span style={{ fontSize: '14px' }}>{conn.emoji}</span>
      <span style={{ fontSize: '10px', color: '#e2e8f0', fontWeight: 600 }}>{conn.nomeBreve}</span>
    </button>
  )
}

function BtnDettaglio({ colore, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ width: '100%', fontSize: '11px', padding: '8px 16px', borderRadius: '6px', border: `1px solid ${colore}55`, color: colore, background: hov ? `${colore}22` : `${colore}0d`, cursor: 'pointer', transition: 'background 0.15s' }}
    >
      Vai alla scheda →
    </button>
  )
}

// ─── Componente principale ────────────────────────────────────────────────────
export default function MappaFilosofi() {
  const [selezionato, setSelezionato] = useState(null)
  const larghezza = useWindowWidth()
  const isMobile = larghezza < 640

  const filosofoAttivo = selezionato ? getFilosofo(selezionato) : null
  const connessi = filosofoAttivo ? new Set([selezionato, ...filosofoAttivo.connessioni]) : null
  const handleClickCard = id => setSelezionato(prev => (prev === id ? null : id))
  const coloreAttivo = filosofoAttivo ? coloreDa(filosofoAttivo.colore) : '#6b7280'

  return (
    // position: relative necessario per il bottom sheet mobile
    <div style={{ position: 'relative', display: 'flex', height: 'calc(100vh - 57px)', overflow: 'hidden' }}>

      {/* ── Mappa ── */}
      <div
        style={{ position: 'relative', flex: 1, overflow: 'hidden', background: '#080812' }}
        onClick={e => { if (e.currentTarget === e.target) setSelezionato(null) }}
      >
        {/* Griglia a punti */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #1a1a2e 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        {/* SVG linee */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {LINEE.map(({ from, to }) => {
            const fFrom = getFilosofo(from)
            const fTo = getFilosofo(to)
            if (!fFrom || !fTo) return null
            const isAttiva = filosofoAttivo && (selezionato === from || selezionato === to)
            return (
              <line
                key={`${from}-${to}`}
                x1={`${fFrom.posizione.x}%`} y1={`${fFrom.posizione.y}%`}
                x2={`${fTo.posizione.x}%`}   y2={`${fTo.posizione.y}%`}
                stroke={isAttiva ? coloreAttivo : '#1c1c30'}
                strokeWidth={isAttiva ? 2 : 1}
                opacity={isAttiva ? 0.85 : selezionato ? 0.07 : 0.35}
                style={{ filter: isAttiva ? `drop-shadow(0 0 5px ${coloreAttivo})` : 'none', transition: 'stroke 0.3s ease, opacity 0.3s ease, filter 0.3s ease' }}
              />
            )
          })}
        </svg>

        {/* Card filosofi */}
        {filosofiMappa.map(f => (
          <CardFilosofo
            key={f.id}
            f={f}
            isSelected={selezionato === f.id}
            isDimmed={connessi ? !connessi.has(f.id) : false}
            onClick={handleClickCard}
            isMobile={isMobile}
          />
        ))}

        {/* Suggerimento */}
        {!selezionato && (
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: '#2a2a40', pointerEvents: 'none', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            Clicca un filosofo per esplorare le connessioni
          </div>
        )}
      </div>

      {/* Pannello desktop: affiancato alla mappa */}
      {filosofoAttivo && !isMobile && (
        <Pannello
          key={selezionato}
          filosofo={filosofoAttivo}
          onChiudi={() => setSelezionato(null)}
          onSeleziona={id => setSelezionato(id)}
        />
      )}

      {/* Pannello mobile: bottom sheet sovrapposto, position:absolute rispetto al wrapper */}
      {filosofoAttivo && isMobile && (
        <PannelloMobile
          key={selezionato}
          filosofo={filosofoAttivo}
          onChiudi={() => setSelezionato(null)}
          onSeleziona={id => setSelezionato(id)}
        />
      )}
    </div>
  )
}
