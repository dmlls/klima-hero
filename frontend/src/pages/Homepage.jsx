import React from 'react'
import WeatherCard from '../components/weatherCard/WeatherCard'
import MainAlerts from '../components/mainAlerts/MainAlerts'
import { Card, CardContent, Collapse, Grid, Typography } from '@mui/material'
import NearbyAlerts from '../components/nearbyAlerts/NearbyAlerts'
import ChatAgent from '../components/chatAgent/ChatAgent'

const Homepage = () => {
  return (
    <div style={{padding: "20px"}}>
    <Grid container direction={"column"} spacing={3} >
      
        
        <Grid item>
        <WeatherCard/>
        </Grid>

        <Grid item>
          <div style={{paddingBottom:"20px"}}>
      <Typography color={"#3d2644"} variant='h3' align='justify'><b>Hi There!</b></Typography>
      </div>
        </Grid>


        <Grid item>
        <MainAlerts/>
        </Grid>

        <Grid item>
          <NearbyAlerts/>
        </Grid>

        <Grid item>
          <ChatAgent/>
        </Grid>
        
    </Grid>
    
    </div>

  )
}

export default Homepage