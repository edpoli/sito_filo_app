
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import DettaglioFilosofo from './pages/DettaglioFilosofo';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Quiz from './pages/Quiz';
import Citazioni from './pages/Citazioni';


// APP PRINCIPALE — qui vive il router

export default function App() {
  return (
    // 🔑 CONCETTO: BrowserRouter avvolge tutto
    <BrowserRouter>
      <div className="min-h-screen bg-stone-950 font-serif text-stone-100">
        <Navbar />

        {/* 🔑 CONCETTO: Routes contiene tutte le Route */}
        <Routes>
          {/* Route esatta per la home */}
          <Route path="/" element={<Home />} />

          {/* Route dinamica — :id è un parametro che cambia */}
          <Route path="/filosofo/:id" element={<DettaglioFilosofo />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/citazioni" element={<Citazioni />} />


          {/* Catch-all — qualsiasi URL non riconosciuto */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

