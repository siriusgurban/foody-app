import { Box, Skeleton } from '@chakra-ui/react'
import React from 'react'

function SkeletonProduct() {
  return (
    <Box
      padding="3"
      boxShadow="lg"
      // bg="white"
      rounded={4}
      width="180px"
      // w="100%"
      height="210px"
      className="flex flex-col gap-2 justify-center align-middle"
    >
      <Skeleton
        height="180px"
        maxWidth="180px"
        w="100%"
        mx="auto"
        mb={1}
      ></Skeleton>
      <Skeleton height="20px" maxWidth="180px" w="100%" mx="auto"></Skeleton>
      <Skeleton
        height="20px"
        maxWidth="180px"
        w="100%"
        mx="auto"
        mb={1}
      ></Skeleton>
      <Skeleton height="40px" maxWidth="200px" w="100%" mx="auto"></Skeleton>
    </Box>
  )
}

export default SkeletonProduct
