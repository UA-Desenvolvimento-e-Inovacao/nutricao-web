'use client'
import Input from '@/src/components/forms/Input'
import InputDate from '@/src/components/forms/InputDate'
import InputSeacrh from '@/src/components/forms/InputSeacrh'
import React from 'react'

function PageDieta() {
  const [busca, setBusca] = React.useState('')
  const [busca2, setBusca2] = React.useState('')
  const [data, setData] = React.useState(new Date().toISOString().slice(0,10))

  console.log('aa', data.split("-"));
  

  function formatarParaISO(dataBr: string) {
    const [dia, mes, ano] = dataBr.split("-");
    return `${ano}-${mes}-${dia}`;
  }

  console.log('format', formatarParaISO(data));
  

  return (
    <div>
      PageDieta
      <Input label="CPF" type="text" name="cpf" placeholder='CPF' />
      <Input label="Senha" type="password" name="password" placeholder='Senha do usuário' />
      <InputSeacrh searchValue={busca} setSearcValue={setBusca} name='busca 1' place='busca 1'/>

      <InputSeacrh searchValue={busca2} setSearcValue={setBusca2} name='busca 2' place='busca 2'/>

      <InputDate data={data} setData={setData}/>
    </div>
  )
}

export default PageDieta