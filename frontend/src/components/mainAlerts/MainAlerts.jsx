import React from 'react';
import { Grid, Chip, Typography } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MainAlerts = () => {
    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Chip
                style={{ backgroundColor: "#5451D6", border: '4px solid #23CE6B', width: "55%", height: "50px" }}
                label={
                    <>
                        <HomeIcon style={{ fontSize: 30, color: 'white', marginRight: 8 }} />
                        <ArrowBackIcon style={{ fontSize: 30, color: 'white' }} />
                        <ArrowForwardIcon style={{ fontSize: 30, color: 'white' }} />
                        <WorkIcon style={{ fontSize: 30, color: 'white', marginLeft: 8 }} />
                    </>
                }
            />
            <Chip
                style={{ backgroundColor: "#5451D6", border: '4px solid #dabb2d', width: "35%", height: "50px", paddingLeft: "4px" }}
                label={<DirectionsBikeIcon style={{ fontSize: 28, color: 'white' }} />}
            />
        </Grid>
    );
};

export default MainAlerts;
