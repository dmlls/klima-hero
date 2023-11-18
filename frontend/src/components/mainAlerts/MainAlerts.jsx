import { Box, Card, Grid, Slider, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { styled } from '@mui/material/styles';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 0,
    width: 0,
    backgroundColor: '#00000',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
const MainAlerts = () => {

  

  return (
    <Card>
        <Grid container direction={'row'} justifyContent={'flex-start'}>
            <Grid item></Grid>
            <Card style={{backgroundColor: "#e7e0eb",border: '1.5px solid #66bb6a' }} sx={{ minWidth: 245 }}>
                <Grid container direction={'row'}>
                  <Grid item xs={2}><HomeIcon/></Grid>
                  <Grid item xs={8}><hr color='#66bb6a'></hr></Grid>
                  <Grid item xs={2}><WorkIcon/></Grid>
                </Grid>
            </Card>
            <Grid item justifyItems={'flex-end'}>
              <Card style={{backgroundColor: "#e7e0eb",border: '1.5px solid #66bb6a' }} sx={{ minWidth: 45 }}>
              <DirectionsBikeIcon/>
              </Card>
            </Grid>

        </Grid>
    </Card>
  )
}

export default MainAlerts