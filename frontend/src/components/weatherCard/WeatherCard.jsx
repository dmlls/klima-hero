import { Avatar, Box, Card, Chip, Grid, Typography } from '@mui/material'
import React from 'react'
import Sun from '../../assets/sun.png'

const WeatherCard = () => {
  return (
    <Chip style={{backgroundColor: "#e7e0eb", justifyContent: "space-between", paddingRight:"10px", paddingLeft:"10px", minWidth:"100%", minHeight:"50px"}}
    avatar={<Avatar style={{height:"50px", width:"50px"}} src={Sun}></Avatar>}
    label={<Typography variant="h6" textAlign={"right"}><b>25°C / 77°F </b> </Typography>}>
            
            
        
        
    </Chip>
  )
}

export default WeatherCard