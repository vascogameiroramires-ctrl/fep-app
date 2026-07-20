import Link from "next/link";
import { cavalos } from "@/data/dados";

export default async function PerfilCavalo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cavalo = cavalos.find((c) => c.id === id);

  if (!cavalo) {
    return (
      <main className="pb-24 px-4 pt-8 text-center">
        <p className="text-[#6b6b6b]">Cavalo não encontrado.</p>
        <Link href="/" className="text-[#003d7a] text-sm mt-4 block">← Voltar</Link>
      </main>
    );
  }

  const idade = new Date().getFullYear() - cavalo.anoNascimento;

  return (
    <main className="pb-24">

      {/* Status bar */}
      <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">9:41</span>
        <span className="text-xs text-gray-400">◆ ▮</span>
      </div>

      {/* Hero */}
      <div className="bg-[#003d7a] px-5 pb-5">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="text-white/60 text-xl">‹</Link>
          <div className="flex gap-4">
            <span className="text-white/60 text-xl">⭐</span>
            <span className="text-white/60 text-xl">↑</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl mb-3">
          🐎
        </div>
        <h1 className="text-white text-xl font-medium">{cavalo.nome}</h1>
        <p className="text-white/50 text-xs mt-1">FEP · {cavalo.numeroFep}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[cavalo.raca, cavalo.sexo, cavalo.cor, `${idade} anos`, cavalo.disciplina].map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ranking */}
      <div className="mx-4 mt-4 bg-[#003d7a] rounded-xl px-4 py-3 flex items-center gap-3">
        <span className="text-2xl">📊</span>
        <div>
          <p className="text-white text-lg font-medium">{cavalo.ranking}º lugar</p>
          <p className="text-white/60 text-xs">Ranking Nacional {cavalo.disciplina} · Seniores</p>
        </div>
      </div>

      {/* Identificação */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Identificação
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {[
            { label: "Raça", value: cavalo.raca },
            { label: "Sexo", value: cavalo.sexo },
            { label: "Cor", value: cavalo.cor },
            { label: "Nascimento", value: `${cavalo.anoNascimento} · ${idade} anos` },
            { label: "País de origem", value: "Portugal" },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex justify-between items-center px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <span className="text-xs text-[#6b6b6b]">{row.label}</span>
              <span className="text-xs font-medium text-[#1a1a1a]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pessoas */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Pessoas
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {[
            { label: "Cavaleiro", value: cavalo.cavaleiro, blue: true },
            { label: "Proprietário", value: cavalo.proprietario },
            { label: "Criador", value: cavalo.criador },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex justify-between items-center px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <span className="text-xs text-[#6b6b6b]">{row.label}</span>
              <span className={`text-xs font-medium ${row.blue ? "text-[#003d7a]" : "text-[#1a1a1a]"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pedigree */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Pedigree
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl p-4 mb-4">
          <div className="flex gap-3 items-stretch">
            <div className="flex-1 bg-[#003d7a] rounded-lg p-3 flex items-center">
              <div>
                <p className="text-[9px] text-white/60 uppercase tracking-wide">Cavalo</p>
                <p className="text-white text-xs font-medium mt-0.5">{cavalo.nome}</p>
              </div>
            </div>
            <div className="text-[#e8e4df] flex items-center text-lg">›</div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-[#e6eef7] rounded-lg p-2.5 flex-1">
                <p className="text-[9px] text-[#6b6b6b] uppercase tracking-wide">Pai</p>
                <p className="text-xs font-medium text-[#1a1a1a] mt-0.5">{cavalo.pai}</p>
              </div>
              <div className="bg-[#e6eef7] rounded-lg p-2.5 flex-1">
                <p className="text-[9px] text-[#6b6b6b] uppercase tracking-wide">Mãe</p>
                <p className="text-xs font-medium text-[#1a1a1a] mt-0.5">{cavalo.mae}</p>
              </div>
            </div>
            <div className="text-[#e8e4df] flex items-center text-lg">›</div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-[#e6eef7] rounded-lg p-2.5 flex-1">
                <p className="text-[9px] text-[#6b6b6b] uppercase tracking-wide">Avô pat.</p>
                <p className="text-xs font-medium text-[#1a1a1a] mt-0.5">{cavalo.avoPaterno}</p>
              </div>
              <div className="bg-[#e6eef7] rounded-lg p-2.5 flex-1">
                <p className="text-[9px] text-[#6b6b6b] uppercase tracking-wide">Avô mat.</p>
                <p className="text-xs font-medium text-[#1a1a1a] mt-0.5">{cavalo.avoMaterno}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Últimos resultados
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {cavalo.resultados.map((r, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < cavalo.resultados.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                r.posicao === 1 ? "bg-[#fff8e0] text-[#b8860b]" :
                r.posicao === 2 ? "bg-[#f5f5f5] text-[#666]" :
                "bg-[#fff0e8] text-[#a0522d]"
              }`}>
                {r.posicao}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#1a1a1a]">{r.concurso}</p>
                <p className="text-[10px] text-[#6b6b6b] mt-0.5">{r.prova} · {r.data}</p>
              </div>
              <span className="text-xs font-medium text-[#003d7a]">{r.pontuacao}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}