import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Button, ButtonGroup, Box, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fallback dummy data
const fallbackData = {
  conversions: [
    { date: '5/22', value: 45 },
    { date: '5/23', value: 30 },
    { date: '5/24', value: 40 },
    { date: '5/25', value: 10 },
    { date: '5/26', value: 48 },
    { date: '5/27', value: 60 },
    { date: '5/28', value: 27 },
    { date: '5/29', value: 57 },
    { date: '5/30', value: 58 },
    { date: '5/31', value: 43 },
    { date: '6/1', value: 59 },
    { date: '6/2', value: 63 },
    { date: '6/3', value: 52 },
    { date: '6/4', value: 64 },
  ],
  revenue: [
    { date: '5/22', value: 200 },
    { date: '5/23', value: 180 },
    { date: '5/24', value: 190 },
    { date: '5/25', value: 160 },
    { date: '5/26', value: 220 },
    { date: '5/27', value: 240 },
    { date: '5/28', value: 200 },
    { date: '5/29', value: 250 },
    { date: '5/30', value: 260 },
    { date: '5/31', value: 230 },
    { date: '6/1', value: 270 },
    { date: '6/2', value: 280 },
    { date: '6/3', value: 250 },
    { date: '6/4', value: 290 },
  ],
  clicks: [
    { date: '5/22', value: 120 },
    { date: '5/23', value: 100 },
    { date: '5/24', value: 110 },
    { date: '5/25', value: 90 },
    { date: '5/26', value: 140 },
    { date: '5/27', value: 160 },
    { date: '5/28', value: 130 },
    { date: '5/29', value: 170 },
    { date: '5/30', value: 180 },
    { date: '5/31', value: 150 },
    { date: '6/1', value: 190 },
    { date: '6/2', value: 200 },
    { date: '6/3', value: 180 },
    { date: '6/4', value: 210 },
  ],
};

const CampaignImpactChart = ({
  title = 'Campaign Impact – Last 14 Days',
  tabs = ['conversions', 'revenue', 'clicks'],
  chartData = fallbackData,
  lineColor = '#88A73F',
  height = 300,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Box className="chart-container py-3">
      <Box className="container">
        {/* Header with Tabs */}
        <Box className="d-flex align-items-center justify-content-between py-3">
          <Typography variant="h6"sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight:"medium" }} >{title}</Typography>

          <ButtonGroup className="mb-4">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'contained' : 'outlined'}
                onClick={() => setActiveTab(tab)}
                sx={{
                  bgcolor: activeTab === tab ? 'black' : 'transparent',
                  color: activeTab === tab ? 'white' : 'black',
                  fontFamily: "Poppins", fontSize: "14px",
                  borderColor: 'black',
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: 'black',
                    color: 'white',
                  },
                }}
              >
                {tab}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {/* Line Chart */}
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData[activeTab]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CampaignImpactChart;
