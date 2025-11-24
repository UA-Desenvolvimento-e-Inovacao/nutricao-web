import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Importa o Tailwind
import { montserrat } from '../functions/fonts';
export const metadata: Metadata = {
  title: 'NutriH',
  description: 'Nutrição e Dieta Hospitalar',
};

// ESTE LAYOUT AGORA É MÍNIMO
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* O body não tem mais o "flex" */}
      <body className={`${montserrat.className} font-medium`}>
        {children} {/* Renderiza o layout do grupo (public) ou (private) */}
      </body>
    </html>
  );
}