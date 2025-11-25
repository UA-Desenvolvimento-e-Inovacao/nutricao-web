'use client'
import { ChangeEvent, Suspense } from 'react' // 1. Importe o Suspense
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const setores = [
  {codSetor: 1, nmSetor: '2 andar'},
  {codSetor: 2, nmSetor: '3 andar'},
  {codSetor: 3, nmSetor: 'Emergência'},
  {codSetor: 4, nmSetor: 'PA Adulto'},
  {codSetor: 5, nmSetor: 'UTI'},
  {codSetor: 6, nmSetor: 'Pediatria'}
]

// 2. Renomeie seu componente original para algo interno (ex: SelectSetorContent)
function SelectSetorContent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const setorAtual = searchParams.get('setor') || ''

  const handleSetor = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('setor', value)
    } else {
      params.delete('setor')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      onChange={handleSetor}
      value={setorAtual}
      className="w-30 border border-[#cdf5a2] py-2 text-[#213F02] bg-transparent rounded-2xl
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

// 3. Exporte o componente default com o Suspense em volta
export default function SelectSetor() {
  return (
    // O fallback é o que aparece por milissegundos enquanto a URL é lida
    <Suspense fallback={<div className="w-30 h-10 bg-gray-100 rounded-2xl animate-pulse"></div>}>
      <SelectSetorContent />
    </Suspense>
  )
}