'use client'; // Necessário se estiver usando Next.js App Router (devido ao useState)
import React, { useState } from 'react';
import SelectSetor from '@/src/components/buttons/SelectSetor';
import DashTotal from '@/src/components/dashboards/DashTotal';
import { Search } from 'lucide-react'; // Opcional: ícones para os botões

function ListagemPaciente() {
   const listaDePacientes = [
      { id: 15421, nome: "Ana Paula Torres", idade: 34, sexo: "Feminino", motivoConsulta: "Check-up anual", ativo: true, dieta: true },
      { id: 26587, nome: "Carlos Eduardo Silva", idade: 58, sexo: "Masculino", motivoConsulta: "Dores nas costas", ativo: true, dieta: true },
      { id: 32214, nome: "Mariana Costa", idade: 22, sexo: "Feminino", motivoConsulta: "Exames de sangue", ativo: true, dieta: false },
      { id: 46555, nome: "Roberto Mendes 1", idade: 45, sexo: "Masculino", motivoConsulta: "Retorno cardiologista", ativo: true, dieta: false },
      { id: 46595, nome: "Carla Mendes", idade: 45, sexo: "Masculino", motivoConsulta: "Retorno cardiologista", ativo: true, dieta: false },
      { id: 46584, nome: "Cristiano Mendes", idade: 45, sexo: "Masculino", motivoConsulta: "Retorno cardiologista", ativo: true, dieta: false },
      { id: 85584, nome: "Paulo Mendes", idade: 45, sexo: "Masculino", motivoConsulta: "Retorno cardiologista", ativo: true, dieta: false },
      { id: 85333, nome: "Gustavo barreto", idade: 25, sexo: "Feminino", motivoConsulta: "Retorno cardiologista", ativo: true, dieta: true }
    ];
  // Estado da Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5; 

  const [searcPaciente, setSearchPaciente] = React.useState('')


  const listFilterPaciente = listaDePacientes.filter((paciente)=>{
    const searchPacData = paciente.nome.toLowerCase().includes(searcPaciente.toLowerCase()) || paciente.id.toString().includes(searcPaciente)

    return searchPacData
  })


  // paginação
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensAtuais = listFilterPaciente.slice(indicePrimeiroItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(listFilterPaciente.length / itensPorPagina);

  // Funções de navegação
  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <section className='flex flex-col gap-4 h-full p-2'>
      <SelectSetor />

      <div className='flex flex-col md:flex-row gap-4 '>
        <DashTotal descricao='Total de Pacientes' total={listaDePacientes.length} />
        <DashTotal descricao='Total de Dietas' total={listaDePacientes.filter(pac => pac.dieta === true).length} />
      </div>

        <div className="relative w-56 ml-auto mr-10">
        <Search 
            className="absolute left-3 top-1/2 transform 
                    -translate-y-1/2 text-gray-400 
                    pointer-events-none" 
            size={18} 
        />
            <input
                type="search"
                name="searcpac"
                id="searcpac"
                placeholder='Buscar Paciente'
                className='border border-[#77C526] focus:outline-none hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] rounded p-2 pl-10 pr-2 w-64 text-gray-500'
                value={searcPaciente}
                onChange={({target})=>{setSearchPaciente(target.value)}}
            />
        
        </div>
      

      <div className='flex-1 flex flex-col'> 
        {/* Ajustei a altura para flex-1 para ocupar o espaço restante e evitar scrollduplo se possível */}
        <ul className="flex-1 overflow-auto p-2 min-h-0">
          {itensAtuais.map((paciente) => { 
            return (
              <li
                key={paciente.id}
                className="flex flex-row items-center gap-4 md:gap-8 my-2 bg-white border-l-4 border-gray-200 px-2 p-1 rounded cursor-pointer 
                  hover:border-[#77C526] transition-colors duration-200 shadow hover:shadow-md"
              >
                <div className="flex items-center justify-center text-[#355D0B] font-light bg-gray-200 size-12 min-w-12 rounded-full">
                  <span className="text-2xl">{paciente.nome.at(0)}</span>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-700 font-medium">{paciente.nome}</p>
                  <p className="text-gray-500 text-sm">{paciente.id}</p>
                </div>
              </li>
            )
          })}
          
          {/* Feedback visual se a lista estiver vazia ou se a página não tiver itens */}
          {itensAtuais.length === 0 && (
            <p className="text-center text-gray-400 mt-4">Nenhum paciente encontrado.</p>
          )}
        </ul>

        {/* 3. Controles de Paginação (Footer) */}
        {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 mt-2">
            <span className="text-sm text-gray-500">
                Página <span className="font-semibold text-gray-900">{paginaAtual}</span> de <span className="font-semibold text-gray-900">{totalPaginas}</span>
            </span>
            
            <div className="flex gap-2">
                <button
                onClick={paginaAnterior}
                disabled={paginaAtual === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                    ${paginaAtual === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer'}`}
                >
                Anterior
                </button>
                
                <button
                onClick={proximaPagina}
                disabled={paginaAtual === totalPaginas}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                    ${paginaAtual === totalPaginas 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer'}`}
                >
                Próximo
                </button>
            </div>
            </div>
        )}
      </div>

    </section>
  )
}

export default ListagemPaciente