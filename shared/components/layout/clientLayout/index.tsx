import { Box } from '@chakra-ui/react'
import React, { Component } from 'react'
import ClientHeader from '../../client/clientHeader'
import ClientFooter from '../../client/clientFooter'

function ClientLayout({ children }: { children: any }) {
  return (
    <>
      <header>
        <ClientHeader />
      </header>
      <Box className="max-w-[1440px] mx-auto">{children}</Box>
      <ClientFooter />
    </>
  )
}

export default ClientLayout
