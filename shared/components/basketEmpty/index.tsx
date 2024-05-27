import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

function BasketEmpty() {
  return (
    <Box className="w-72 flex flex-col justify-center align-middle m-auto ">
      <Image
        width={200}
        height={200}
        alt="empty basket"
        src={'/basketEmpty.svg'}
        className="mx-auto"
      />
      <Text className="text-client-rest-grey1 text-4xl text-center">
        Opps! Basket empty
      </Text>
    </Box>
  )
}

export default BasketEmpty
