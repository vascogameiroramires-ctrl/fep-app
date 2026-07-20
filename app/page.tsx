import Link from "next/link";
import { concursos, rankings } from "@/data/dados";

export default function Home() {
  const proximosConcursos = concursos.slice(0, 3);
  const topRanking = rankings.slice(0, 3);

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
          <div className="w-10 h-10 rounded-lg bg-[#003d7a] flex items-center justify-center text-white text-xs font-medium">
            FEP
          </div>
          <div>
            <h1 className="text-white text-base font-medium">Federação Equestre</h1>
            <p className="text-gray-500 text-xs mt-0.5">Boa tarde, João Silva</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/notificacoes" className="text-gray-500 text-xl">🔔</Link>
          <div className="w-8 h-8 rounded-full bg-[#003d7a] flex items-center justify-center text-white text-xs font-medium">
            JS
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#1a1a1a] px-4 pb-4">
        <Link href="/pesquisa">
          <div className="bg-[#2e2e2e] border border-[#3a3a3a] rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span className="text-gray-500">🔍</span>
            <span className="text-gray-500 text-sm">Cavalos, cavaleiros, concursos…</span>
          </div>
        </Link>
      </div>

      {/* Acesso rápido */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Acesso rápido
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { href: "/concursos", icon: "🏆", label: "Concursos", bg: "bg-[#e6eef7]" },
            { href: "/cavalos", icon: "🐎", label: "Cavalos", bg: "bg-[#e8f0e8]" },           
            { href: "/cavaleiros", icon: "👤", label: "Cavaleiros", bg: "bg-[#e6eef7]" },
            { href: "/rankings", icon: "📊", label: "Rankings", bg: "bg-[#e6eef7]" },
            { href: "/clubes", icon: "🏛️", label: "Clubes", bg: "bg-[#e8f0e8]" },
            { href: "/concursos", icon: "📅", label: "Calendário", bg: "bg-[#f0ece6]" },
            { href: "/concursos", icon: "📈", label: "Resultados", bg: "bg-[#e8f0e8]" },
            { href: "/noticias", icon: "📰", label: "Notícias", bg: "bg-[#f0ece6]" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1.5">
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center text-2xl border border-[#e8e4df]`}>
                {item.icon}
              </div>
              <span className="text-[10px] text-[#6b6b6b] text-center leading-tight">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Próximos concursos */}
      <div className="px-4 pt-5">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Próximos concursos
        </p>
        <div className="flex flex-col gap-2">
          {proximosConcursos.map((c) => {
            const dia = new Date(c.data).getDate();
            const mes = new Date(c.data).toLocaleString("pt-PT", { month: "short" });
            return (
              <Link key={c.id} href={`/concursos/${c.id}`}>
                <div className="bg-white border border-[#e8e4df] rounded-xl px-3.5 py-3 flex items-center gap-3">
                  <div className="min-w-[40px] bg-[#003d7a] rounded-lg py-1.5 flex flex-col items-center">
                    <span className="text-white text-base font-medium leading-none">{dia}</span>
                    <span className="text-[#a8c4e0] text-[9px] uppercase mt-0.5">{mes}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1a1a1a] text-sm font-medium">{c.nome}</p>
                    <p className="text-[#6b6b6b] text-xs mt-0.5">📍 {c.local}</p>
                    <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[#e6eef7] text-[#003d7a] font-medium">
                      {c.disciplina}
                    </span>
                  </div>
                  <span className="text-gray-300">›</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Ranking */}
      <div className="px-4 pt-5 pb-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Ranking — Dressage Nacional
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
          {topRanking.map((r, i) => (
            <div key={r.posicao} className={`flex items-center gap-3 px-3.5 py-2.5 ${i < topRanking.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <span className={`text-xs font-medium min-w-[18px] ${i === 0 ? "text-[#b8860b]" : i === 1 ? "text-[#888]" : "text-[#a0522d]"}`}>
                {r.posicao}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a1a]">{r.cavalo}</p>
                <p className="text-xs text-[#6b6b6b]">{r.cavaleiro}</p>
              </div>
              <span className="text-sm font-medium text-[#1a1a1a]">{r.pontos} pts</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}