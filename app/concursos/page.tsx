import Link from "next/link";
import { concursos } from "@/data/dados";

export default function Concursos() {
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
          <h1 className="text-white text-lg font-medium">Concursos</h1>
        </div>
        <span className="text-gray-500 text-xl">⚙</span>
      </div>

      {/* Filtros disciplina */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todos", "Salto", "Dressage", "cce", "Eq. Trabalho", "Endurance"].map((f, i) => (
          <button
            key={f}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
              i === 0
                ? "bg-[#003d7a] border-[#003d7a] text-white"
                : "border-[#3a3a3a] text-gray-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Filtros secundários */}
      <div className="px-4 pt-3 flex gap-2">
        {["📅 Julho 2026", "📍 Distrito", "🏅 Escalão"].map((f) => (
          <button
            key={f}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-[#e8e4df] bg-white text-xs text-[#6b6b6b]"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Separador mês */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Julho 2026</span>
        <div className="flex-1 h-px bg-[#e8e4df]" />
      </div>

      {/* Lista concursos */}
      <div className="px-4 flex flex-col gap-2 pb-4">
        {concursos.map((c) => {
          const diaInicio = new Date(c.data).getDate();
          const diaFim = new Date(c.dataFim).getDate();
          const mes = new Date(c.data).toLocaleString("pt-PT", { month: "short" });

          const disciplinaStyle: Record<string, string> = {
            Salto: "bg-[#e6eef7] text-[#003d7a]",
            Dressage: "bg-[#e8eaf0] text-[#1e2a4a]",
            cce: "bg-[#e8f0e8] text-[#2d4a2d]",
          };

          return (
            <Link key={c.id} href={`/concursos/${c.id}`}>
              <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
                <div className="px-3.5 py-3 flex items-start gap-3">
                  <div className="min-w-[44px] bg-[#003d7a] rounded-lg py-1.5 flex flex-col items-center flex-shrink-0">
                    <span className="text-white text-sm font-medium leading-none">
                      {diaInicio === diaFim ? diaInicio : `${diaInicio}–${diaFim}`}
                    </span>
                    <span className="text-[#a8c4e0] text-[9px] uppercase mt-0.5">{mes}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1a1a1a] text-sm font-medium leading-tight">{c.nome}</p>
                    <p className="text-[#6b6b6b] text-xs mt-1">📍 {c.local}</p>
                    <p className="text-[#6b6b6b] text-xs mt-0.5">👥 {c.inscrições} inscritos</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${disciplinaStyle[c.disciplina] || "bg-[#e6eef7] text-[#003d7a]"}`}>
                        {c.disciplina}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.inscricoesAbertas ? "bg-[#e8f5e8] text-[#1a5c1a]" : "bg-[#f5e8e8] text-[#8b1a1a]"}`}>
                        {c.inscricoesAbertas ? "Inscrições abertas" : "Inscrições encerradas"}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-300 mt-1">›</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </main>
  );
}