import React, { useState } from 'react';
import { Box, Button, Grid, Modal, Typography, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Icon1 from '../../assets/flood.png';
import Icon2 from '../../assets/flood.png';
import Icon3 from '../../assets/flood.png';

const ModalContent = ({ handleClose }) => {
    const icons = [Icon1, Icon2, Icon3];
    const titles = ['Title 1', 'Title 2', 'Title 3'];

    const [selectedBox, setSelectedBox] = useState(null);
    const [textInput, setTextInput] = useState('');

    const handleBoxClick = (index) => {
        setSelectedBox(index);
    };

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submission logic here, including the selected box and text input
        console.log('Selected Box:', selectedBox + 1);
        console.log('Text Input:', textInput);
    };

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
                Choose an Option
            </Typography>

            <Grid container spacing={2}>
                {icons.map((icon, index) => (
                    <Grid item xs={4} key={index}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%', // Adjust the height as needed
                                border: index === selectedBox ? '2px solid #2196F3' : '1px solid #ccc', // Highlight selected box
                                borderRadius: '8px', // Add rounded corners
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer', // Add cursor pointer
                            }}
                            onClick={() => handleBoxClick(index)}
                        >
                            <Box
                                sx={{
                                    width: '70%', // Set the width of the box as a percentage of the modal width
                                    height: '70%', // Adjust the height as needed
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

            <TextField
                label="Enter text"
                variant="outlined"
                fullWidth
                margin="normal"
                value={textInput}
                onChange={handleInputChange}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 2,
                }}
            >
                <Button onClick={handleClose} sx={{ marginRight: 2 }}>
                    <CloseIcon />
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default ModalContent;
