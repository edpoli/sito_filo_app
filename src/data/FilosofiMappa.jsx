import { filosofi } from './Filosofi'

// Dati aggiuntivi specifici per la mappa: posizione (x,y in %) e connessioni
const mappaExtra = {
  hegel: {
    nomeBreve: 'Hegel',
    posizione: { x: 50, y: 13 },
    connessioni: ['heidegger', 'deleuze', 'arendt', 'bodei'],
  },
  husserl: {
    nomeBreve: 'Husserl',
    posizione: { x: 17, y: 26 },
    connessioni: ['heidegger', 'fink', 'derrida'],
  },
  heidegger: {
    nomeBreve: 'Heidegger',
    posizione: { x: 32, y: 43 },
    connessioni: ['husserl', 'hegel', 'arendt', 'derrida', 'fink'],
  },
  wittgenstein: {
    nomeBreve: 'Wittgenstein',
    posizione: { x: 80, y: 20 },
    connessioni: ['foucault'],
  },
  fink: {
    nomeBreve: 'E. Fink',
    posizione: { x: 11, y: 54 },
    connessioni: ['husserl', 'heidegger'],
  },
  arendt: {
    nomeBreve: 'Arendt',
    posizione: { x: 62, y: 35 },
    connessioni: ['heidegger', 'hegel', "weil"],
  },
  weil: {
    nomeBreve: 'S. Weil',
    posizione: { x: 86, y: 44 },
    connessioni: ['arendt'],
  },
  foucault: {
    nomeBreve: 'Foucault',
    posizione: { x: 68, y: 60 },
    connessioni: ['derrida', 'deleuze', 'wittgenstein'],
  },
  bodei: {
    nomeBreve: 'Bodei',
    posizione: { x: 24, y: 70 },
    connessioni: ['hegel'],
  },
  deleuze: {
    nomeBreve: 'Deleuze',
    posizione: { x: 46, y: 67 },
    connessioni: ['foucault', 'derrida', 'freud', 'hegel'],
  },
  derrida: {
    nomeBreve: 'Derrida',
    posizione: { x: 83, y: 73 },
    connessioni: ['husserl', 'heidegger', 'foucault', 'deleuze'],
  },
  freud: {
    nomeBreve: 'Freud',
    posizione: { x: 33, y: 85 },
    connessioni: ['jung', 'deleuze'],
  },
  jung: {
    nomeBreve: 'C.G. Jung',
    posizione: { x: 55, y: 87 },
    connessioni: ['freud'],
  },

  han: {
    nomeBreve: 'B.C. Han',
    posizione: {},
    connessioni: ['agamben', 'arendt', 'foucault', 'heidegger',]
  }




}

// Mappa il colore Tailwind (es. "border-rose-400 text-rose-400") → hex
const tailwindHex = {
  rose: '#fb7185',
  orange: '#fb923c',
  blue: '#60a5fa',
  green: '#4ade80',
  cyan: '#22d3ee',
  lime: '#a3e635',
  emerald: '#34d399',
  yellow: '#facc15',
  violet: '#a78bfa',
  sky: '#38bdf8',
  indigo: '#818cf8',
  amber: '#fbbf24',
  red: '#f87171',
}

export function coloreDa(coloreClass) {
  const m = coloreClass.match(/border-(\w+)-\d+/)
  return m ? (tailwindHex[m[1]] ?? '#6b7280') : '#6b7280'
}

export const filosofiMappa = filosofi
  .filter(f => mappaExtra[f.id])
  .map(f => ({ ...f, ...mappaExtra[f.id] }))
