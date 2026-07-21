import Link from "next/link";
import { cavalos, concursos } from "@/data/dados";

export default function Resultados() {
  const todosResultados = cavalos.flatMap((c) =>
    c.resultados.map((r) => ({ ...r, cavalo: c.nome, cavaloId: c.id, disciplina: c.disciplina }))
  );

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
          <h1 className="text-white text-lg font-medium">Resultados</h1>
        </div>
        <span className="text-gray-500 text-xl">⚙</span>
      </div>

      {/* Filtros */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todos", "Dressage", "Salto", "CCA", "Eq. Trabalho"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Concursos recentes */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Concursos recentes
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {concursos.filter((c) => !c.inscricoesAbertas).map((c) => {
            const dia = new Date(c.data).getDate();
            const mes = new Date(c.data).toLocaleString("pt-PT", { month: "short" });
            return (
              <Link key={c.id} href={`/concursos/${c.id}`}>
                <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="min-w-[40px] bg-[#1a1a1a] rounded-lg py-1.5 flex flex-col items-center flex-shrink-0">
                    <span className="text-white text-sm font-medium leading-none">{dia}</span>
                    <span className="text-gray-400 text-[9px] uppercase mt-0.5">{mes}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5">📍 {c.local}</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[#e6eef7] text-[#003d7a] font-medium">
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

      {/* Últimos resultados */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Últimos resultados
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {todosResultados.map((r, i) => (
            <Link key={i} href={`/cavalos/${r.cavaloId}`}>
              <div className={`flex items-center gap-3 px-4 py-3 ${i < todosResultados.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                  r.posicao === 1 ? "bg-[#fff8e0] text-[#b8860b]" :
                  r.posicao === 2 ? "bg-[#f5f5f5] text-[#666]" :
                  "bg-[#fff0e8] text-[#a0522d]"
                }`}>
                  {r.posicao}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#1a1a1a]">{r.cavalo}</p>
                  <p className="text-[10px] text-[#6b6b6b] mt-0.5">{r.concurso} · {r.prova}</p>
                  <p className="text-[10px] text-[#6b6b6b]">{r.data}</p>
                </div>
                <span className="text-xs font-medium text-[#003d7a]">{r.pontuacao}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}