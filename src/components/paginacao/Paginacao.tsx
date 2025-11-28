'use client';
import React, { useState, useEffect } from 'react';

// T representa o "Tipo" do item (pode ser Paciente, Produto, Usuario...)
// Dizemos que T deve ser um objeto (extends object)
type ListaPaginadaProps<T> = {
  itensFiltro: T[];
  itensPorPagina?: number; // Opcional (com ?), pois definiremos valor padrão
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

// Adicionamos <T extends { id?: string | number }> para garantir que
// o item possa ter um ID, evitando erro na "key"
export default function ListaPaginada<T extends { id?: string | number }>({ 
  itensFiltro, 
  itensPorPagina = 5, // Valor padrão definido aqui
  renderItem,
  emptyMessage = "Nenhum item encontrado." // Valor padrão
}: ListaPaginadaProps<T>) {
  
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Resetar página ao mudar filtros
  useEffect(() => {
    setPaginaAtual(1);
  }, [itensFiltro]);

  // Cálculos
  const totalPaginas = Math.ceil(itensFiltro.length / itensPorPagina);
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensAtuais = itensFiltro.slice(indicePrimeiroItem, indiceUltimoItem);

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(prev => prev + 1);
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(prev => prev - 1);
  };

  return (
    <div className='flex flex-col flex-1 min-h-0'>
      {/* <ul className="flex-1 overflow-auto p-2"> */}
        {itensAtuais.length > 0 ? (
          itensAtuais.map((item, index) => (
            // Agora o TS sabe que item pode ter id
            <React.Fragment key={item.id || index}>
               {renderItem(item)} 
            </React.Fragment>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-4">{emptyMessage}</p>
        )}
      {/* </ul> */}

      {/* Footer só aparece se tiver mais de 1 página */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 mt-2">
          <span className="text-sm text-gray-500">
            Página <span className="font-semibold text-gray-900">{paginaAtual}</span> de <span className="font-semibold text-gray-900">{totalPaginas}</span>
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={paginaAnterior}
              disabled={paginaAtual === 1}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors border
                ${paginaAtual === 1 
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:border-[#77C526] border-gray-300'}`}
            >
              Anterior
            </button>
            
            <button
              onClick={proximaPagina}
              disabled={paginaAtual === totalPaginas}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors border
                ${paginaAtual === totalPaginas 
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:border-[#77C526] border-gray-300'}`}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}