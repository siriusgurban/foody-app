import { Box } from '@chakra-ui/react'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SkeletonRestaurant() {
  return (
    <Box className="flex flex-col gap-1 align-middle">
      <Skeleton
        height="150px"
        width="150px"
        containerClassName="avatar-skeleton"
        baseColor="#FAFAFA"
        highlightColor="#96c7ff"
        duration={3}
      />
      <Box className="flex my-auto ">
        <Skeleton
          count={2}
          height="20px"
          width="150px"
          baseColor="#FAFAFA"
          highlightColor="#96c7ff"
          duration={3}
        />
      </Box>
    </Box>
  )
}

export default SkeletonRestaurant
