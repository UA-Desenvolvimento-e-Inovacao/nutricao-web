'use client'
import React from 'react'
import InputSeacrh from '../forms/InputSeacrh'
import InputDate from '../forms/InputDate'

function ListagemDietas() {
    const [busca, setBusca] = React.useState('')
    const [data, setData] = React.useState(new Date().toISOString().slice(0, 10))

    const dietas = [
    {
        id: 26411,
      tipo: "Dieta Zero",
      modalidade: "Continua",
      paciente: "Paciente Teste Nutri 1",
      data: "01/10/2025",
      horario: "07:00"
    },
    {
        id: 5466431,
      tipo: "Dieta Zero",
      modalidade: "Continua",
      paciente: "Paciente Teste Nutri 2",
      data: "01/10/2025",
      horario: "07:00"
    },
    {
        id:65111,
      tipo: "Dieta Pastosa",
      modalidade: "Intermitente",
      paciente: "Maria da Silva",
      data: "01/10/2025",
      horario: "08:30"
    },
    {
        id:64157,
      tipo: "Dieta Geral",
      modalidade: "Continua",
      paciente: "João Batista",
      data: "01/10/2025",
      horario: "09:00"
    },
    {
        id:87752,
      tipo: "Dieta Branda",
      modalidade: "Intermitente",
      paciente: "Ana Rodrigues",
      data: "01/10/2025",
      horario: "10:00"
    },
    {
        id: 9854,
      tipo: "Dieta Zero",
      modalidade: "Continua",
      paciente: "Carlos Henrique",
      data: "01/10/2025",
      horario: "10:30"
    },
    {
        id:57874,
      tipo: "Dieta Pastosa",
      modalidade: "Continua",
      paciente: "Patrícia Lourenço",
      data: "01/10/2025",
      horario: "11:00"
    },
    {
        id:454745,
      tipo: "Dieta Hipossódica",
      modalidade: "Intermitente",
      paciente: "Ricardo Mendes",
      data: "01/10/2025",
      horario: "12:00"
    },
    {
        id: 54874,
      tipo: "Dieta Zero",
      modalidade: "Continua",
      paciente: "Fernanda Souza",
      data: "01/10/2025",
      horario: "12:30"
    },
    {
        id: 212698,
      tipo: "Dieta Geral",
      modalidade: "Continua",
      paciente: "Gustavo Pereira",
      data: "01/10/2025",
      horario: "13:00"
    }
  ];
    // function formatarParaISO(dataBr: string) {
    //   const [dia, mes, ano] = dataBr.split("-");
    //   return `${ano}-${mes}-${dia}`;
    // }
  
  return (
    <section className='flex flex-col gap-4 h-full px-6 py-20'>
        <div className='flex items-center justify-between'>
            <InputSeacrh searchValue={busca} setSearcValue={setBusca} name='buscaDieta' place='Buscar por Dieta'/>
            <InputDate data={data} setData={setData}/>
        </div>

    <div>
        <ul>
            {
                dietas.map((dieta)=>{
                    return (
                        <li
                            key={dieta.id}
                            className="flex flex-row items-center justify-between px-4 gap-4 md:gap-8 my-2 bg-white border-l-4 border-gray-200 px-2 p-1 rounded cursor-pointer 
                            hover:border-[#77C526] transition-colors duration-200 shadow hover:shadow-md [&_*]:text-gray-500"
                        >
                            <div className='flex flex-col font-medium'>
                                <span className='text-sm'>{dieta.tipo}</span>
                                <span>{dieta.paciente}</span>
                            </div>
                            <div>
                                <span>{dieta.modalidade}</span>
                                <div className='flex flex-col items-center **:text-sm'>
                                    <span>{dieta.data}</span>
                                    <span>{dieta.horario}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    </div>
    </section>
  )
}

export default ListagemDietas