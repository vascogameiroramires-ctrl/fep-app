import Link from "next/link";
import { clubes } from "@/data/dados";

export default function Clubes() {
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
          <h1 className="text-white text-lg font-medium">Clubes e Centros</h1>
        </div>
        <span className="text-gray-500 text-xl">⚙</span>
      </div>

      {/* Filtros */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todos", "Lisboa", "Porto", "Setúbal", "Évora", "Santarém"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-2.5 flex items-center gap-2">
          <span className="text-[#6b6b6b]">🔍</span>
          <span className="text-[#6b6b6b] text-sm">Procurar clube ou centro hípico…</span>
        </div>
      </div>

      {/* Lista clubes */}
      <div className="px-4 pt-4 flex flex-col gap-2 pb-4">
        {clubes.map((c) => {
          const iniciais = c.nome.split(" ").filter((w) => w.length > 2).slice(0, 2).map((w) => w[0]).join("");
          return (
            <Link key={c.id} href={`/clubes/${c.id}`}>
              <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#003d7a] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  {iniciais}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">📍 {c.morada}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {c.modalidades.map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-[#e6eef7] text-[#003d7a] font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-[#003d7a]">{c.atletasFederados}</p>
                  <p className="text-[10px] text-[#6b6b6b]">atletas</p>
                  <span className="text-gray-300 text-lg">›</span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Placeholder para mais clubes */}
        {[
          { nome: "Centro Hípico do Porto", morada: "Matosinhos, Porto", modalidades: ["Salto", "Dressage"], atletas: 38 },
          { nome: "Escola de Equitação de Évora", morada: "Évora", modalidades: ["Dressage", "Eq. Trabalho"], atletas: 22 },
          { nome: "Centro Hípico de Sintra", morada: "Sintra, Lisboa", modalidades: ["Salto", "CCA"], atletas: 31 },
        ].map((c, i) => (
          <div key={i} className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3 opacity-70">
            <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {c.nome.split(" ").filter((w) => w.length > 2).slice(0, 2).map((w) => w[0]).join("")}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
              <p className="text-xs text-[#6b6b6b] mt-0.5">📍 {c.morada}</p>
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {c.modalidades.map((m) => (
                  <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-[#e6eef7] text-[#003d7a] font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-medium text-[#003d7a]">{c.atletas}</p>
              <p className="text-[10px] text-[#6b6b6b]">atletas</p>
              <span className="text-gray-300 text-lg">›</span>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}