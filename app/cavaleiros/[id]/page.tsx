import Link from "next/link";
import { cavaleiros, cavalos } from "@/data/dados";

export default async function PerfilCavaleiro({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cavaleiro = cavaleiros.find((c) => c.id === id);

  if (!cavaleiro) {
    return (
      <main className="pb-24 px-4 pt-8 text-center">
        <p className="text-[#6b6b6b]">Cavaleiro não encontrado.</p>
        <Link href="/" className="text-[#003d7a] text-sm mt-4 block">← Voltar</Link>
      </main>
    );
  }

  const cavalosDoCavaleiro = cavalos.filter((c) => cavaleiro.cavalos.includes(c.id));
  const iniciais = cavaleiro.nome.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <main className="pb-24">

      {/* Status bar */}
      <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">9:41</span>
        <span className="text-xs text-gray-400">◆ ▮</span>
      </div>

      {/* Hero */}
      <div className="bg-[#1a1a1a] px-5 pb-5">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="text-white/60 text-xl">‹</Link>
          <div className="flex gap-4">
            <span className="text-white/60 text-xl">⭐</span>
            <span className="text-white/60 text-xl">↑</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-[#003d7a] border-2 border-white/15 flex items-center justify-center text-white text-xl font-medium mb-3">
          {iniciais}
        </div>
        <h1 className="text-white text-xl font-medium">{cavaleiro.nome}</h1>
        <p className="text-white/50 text-xs mt-1">Licença FEP · {cavaleiro.licenca}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[cavaleiro.escalao, cavaleiro.disciplina, cavaleiro.nivelMaximo, cavaleiro.clube].map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Licença */}
      <div className="bg-[#003d7a] px-5 py-2.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-white/60">🪪</span>
          <div>
            <p className="text-white text-xs font-medium">Licença válida · época 2026</p>
            <p className="text-white/50 text-[10px]">Válida até 31 Dez 2026</p>
          </div>
        </div>
        <span className="text-green-400 text-xs font-medium">✓ Ativa</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-4 pt-4">
        {[
          { num: `${cavaleiro.ranking}º`, label: "Ranking nacional" },
          { num: cavaleiro.concursos2026, label: "Concursos em 2026" },
          { num: cavaleiro.vitorias2026, label: "Vitórias em 2026" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e8e4df] rounded-xl p-3 text-center">
            <p className="text-xl font-medium text-[#003d7a]">{s.num}</p>
            <p className="text-[10px] text-[#6b6b6b] mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Informação */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Informação
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {[
            { label: "Clube", value: cavaleiro.clube, blue: true },
            { label: "Escalão", value: cavaleiro.escalao },
            { label: "Disciplina", value: cavaleiro.disciplina },
            { label: "Nível máximo", value: cavaleiro.nivelMaximo },
            { label: "Treinador", value: cavaleiro.treinador, blue: true },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex justify-between items-center px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <span className="text-xs text-[#6b6b6b]">{row.label}</span>
              <span className={`text-xs font-medium ${row.blue ? "text-[#003d7a]" : "text-[#1a1a1a]"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cavalos */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Cavalos registados
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {cavalosDoCavaleiro.map((c) => (
            <Link key={c.id} href={`/cavalos/${c.id}`}>
              <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e6eef7] flex items-center justify-center text-xl flex-shrink-0">
                  🐎
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">{c.raca} · {c.sexo} · {new Date().getFullYear() - c.anoNascimento} anos</p>
                </div>
                <span className="text-[10px] font-medium text-[#003d7a] bg-[#e6eef7] px-2 py-1 rounded-full">
                  {c.ranking}º
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Resultados recentes */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Últimos resultados
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {cavalosDoCavaleiro.flatMap((c) => c.resultados.map((r) => ({ ...r, cavalo: c.nome }))).slice(0, 4).map((r, i, arr) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                r.posicao === 1 ? "bg-[#fff8e0] text-[#b8860b]" :
                r.posicao === 2 ? "bg-[#f5f5f5] text-[#666]" :
                "bg-[#fff0e8] text-[#a0522d]"
              }`}>
                {r.posicao}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#1a1a1a]">{r.concurso}</p>
                <p className="text-[10px] text-[#6b6b6b] mt-0.5">{r.cavalo} · {r.data}</p>
              </div>
              <span className="text-xs font-medium text-[#003d7a]">{r.pontuacao}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}