import Link from "next/link";
import { concursos } from "@/data/dados";

export default async function DetalheConcurso({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concurso = concursos.find((c) => c.id === id);

  if (!concurso) {
    return (
      <main className="pb-24 px-4 pt-8 text-center">
        <p className="text-[#6b6b6b]">Concurso não encontrado.</p>
        <Link href="/concursos" className="text-[#003d7a] text-sm mt-4 block">← Voltar</Link>
      </main>
    );
  }

  const diaInicio = new Date(concurso.data).getDate();
  const diaFim = new Date(concurso.dataFim).getDate();
  const mes = new Date(concurso.data).toLocaleString("pt-PT", { month: "short" });

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
          <Link href="/concursos" className="text-gray-500 text-xl">‹</Link>
          <h1 className="text-white text-lg font-medium">Concurso</h1>
        </div>
        <span className="text-gray-500 text-xl">⭐</span>
      </div>

      {/* Hero concurso */}
      <div className="bg-[#003d7a] px-5 pb-5 pt-2">
        <div className="flex items-start gap-3">
          <div className="min-w-[48px] bg-white/10 rounded-lg py-2 flex flex-col items-center flex-shrink-0">
            <span className="text-white text-lg font-medium leading-none">
              {diaInicio === diaFim ? diaInicio : `${diaInicio}–${diaFim}`}
            </span>
            <span className="text-white/60 text-[9px] uppercase mt-0.5">{mes}</span>
          </div>
          <div>
            <h2 className="text-white text-base font-medium leading-tight">{concurso.nome}</h2>
            <p className="text-white/60 text-xs mt-1">📍 {concurso.local}</p>
            <p className="text-white/60 text-xs mt-0.5">👥 {concurso.inscrições} inscritos</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-medium">
                {concurso.disciplina}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${concurso.inscricoesAbertas ? "bg-[#e8f5e8] text-[#1a5c1a]" : "bg-[#f5e8e8] text-[#8b1a1a]"}`}>
                {concurso.inscricoesAbertas ? "Inscrições abertas" : "Inscrições encerradas"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Provas */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Provas
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {concurso.provas.map((p, i) => (
            <div key={p.id} className={`px-4 py-3 flex items-center gap-3 ${i < concurso.provas.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a1a]">{p.nome}</p>
                <p className="text-xs text-[#6b6b6b] mt-0.5">🕐 {p.horario} · {p.pista}</p>
              </div>
              <span className="text-sm font-medium text-[#1a1a1a]">{p.taxa} €</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ordem de entrada */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Ordem de entrada
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
          <span className="text-xl">📋</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#1a1a1a]">Ainda não disponível</p>
            <p className="text-xs text-[#6b6b6b] mt-0.5">Publicada pela organização antes do concurso</p>
          </div>
        </div>
      </div>

      {/* Localização */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Localização
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
          <span className="text-xl">📍</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#1a1a1a]">{concurso.local}</p>
            <p className="text-xs text-[#003d7a] mt-0.5">Abrir no Maps →</p>
          </div>
        </div>
      </div>

      {/* Botão inscrever */}
      {concurso.inscricoesAbertas && (
        <div className="px-4">
          <Link href={`/inscricao/${concurso.id}`}>
            <div className="bg-[#003d7a] rounded-xl py-3.5 text-center text-white text-sm font-medium">
              Inscrever neste concurso →
            </div>
          </Link>
        </div>
      )}

    </main>
  );
}