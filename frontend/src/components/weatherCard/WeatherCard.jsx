import { Avatar, Box, Card, Chip, Grid, Typography } from '@mui/material'
import React from 'react'
import Sun from '../../assets/sun.png'

const WeatherCard = () => {
  return (
    <Chip style={{backgroundColor: "white", justifyContent: "space-between", paddingRight:"10px", paddingLeft:"10px", minWidth:"100%", minHeight:"65px"}}
    avatar={<Avatar style={{height:"50px", width:"50px"}} src={Sun}></Avatar>}
    label={<Typography variant="h5" color="#5150B4" textAlign={"right"}><b>25°C / 77°F </b> </Typography>}>
            
            
        
        
    </Chip>
  )
}

export default WeatherCard