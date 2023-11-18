// PoiModal.js
import React from 'react';
import { Modal, Typography, Paper, IconButton, TextField, Button, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const CommentBubble = ({ user, message }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Avatar src={user.profilePicture} alt={user.name} style={{ width: 30, height: 30, borderRadius: '50%' }} />
        <div style={{ backgroundColor: '#e0e0e0', borderRadius: 10, padding: '8px 12px', maxWidth: '70%' }}>
            <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                {message}
            </Typography>
        </div>
    </div>
);

const PoiModal = ({ poiData, handleClose }) => {
    // Sample comments data (replace with your actual comments data)
    const comments = [
        { id: 1, user: { name: 'User1', profilePicture: '/path/to/user/profile/pic1.jpg' }, message: 'Comment 1' },
        { id: 2, user: { name: 'User2', profilePicture: '/path/to/user/profile/pic2.jpg' }, message: 'Comment 2' },
        // Add more comments as needed
    ];

    return (
        <Modal open={Boolean(poiData)} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper style={{ width: '90%', maxWidth: 600, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                    <img src="/path/to/your/image.png" alt="Poi Icon" style={{ marginRight: 10, width: 30, height: 30 }} />
                    <div>
                        <Typography variant="h5" style={{ marginBottom: 5 }}>
                            Fallen Tree
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {poiData && poiData.poiType}
                        </Typography>
                    </div>
                </div>

                <div>
                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>

                    {/* Render CommentBubbles */}
                    {comments.map((comment) => (
                        <CommentBubble key={comment.id} user={comment.user} message={comment.message} />
                    ))}
                </div>

                {/* Text Field and Send Message Button */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                    <TextField label="Type your comment" variant="outlined" style={{ flexGrow: 1, marginRight: 10 }} />
                    <IconButton color="primary" aria-label="send">
                        <SendIcon />
                    </IconButton>
                </div>
            </Paper>
        </Modal>
    );
};

export default PoiModal;
