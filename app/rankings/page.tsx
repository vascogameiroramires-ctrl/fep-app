import Link from "next/link";
import { rankings } from "@/data/dados";

export default function Rankings() {
  const top3 = rankings.slice(0, 3);
  const resto = rankings.slice(3);

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
          <h1 className="text-white text-lg font-medium">Rankings</h1>
        </div>
        <span className="text-gray-500 text-xl">⚙</span>
      </div>

      {/* Filtros disciplina */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Dressage", "Salto", "CCE", "Eq. Trabalho", "Endurance"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Toggle cavaleiros/cavalos */}
      <div className="px-4 pt-3">
        <div className="bg-[#e8e4df] rounded-xl p-1 flex gap-1">
          <button className="flex-1 py-2 rounded-lg bg-white text-xs font-medium text-[#003d7a]">
            Cavaleiros
          </button>
          <button className="flex-1 py-2 rounded-lg text-xs font-medium text-[#6b6b6b]">
            Cavalos
          </button>
        </div>
      </div>

      {/* Filtros secundários */}
      <div className="px-4 pt-3 flex gap-2">
        {["🏅 Seniores", "📅 Época 2026"].map((f) => (
          <button key={f} className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-[#e8e4df] bg-white text-xs text-[#6b6b6b]">
            {f}
          </button>
        ))}
      </div>

      {/* Época label */}
      <div className="px-4 pt-3 flex justify-between items-center">
        <span className="text-[10px] text-[#6b6b6b]">Ranking Nacional · Dressage · Seniores · 2026</span>
        <span className="text-[10px] text-[#003d7a]">partilhar</span>
      </div>

      {/* Pódio top 3 */}
      <div className="px-4 pt-4 flex items-end justify-center gap-3">
        {/* 2º lugar */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-[#003d7a]">{top3[1].pontos} pts</span>
          <p className="text-xs font-medium text-[#1a1a1a] text-center leading-tight">{top3[1].cavaleiro}</p>
          <p className="text-[10px] text-[#6b6b6b] text-center">{top3[1].cavalo}</p>
          <div className="w-12 h-12 rounded-full bg-[#444] border-2 border-[#999] flex items-center justify-center text-white text-sm font-medium">
            {top3[1].cavaleiro.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="w-full bg-[#999] rounded-t-lg h-9 flex items-center justify-center text-white text-lg font-medium">
            2
          </div>
        </div>

        {/* 1º lugar */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-[#003d7a]">{top3[0].pontos} pts</span>
          <p className="text-xs font-medium text-[#1a1a1a] text-center leading-tight">{top3[0].cavaleiro}</p>
          <p className="text-[10px] text-[#6b6b6b] text-center">{top3[0].cavalo}</p>
          <div className="w-14 h-14 rounded-full bg-[#003d7a] border-2 border-[#b8860b] flex items-center justify-center text-white text-base font-medium">
            {top3[0].cavaleiro.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="w-full bg-[#b8860b] rounded-t-lg h-12 flex items-center justify-center text-white text-lg font-medium">
            1
          </div>
        </div>

        {/* 3º lugar */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-[#003d7a]">{top3[2].pontos} pts</span>
          <p className="text-xs font-medium text-[#1a1a1a] text-center leading-tight">{top3[2].cavaleiro}</p>
          <p className="text-[10px] text-[#6b6b6b] text-center">{top3[2].cavalo}</p>
          <div className="w-12 h-12 rounded-full bg-[#5a3a20] border-2 border-[#a0522d] flex items-center justify-center text-white text-sm font-medium">
            {top3[2].cavaleiro.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="w-full bg-[#a0522d] rounded-t-lg h-7 flex items-center justify-center text-white text-lg font-medium">
            3
          </div>
        </div>
      </div>

      {/* Lista 4º em diante */}
      <div className="px-4 pt-4 flex flex-col gap-2 pb-4">
        {resto.map((r) => (
          <div key={r.posicao} className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-xs font-medium text-[#6b6b6b] min-w-[20px]">{r.posicao}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1a1a1a]">{r.cavaleiro}</p>
              <p className="text-xs text-[#6b6b6b] mt-0.5">{r.cavalo} · {r.clube}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[#003d7a]">{r.pontos} pts</p>
              <p className={`text-[10px] mt-0.5 ${
                r.tendencia === "up" ? "text-green-600" :
                r.tendencia === "down" ? "text-red-700" :
                "text-[#6b6b6b]"
              }`}>
                {r.tendencia === "up" ? "▲ subiu" : r.tendencia === "down" ? "▼ desceu" : "— estável"}
              </p>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}