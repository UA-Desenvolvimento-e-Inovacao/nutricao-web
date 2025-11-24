import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Importa o Tailwind

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        {children} {/* Renderiza o layout do grupo (public) ou (private) */}
      </body>
    </html>
  );
}