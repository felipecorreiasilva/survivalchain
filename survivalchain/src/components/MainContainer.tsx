'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import Header from './Header'

interface PropsMainContainer {
    children: ReactNode
}

const MainContainer = (props:PropsMainContainer) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
    {isClient &&
      <div className='flex flex-col h-screen'>
        <Header />
        <main className="my-64 flex justify-center items-center">
          
            {props.children}

        </main>
        <footer className='p-32'>
        <div className="text-white text-center"></div>
        </footer>
    </div>
    }
    </>
    
    
    
  )
}

export default MainContainer