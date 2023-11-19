import React from 'react'
import WeatherCard from '../components/weatherCard/WeatherCard'
import MainAlerts from '../components/mainAlerts/MainAlerts'
import { Card, CardContent, Collapse, Grid, Typography } from '@mui/material'
import NearbyAlerts from '../components/nearbyAlerts/NearbyAlerts'
import ChatAgent from '../components/chatAgent/ChatAgent'
import LevelIndicator from "../components/level/level";

const Homepage = () => {
  return (
    <div style={{padding: "20px"}}>
    <Grid container direction={"column"} spacing={3} >


        <Grid item>
        <WeatherCard/>
        </Grid>

        <Grid item>
          <div style={{paddingBottom:"15px", paddingTop:"15px"}}>
            <Typography color={"#091C43"} variant='h3' align='justify'><b>Hi There!</b></Typography>
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

        <Grid item>
            <LevelIndicator/>
        </Grid>

    </Grid>

    </div>

  )
}

export default Homepage