
import { usePathname } from 'next/navigation';
import React from 'react'

export  const RouterPath = () => {
  const path = usePathname()
  return path
}

export default function path(){
    return RouterPath()
}
