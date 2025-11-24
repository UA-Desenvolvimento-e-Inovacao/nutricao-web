import Sidebar from '@/src/components/sidebar/Sidebar'; // Ajuste o caminho se necessário

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Este é o layout que criamos antes com Tailwind
    <div className="flex min-h-screen">
      
      {/* Coluna do Menu Lateral */}
      <aside className=" flex-shrink-0 bg-gray-800 text-white">
        <Sidebar />
      </aside>

      {/* Coluna do Conteúdo Principal (suas páginas privadas) */}
      <main className="flex-grow p-6 bg-gray-100">
        {children} 
      </main>

    </div>
  );
}