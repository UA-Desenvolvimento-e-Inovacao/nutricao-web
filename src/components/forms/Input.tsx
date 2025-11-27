import React from 'react'

type InputProps = React.ComponentProps<'input'> & {
  label?: string,
  error?: string
}

function Input({label, error, ...props}: InputProps) {
  return (
    <div className='flex-1 flex flex-col gap-1'>
        <label htmlFor={props.name} className='text-gray-600 font-medium'>
            {label}
        </label>
        <input
            className='border rounded text-gray-500 border-[#DADADA] shadow-sm shadow-[#e6e6e6]
                       p-2 px-4 w-64 focus:outline-none focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:border-[#77C526] hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)]'
            type={props.type} id={props.name}  {...props} />
        {error && <span>{error}</span>}
    </div>
  )
}

export default Input