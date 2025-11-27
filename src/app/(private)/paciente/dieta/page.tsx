'use client'
import Input from '@/src/components/forms/Input'
import InputSeacrh from '@/src/components/forms/InputSeacrh'
import React from 'react'

function PageDieta() {
  const [busca, setBusca] = React.useState('')
  const [busca2, setBusca2] = React.useState('')

  console.log('valor busca', busca);
  console.log('valor busca2', busca2);
  
  return (
    <div>
      PageDieta
      <Input label="CPF" type="text" name="cpf" placeholder='CPF' />
      <Input label="Senha" type="password" name="password" placeholder='Senha do usuário' />
      <InputSeacrh searchValue={busca} setSearcValue={setBusca} name='busca 1' place='busca 1'/>

      <InputSeacrh searchValue={busca2} setSearcValue={setBusca2} name='busca 2' place='busca 2'/>
    </div>
  )
}

export default PageDieta