import React from 'react'
import Image from 'next/image'
import checoutsuccess from '../../../public/checkoutsuccess.svg'
const CheckouSuccess = () => {
  return (
    <div className='h-[515px] w-full md:bg-[#F3F4F6]  bg-[#FFFFFF] '>
<div className='flex justify-center mt-16 ' >

<Image src={checoutsuccess} className='w-[133px] h-[133px] md:w-[200px] md:h-[200px]' alt='checkout'/>
</div>

    <h1 className='md:text-3xl  font-medium text-[#4F4F4F] text-xl text-center mt-3'>Your order has been 
<br/>
received</h1>

    </div>
  )
}

export default CheckouSuccess