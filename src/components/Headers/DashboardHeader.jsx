import React from 'react';
import './DashboardHeader.css';
import { Box, Typography } from '@mui/material';

// Import assets locally
import OverlaySquare from '../../assets/images/overlay-square.svg';
import DotLight from '../../assets/images/dot-light.svg';

const DashboardHeader = ({ headerText, bodyText }) => {
  const backgroundAssets = [
    { url: OverlaySquare, className: 'asset-0' },
    { url: DotLight, className: 'asset-1' },
  ];

  return (
    <Box className="dashboard-header container-fluid p-4 rounded-4 position-relative text-white">
      {/* Text Content */}
      <div className="z-1 position-relative text-width">
        <Typography variant="h5" className="fw-bold"  sx={{ fontFamily: "Poppins", fontSize: "24px" }}>{headerText}</Typography>
        <Typography variant="body1" className="mt-2" sx={{ fontFamily: "Poppins", fontSize: "14px" }}>
          {bodyText}
        </Typography>
      </div>

      {/* Background Assets */}
      {backgroundAssets.map((asset, index) => (
        <img
          key={index}
          src={asset.url}
          alt={`bg-asset-${index}`}
          className={`dashboard-bg-asset ${asset.className}`}
        />
      ))}
    </Box>
  );
};

export default DashboardHeader;
