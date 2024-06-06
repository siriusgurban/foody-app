import { Box } from '@chakra-ui/react'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SkeletonRestaurantClient() {
  return (
    <Box className="flex flex-col gap-1 align-middle">
      <Skeleton
        height="125px"
        width="175px"
        containerClassName="avatar-skeleton"
        baseColor="#000000"
        highlightColor="#96c7ff"
        duration={3}
      />
      <Box className="flex my-auto ">
        <Skeleton
          count={3}
          height="30px"
          width="175px"
          baseColor="#000000"
          highlightColor="#96c7ff"
          duration={3}
        />
      </Box>
    </Box>
  )
}

export default SkeletonRestaurantClient
