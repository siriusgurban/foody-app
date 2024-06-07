import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

function SkeletonRestaurantClient() {
  return (
    <Box
      padding="3"
      boxShadow="lg"
      bg="white"
      rounded={4}
      width="240px"
      // w="100%"
      height="360px"
      className="flex flex-col gap-2 justify-center align-middle"
    >
      <Skeleton
        height="125px"
        maxWidth="200px"
        w="100%"
        mx="auto"
        mb={4}
      ></Skeleton>
      <Skeleton height="40px" maxWidth="200px" w="100%" mx="auto"></Skeleton>
      <Skeleton
        height="40px"
        maxWidth="200px"
        w="100%"
        mx="auto"
        mb={6}
      ></Skeleton>
      <Skeleton height="40px" maxWidth="200px" w="100%" mx="auto"></Skeleton>
    </Box>
  )
}

export default SkeletonRestaurantClient
