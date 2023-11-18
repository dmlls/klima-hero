import React from 'react'
import { Card, Typography } from '@mui/material'

const VisualCueCard = () => {
  return (
    <Card style={{backgroundColor: "#e7e0eb"}} sx={{ minWidth: 275 }}>
        <Typography variant="body1"> Info </Typography>
        <Typography variant="body2"> Subheaders</Typography>
    </Card>
  )
}

export default VisualCueCard