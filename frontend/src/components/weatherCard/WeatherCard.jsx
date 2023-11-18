import { Avatar, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import Sun from '../../assets/sun.png'

const WeatherCard = () => {
  return (
    <Card style={{backgroundColor: "#e7e0eb"}} sx={{ minWidth: 300 }}>
        <Grid container>
            <Grid item xs={2}><Avatar src={Sun}></Avatar></Grid>
            <Grid item xs={10}><Typography variant="body1" align={"center"}> 25°C / 77°F </Typography></Grid>
        </Grid>
        
    </Card>
  )
}

export default WeatherCard