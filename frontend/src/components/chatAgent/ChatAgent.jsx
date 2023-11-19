import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import EarthBot from '../../assets/earthBot2.png';
import ChatIcon from '@mui/icons-material/Chat'; // Import the chat icon

const ChatAgent = () => {
    const [agentText, setAgentText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!agentText) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/v1/agent/daily-update`);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    console.log(result);
                    setAgentText(result["msg"]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [agentText]);

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
                width: '91%',
            }}
        >
            <div
                style={{
                    flex: 1,
                    paddingTop: '16px',
                    maxHeight: '200px', // Set your preferred maximum height
                    overflowY: 'auto', // Enable vertical scrollbar when content exceeds the maximum height
                }}
            >
                {loading ? (
                    <CircularProgress style={{ color: 'white' }} />
                ) : (
                    <Typography align='justify' color={"white"} variant='body1'>
                        {agentText}
                    </Typography>
                )}
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
