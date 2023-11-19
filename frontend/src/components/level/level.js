import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const LevelIndicator = () => {
    const levelText = "Level 1 - Novice";
    const xp = 81;
    const progress = 87;

    return (
        <Box
            style={{
                position: 'relative',
                backgroundColor: "#5451D6",
                padding: '12px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch', // Align items stretch to ensure the progress bar takes full width
                width: '91%',
            }}
        >
            {/* First Row: Level Text and XP */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {/* Level Text */}
                <Typography align='left' color={"white"} variant='body1'>
                    {levelText}
                </Typography>

                {/* Larger XP Indicator */}
                <Typography align='right' color={"white"} variant='h6'>
                    {`${xp}xp`}
                </Typography>
            </div>

            {/* Second Row: Progress Bar with 0% and 100% */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Typography align='left' color={"white"} variant='caption'>
                    0%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        backgroundColor: 'white',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#23CE6B'
                        }
                    }}
                    style={{
                        borderRadius: '8px',
                        height: '12px',
                    }}
                />
                <Typography align='right' color={"white"} variant='caption'>
                    100%
                </Typography>
            </div>
        </Box>
    );
}

export default LevelIndicator;
