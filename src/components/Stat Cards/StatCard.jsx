// components/StatCard.js
import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './StatCard.css'; // Import CSS styles

const StatCard = ({ label, count, change, isPositive }) => {
  return (
    <div className="card stat-card shadow-sm border-0">
      <div className="card-body text-center">
        <div className="text-muted fw-semibold mb-1">{label}</div>
        <div className="d-flex justify-content-center align-items-center gap-1">
          <h3 className="fw-bold mb-0">{count}</h3>
          {change !== 0 && (
            <>
              {isPositive ? (
                <span className="text-success d-flex align-items-center">
                  <ArrowUpwardIcon fontSize="small" />
                  <span className="fw-medium">{change}</span>
                </span>
              ) : (
                <span className="text-danger d-flex align-items-center">
                  <ArrowDownwardIcon fontSize="small" />
                  <span className="fw-medium">{change}</span>
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
