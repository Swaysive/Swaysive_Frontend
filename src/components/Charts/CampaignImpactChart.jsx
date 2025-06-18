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
import { Button, ButtonGroup } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CampaignImpactChart.css'; // Assuming you have some styles for the chart

const data = {
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
  ]
};

const CampaignImpactChart = () => {
  const [activeTab, setActiveTab] = useState('conversions');

  return (
    <div className="chart-container  py-3 ">
        <div className='container'>
        <div className='d-flex align-items-center justify-content-between py-3'>
      <h5>Campaign Impact – Last 14 Days</h5>

      <ButtonGroup className="mb-4">
        <Button
          variant={activeTab === 'conversions' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('conversions')}
          sx={{
            bgcolor: activeTab === 'conversions' ? 'black' : 'transparent',
            color: activeTab === 'conversions' ? 'white' : 'black',
            borderColor: 'black',
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
            },
          }}
        >
          Conversions
        </Button>
        <Button
          variant={activeTab === 'revenue' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('revenue')}
          sx={{
            bgcolor: activeTab === 'revenue' ? 'black' : 'transparent',
            color: activeTab === 'revenue' ? 'white' : 'black',
            borderColor: 'black',
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
            },
          }}
        >
          Revenue
        </Button>
        <Button
          variant={activeTab === 'clicks' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('clicks')}
          sx={{
            bgcolor: activeTab === 'clicks' ? 'black' : 'transparent',
            color: activeTab === 'clicks' ? 'white' : 'black',
            borderColor: 'black',
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
            },
          }}
        >
          Clicks
        </Button>
      </ButtonGroup>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data[activeTab]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#88A73F" strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignImpactChart;
