import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  TextField,
  Avatar,
  Typography,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const influencers = [
  {
    name: 'John Thompson',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    facebook: '1.5k',
    instagram: '1.5k',
  },
  {
    name: "David Cooper",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    facebook: '1.5k',
    instagram: '3.2k',
  },
];

const AssignInfluencerModal = ({ open, onClose, onAssign,onInvite }) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState('');
  const [alreadyAssigned, setAlreadyAssigned] = useState(false);

const handleAssign = () => {
    if (onAssign) onAssign(); // call parent handler
  };


  const handleInviteClick = () => {
    if (onInvite) onInvite(); // call parent handler
    if (onClose) onClose(); 
  };

  const handleSelect = (e) => {
    setSelectedInfluencer(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="position-relative text-start py-4 px-4" style={{ width: 400 }}>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" className="fw-bold mb-3 text-black">
          Assign Influencer
        </Typography>

        {/* Select Influencer Dropdown */}
        <TextField
          fullWidth
          select
          label="Select Influencer"
          value={selectedInfluencer}
          onChange={handleSelect}
          className="mb-3"
        >
          {influencers.map((inf, idx) => (
            <MenuItem key={idx} value={inf.name}>
              <div className="d-flex align-items-center">
                <Avatar src={inf.image} className="me-2" />
                <span>{inf.name}</span>
              </div>
            </MenuItem>
          ))}
        </TextField>

        {/* Show Assign Button only if selected and not already assigned */}
        {selectedInfluencer && !alreadyAssigned && (
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            onClick={handleAssign}
            className="mb-3"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Assign
          </Button>
        )}

        {/* Invite Influencer Link */}
        <div className="d-flex align-items-center text-primary" onClick={handleInviteClick} style={{ cursor: 'pointer' }}>
          <AddIcon className="me-1" fontSize="small" />
          <Typography variant="body2">Invite Influencer</Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignInfluencerModal;
