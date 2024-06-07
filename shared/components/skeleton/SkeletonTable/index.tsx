import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

function SkeletonTable() {
  return (
    <Stack>
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
    </Stack>
  )
}

export default SkeletonTable
