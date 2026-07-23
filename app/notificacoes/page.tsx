import Link from "next/link";

const notificacoes = [
  {
    id: 1,
    tipo: "ordem",
    titulo: "Ordem de entrada disponível",
    descricao: "A ordem de entrada do CDN Lisboa — Éden já está disponível. Entras a 3.º na Pista A às 10h15.",
    tempo: "Há 23 minutos",
    lida: false,
    icon: "📋",
    cor: "bg-[#e8f0e8]",
  },
  {
    id: 2,
    tipo: "inscricao",
    titulo: "Inscrição confirmada",
    descricao: "Baluarte de Xisto inscrito no Grand Prix e Grand Prix Especial do CDN Lisboa — Éden.",
    tempo: "Há 2 horas",
    lida: false,
    icon: "✅",
    cor: "bg-[#e6eef7]",
  },
  {
    id: 3,
    tipo: "favorito",
    titulo: "Resultado do teu favorito",
    descricao: "Quinta do Sol Z ficou em 1.º lugar no CSN Porto com 74,5 pts.",
    tempo: "Há 4 horas",
    lida: false,
    icon: "⭐",
    cor: "bg-[#f0ece6]",
  },
  {
    id: 4,
    tipo: "resultado",
    titulo: "Resultado publicado",
    descricao: "Baluarte de Xisto — 1.º lugar no Grand Prix · 74,820%. Ranking atualizado.",
    tempo: "Há 5 horas",
    lida: false,
    icon: "🏆",
    cor: "bg-[#fff8e0]",
  },
  {
    id: 5,
    tipo: "alerta",
    titulo: "Inscrições encerram amanhã",
    descricao: "As inscrições para o CCE Évora — Etapa 3 encerram amanhã às 23h59.",
    tempo: "Ontem às 09:00",
    lida: true,
    icon: "⏰",
    cor: "bg-[#fff0e8]",
  },
  {
    id: 6,
    tipo: "licenca",
    titulo: "Lembrete de licença",
    descricao: "A licença de Fidalgo do Vale renova em Dezembro. Trata com antecedência.",
    tempo: "Ontem às 08:00",
    lida: true,
    icon: "🪪",
    cor: "bg-[#f5e8e8]",
  },
];

const preferencias = [
  { icon: "✅", label: "Confirmações de inscrição", desc: "Quando uma inscrição é aceite", ativo: true, cor: "bg-[#e6eef7]" },
  { icon: "📋", label: "Ordens de entrada", desc: "Quando a organização publicar", ativo: true, cor: "bg-[#e8f0e8]" },
  { icon: "🏆", label: "Resultados", desc: "Quando os resultados são publicados", ativo: true, cor: "bg-[#fff8e0]" },
  { icon: "⭐", label: "Favoritos", desc: "Resultados de cavalos e cavaleiros seguidos", ativo: true, cor: "bg-[#f0ece6]" },
  { icon: "🪪", label: "Licenças e renovações", desc: "Avisos com antecedência", ativo: false, cor: "bg-[#f5e8e8]" },
];

export default function Notificacoes() {
  const hoje = notificacoes.filter((n) => !n.lida);
  const ontem = notificacoes.filter((n) => n.lida);
  const naoLidas = notificacoes.filter((n) => !n.lida).length;

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
          <h1 className="text-white text-lg font-medium">Notificações</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#003d7a] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            {naoLidas} novas
          </span>
          <span className="text-gray-500 text-xl">⚙</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-[#1a1a1a] px-4 pb-4 flex gap-2 overflow-x-auto">
        {["Todas", "Inscrições", "Resultados", "Ordens de entrada", "Favoritos"].map((f, i) => (
          <button key={f} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border ${
            i === 0 ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#3a3a3a] text-gray-400"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Hoje */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Hoje</span>
        <div className="flex-1 h-px bg-[#e8e4df]" />
      </div>

      <div className="px-4 flex flex-col gap-2">
        {hoje.map((n) => (
          <div key={n.id} className="bg-[#e6eef7] border border-[#c0d4ec] rounded-xl px-4 py-3 flex gap-3 relative overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-[#003d7a] rounded-r-full" />
            <div className={`w-10 h-10 rounded-xl ${n.cor} flex items-center justify-center text-xl flex-shrink-0`}>
              {n.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1a1a1a]">{n.titulo}</p>
              <p className="text-xs text-[#6b6b6b] mt-1 leading-relaxed">{n.descricao}</p>
              <p className="text-[10px] text-[#6b6b6b] mt-1.5">{n.tempo}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#003d7a] flex-shrink-0 mt-1" />
          </div>
        ))}
      </div>

      {/* Ontem */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Ontem</span>
        <div className="flex-1 h-px bg-[#e8e4df]" />
      </div>

      <div className="px-4 flex flex-col gap-2">
        {ontem.map((n) => (
          <div key={n.id} className="bg-white border border-[#e8e4df] rounded-xl px-4 py-3 flex gap-3">
            <div className={`w-10 h-10 rounded-xl ${n.cor} flex items-center justify-center text-xl flex-shrink-0`}>
              {n.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1a1a1a]">{n.titulo}</p>
              <p className="text-xs text-[#6b6b6b] mt-1 leading-relaxed">{n.descricao}</p>
              <p className="text-[10px] text-[#6b6b6b] mt-1.5">{n.tempo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Preferências */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest">Preferências de alertas</span>
        <div className="flex-1 h-px bg-[#e8e4df]" />
      </div>

      <div className="px-4 pb-4">
        <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
          {preferencias.map((p, i) => (
            <div key={p.label} className={`flex items-center gap-3 px-4 py-3 ${i < preferencias.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
              <div className={`w-8 h-8 rounded-lg ${p.cor} flex items-center justify-center text-base flex-shrink-0`}>
                {p.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#1a1a1a]">{p.label}</p>
                <p className="text-[10px] text-[#6b6b6b] mt-0.5">{p.desc}</p>
              </div>
              <div className={`w-9 h-5 rounded-full relative flex-shrink-0 ${p.ativo ? "bg-[#003d7a]" : "bg-[#e8e4df]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.ativo ? "right-0.5" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}