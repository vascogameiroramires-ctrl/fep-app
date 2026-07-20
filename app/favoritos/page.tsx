import Link from "next/link";
import { cavalos, cavaleiros, concursos } from "@/data/dados";

export default function Favoritos() {
  const cavalosFavoritos = cavalos.slice(0, 1);
  const cavaleirosFollowing = cavaleiros.slice(0, 1);
  const concursosFavoritos = concursos.slice(0, 2);

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
          <h1 className="text-white text-lg font-medium">Favoritos</h1>
        </div>
        <span className="text-gray-500 text-xl">⚙</span>
      </div>

      {/* Filtros */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todos", "Cavalos", "Cavaleiros", "Concursos"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Cavalos favoritos */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Cavalos seguidos
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {cavalosFavoritos.map((c) => (
            <Link key={c.id} href={`/cavalos/${c.id}`}>
              <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e6eef7] flex items-center justify-center text-xl flex-shrink-0">
                  🐎
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">{c.raca} · {c.disciplina}</p>
                  <p className="text-[10px] text-[#003d7a] mt-0.5">Último resultado: 1.º · 74,820%</p>
                </div>
                <span className="text-yellow-400 text-lg">⭐</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cavaleiros seguidos */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Cavaleiros seguidos
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {cavaleirosFollowing.map((c) => {
            const iniciais = c.nome.split(" ").map((n) => n[0]).join("").slice(0, 2);
            return (
              <Link key={c.id} href={`/cavaleiros/${c.id}`}>
                <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#003d7a] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {iniciais}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5">{c.disciplina} · {c.escalao}</p>
                    <p className="text-[10px] text-[#003d7a] mt-0.5">{c.ranking}º no ranking nacional</p>
                  </div>
                  <span className="text-yellow-400 text-lg">⭐</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Concursos favoritos */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Concursos seguidos
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {concursosFavoritos.map((c) => {
            const dia = new Date(c.data).getDate();
            const mes = new Date(c.data).toLocaleString("pt-PT", { month: "short" });
            return (
              <Link key={c.id} href={`/concursos/${c.id}`}>
                <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="min-w-[38px] bg-[#003d7a] rounded-lg py-1.5 flex flex-col items-center flex-shrink-0">
                    <span className="text-white text-sm font-medium leading-none">{dia}</span>
                    <span className="text-[#a8c4e0] text-[9px] uppercase mt-0.5">{mes}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5">📍 {c.local}</p>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${c.inscricoesAbertas ? "bg-[#e8f5e8] text-[#1a5c1a]" : "bg-[#f5e8e8] text-[#8b1a1a]"}`}>
                      {c.inscricoesAbertas ? "Inscrições abertas" : "Inscrições encerradas"}
                    </span>
                  </div>
                  <span className="text-yellow-400 text-lg">⭐</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </main>
  );
}