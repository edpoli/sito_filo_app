# 🏛️ Filosofia Applicata

Un'enciclopedia interattiva della filosofia contemporanea costruita con React. Esplora 31 grandi pensatori, naviga un lessico di oltre 50 concetti chiave e scopri a quale filosofo ti avvicini con un quiz personalizzato.

🔗 **[Demo live](https://filosofiaapplicata.vercel.app/)**

---

## Panoramica

Filosofia Applicata è una single-page application pensata per rendere accessibile il pensiero filosofico del Novecento e del contemporaneo. Ogni filosofo ha una scheda dedicata con biografia, opere principali e concetti chiave. Una mappa interattiva mostra le connessioni intellettuali tra i pensatori, mentre un lessico navigabile permette di esplorare i termini fondamentali della disciplina.

## Funzionalità

- **Galleria dei Filosofi** — 31 schede dettagliate con biografia, citazioni, opere e concetti. Ricerca full-text per nome, corrente o concetto.
- **Lessico Filosofico** — Oltre 50 termini organizzati per categoria e lettera, ciascuno con definizione approfondita e collegamenti ai filosofi di riferimento.
- **Mappa delle Connessioni** — Visualizzazione interattiva delle relazioni intellettuali tra i pensatori: influenze, dialoghi, contrapposizioni.
- **Quiz "Quale filosofo sei?"** — 10 domande situazionali che profilano l'utente su 13 filosofi, con risultato dettagliato e link alla scheda.
- **Dark Mode** — Tema chiaro/scuro con persistenza via `localStorage` e Context API.
- **Routing completo** — Navigazione multi-pagina con pagina 404 personalizzata.

## Tech Stack

| Tecnologia | Ruolo |
|---|---|
| **React 19** | UI e gestione dello stato |
| **React Router 7** | Routing client-side |
| **Tailwind CSS 4** | Styling utility-first |
| **Vite 7** | Build tool e dev server |
| **React Icons** | Iconografia |

## Struttura del Progetto

```
src/
├── components/        # Navbar, Footer
├── context/           # DarkModeProvider (Context API)
├── data/              # Dataset: filosofi, lessico, quiz, mappa
├── pages/             # Home, Galleria, DettaglioFilosofo,
│                      # Lessico, DettaglioTermine,
│                      # MappaFilosofi, Quiz, Contatti, NotFound
├── App.jsx            # Layout + Routes
└── main.jsx           # Entry point
```

## Installazione

```bash
git clone https://github.com/edpoli/sito_filo_app.git
cd sito_filo_app
npm install
npm run dev
```

L'app sarà disponibile su `http://localhost:5173`.

## Build per la Produzione

```bash
npm run build
npm run preview
```

## Licenza

MIT
