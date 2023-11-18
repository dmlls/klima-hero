import React from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Icon1 from '../../assets/flood.png';
import Icon2 from '../../assets/flood.png';
import Icon3 from '../../assets/flood.png';

const ModalContent = ({ handleClose }) => {
    const icons = [Icon1, Icon2, Icon3];
    const titles = ['Title 1', 'Title 2', 'Title 3'];

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%', // Adjust the width as needed
                maxWidth: 400, // Set a maximum width
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius: '16px', // Add rounded corners
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Whats wrong?
            </Typography>

            <Grid container spacing={2}>
                {icons.map((icon, index) => (
                    <Grid item xs={4} key={index}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '80px', // Adjust the height as needed
                                    border: '1px solid #ccc', // Add border
                                    borderRadius: '8px', // Add rounded corners
                                }}
                            >
                                <img src={icon} alt={`Icon ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </Box>
                            <Typography variant="caption" sx={{ marginTop: 1 }}>
                                {titles[index]}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Button onClick={handleClose} sx={{ marginTop: 2 }}>
                <CloseIcon />
                Cancel
            </Button>
        </Box>
    );
};

export default ModalContent;
