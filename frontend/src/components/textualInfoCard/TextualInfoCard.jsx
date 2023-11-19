import { Card, Grid, Typography } from '@mui/material'
import React from 'react'

const TextualInfoCard = () => {
  return (
    <div>
    <Card style={{backgroundColor: "#ebddff"}} sx={{ minWidth: 275 }}>
      
    <Typography color={"#3d2644"} variant='h3'><b>Main Info</b></Typography>
    <Typography color={"#3d2644"} variant='h5'> headers and info</Typography>
    <Typography color={"#8b72af"} variant='body2'>Subheaders</Typography>

    </Card>
    </div>
    
  )
}

export default TextualInfoCard