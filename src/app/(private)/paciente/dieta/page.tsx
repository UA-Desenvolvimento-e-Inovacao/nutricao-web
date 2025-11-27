import Input from '@/src/components/forms/Input'
import InputDate from '@/src/components/forms/InputDate'
import InputSeacrh from '@/src/components/forms/InputSeacrh'
import ListagemDietas from '@/src/components/paciente/ListagemDietas';
import React from 'react'

function PageDieta() {

  // function formatarParaISO(dataBr: string) {
  //   const [dia, mes, ano] = dataBr.split("-");
  //   return `${ano}-${mes}-${dia}`;
  // }
  

  return (
    <>
      <ListagemDietas/>
      {/* PageDieta
      <Input label="CPF" type="text" name="cpf" placeholder='CPF' />
      <Input label="Senha" type="password" name="password" placeholder='Senha do usuário' />
      <InputSeacrh searchValue={busca} setSearcValue={setBusca} name='busca 1' place='busca 1'/>

      <InputDate data={data} setData={setData}/> */}
    </>
  )
}

export default PageDieta