'use client'
import { ChangeEvent } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const setores = [
  {codSetor: 1, nmSetor: '2 andar'},
  {codSetor: 2, nmSetor: '3 andar'},
  {codSetor: 3, nmSetor: 'Emergência'},
  {codSetor: 4, nmSetor: 'PA Adulto'},
  {codSetor: 5, nmSetor: 'UTI'},
  {codSetor: 6, nmSetor: 'Pediatria'}
]

export default function SelectSetor() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // console.log(searchParams.get('setor')); usar no componente pai, na pagina.
  

  // Pega o valor atual da URL (ex: ?setor=5) para manter o select sincronizado
  const setorAtual = searchParams.get('setor') || ''

  const handleSetor = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    
    // Cria uma cópia dos parametros atuais da URL
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('setor', value) // Adiciona ?setor=X
    } else {
      params.delete('setor') // Remove o parametro se selecionar "Todos"
    }

    // Atualiza a URL sem recarregar a página totalmente (replace)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      onChange={handleSetor}
      value={setorAtual}
      className="w-30 border border-[#cdf5a2] py-2 text-[#213F02] bg-transparent  rounded-2xl
      focus:border-[#77C526] hover:border-[#77C526] transition focus:outline-none shadow-md text-center appearance-none cursor-pointer"
    >
      <option value="">Setores</option>
      {setores.map((setor) => (
        <option className='p-2' key={setor.codSetor} value={setor.codSetor}>
          {setor.nmSetor}
        </option>
      ))}
    </select>
  )
}