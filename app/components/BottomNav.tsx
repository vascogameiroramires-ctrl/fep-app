"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Início", icon: "🏠" },
  { href: "/concursos", label: "Concursos", icon: "🏆" },
  { href: "/notificacoes", label: "Alertas", icon: "🔔" },
  { href: "/favoritos", label: "Favoritos", icon: "⭐" },
  { href: "/perfil", label: "Perfil", icon: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e4df] flex justify-around items-center py-2 pb-4 z-50">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xl">{item.icon}</span>
            <span
              className={`text-[10px] font-medium ${
                active ? "text-[#003d7a]" : "text-[#6b6b6b]"
              }`}
            >
              {item.label}
            </span>
            {active && (
              <div className="w-1 h-1 rounded-full bg-[#003d7a]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
