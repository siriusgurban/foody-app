import { Box, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

function SkeletonUploading() {
  return (
    <Box>
      <Skeleton width="120px" height="100px" />
    </Box>
  )
}

export default SkeletonUploading
