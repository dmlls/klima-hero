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
                    <Card style={{height: "100%", backgroundColor: "#DBE9F6" }}>
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
                <BottomNavigation showLabels value={"Johannes"} style={{justifyContent:"space-evenly", padding:"10px", backgroundColor: "#c6d4e0", borderRadius: "0px 0px 0px 0px" }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <BottomNavigationAction style={ {borderRadius: currPage==="home" ?  "10px": "", backgroundColor: currPage==="home" ?  "#9fa8b0": ""}}  icon={<HomeIcon style={{fontSize:"30px", color:"#272D2D"}} onClick={()=>setCurrPage("home")}
                             />}/>
                            <Typography variant="body2" color={"black"}>Home</Typography>
                        </Link>
                        <Link to="/munichMap" style={{ textDecoration: 'none' }}>
                            <BottomNavigationAction style={ {borderRadius: currPage==="map" ?  "10px": "", backgroundColor: currPage==="map" ?  "#9fa8b0": ""}}  icon={<MapIcon style={{fontSize:"30px", color:"#272D2D"}} onClick={()=>setCurrPage("map")}
                            />}/>
                            <Typography variant="body2" color={"black"}>Map</Typography>
                        </Link>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <BottomNavigationAction style={ {borderRadius: currPage==="profile" ?  "10px": "", backgroundColor: currPage==="profile" ?  "#9fa8b0": ""}}  icon={<AccountCircleIcon style={{fontSize:"30px", color:"#272D2D"}} onClick={()=>setCurrPage("profile")}
                            />}/>
                        <Typography variant="body2" color={"black"}>Profile</Typography>
                        </Link>
                </BottomNavigation>
            </div>
        </BrowserRouter>
    );
};

export default Navbar;
