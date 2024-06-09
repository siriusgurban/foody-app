import { Box, Skeleton } from '@chakra-ui/react'
import React from 'react'

function SkeletonRestaurant() {
  return (
    <Box className="flex gap-2 mb-4 w-64">
      <Skeleton
        boxShadow="lg"
        rounded={4}
        height="70px"
        width="100px"
      ></Skeleton>
      <Box className="flex flex-col gap-2 align-middle justify-center">
        <Skeleton
          boxShadow="lg"
          bg="white"
          rounded={4}
          height="30px"
          width="150px"
        ></Skeleton>
        <Skeleton
          boxShadow="lg"
          bg="white"
          rounded={4}
          height="30px"
          width="150px"
        ></Skeleton>
      </Box>
    </Box>
  )
}

export default SkeletonRestaurant
