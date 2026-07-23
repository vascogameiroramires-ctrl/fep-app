"use client";

import { useState } from "react";
import Link from "next/link";
import { cavaleiros, cavalos, concursos } from "@/data/dados";

export default function Perfil() {
  const [sessaoIniciada, setSessaoIniciada] = useState(false);
  const [tipoPerfil, setTipoPerfil] = useState<"participante" | "centro" | null>(null);

  const cavaleiro = cavaleiros[0];
  const cavalosDoCavaleiro = cavalos.filter((c) => cavaleiro.cavalos.includes(c.id));

  // Ecrã de login
  if (!sessaoIniciada) {
    return (
      <main className="pb-24">
        <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">9:41</span>
          <span className="text-xs text-gray-400">◆ ▮</span>
        </div>
        <div className="bg-[#1a1a1a] px-5 pb-6">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-white text-lg font-medium">Perfil</h1>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-[#003d7a] flex items-center justify-center mb-4 mt-2">
            <span className="text-white text-2xl font-medium">FEP</span>
          </div>
          <p className="text-white text-xl font-medium">Bem-vindo à<br/>FEP App</p>
          <p className="text-gray-500 text-sm mt-2">Inicia sessão para aceder ao teu perfil, inscrições e notificações.</p>
        </div>

        <div className="px-4 pt-6">
          <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
            Como queres entrar?
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => { setTipoPerfil("participante"); setSessaoIniciada(true); }}
              className="bg-white border border-[#e8e4df] rounded-xl px-4 py-4 flex items-center gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e6eef7] flex items-center justify-center text-2xl flex-shrink-0">
                👤
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a1a]">Participante</p>
                <p className="text-xs text-[#6b6b6b] mt-0.5">Cavaleiro, treinador ou adepto</p>
              </div>
              <span className="text-gray-300 text-xl">›</span>
            </button>

            <button
              onClick={() => { setTipoPerfil("centro"); setSessaoIniciada(true); }}
              className="bg-white border border-[#e8e4df] rounded-xl px-4 py-4 flex items-center gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e8f0e8] flex items-center justify-center text-2xl flex-shrink-0">
                🏛️
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a1a]">Centro Federado</p>
                <p className="text-xs text-[#6b6b6b] mt-0.5">Clube ou centro hípico federado</p>
              </div>
              <span className="text-gray-300 text-xl">›</span>
            </button>
          </div>

          <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e8e4df]">
              <p className="text-sm font-medium text-[#1a1a1a]">Entrar com credenciais FEP</p>
              <p className="text-xs text-[#6b6b6b] mt-0.5">Usa o mesmo utilizador e password do site fep.pt</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-[#6b6b6b]">Ainda não tens conta? <span className="text-[#003d7a] font-medium">Regista-te em fep.pt</span></p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Perfil participante
  if (tipoPerfil === "participante") {
    const iniciais = cavaleiro.nome.split(" ").map((n) => n[0]).join("").slice(0, 2);
    return (
      <main className="pb-24">
        <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">9:41</span>
          <span className="text-xs text-gray-400">◆ ▮</span>
        </div>
        <div className="bg-[#1a1a1a] px-5 pb-5">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-white text-lg font-medium">O meu perfil</h1>
            <span className="text-gray-500 text-xl">⚙</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#003d7a] border-2 border-white/15 flex items-center justify-center text-white text-xl font-medium mb-3">
            {iniciais}
          </div>
          <h2 className="text-white text-xl font-medium">{cavaleiro.nome}</h2>
          <p className="text-white/50 text-xs mt-1">Licença FEP · {cavaleiro.licenca}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {[cavaleiro.escalao, cavaleiro.disciplina, cavaleiro.clube].map((tag) => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-medium">{tag}</span>
            ))}
          </div>
        </div>

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

        <div className="px-4 pt-4">
          <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Os meus cavalos</p>
          <div className="flex flex-col gap-2 mb-4">
            {cavalosDoCavaleiro.map((c) => (
              <Link key={c.id} href={`/cavalos/${c.id}`}>
                <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e6eef7] flex items-center justify-center text-xl flex-shrink-0">🐎</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5">{c.raca} · {c.sexo} · {new Date().getFullYear() - c.anoNascimento} anos</p>
                  </div>
                  <span className="text-[10px] font-medium text-[#003d7a] bg-[#e6eef7] px-2 py-1 rounded-full">{c.ranking}º</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4">
          <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Próximas inscrições</p>
          <div className="flex flex-col gap-2 mb-4">
            {concursos.filter((c) => c.inscricoesAbertas).map((c) => {
              const dia = new Date(c.data).getDate();
              const mes = new Date(c.data).toLocaleString("pt-PT", { month: "short" });
              return (
                <Link key={c.id} href={`/concursos/${c.id}`}>
                  <div className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="min-w-[38px] bg-[#003d7a] rounded-lg py-1.5 flex flex-col items-center flex-shrink-0">
                      <span className="text-white text-sm font-medium leading-none">{dia}</span>
                      <span className="text-[#a8c4e0] text-[9px] uppercase mt-0.5">{mes}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1a1a1a]">{c.nome}</p>
                      <p className="text-xs text-[#6b6b6b] mt-0.5">🐎 {cavalosDoCavaleiro[0]?.nome} · {c.disciplina}</p>
                    </div>
                    <span className="text-gray-300">›</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
            {[
              { label: "Informação pessoal", icon: "👤" },
              { label: "Preferências de notificações", icon: "🔔" },
              { label: "Inscrever cavalo na FEP", icon: "🐎", href: "/registar-cavalo" },
              { label: "Idioma da app", icon: "🌐" },
            ].map((item, i, arr) => (
              <Link key={item.label} href={item.href || "#"}>
                <div className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1 text-sm text-[#1a1a1a]">{item.label}</span>
                  <span className="text-gray-300">›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => { setSessaoIniciada(false); setTipoPerfil(null); }}
            className="w-full bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <span className="text-lg">🚪</span>
            <span className="flex-1 text-sm font-medium text-[#8b1a1a] text-left">Terminar sessão</span>
          </button>
        </div>
      </main>
    );
  }

  // Perfil centro federado
  return (
    <main className="pb-24">
      <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">9:41</span>
        <span className="text-xs text-gray-400">◆ ▮</span>
      </div>
      <div className="bg-[#1a1a1a] px-5 pb-5">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-white text-lg font-medium">Painel do Centro</h1>
          <span className="text-gray-500 text-xl">⚙</span>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-[#003d7a] border-2 border-white/15 flex items-center justify-center text-white text-xs font-medium mb-3">
          CHC
        </div>
        <h2 className="text-white text-xl font-medium">Centro Hípico de Cascais</h2>
        <p className="text-white/50 text-xs mt-1">Federado FEP · Nº 00124</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {["Dressage", "Salto", "CCE"].map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-medium">{tag}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 pt-4">
        {[
          { num: 47, label: "Atletas federados" },
          { num: 12, label: "Concursos organizados" },
          { num: 3, label: "Atletas no top 10" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e8e4df] rounded-xl p-3 text-center">
            <p className="text-xl font-medium text-[#003d7a]">{s.num}</p>
            <p className="text-[10px] text-[#6b6b6b] mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 pt-4">
        <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Gestão</p>
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
          {[
            { label: "Os meus atletas", icon: "👤" },
            { label: "Concursos organizados", icon: "🏆" },
            { label: "Inscrever cavalo na FEP", icon: "🐎", href: "/registar-cavalo" },
            { label: "Gerir licenças", icon: "🪪" },
            { label: "Documentos e regulamentos", icon: "📋" },
            { label: "Preferências de notificações", icon: "🔔" },
          ].map((item, i, arr) => (
            <Link key={item.label} href={item.href || "#"}>
              <div className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-sm text-[#1a1a1a]">{item.label}</span>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={() => { setSessaoIniciada(false); setTipoPerfil(null); }}
          className="w-full bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <span className="text-lg">🚪</span>
          <span className="flex-1 text-sm font-medium text-[#8b1a1a] text-left">Terminar sessão</span>
        </button>
      </div>
    </main>
  );
}