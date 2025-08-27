import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Button, Menu, MenuItem, Box, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronDown } from "react-icons/fa6";

const fallbackData = {
  earnings: [
    { date: "Jan", value: 45 },
    { date: "Feb", value: 30 },
    { date: "Mar", value: 40 },
    { date: "Apr", value: 10 },
    { date: "May", value: 48 },
    { date: "Jun", value: 60 },
    { date: "Jul", value: 27 },
    { date: "Aug", value: 57 },
    { date: "Sep", value: 58 },
    { date: "Oct", value: 43 },
    { date: "Nov", value: 59 },
    { date: "Dec", value: 63 },
  ],
  "units sold": [
    { date: "Jan", value: 200 },
    { date: "Feb", value: 180 },
    { date: "Mar", value: 190 },
    { date: "Apr", value: 160 },
    { date: "May", value: 220 },
    { date: "Jun", value: 240 },
    { date: "Jul", value: 200 },
    { date: "Aug", value: 250 },
    { date: "Sep", value: 260 },
    { date: "Oct", value: 230 },
    { date: "Nov", value: 270 },
    { date: "Dec", value: 280 },
  ],
  "all time": [
    { date: "Jan", value: 120 },
    { date: "Feb", value: 100 },
    { date: "Mar", value: 110 },
    { date: "Apr", value: 90 },
    { date: "May", value: 140 },
    { date: "Jun", value: 160 },
    { date: "Jul", value: 130 },
    { date: "Aug", value: 170 },
    { date: "Sep", value: 180 },
    { date: "Oct", value: 150 },
    { date: "Nov", value: 190 },
    { date: "Dec", value: 200 },
  ],
};
const InfluencerImpactChart = ({
  title = "Performance Overview",
  tabs = ["earnings", "units sold", "all time"],
  chartData = fallbackData,
  lineColor = "#88A73F",
  height = 300,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = (option) => {
    if (option) setActiveTab(option);
    setAnchorEl(null);
  };

  return (
    <Box className="chart-container py-3">
      <Box className="container">
        {/* Header with Tabs */}
        <Box className="d-flex align-items-center justify-content-between pb-3">
          <Typography variant="h6"  sx={{fontFamily: "poppins", fontSize: "16px"}}>{title}</Typography>

          <Box display="flex" gap={1} sx={{fontFamily: "poppins", fontSize: "14px"}}>
            {tabs.map((tab) =>
              tab === "all time" ? (
                <div key={tab}>
                  <Button
                    endIcon={tab === "all time" ? <FaChevronDown size={15} /> : null}
                    variant={activeTab === tab ? "contained" : "outlined"}
                    onClick={handleMenuOpen}
                    sx={{
                      bgcolor: activeTab === tab ? "black" : "transparent",
                      color: activeTab === tab ? "white" : "black",
                      borderColor: "black",
                      textTransform: "capitalize",
                      fontFamily: "poppins", fontSize: "14px",
                      "&:hover": {
                        bgcolor: "black",
                        color: "white",
                        
                      },
                    }}
                  >
                    {tab}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleMenuClose(null)}
                  >
                    <MenuItem onClick={() => handleMenuClose("Last 7 Days")}>
                      Last 7 Days
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuClose("Last 30 Days")}>
                      Last 30 Days
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuClose("all time")}>
                      All Time
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "contained" : "outlined"}
                  onClick={() => setActiveTab(tab)}
                  sx={{
                    bgcolor: activeTab === tab ? "black" : "transparent",
                    color: activeTab === tab ? "white" : "black",
                    borderColor: "black",
                    textTransform: "capitalize",
                    "&:hover": {
                      bgcolor: "black",
                      color: "white",
                    },
                  }}
                >
                  {tab}
                </Button>
              )
            )}
          </Box>
        </Box>

        {/* Line Chart */}
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData[activeTab] || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default InfluencerImpactChart;
