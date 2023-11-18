import React from 'react'
import WeatherCard from '../components/weatherCard/WeatherCard'
import MainAlerts from '../components/mainAlerts/MainAlerts'
import { Grid } from '@mui/material'
import NearbyAlerts from '../components/nearbyAlerts/NearbyAlerts'
import ChatAgent from '../components/chatAgent/ChatAgent'

const Homepage = () => {
  return (
    <div>
    <Grid container direction={"column"} spacing={3}>
        <Grid item>
        <WeatherCard/>
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