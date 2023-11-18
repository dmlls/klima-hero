import { Avatar, Box, Card, Chip, Grid, Icon, Slider, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { styled } from '@mui/material/styles';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import WayToWork from '../../assets/WayToWork.png';
import Bike from '../../assets/bike.png';

const MainAlerts = () => {

  

  return (
    <Grid container justifyContent={"space-between"}>

            <Chip style={{backgroundColor: "#e7e0eb",border: '2px solid #66bb6a', width:"70%", height:"50px"}}
            label={<img height="30px" src={WayToWork}></img>}>
                
            </Chip>
            
              <Chip style={{backgroundColor: "#e7e0eb",border: '2px solid #66bb6a', width:"20%", height:"50px",paddingRight:"4px"}} 
              label={<img height="30px" src={Bike}></img>}>
              
              </Chip>

    </Grid>
  )
}

export default MainAlerts