import Link from "next/link";

const noticias = [
  {
    id: 1,
    titulo: "Seleção Nacional de Dressage convocada para o Campeonato da Europa",
    resumo: "A Federação Equestre Portuguesa anunciou os cavaleiros convocados para representar Portugal no Campeonato da Europa de Dressage 2026.",
    data: "18 Jul 2026",
    categoria: "Seleções",
    destaque: true,
  },
  {
    id: 2,
    titulo: "Resultados do CSN Porto — 1ª Prova Nacional de Salto",
    resumo: "Confira os resultados completos da primeira prova nacional de salto realizada no Centro Hípico do Porto.",
    data: "14 Jul 2026",
    categoria: "Resultados",
    destaque: false,
  },
  {
    id: 3,
    titulo: "Novas regras para inscrições em concursos nacionais a partir de 2027",
    resumo: "A FEP publicou as novas normas regulamentares que entrarão em vigor na época de 2027.",
    data: "10 Jul 2026",
    categoria: "Regulamentação",
    destaque: false,
  },
  {
    id: 4,
    titulo: "Calendário de Outono 2026 já disponível",
    resumo: "O calendário de concursos nacionais para o período de Setembro a Dezembro de 2026 está disponível no site da FEP.",
    data: "5 Jul 2026",
    categoria: "Calendário",
    destaque: false,
  },
  {
    id: 5,
    titulo: "Portugal no pódio no CDI Lisboa — grande atuação dos cavaleiros nacionais",
    resumo: "Os cavaleiros portugueses brilharam no CDI Lisboa com várias classificações no top 3.",
    data: "2 Jul 2026",
    categoria: "Resultados",
    destaque: false,
  },
  {
    id: 6,
    titulo: "Programa de desenvolvimento de jovens cavaleiros 2026",
    resumo: "A FEP lança novo programa de apoio a cavaleiros sub-21 com bolsas de formação e participação em competições internacionais.",
    data: "28 Jun 2026",
    categoria: "Formação",
    destaque: false,
  },
];

const categoriaStyle: Record<string, string> = {
  "Seleções": "bg-[#e6eef7] text-[#003d7a]",
  "Resultados": "bg-[#fff8e0] text-[#b8860b]",
  "Regulamentação": "bg-[#f5e8e8] text-[#8b1a1a]",
  "Calendário": "bg-[#e8f0e8] text-[#2d4a2d]",
  "Formação": "bg-[#f0e8f5] text-[#5a2d7a]",
};

export default function Noticias() {
  const destaque = noticias.find((n) => n.destaque);
  const resto = noticias.filter((n) => !n.destaque);

  return (
    <main className="pb-24">

      {/* Status bar */}
      <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">9:41</span>
        <span className="text-xs text-gray-400">◆ ▮</span>
      </div>

      {/* Header */}
      <div className="bg-[#1a1a1a] px-5 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-500 text-xl">‹</Link>
          <h1 className="text-white text-lg font-medium">Notícias</h1>
        </div>
        <span className="text-gray-500 text-xl">🔍</span>
      </div>

      {/* Filtros categoria */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todas", "Resultados", "Seleções", "Regulamentação", "Calendário", "Formação"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Notícia destaque */}
      {destaque && (
        <div className="px-4 pt-4">
          <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
            Destaque
          </p>
          <div className="bg-[#003d7a] rounded-xl p-4 mb-4">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoriaStyle[destaque.categoria] || "bg-[#e6eef7] text-[#003d7a]"}`}>
              {destaque.categoria}
            </span>
            <h2 className="text-white text-sm font-medium mt-2 leading-snug">{destaque.titulo}</h2>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">{destaque.resumo}</p>
            <p className="text-white/40 text-[10px] mt-3">{destaque.data}</p>
          </div>
        </div>
      )}

      {/* Lista notícias */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Últimas notícias
        </p>
        <div className="flex flex-col gap-2 pb-4">
          {resto.map((n) => (
            <div key={n.id} className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoriaStyle[n.categoria] || "bg-[#e6eef7] text-[#003d7a]"}`}>
                    {n.categoria}
                  </span>
                  <p className="text-sm font-medium text-[#1a1a1a] mt-2 leading-snug">{n.titulo}</p>
                  <p className="text-xs text-[#6b6b6b] mt-1 leading-relaxed">{n.resumo}</p>
                  <p className="text-[10px] text-[#6b6b6b] mt-2">{n.data}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}