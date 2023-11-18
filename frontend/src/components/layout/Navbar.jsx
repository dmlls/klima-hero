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
    RestoreIcon,
  } from "@mui/material";
  
  import userPic from '../../assets/PeterProfilePic.png';
  import munichMap from '../../assets/MunichMap.png';
  import homePage from '../../assets/HomePageIcon.png';
  import React, { useState, useContext } from "react";
  import Homepage from "../../pages/Homepage";
  import Munichmap from "../../pages/Munichmap";
  import { Outlet, Link, BrowserRouter, Route, Routes } from "react-router-dom";
  import {Card} from '@mui/material';
  
  const Navbar = () => {
    return (
        <BrowserRouter>
<Card>
<Grid container direction="column" justifyContent="center"
  alignItems="center" spacing={3}>
    <Grid item>

<Routes>
          <Route
            path="/"
            element={<Homepage />}
          ></Route>

          <Route
            path="/munichMap"
            element={<Munichmap />}
          />
        </Routes>
        </Grid>
<Grid item>
        
      <BottomNavigation
    showLabels
    value={"Johannes"}
  >
  <Link to="/">
  <BottomNavigationAction icon={<Avatar src={homePage} />}   />
  </Link>
  <Link to="/munichMap">
    <BottomNavigationAction icon={<Avatar src={munichMap}/> }  />
    </Link>
    <BottomNavigationAction icon={<Avatar src={userPic}/>} />
  </BottomNavigation>
  <Outlet></Outlet>
  </Grid>
  </Grid>
  </Card>
  </BrowserRouter>
    )
  }
  
  export default Navbar