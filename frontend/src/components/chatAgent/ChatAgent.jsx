import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { BiBot, BiUser } from "react-icons/bi";

import EarthBot from '../../assets/earthBot2.png';


const ChatAgent = () => {
  return (
            <Card style={{backgroundColor: "#ebddff"}} sx={{ minWidth: 275 }}>
                <CardContent>
                <Grid container direction={'row'}>
            <Grid item xs={10}>
        
        <Typography align='justify' color={"#8b72af"} variant='body1'>No extreme weather conditions reported nearby or expected on your way to work. Your commute should proceed smoothly without any weather-related disruptions.</Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        </Grid>
            
        </CardContent>
        <CardActions disableSpacing style={{justifyContent: "flex-end"}}>
                <IconButton>

                <Avatar style={{width:"50px",height:"50px"}} src={EarthBot} />
                </IconButton>
        </CardActions>
        
    
            </Card>
    
  )
}

export default ChatAgent