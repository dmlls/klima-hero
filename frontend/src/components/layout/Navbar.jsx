import React from "react";
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
import userPic from "../../assets/PeterProfilePic.png";
import munichMap from "../../assets/MunichMap.png";
import homePage from "../../assets/HomePageIcon.png";
import { Outlet, Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { Card } from "@mui/material";
import Homepage from "../../pages/Homepage";
import Munichmap from "../../pages/Munichmap";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const Navbar = () => {
    return (
        <BrowserRouter>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
                {/* Content Container */}
                <div style={{ flex: 1, height: "93vh", backgroundColor: "green"}}>
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
                <BottomNavigation showLabels value={"Johannes"} style={{height: "7vh", justifyContent:"space-between", paddingRight:"10px", paddingLeft:"10px"}}>
                        <Link to="/">
                            <BottomNavigationAction icon={<HomeIcon style={{fontSize:"35px"}} />} />
                            <Typography variant="body2" color={"black"}>Home</Typography>
                        </Link>
                        <Link to="/munichMap">
                            <BottomNavigationAction icon={<MapIcon style={{fontSize:"35px"}}/>} />
                            <Typography variant="body2" color={"black"}>Map</Typography>
                        </Link>
                        <Link to="/profile">
                        <BottomNavigationAction icon={<AccountCircleIcon style={{fontSize:"35px"}}/>} />
                        <Typography variant="body2" color={"black"}>Profile</Typography>
                        </Link>
                </BottomNavigation>
            </div>
        </BrowserRouter>
    );
};

export default Navbar;
