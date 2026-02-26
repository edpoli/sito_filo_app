import { useState } from "react";

export default function Contatti() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    oggetto: "",
    messaggio: "",
  });
  const [inviato, setInviato] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const destinatario = "filosofia.applicata20@gmail.com";
    const oggetto = encodeURIComponent(
      form.oggetto || "Messaggio dal sito Galleria Filosofica"
    );
    const corpo = encodeURIComponent(
      `Nome: ${form.nome}\nEmail: ${form.email}\n\n${form.messaggio}`
    );

    window.location.href = `mailto:${destinatario}?subject=${oggetto}&body=${corpo}`;
    setInviato(true);
  };

  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100 px-4 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Intestazione */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#d97757] mb-3 tracking-wide">
            Contatti
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed">
            Hai domande, suggerimenti o vuoi collaborare? Scrivici.
          </p>
          <div className="mt-4 w-16 h-px bg-[#d97757] mx-auto" />
        </div>

        {/* Card form */}
        <div className="bg-white dark:bg-stone-900 border border-[#e7e0d8] dark:border-stone-800 rounded-2xl p-8 shadow-lg">

          {inviato ? (
            <div className="text-center py-10">
              <p className="text-2xl text-[#d97757] font-semibold mb-2">Grazie!</p>
              <p className="text-stone-400">
                Il tuo client di posta si è aperto con il messaggio precompilato.
              </p>
              <button
                onClick={() => { setInviato(false); setForm({ nome: "", email: "", oggetto: "", messaggio: "" }); }}
                className="mt-6 text-sm text-[#d97757] underline hover:text-[#c86843] transition-colors"
              >
                Invia un altro messaggio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="nome" className="text-sm text-stone-400 font-medium">
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Il tuo nome"
                    className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#d97757] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm text-stone-400 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="La tua email"
                    className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#d97757] transition-colors"
                  />
                </div>
              </div>

              {/* Oggetto */}
              <div className="flex flex-col gap-1">
                <label htmlFor="oggetto" className="text-sm text-stone-400 font-medium">
                  Oggetto
                </label>
                <input
                  id="oggetto"
                  name="oggetto"
                  type="text"
                  value={form.oggetto}
                  onChange={handleChange}
                  placeholder="Oggetto del messaggio"
                  className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#d97757] transition-colors"
                />
              </div>

              {/* Messaggio */}
              <div className="flex flex-col gap-1">
                <label htmlFor="messaggio" className="text-sm text-stone-400 font-medium">
                  Messaggio
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  required
                  rows={6}
                  value={form.messaggio}
                  onChange={handleChange}
                  placeholder="Scrivi qui il tuo messaggio..."
                  className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#d97757] transition-colors resize-none"
                />
              </div>

              {/* Pulsante invio */}
              <button
                type="submit"
                className="w-full bg-[#d97757] hover:bg-[#c86843] text-white font-semibold py-3 rounded-lg transition-colors tracking-wide"
              >
                Invia messaggio
              </button>
            </form>
          )}
        </div>

        {/* Email diretta */}
        <p className="text-center text-stone-500 text-sm mt-8">
          Oppure scrivici direttamente a{" "}
          <a
            href="mailto:filosofia.applicata20@gmail.com"
            className="text-[#d97757] hover:text-[#c86843] transition-colors underline"
          >
            filosofia.applicata20@gmail.com
          </a>
        </p>

      </div>
    </div>
  );
}
