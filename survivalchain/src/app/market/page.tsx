'use client'

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'

import srv_bread from '@/public/srv_bread.png' 
import srv_water250ml from '@/public/srv_water250ml.png' 
import wpn_knife01 from '@/public/wpn_knife01.png'
import wpn_glock from '@/public/wpn_glock.png'
import wpn_ak47 from '@/public/wpn_ak47.png'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
const items = [
  
  {
    name: 'Bread',
    img: srv_bread,
    description: 'Basic survival item that satisfies hunger by 1%.',
    price: 10,
    amount: true,
  },
  
  {
    name: 'Water bottle - 250ml',
    img: srv_water250ml,
    description: 'Basic survival item that satisfies thirst by 1%.',
    price: 10,
    amount: true,
  },
  
  {
    name: 'Knife',
    img: wpn_knife01,
    description: 'An excellent melee weapon to protect yourself.',
    price: 1000,
    
  },
  
  {
    name: 'Glock',
    img: wpn_glock,
    description: 'Glock is a series of polymer-framed semi-automatic pistols.',
    price: 1000,
  },
  
  {
    name: 'AK-47',
    img: wpn_ak47,
    description: '7.62x39mm assault rifle created in 1947 by Mikhail Kalashnikov and produced in the Soviet Union by the state-owned IZH industry.',
    price: 50000,
  },

]

const page = () => {

  const [formData, setFormData] = useState([
    {amount: 1},
    

  ])

  const handleOnChange = (e:any) => {
    e.preventDefault()

    switch(e.target.name){
    
      default:
        const newObj = {...formData,[e.target.name]:e.target.value}
        setFormData(newObj)
        break
        
    }

  }

  return (
    <Card className='bg-primary-900 text-red-900 w-[1024px] h-full text-center'>
      <CardTitle className='text-4xl my-8 font-fontTitleHomeb'>
        Market
      </CardTitle>
      <CardContent className='grid grid-cols-3'>
        {items.map((item:any,i:number) => {
          return (
            <Card 
            key={i}
            className='mx-2 my-4 bg-primary-950 text-white h-[450px]'
            >
              <CardTitle>
                  <Image 
                  className='bg-primary-800 rounded-xl w-48 mx-auto mt-8'
                  src={item.img} alt="" />
                  <h2 className='mt-6'>{item.name}</h2>
              </CardTitle>
              <CardContent>
                
                <p className={`mt-4`}>{item.description}</p>
                

                </CardContent>

                <CardFooter className={`flex justify-between`}>
                  <div className="flex flex-col">
                    <p className='text-start'>Price: {item.price}</p>
                    {item.amount && (
                      <div className="flex">
                        <p className='text-start'>Amount: </p>
                        <input
                        name={i.toString()}
                        value={formData[i]?.amount}
                        onChange={handleOnChange}
                        type="number" 
                        min='0'
                        className='bg-transparent border w-14 rounded ml-2 pl-[10px]' />

                      </div>
                      
                    )}
                    
                    
                  </div>
                  
                  <Button
                  className='p-4 border-2 border-red-900 hover:bg-red-900 text-red-900 hover:text-white bg-transparent'
                  >Buy</Button>
                </CardFooter>
              

            </Card>
          )
        })}

      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

export default page