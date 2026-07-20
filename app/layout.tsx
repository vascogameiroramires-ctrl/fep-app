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
      <body className="bg-[#e8e4df] min-h-screen flex justify-center">
        <div className="w-full max-w-[390px] bg-[#f9f7f4] min-h-screen relative shadow-xl">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
