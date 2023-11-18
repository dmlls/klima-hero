import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { BiBot, BiUser } from "react-icons/bi";
import "./chat.css";

const ChatAgent = () => {
  return (
    <Card style={{backgroundColor: "#ebddff"}} sx={{ minWidth: 275 }}>
      
    <Typography color={"#3d2644"} variant='h3' align='justify'><b>Hi There!</b></Typography>
    <Grid container></Grid>
    <Grid item xs={1}><Avatar><BiBot></BiBot></Avatar></Grid>
    <Grid item x={10}>
    <Box sx={{ borderRadius: '16px' }}>
        <Card style={{backgroundColor: "#fffff"}} sx={{ width: 200 }}>
        <CardContent>
            dusafhlageiurwa
        </CardContent>
        </Card></Box>
        </Grid>
    <Typography color={"#3d2644"} variant='h5'> headers and info</Typography>
    <Typography color={"#8b72af"} variant='body2'>Subheaders</Typography>

    </Card>
  )
}

export default ChatAgent