"use client";

import { useState } from "react";
import Link from "next/link";
import { cavalos, cavaleiros, concursos, clubes } from "@/data/dados";

export default function Pesquisa() {
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();

  const cavalosResultados = cavalos.filter(
    (c) => c.nome.toLowerCase().includes(q) || c.raca.toLowerCase().includes(q) || c.criador.toLowerCase().includes(q)
  );
  const cavaleirosResultados = cavaleiros.filter(
    (c) => c.nome.toLowerCase().includes(q) || c.clube.toLowerCase().includes(q)
  );
  const concursosResultados = concursos.filter(
    (c) => c.nome.toLowerCase().includes(q) || c.local.toLowerCase().includes(q)
  );
  const clubesResultados = clubes.filter(
    (c) => c.nome.toLowerCase().includes(q) || c.distrito.toLowerCase().includes(q)
  );

  const temResultados = q.length > 0;

  return (
    <main className="pb-24">

      {/* Status bar */}
      <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">9:41</span>
        <span className="text-xs text-gray-400">◆ ▮</span>
      </div>

      {/* Header com search */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex items-center gap-3">
        <Link href="/" className="text-gray-500 text-xl flex-shrink-0">‹</Link>
        <div className="flex-1 bg-[#2e2e2e] border border-[#444] rounded-xl px-4 py-2.5 flex items-center gap-2">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Cavalos, cavaleiros, concursos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-600"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-500 text-sm">✕</button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todos", "Cavalos", "Cavaleiros", "Concursos", "Clubes"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Estado vazio */}
      {!temResultados && (
        <div className="px-4 pt-6">
          <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
            Pesquisas recentes
          </p>
          <div className="flex flex-col gap-2">
            {["lusitano", "CDN Lisboa", "João Silva"].map((r) => (
              <button key={r} onClick={() => setQuery(r)} className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-[#6b6b6b]">🕐</span>
                <span className="flex-1 text-sm text-[#6b6b6b] text-left">{r}</span>
                <span className="text-[#e8e4df]">✕</span>
              </button>
            ))}
          </div>

          <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3 mt-5">
            Explorar
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: "🐎", label: "Cavalos", href: "/" },
              { icon: "👤", label: "Cavaleiros", href: "/" },
              { icon: "🏆", label: "Concursos", href: "/concursos" },
              { icon: "🏛️", label: "Clubes", href: "/" },
            ].map((s) => (
              <Link key={s.label} href={s.href}>
                <div className="bg-white border border-[#e8e4df] rounded-xl px-3 py-2.5 flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-xs font-medium text-[#6b6b6b]">{s.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Resultados */}
      {temResultados && (
        <div className="px-4 pt-4">

          {/* Cavalos */}
          {cavalosResultados.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Cavalos</span>
                <span className="text-[10px] text-[#6b6b6b]">{cavalosResultados.length} resultado{cavalosResultados.length > 1 ? "s" : ""}</span>
              </div>
              <div className="flex flex-col gap-2">
                {cavalosResultados.map((c) => (
                  <Link key={c.id} href={`/cavalos/${c.id}`}>
                    <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#e6eef7] flex items-center justify-center text-xl flex-shrink-0">🐎</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                        <p className="text-xs text-[#6b6b6b] mt-0.5">{c.raca} · {c.sexo} · {c.disciplina}</p>
                      </div>
                      <span className="text-[10px] font-medium text-[#003d7a] bg-[#e6eef7] px-2 py-1 rounded-full">Cavalo</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cavaleiros */}
          {cavaleirosResultados.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Cavaleiros</span>
                <span className="text-[10px] text-[#6b6b6b]">{cavaleirosResultados.length} resultado{cavaleirosResultados.length > 1 ? "s" : ""}</span>
              </div>
              <div className="flex flex-col gap-2">
                {cavaleirosResultados.map((c) => (
                  <Link key={c.id} href={`/cavaleiros/${c.id}`}>
                    <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f0ece6] flex items-center justify-center text-xl flex-shrink-0">👤</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                        <p className="text-xs text-[#6b6b6b] mt-0.5">{c.disciplina} · {c.escalao} · {c.clube}</p>
                      </div>
                      <span className="text-[10px] font-medium text-[#7a6a50] bg-[#f0ece6] px-2 py-1 rounded-full">Cavaleiro</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Concursos */}
          {concursosResultados.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Concursos</span>
                <span className="text-[10px] text-[#6b6b6b]">{concursosResultados.length} resultado{concursosResultados.length > 1 ? "s" : ""}</span>
              </div>
              <div className="flex flex-col gap-2">
                {concursosResultados.map((c) => (
                  <Link key={c.id} href={`/concursos/${c.id}`}>
                    <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fff8e0] flex items-center justify-center text-xl flex-shrink-0">🏆</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                        <p className="text-xs text-[#6b6b6b] mt-0.5">{c.disciplina} · {c.local}</p>
                      </div>
                      <span className="text-[10px] font-medium text-[#b8860b] bg-[#fff8e0] px-2 py-1 rounded-full">Concurso</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Clubes */}
          {clubesResultados.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Clubes</span>
                <span className="text-[10px] text-[#6b6b6b]">{clubesResultados.length} resultado{clubesResultados.length > 1 ? "s" : ""}</span>
              </div>
              <div className="flex flex-col gap-2">
                {clubesResultados.map((c) => (
                  <Link key={c.id} href={`/clubes/${c.id}`}>
                    <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#e8f0e8] flex items-center justify-center text-xl flex-shrink-0">🏛️</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                        <p className="text-xs text-[#6b6b6b] mt-0.5">{c.distrito} · {c.modalidades.join(", ")}</p>
                      </div>
                      <span className="text-[10px] font-medium text-[#2d4a2d] bg-[#e8f0e8] px-2 py-1 rounded-full">Clube</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sem resultados */}
          {cavalosResultados.length === 0 && cavaleirosResultados.length === 0 && concursosResultados.length === 0 && clubesResultados.length === 0 && (
            <div className="text-center pt-8">
              <p className="text-3xl mb-3">🔍</p>
              <p className="text-sm font-medium text-[#1a1a1a]">Sem resultados para "{query}"</p>
              <p className="text-xs text-[#6b6b6b] mt-1">Tenta pesquisar por nome, raça ou local</p>
            </div>
          )}

        </div>
      )}

    </main>
  );
}
