import { Spinner } from '@nextui-org/react'
import React from 'react'

export const Loading = () => {
  return (
    <div className='absolute top-0 right-0 w-screen h-screen overflow-hidden bg-white flex items-center justify-center z-50'>
        <Spinner size='lg' color='primary'  label='Loading...'/>
    </div>
  )
}
