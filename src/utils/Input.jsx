import React from 'react'

function Input({title,type}) {
  return (
    <div className='flex flex-col gap-2 ' >
   <label className=' text-md capitalize' >{title}</label>
   <input 
   className='text-center border-b border-black outline-none'
   type={type} />
    </div>
  )
}

export default Input
