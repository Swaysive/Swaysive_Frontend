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
import { Button, ButtonGroup, Box, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

// Fallback dummy data
const fallbackData = {
  conversions: [],
  revenue: [],
  clicks: [],
};

const CampaignImpactChart = ({
  title = "Campaign Impact – Last 14 Days",
  tabs = ["conversions", "revenue", "clicks"],
  chartData = fallbackData,
  lineColor = "#88A73F",
  height = 300,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Box className="chart-container py-3">
      <Box className="container">
        {/* Header with Tabs */}
        <Box className="d-flex align-items-center justify-content-between py-3">
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: "medium",
            }}
          >
            {title}
          </Typography>

          <ButtonGroup className="mb-4">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "contained" : "outlined"}
                onClick={() => setActiveTab(tab)}
                sx={{
                  bgcolor: activeTab === tab ? "black" : "transparent",
                  color: activeTab === tab ? "white" : "black",
                  fontFamily: "Poppins",
                  fontSize: "14px",
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

export default CampaignImpactChart;
