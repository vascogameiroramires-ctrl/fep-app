import Link from "next/link";
import { clubes, cavaleiros, concursos } from "@/data/dados";

export default async function PerfilClube({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clube = clubes.find((c) => c.id === id);

  if (!clube) {
    return (
      <main className="pb-24 px-4 pt-8 text-center">
        <p className="text-[#6b6b6b]">Clube não encontrado.</p>
        <Link href="/" className="text-[#003d7a] text-sm mt-4 block">← Voltar</Link>
      </main>
    );
  }

  const atletasDoClube = cavaleiros.filter((c) => c.clubeId === id);

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
        <div className="w-16 h-16 rounded-2xl bg-[#003d7a] border-2 border-white/15 flex items-center justify-center text-white text-xs font-medium text-center leading-tight mb-3">
          {clube.nome.split(" ").slice(0, 2).map(w => w[0]).join("")}
        </div>
        <h1 className="text-white text-lg font-medium">{clube.nome}</h1>
        <p className="text-white/50 text-xs mt-1">Federado FEP · Nº {clube.numeroFep} · {clube.distrito}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#003d7a] text-white font-medium">
            Clube federado
          </span>
          {clube.modalidades.map((m) => (
            <span key={m} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-medium">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-4 pt-4">
        {[
          { num: clube.atletasFederados, label: "Atletas federados" },
          { num: clube.concursosOrganizados, label: "Concursos organizados" },
          { num: clube.atletasTop10, label: "Atletas no top 10" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e8e4df] rounded-xl p-3 text-center">
            <p className="text-xl font-medium text-[#003d7a]">{s.num}</p>
            <p className="text-[10px] text-[#6b6b6b] mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Localização */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Localização
        </p>
        <div className="bg-[#c8dcc8] rounded-xl h-24 mb-3 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c8dcc8] to-[#b8ceb8]" />
          <div className="relative z-10 flex flex-col items-center gap-1">
            <span className="text-3xl">📍</span>
            <span className="text-xs font-medium text-[#1a1a1a] bg-white px-2 py-1 rounded-lg">{clube.nome}</span>
          </div>
          <span className="absolute bottom-2 right-3 text-[10px] text-[#003d7a] font-medium">Abrir no Maps →</span>
        </div>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {[
            { label: "Morada", value: clube.morada },
            { label: "Distrito", value: clube.distrito },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex justify-between items-center px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <span className="text-xs text-[#6b6b6b]">{row.label}</span>
              <span className="text-xs font-medium text-[#1a1a1a]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modalidades */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Modalidades
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {clube.modalidades.map((m) => (
            <div key={m} className="bg-white border border-[#e8e4df] rounded-xl px-3 py-2.5 flex items-center gap-2">
              <span className="text-lg">🐎</span>
              <span className="text-xs font-medium text-[#1a1a1a]">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Atletas */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Atletas em destaque
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {atletasDoClube.map((a) => {
            const iniciais = a.nome.split(" ").map((n) => n[0]).join("").slice(0, 2);
            return (
              <Link key={a.id} href={`/cavaleiros/${a.id}`}>
                <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#003d7a] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {iniciais}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1a1a]">{a.nome}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5">{a.disciplina} · {a.escalao}</p>
                  </div>
                  <span className="text-[10px] font-medium text-[#003d7a] bg-[#e6eef7] px-2 py-1 rounded-full">
                    {a.ranking}º nacional
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Contactos */}
      <div className="px-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
          Contactos
        </p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {[
            { icon: "📞", value: clube.telefone },
            { icon: "✉️", value: clube.email },
            { icon: "🌐", value: clube.website, blue: true },
          ].map((row, i, arr) => (
            <div key={row.value} className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <span className="text-base">{row.icon}</span>
              <span className={`text-xs ${row.blue ? "text-[#003d7a]" : "text-[#1a1a1a]"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}