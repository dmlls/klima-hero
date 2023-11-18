import React, { useState } from "react";
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    Toolbar,
    Typography,
    Badge,
    Avatar,
    MenuItem,
    ListItemIcon,
    Icon,
    Box,
    Menu,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Skeleton,
    NotificationsIcon,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import { Outlet, Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { Card } from "@mui/material";
import Homepage from "../../pages/Homepage";
import Munichmap from "../../pages/Munichmap";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const Navbar = () => {
    const [currPage, setCurrPage] = React.useState("home");
    return (
        <BrowserRouter>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
                {/* Content Container */}
                <div style={{ flex: 1, backgroundColor: "green"}}>
                    <Card style={{height: "100%" }}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                            style={{height: "100%" }}
                        >
                            <Grid item style={{height:"100%"}} >
                                <Routes>
                                    <Route path="/" element={<Homepage />} />
                                    <Route path="/munichMap" element={<Munichmap />} />
                                </Routes>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
                {/* Bottom Navbar */}
                <BottomNavigation showLabels value={"Johannes"} style={{justifyContent:"space-between", paddingRight:"10px", paddingLeft:"10px"}}>
                        <Link to="/" style={ {border: currPage==="home" ?  "solid 1px":""}}>
                            <BottomNavigationAction  icon={<HomeIcon style={{fontSize:"35px"}} onClick={()=>setCurrPage("home")}
                             />}/>
                            <Typography variant="body2" color={"black"}>Home</Typography>
                        </Link>
                        <Link to="/munichMap" style={ {border: currPage==="map" ?  "solid 1px":""}}>
                            <BottomNavigationAction icon={<MapIcon style={{fontSize:"35px"}}  onClick={()=>setCurrPage("map")}/>}/>
                            <Typography variant="body2" color={"black"}>Map</Typography>
                        </Link>
                        <Link to="/profile" style={ {border: currPage==="profile" ?  "solid 1px":""}}>
                        <BottomNavigationAction icon={<AccountCircleIcon style={{fontSize:"35px"}}   onClick={()=>setCurrPage("profile")}/>} />
                        <Typography variant="body2" color={"black"}>Profile</Typography>
                        </Link>
                </BottomNavigation>
            </div>
        </BrowserRouter>
    );
};

export default Navbar;
