import { Skeleton } from '@chakra-ui/react'
import React from 'react'

function SkeletonCover() {
  return (
    <Skeleton
      startColor="gray.400"
      endColor="teal.100"
      height="448px"
      width="100%"
      className="object-fill"
    />
  )
}

export default SkeletonCover
