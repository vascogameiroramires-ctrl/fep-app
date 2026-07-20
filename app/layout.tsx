import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "./components/BottomNav";

export const metadata: Metadata = {
  title: "FEP App",
  description: "Federação Equestre Portuguesa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-[#f9f7f4] max-w-[390px] mx-auto min-h-screen relative">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
