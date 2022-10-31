import { useTranslation } from 'next-i18next'
import React from 'react'
import { useEffect } from 'react'

export default function ItemState({type}) {
    const {i18n}=useTranslation()
  
  return (
    <div className={`${type==="sales"?"bg-secondary":"bg-primary"}  z-20 relative px-1 text-white rounded mx-4`}>
        <span className='relative z-20 text-sm'>{type}</span>
        <div className={`${i18n.language!=="ar"?"-left-1":"-right-1"} ${type==="sales"?"bg-secondary":"bg-primary"} absolute rotate-45  top-1 w-4 h-4 rounded`}></div>
    </div>
  )
}
