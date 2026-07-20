import Link from "next/link";
import { cavalos } from "@/data/dados";

export default function Cavalos() {
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
          <h1 className="text-white text-lg font-medium">Cavalos</h1>
        </div>
        <span className="text-gray-500 text-xl">⚙</span>
      </div>

      {/* Filtros */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todos", "Lusitano", "PSL", "KWPN", "Hanoveriano"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Lista cavalos */}
      <div className="px-4 pt-4 flex flex-col gap-2 pb-4">
        {cavalos.map((c) => {
          const idade = new Date().getFullYear() - c.anoNascimento;
          return (
            <Link key={c.id} href={`/cavalos/${c.id}`}>
              <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#e6eef7] flex items-center justify-center text-2xl flex-shrink-0">
                  🐎
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">{c.raca} · {c.sexo} · {idade} anos</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">🏇 {c.cavaleiro}</p>
                  <div className="flex gap-1 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e6eef7] text-[#003d7a] font-medium">
                      {c.disciplina}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0ece6] text-[#6b6b6b] font-medium">
                      {c.cor}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-[#003d7a]">{c.ranking}º</p>
                  <p className="text-[10px] text-[#6b6b6b]">ranking</p>
                  <span className="text-gray-300 text-lg">›</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </main>
  );
}