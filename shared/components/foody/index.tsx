import React from 'react'

function Foody({ role }: { role: string }) {
  const admin = {
    foody:
      'xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:4xl text-[#F5F5F5]',
    dot: ' text-[#EAAB00]',
  }

  const client = {
    foody:
      'xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:4xl text-[#000000]',
    dot: ' text-[#D63626]',
  }

  return (
    <p
      className={`${
        role == 'admin' ? admin.foody : client.foody
      } font-extrabold`}
    >
      Foody
      <span className={`${role == 'admin' ? admin.dot : client.dot}`}>.</span>
    </p>
  )
}

export default Foody
