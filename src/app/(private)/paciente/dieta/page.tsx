import Input from '@/src/components/forms/Input'
import React from 'react'

function PageDieta() {
  return (
    <div>
      PageDieta
      <Input label="CPF" type="text" name="cpf" placeholder='CPF' />
      <Input label="Senha" type="password" name="password" placeholder='Senha do usuário' />
    </div>
  )
}

export default PageDieta