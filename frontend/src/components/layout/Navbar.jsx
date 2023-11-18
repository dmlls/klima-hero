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

const Navbar = () => {
    return (
        <BrowserRouter>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                {/* Content Container */}
                <div style={{ flex: 1 }}>
                    <Card style={{ minHeight: "100%" }}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item>
                                <Routes>
                                    <Route path="/" element={<Homepage />} />
                                    <Route path="/munichMap" element={<Munichmap />} />
                                </Routes>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
                {/* Bottom Navbar */}
                    <BottomNavigation showLabels value={"Johannes"}>
                        <Link to="/">
                            <BottomNavigationAction icon={<Avatar src={homePage} />} />
                        </Link>
                        <Link to="/munichMap">
                            <BottomNavigationAction icon={<Avatar src={munichMap} />} />
                        </Link>
                        <Link to="/profile">
                        <BottomNavigationAction icon={<Avatar src={userPic} />} />
                        </Link>
                    </BottomNavigation>
            </div>
        </BrowserRouter>
    );
};

export default Navbar;
