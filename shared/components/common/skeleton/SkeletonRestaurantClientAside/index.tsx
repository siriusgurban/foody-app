import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

function SkeletonRestaurantClientAside() {
  return (
    <Box className="flex gap-1 justify-between mb-4">
      <Skeleton
        boxShadow="lg"
        rounded={4}
        height="40px"
        width="40px"
      ></Skeleton>
      <Skeleton
        boxShadow="lg"
        bg="white"
        rounded={4}
        height="40px"
        width="174px"
        mx="auto"
        mb={2}
      ></Skeleton>
    </Box>
  )
}

export default SkeletonRestaurantClientAside
