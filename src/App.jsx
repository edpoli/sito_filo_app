import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider, useDarkMode } from './context/DarkMode';
import NotFound from './pages/NotFound';
import DettaglioFilosofo from './pages/DettaglioFilosofo';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Quiz from './pages/Quiz';
import Galleria from './pages/Galleria';
import Contatti from './pages/Contatti';
import Lessico from './pages/Lessico';
import DettaglioTermine from './pages/DettaglioTermine';
import MappaFilosofi from './pages/MappaFilosofi';
import Footer from './components/Footer';

function AppContent() {
  const { dark } = useDarkMode()

  return (
    <div className={`min-h-screen bg-[#faf8f4] dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 transition-colors duration-300 ${dark ? 'dark' : ''}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filosofo/:id" element={<DettaglioFilosofo />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/Galleria" element={<Galleria />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/lessico" element={<Lessico />} />
        <Route path="/lessico/:id" element={<DettaglioTermine />} />
        <Route path="/mappa" element={<MappaFilosofi />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DarkModeProvider>
  )
}
