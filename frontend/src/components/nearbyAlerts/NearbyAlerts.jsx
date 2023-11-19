import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import React from 'react';
import { Link } from 'react-router-dom';

const NearbyAlerts = () => {
    return (
        <Card style={{ backgroundColor: "#5451D6", borderRadius: '20px', padding: "10px" }}>
            <CardContent>
                <Grid container spacing={2}>
                    {/* Left column with the title and list of bullet points */}
                    <Grid item xs={8}>
                        <Typography color={"white"} variant='h4' align='left' style={{ marginBottom: '16px' }}>Near you..</Typography>

                        <Typography color={"white"} variant='subtitle1' align='left'>
                            5km&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fallen tree
                        </Typography>
                        <Typography color={"white"} variant='subtitle1' align='left'>
                            11km&nbsp;&nbsp;&nbsp;Flood
                        </Typography>
                        <Typography color={"white"} variant='subtitle1' align='left'>
                            14km&nbsp;&nbsp;&nbsp;Other
                        </Typography>
                        {/* Add more entries as needed */}
                    </Grid>

                    {/* Right column with the custom button and text */}
                    <Grid item xs={4} container justifyContent="center" alignItems="center">
                        <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '0px solid white', borderRadius: '8px', padding: 'px' }}>
                            <Link to="/munichMap" style={{ textDecoration: 'none' }}>
                                <IconButton
                                    style={{
                                        backgroundColor: 'transparent',
                                        padding: '0', // Remove default padding
                                    }}
                                    aria-label="See on Map"
                                >
                                    <MapIcon style={{ fontSize: '45px', color: 'white' }} />
                                </IconButton>
                                <Typography color={"white"} variant='subtitle2' align='center'>See on map</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default NearbyAlerts;
