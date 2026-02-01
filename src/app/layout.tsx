import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeiloesBR - Plataforma de Leiloes Online",
  description: "Plataforma completa para leiloes online de arte, antiguidades e itens de colecao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
