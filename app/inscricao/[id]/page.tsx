"use client";

import { useState, use } from "react";
import Link from "next/link";
import { concursos, cavalos } from "@/data/dados";

export default function Inscricao({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const concurso = concursos.find((c) => c.id === id);

  const [passo, setPasso] = useState(2);
  const [provasSelecionadas, setProvasSelecionadas] = useState<Record<string, string[]>>({});
  const [box, setBox] = useState(false);
  const [palha, setPalha] = useState(false);
  const [aparas, setAparas] = useState(false);
  const [feno, setFeno] = useState(false);
  const [observacoes, setObservacoes] = useState("");

  if (!concurso) {
    return (
      <main className="pb-24 px-4 pt-8 text-center">
        <p className="text-[#6b6b6b]">Concurso não encontrado.</p>
        <Link href="/concursos" className="text-[#003d7a] text-sm mt-4 block">← Voltar</Link>
      </main>
    );
  }

  const toggleCavalo = (provaId: string, cavaloNome: string) => {
    setProvasSelecionadas((prev) => {
      const atual = prev[provaId] || [];
      if (atual.includes(cavaloNome)) {
        return { ...prev, [provaId]: atual.filter((c) => c !== cavaloNome) };
      } else {
        return { ...prev, [provaId]: [...atual, cavaloNome] };
      }
    });
  };

  const provasComCavalos = Object.entries(provasSelecionadas).filter(([, c]) => c.length > 0);
  const total = provasComCavalos.reduce((acc, [provaId, cavalosArr]) => {
    const prova = concurso.provas.find((p) => p.id === provaId);
    return acc + (prova?.taxa || 0) * cavalosArr.length;
  }, 0) + 10;

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
          <Link href={`/concursos/${concurso.id}`} className="text-gray-500 text-xl">‹</Link>
          <h1 className="text-white text-lg font-medium">Inscrição</h1>
        </div>
        <span className="text-gray-500 text-xl">✕</span>
      </div>

      {/* Progress */}
      <div className="bg-[#1a1a1a] px-5 pb-4">
        <div className="flex items-center">
          {["Concurso", "Provas e cavalos", "Alojamento", "Confirmar"].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                  i + 1 < passo ? "bg-[#003d7a] border-[#003d7a] text-white" :
                  i + 1 === passo ? "bg-white border-white text-[#1a1a1a]" :
                  "border-[#444] text-[#666]"
                }`}>
                  {i + 1 < passo ? "✓" : i + 1}
                </div>
                <span className={`text-[8px] text-center leading-tight ${i + 1 === passo ? "text-white" : "text-[#666]"}`}>
                  {s}
                </span>
              </div>
              {i < 3 && <div className={`h-px flex-1 mb-3 mx-1 ${i + 1 < passo ? "bg-[#003d7a]" : "bg-[#333]"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Concurso resumo */}
      <div className="mx-4 mt-4 bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="min-w-[40px] bg-[#003d7a] rounded-lg py-1.5 flex flex-col items-center flex-shrink-0">
          <span className="text-white text-sm font-medium leading-none">{new Date(concurso.data).getDate()}</span>
          <span className="text-[#a8c4e0] text-[9px] uppercase mt-0.5">{new Date(concurso.data).toLocaleString("pt-PT", { month: "short" })}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-[#1a1a1a]">{concurso.nome}</p>
          <p className="text-xs text-[#6b6b6b] mt-0.5">📍 {concurso.local}</p>
        </div>
      </div>

      {/* Passo 2 — Provas e cavalos */}
      {passo === 2 && (
        <>
          <div className="px-4 pt-4">
            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
              Seleciona provas e cavalos
            </p>
            {concurso.provas.map((p) => {
              const cavalosNaProva = provasSelecionadas[p.id] || [];
              const selecionada = cavalosNaProva.length > 0;
              return (
                <div key={p.id} className={`bg-white border rounded-xl mb-3 overflow-hidden ${selecionada ? "border-[#003d7a]" : "border-[#e8e4df]"}`}>
                  <div className="px-4 py-3 flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${selecionada ? "bg-[#003d7a] border-[#003d7a]" : "border-[#e8e4df]"}`}>
                      {selecionada && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1a1a1a]">{p.nome}</p>
                      <p className="text-xs text-[#6b6b6b] mt-0.5">🕐 {p.horario} · {p.pista}</p>
                    </div>
                    <span className="text-sm font-medium text-[#1a1a1a]">{p.taxa} € / cavalo</span>
                  </div>
                  <div className="border-t border-[#e6eef7] bg-[#e6eef7] px-4 py-3">
                    <p className="text-[10px] text-[#003d7a] font-medium uppercase tracking-wide mb-2">Cavalos</p>
                    <div className="flex flex-wrap gap-2">
                      {cavalos.map((c) => {
                        const selected = cavalosNaProva.includes(c.nome);
                        return (
                          <button
                            key={c.id}
                            onClick={() => toggleCavalo(p.id, c.nome)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                              selected ? "bg-[#003d7a] text-white" : "bg-white text-[#003d7a] border border-[#003d7a]"
                            }`}
                          >
                            🐎 {c.nome}
                            {selected && <span className="text-white/70 text-[10px]">✕</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {provasComCavalos.length > 0 && (
            <div className="mx-4 bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              {provasComCavalos.map(([provaId, cavalosArr]) => {
                const prova = concurso.provas.find((p) => p.id === provaId);
                return cavalosArr.map((cavalo) => (
                  <div key={`${provaId}-${cavalo}`} className="flex justify-between px-4 py-2 border-b border-[#e8e4df] text-xs">
                    <span className="text-[#6b6b6b]">{prova?.nome} · {cavalo}</span>
                    <span className="font-medium text-[#1a1a1a]">{prova?.taxa} €</span>
                  </div>
                ));
              })}
              <div className="flex justify-between px-4 py-2 border-b border-[#e8e4df] text-xs">
                <span className="text-[#6b6b6b]">Taxa de inscrição</span>
                <span className="font-medium text-[#1a1a1a]">10 €</span>
              </div>
              <div className="flex justify-between px-4 py-3 bg-[#e6eef7]">
                <span className="text-sm font-medium text-[#003d7a]">Total</span>
                <span className="text-lg font-medium text-[#003d7a]">{total} €</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setPasso(3)}
            className="mx-4 bg-[#003d7a] rounded-xl py-3.5 text-center text-white text-sm font-medium w-[calc(100%-32px)]"
          >
            Continuar →
          </button>
        </>
      )}

      {/* Passo 3 — Alojamento */}
      {passo === 3 && (
        <>
          <div className="px-4 pt-4">
            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
              Alojamento para o cavalo
            </p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              {[
                { label: "Box", desc: "Alojamento individual para o cavalo", value: box, setter: setBox, icon: "🏠" },
                { label: "Palha", desc: "Cama de palha para a box", value: palha, setter: setPalha, icon: "🌾" },
                { label: "Aparas", desc: "Cama de aparas para a box", value: aparas, setter: setAparas, icon: "🪵" },
                { label: "Feno", desc: "Fornecimento de feno durante o concurso", value: feno, setter: setFeno, icon: "🌿" },
              ].map((item, i, arr) => (
                <div key={item.label} className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1a1a]">{item.label}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => item.setter(!item.value)}
                    className={`w-11 h-6 rounded-full relative flex-shrink-0 transition-colors ${item.value ? "bg-[#003d7a]" : "bg-[#e8e4df]"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.value ? "right-1" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
              Observações
            </p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Pedidos especiais à organização, necessidades específicas do cavalo, alergias alimentares..."
                className="w-full px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#bbb] outline-none resize-none h-28"
              />
            </div>
          </div>

          <div className="flex gap-3 px-4">
            <button onClick={() => setPasso(2)} className="flex-1 border border-[#003d7a] rounded-xl py-3 text-center text-[#003d7a] text-sm font-medium">
              ← Voltar
            </button>
            <button onClick={() => setPasso(4)} className="flex-1 bg-[#003d7a] rounded-xl py-3 text-center text-white text-sm font-medium">
              Continuar →
            </button>
          </div>
        </>
      )}

      {/* Passo 4 — Confirmação */}
      {passo === 4 && (
        <>
          <div className="px-4 pt-4">
            <div className="bg-white border border-[#e8f0e8] rounded-xl p-4 mb-4 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#e8f0e8] border-2 border-[#b0d4b0] flex items-center justify-center text-3xl mb-3">✅</div>
              <p className="text-lg font-medium text-[#1a1a1a]">Inscrição submetida!</p>
              <p className="text-xs text-[#6b6b6b] mt-2 leading-relaxed">A tua inscrição foi enviada à organização. Receberás confirmação por notificação.</p>
              <div className="mt-3 bg-[#e6eef7] border border-[#c0d4ec] rounded-lg px-4 py-2">
                <p className="text-sm font-medium text-[#003d7a]">Nº INS-2026-004821</p>
              </div>
            </div>

            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Resumo</p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              {provasComCavalos.map(([provaId, cavalosArr]) => {
                const prova = concurso.provas.find((p) => p.id === provaId);
                return cavalosArr.map((cavalo) => (
                  <div key={`${provaId}-${cavalo}`} className="flex items-center gap-3 px-4 py-3 border-b border-[#e8e4df]">
                    <div className="w-7 h-7 rounded-full bg-[#e8f0e8] flex items-center justify-center text-sm flex-shrink-0">✓</div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#1a1a1a]">{prova?.nome}</p>
                      <p className="text-[10px] text-[#6b6b6b]">{cavalo}</p>
                    </div>
                    <span className="text-xs font-medium text-[#1a1a1a]">{prova?.taxa} €</span>
                  </div>
                ));
              })}
              {box && <div className="flex justify-between px-4 py-2.5 border-b border-[#e8e4df] text-xs"><span className="text-[#6b6b6b]">🏠 Box</span><span className="font-medium">Solicitado</span></div>}
              {palha && <div className="flex justify-between px-4 py-2.5 border-b border-[#e8e4df] text-xs"><span className="text-[#6b6b6b]">🌾 Palha</span><span className="font-medium">Solicitado</span></div>}
              {aparas && <div className="flex justify-between px-4 py-2.5 border-b border-[#e8e4df] text-xs"><span className="text-[#6b6b6b]">🪵 Aparas</span><span className="font-medium">Solicitado</span></div>}
              {feno && <div className="flex justify-between px-4 py-2.5 border-b border-[#e8e4df] text-xs"><span className="text-[#6b6b6b]">🌿 Feno</span><span className="font-medium">Solicitado</span></div>}
              {observacoes && <div className="px-4 py-2.5 border-b border-[#e8e4df] text-xs"><span className="text-[#6b6b6b]">📝 {observacoes}</span></div>}
              <div className="flex justify-between px-4 py-3 bg-[#e6eef7]">
                <span className="text-sm font-medium text-[#003d7a]">Total pago</span>
                <span className="text-lg font-medium text-[#003d7a]">{total} €</span>
              </div>
            </div>
          </div>

          <Link href="/" className="mx-4 block bg-[#003d7a] rounded-xl py-3.5 text-center text-white text-sm font-medium">
            Voltar ao início
          </Link>
        </>
      )}

    </main>
  );
}