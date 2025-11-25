import React from 'react'

type descDash = {
  descricao: string,
  total: number
}

function DashTotal({descricao, total}: descDash) {
  return (
    <div className='bg-white w-44 p-2 rounded-2xl border-2 border-gray-200 shadow-md
    text-[#1D2A0F] text-center' >
      <h3 className='tracking-wider text-sm'>{descricao}</h3>
      <span className='text-4xl font-medium'>{total}</span>
    </div>
  )
}

export default DashTotal