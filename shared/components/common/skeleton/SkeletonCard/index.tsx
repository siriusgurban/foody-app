import { Card, Skeleton, Typography } from '@mui/joy'

function SkeletonCard() {
  return (
    <Card sx={{ width: 343, display: 'flex', gap: 2 }}>
      <Typography>
        <Skeleton>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries.
        </Skeleton>
      </Typography>
    </Card>
  )
}

export default SkeletonCard
