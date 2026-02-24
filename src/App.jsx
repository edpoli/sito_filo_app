
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import DettaglioFilosofo from './pages/DettaglioFilosofo';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Quiz from './pages/Quiz';
import Citazioni from './pages/Citazioni';
import Enciclopedia from './pages/Enciclopedia';
import Contatti from './pages/Contatti';
import Lessico from './pages/Lessico';
import DettaglioTermine from './pages/DettaglioTermine';


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-950 font-serif text-stone-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filosofo/:id" element={<DettaglioFilosofo />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/citazioni" element={<Citazioni />} />
          <Route path="/enciclopedia" element={<Enciclopedia />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/lessico" element={<Lessico />} />
          <Route path="/lessico/:id" element={<DettaglioTermine />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

