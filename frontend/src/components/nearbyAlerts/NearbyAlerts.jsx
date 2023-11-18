import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const NearbyAlerts = () => {
  return (
    <Card style={{backgroundColor: "#ebddff"}} justifyContent={'start'}>
      <CardContent>
    <Typography color={"#3d2644"} variant='h5' align='justify'> Nearby ..</Typography>
    <Typography color={"#8b72af"} variant='body2' align='justify'> No extreme weather conditions reported nearby or expected on your way to work. Your commute should proceed smoothly without any weather-related disruptions.</Typography>
    </CardContent>
    </Card>
  )
}

export default NearbyAlerts