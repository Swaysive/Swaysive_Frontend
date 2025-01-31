// import React from 'react';
import { Divider, Box, Typography } from '@mui/material';

const OrDivider = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: '20px 0',
      }}
    >
       <Divider sx={{ flex: 1, borderBottomWidth: 2, borderColor: '#333' }} />
      <Typography variant="body2" sx={{ mx: 2, color: '#555' }}>
        or
      </Typography>
      <Divider sx={{ flex: 1, borderBottomWidth: 2, borderColor: '#333' }} />
    </Box>
  );
};

export default OrDivider;
