'use client'
import { Search } from 'lucide-react'
import React from 'react'

type SearchProps = {
    name?: string;
    place?: string;
    searchValue: string;
    setSearcValue: React.Dispatch<React.SetStateAction<string>>;
}

function InputSeacrh({searchValue, setSearcValue, ...props}: SearchProps) {

  return (
    <div className="relative border-none w-max rounded">
        <Search 
            className="absolute left-3 top-1/2 transform 
                    -translate-y-1/2 text-gray-400 
                    pointer-events-none" 
            size={18} 
        />
            <input
                type="search"
                name={props.name}
                id={props.name}
                placeholder={props.place}
                className='border border-[#77C526] focus:outline-none hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] rounded p-2 pl-10 pr-2 w-64 text-gray-500'
                value={searchValue}
                onChange={({target})=>{setSearcValue(target.value)}}
            />
        
        </div>
  )
}

export default InputSeacrh