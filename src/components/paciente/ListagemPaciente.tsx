'use client'; // Necessário se estiver usando Next.js App Router (devido ao useState)
import React, { useState } from 'react';
import SelectSetor from '@/src/components/forms/SelectSetor';
import DashTotal from '@/src/components/dashboards/DashTotal';
import { Search } from 'lucide-react'; // Opcional: ícones para os botões
import InputSeacrh from '../forms/InputSeacrh';
import ListaPaginada from '../paginacao/Paginacao';

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

  const [searchcPaciente, setSearchPaciente] = React.useState('')


  const listFilterPaciente = listaDePacientes.filter((paciente)=>{
    const searchPacData = paciente.nome.toLowerCase().includes(searchcPaciente.toLowerCase()) || paciente.id.toString().includes(searchcPaciente)

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

        <InputSeacrh searchValue={searchcPaciente} setSearcValue={setSearchPaciente} name='buscaPaciente' place='Buscar por Paciente'/>
      

      
        
        <ListaPaginada itensFiltro={listFilterPaciente} renderItem={(paciente)=>{
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
        }}/>
    </section>
  )
}

export default ListagemPaciente