"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegistarCavalo() {
  const [passo, setPasso] = useState(1);
  const [submetido, setSubmetido] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);

  const [form, setForm] = useState({
    microchip: "",
    nome: "",
    raca: "",
    sexo: "",
    cor: "",
    anoNascimento: "",
    pai: "",
    paiDaMae: "",
    criador: "",
    proprietario: "",
    observacoes: "",
  });

  const set = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  if (submetido) {
    return (
      <main className="pb-24">
        <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">9:41</span>
          <span className="text-xs text-gray-400">◆ ▮</span>
        </div>
        <div className="bg-[#1a1a1a] px-5 pb-4 flex items-center gap-3">
          <Link href="/perfil" className="text-gray-500 text-xl">‹</Link>
          <h1 className="text-white text-lg font-medium">Inscrição de Cavalo</h1>
        </div>

        <div className="px-4 pt-6">
          <div className="bg-white border border-[#e8f0e8] rounded-xl p-6 flex flex-col items-center text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#e8f0e8] border-2 border-[#b0d4b0] flex items-center justify-center text-3xl mb-4">✅</div>
            <p className="text-lg font-medium text-[#1a1a1a]">Pedido submetido!</p>
            <p className="text-xs text-[#6b6b6b] mt-2 leading-relaxed">O pedido de inscrição de <strong>{form.nome}</strong> foi enviado à FEP para avaliação. Receberás uma notificação quando for processado.</p>
            <div className="mt-4 bg-[#e6eef7] border border-[#c0d4ec] rounded-lg px-4 py-2">
              <p className="text-sm font-medium text-[#003d7a]">Nº REG-2026-001247</p>
            </div>
          </div>

          <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-[#e8e4df]">
              <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">O que acontece a seguir</p>
            </div>
            {[
              { num: "1", texto: "A FEP recebe o pedido e os documentos enviados." },
              { num: "2", texto: "A FEP valida os dados e o passaporte do cavalo." },
              { num: "3", texto: "Recebes uma notificação com a decisão." },
              { num: "4", texto: "O cavalo fica disponível no teu perfil para inscrição em concursos." },
            ].map((p, i, arr) => (
              <div key={p.num} className={`flex items-start gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                <div className="w-6 h-6 rounded-full bg-[#003d7a] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0 mt-0.5">{p.num}</div>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">{p.texto}</p>
              </div>
            ))}
          </div>

          <Link href="/perfil" className="block bg-[#003d7a] rounded-xl py-3.5 text-center text-white text-sm font-medium">
            Voltar ao perfil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-24">
      <div className="bg-[#1a1a1a] px-5 pt-3 pb-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">9:41</span>
        <span className="text-xs text-gray-400">◆ ▮</span>
      </div>
      <div className="bg-[#1a1a1a] px-5 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/perfil" className="text-gray-500 text-xl">‹</Link>
          <h1 className="text-white text-lg font-medium">Inscrição de Cavalo</h1>
        </div>
        <span className="text-gray-500 text-xl">✕</span>
      </div>

      {/* Progress */}
      <div className="bg-[#1a1a1a] px-5 pb-4">
        <div className="flex items-center">
          {["Identificação", "Pedigree", "Documentos"].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                  i + 1 < passo ? "bg-[#003d7a] border-[#003d7a] text-white" :
                  i + 1 === passo ? "bg-white border-white text-[#1a1a1a]" :
                  "border-[#444] text-[#666]"
                }`}>
                  {i + 1 < passo ? "✓" : i + 1}
                </div>
                <span className={`text-[8px] text-center leading-tight ${i + 1 === passo ? "text-white" : "text-[#666]"}`}>{s}</span>
              </div>
              {i < 2 && <div className={`h-px flex-1 mb-3 mx-1 ${i + 1 < passo ? "bg-[#003d7a]" : "bg-[#333]"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Passo 1 — Identificação */}
      {passo === 1 && (
        <>
          <div className="px-4 pt-4">
            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Identificação</p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              {[
                { label: "Número de Microchip *", campo: "microchip", placeholder: "ex: 620098102345678", tipo: "text" },
                { label: "Nome do cavalo *", campo: "nome", placeholder: "ex: Baluarte de Xisto", tipo: "text" },
                { label: "Ano de nascimento *", campo: "anoNascimento", placeholder: "ex: 2018", tipo: "number" },
              ].map((f, i, arr) => (
                <div key={f.campo} className={`px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                  <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-wide mb-1.5">{f.label}</p>
                  <input
                    type={f.tipo}
                    placeholder={f.placeholder}
                    value={form[f.campo as keyof typeof form]}
                    onChange={(e) => set(f.campo, e.target.value)}
                    className="w-full text-sm text-[#1a1a1a] placeholder-[#bbb] outline-none bg-transparent"
                  />
                </div>
              ))}
            </div>

            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Características</p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 border-b border-[#e8e4df]">
                <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-wide mb-1.5">Raça *</p>
                <select
                  value={form.raca}
                  onChange={(e) => set("raca", e.target.value)}
                  className="w-full text-sm text-[#1a1a1a] outline-none bg-transparent"
                >
                  <option value="">Selecionar raça</option>
                  {["Lusitano", "PSL", "KWPN", "Hanoveriano", "Sela Português", "Outra"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="px-4 py-3 border-b border-[#e8e4df]">
                <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-wide mb-1.5">Sexo *</p>
                <div className="flex gap-2">
                  {["Garanhão", "Castrado", "Égua"].map((s) => (
                    <button
                      key={s}
                      onClick={() => set("sexo", s)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${
                        form.sexo === s ? "bg-[#003d7a] border-[#003d7a] text-white" : "border-[#e8e4df] text-[#6b6b6b]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-wide mb-1.5">Cor *</p>
                <select
                  value={form.cor}
                  onChange={(e) => set("cor", e.target.value)}
                  className="w-full text-sm text-[#1a1a1a] outline-none bg-transparent"
                >
                  <option value="">Selecionar cor</option>
                  {["Castanho", "Ruço", "Preto", "Alazão", "Branco", "Tordilho", "Palomino"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPasso(2)}
            className="mx-4 bg-[#003d7a] rounded-xl py-3.5 text-center text-white text-sm font-medium w-[calc(100%-32px)]"
          >
            Continuar →
          </button>
        </>
      )}

      {/* Passo 2 — Pedigree */}
      {passo === 2 && (
        <>
          <div className="px-4 pt-4">
            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Pedigree e pessoas</p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              {[
                { label: "Nome do Pai", campo: "pai", placeholder: "ex: Xisto da Quinta" },
                { label: "Nome do Pai da Mãe", campo: "paiDaMae", placeholder: "ex: Nevado do Ribatejo" },
                { label: "Criador *", campo: "criador", placeholder: "ex: Coudelaria da Serra" },
                { label: "Proprietário *", campo: "proprietario", placeholder: "ex: Maria Fonseca" },
              ].map((f, i, arr) => (
                <div key={f.campo} className={`px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                  <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-wide mb-1.5">{f.label}</p>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={form[f.campo as keyof typeof form]}
                    onChange={(e) => set(f.campo, e.target.value)}
                    className="w-full text-sm text-[#1a1a1a] placeholder-[#bbb] outline-none bg-transparent"
                  />
                </div>
              ))}
            </div>

            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Observações</p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              <textarea
                value={form.observacoes}
                onChange={(e) => set("observacoes", e.target.value)}
                placeholder="Informação adicional relevante para a FEP..."
                className="w-full px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#bbb] outline-none resize-none h-24"
              />
            </div>
          </div>

          <div className="flex gap-3 px-4">
            <button onClick={() => setPasso(1)} className="flex-1 border border-[#003d7a] rounded-xl py-3 text-center text-[#003d7a] text-sm font-medium">
              ← Voltar
            </button>
            <button onClick={() => setPasso(3)} className="flex-1 bg-[#003d7a] rounded-xl py-3 text-center text-white text-sm font-medium">
              Continuar →
            </button>
          </div>
        </>
      )}

      {/* Passo 3 — Documentos */}
      {passo === 3 && (
        <>
          <div className="px-4 pt-4">
            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">
              Fotos do passaporte
            </p>

            <div className="bg-[#e6eef7] border border-[#c0d4ec] rounded-xl p-4 mb-3 flex gap-3">
              <span className="text-xl">ℹ️</span>
              <p className="text-xs text-[#003d7a] leading-relaxed">
                Fotografa todas as páginas relevantes do passaporte do cavalo — identificação, vacinações e pedigree. As imagens serão avaliadas pela FEP.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {["Página de identificação", "Página do pedigree", "Página das vacinações", "Outras páginas"].map((doc, i) => (
                <div key={doc} className={`bg-white border rounded-xl p-4 flex flex-col items-center gap-2 ${
                  fotos.includes(doc) ? "border-[#003d7a]" : "border-[#e8e4df] border-dashed"
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                    fotos.includes(doc) ? "bg-[#e6eef7]" : "bg-[#f9f7f4]"
                  }`}>
                    {fotos.includes(doc) ? "✅" : "📷"}
                  </div>
                  <p className="text-[10px] text-[#6b6b6b] text-center leading-tight">{doc}</p>
                  <button
                    onClick={() => {
                      if (fotos.includes(doc)) {
                        setFotos(fotos.filter((f) => f !== doc));
                      } else {
                        setFotos([...fotos, doc]);
                      }
                    }}
                    className={`text-[10px] px-3 py-1 rounded-full font-medium ${
                      fotos.includes(doc)
                        ? "bg-[#f5e8e8] text-[#8b1a1a]"
                        : "bg-[#003d7a] text-white"
                    }`}
                  >
                    {fotos.includes(doc) ? "Remover" : "Adicionar"}
                  </button>
                </div>
              ))}
            </div>

            {fotos.length > 0 && (
              <div className="bg-[#e8f0e8] border border-[#b0d4b0] rounded-xl px-4 py-3 mb-4 flex gap-3 items-center">
                <span className="text-lg">✅</span>
                <p className="text-xs text-[#2d4a2d]">{fotos.length} documento{fotos.length > 1 ? "s" : ""} adicionado{fotos.length > 1 ? "s" : ""}.</p>
              </div>
            )}

            {/* Resumo */}
            <p className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-widest mb-3">Resumo do pedido</p>
            <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden mb-4">
              {[
                { label: "Microchip", value: form.microchip || "—" },
                { label: "Nome", value: form.nome || "—" },
                { label: "Raça", value: form.raca || "—" },
                { label: "Sexo", value: form.sexo || "—" },
                { label: "Cor", value: form.cor || "—" },
                { label: "Pai", value: form.pai || "—" },
                { label: "Pai da Mãe", value: form.paiDaMae || "—" },
                { label: "Criador", value: form.criador || "—" },
                { label: "Proprietário", value: form.proprietario || "—" },
              ].map((r, i, arr) => (
                <div key={r.label} className={`flex justify-between items-center px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-[#e8e4df]" : ""}`}>
                  <span className="text-xs text-[#6b6b6b]">{r.label}</span>
                  <span className="text-xs font-medium text-[#1a1a1a]">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 px-4">
            <button onClick={() => setPasso(2)} className="flex-1 border border-[#003d7a] rounded-xl py-3 text-center text-[#003d7a] text-sm font-medium">
              ← Voltar
            </button>
            <button
              onClick={() => setSubmetido(true)}
              className="flex-1 bg-[#003d7a] rounded-xl py-3 text-center text-white text-sm font-medium"
            >
              Submeter à FEP →
            </button>
          </div>
        </>
      )}
    </main>
  );
}