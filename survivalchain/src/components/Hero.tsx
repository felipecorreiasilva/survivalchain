'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="text-red-900 shadow-2xl text-[90px]">
      <h1 className="font-fontTitleHomeb">Survival</h1>
      <h1 className="font-fontTitleHomeb">Chain</h1>
      </div>

      <p className="text-stone-500 p-4 text-2xl font-fontHero">Do you feel like a survivor?</p>
      <Button 
      onClick={()=>router.push('/buyTokens')}
      className='p-6 my-4 border-2 border-red-900 hover:bg-red-900 text-red-900 hover:text-white bg-transparent'
      >Buy Tokens</Button>

    </div>
  )
}

export default Hero