import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/material/styles';

const searchBarStyle = {
    root: {
        padding: '4px 6px',
        display: 'flex',
        alignItems: 'center',
        width: '85%',
        position: 'absolute',
        top: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '16px',
        zIndex: 1,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
};

const SearchBar = () => {
    return (
        <Paper style={searchBarStyle.root} component="form">
            <InputBase
                style={searchBarStyle.input}
                placeholder="Search for a location"
                inputProps={{ 'aria-label': 'Search for ...' }}
            />
            <SearchIcon style={searchBarStyle.iconButton} />
        </Paper>
    );
};

export default SearchBar;

