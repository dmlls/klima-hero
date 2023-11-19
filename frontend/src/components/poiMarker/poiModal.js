// PoiModal.js
import React from 'react';
import { Modal, Typography, Paper, IconButton, TextField, Button, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VerifiedIcon from '../../assets/verified.png';

const CommentBubble = ({ comment }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Avatar src={comment.author.profilePicture} alt={comment.author.name} style={{ width: 30, height: 30, borderRadius: '50%' }} />
        <div style={{ backgroundColor: '#e0e0e0', borderRadius: 10, padding: '8px 12px', maxWidth: '70%' }}>
            <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                {comment.content}
            </Typography>
        </div>
    </div>
);

const PoiModal = ({ poiData, handleClose }) => {
    return (
        <Modal open={Boolean(poiData)} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper style={{ height: '70vh', width: '90%', maxWidth: 600, padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={poiData && poiData.iconUrl} alt="Poi Icon" style={{ marginRight: 15, width: 50, height: 50 }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h5" style={{ marginBottom: 5, marginRight: 5 }}>
                                    {poiData && poiData.poiType}
                                </Typography>

                                {/* Display the custom PNG icon after the title */}
                                <Avatar src={VerifiedIcon} alt="Custom Icon" style={{ width: 20, height: 20 }} />
                            </div>

                            {poiData && poiData.creationDate && (
                                <Typography variant="subtitle2" color="textSecondary" style={{ marginLeft: 5 }}>
                                    Reported at: {new Date(poiData.creationDate).toLocaleString()}
                                </Typography>
                            )}
                        </div>
                    </div>

                    {/* Thumbs up icon and upvotes */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ThumbUpIcon color="primary" style={{ marginRight: 5 }} />
                        <Typography variant="subtitle1" color="textPrimary">
                            {poiData && poiData.upvotes}
                        </Typography>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>

                    {/* Render CommentBubbles */}
                    {poiData &&
                        poiData.thread &&
                        poiData.thread.map((comment, index) => (
                            <CommentBubble key={index} comment={comment} />
                        ))}
                </div>

                {/* Text Field and Send Message Button */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
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
