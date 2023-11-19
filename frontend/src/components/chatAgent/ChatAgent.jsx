import React from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import EarthBot from '../../assets/earthBot2.png';
import ChatIcon from '@mui/icons-material/Chat'; // Import the chat icon

const ChatAgent = () => {
    return (
        <Box
            style={{
                position: 'relative',
                backgroundColor: "#5451D6",
                padding: '16px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '91%'
            }}
        >
            <div style={{ flex: 1, paddingTop: '16px' }}>
                <Typography align='justify' color={"white"} variant='body1'>
                    No extreme weather conditions reported nearby or expected on your way to work.
                </Typography>
            </div>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar style={{ width: "50px", height: "50px" }} src={EarthBot} />
                <IconButton
                    style={{ position: 'absolute', top: '-5%', right: '-35%', backgroundColor: 'transparent' }}
                    aria-label="Chat"
                >
                    <ChatIcon style={{ color: 'white' }} />
                </IconButton>
            </div>
        </Box>
    );
}

export default ChatAgent;
