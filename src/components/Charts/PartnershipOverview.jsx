import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonOutline } from "@mui/icons-material";

const COLORS = ["#28a745", "#dc3545"]; // green, red

export default function PartnershipOverview({ data }) {
  const creatorStats = data?.totalCreators || {
    active: 0,
    inactive: 0,
    total: 0,
  };

  // Calculate percentages for the pie chart
  const total = creatorStats.total || 1; // Avoid division by zero
  const activePercentage = Math.round((creatorStats.active / total) * 100);
  const inactivePercentage = 100 - activePercentage;

  const currentData = {
    count: creatorStats.total,
    active: activePercentage,
    inactive: inactivePercentage,
    label: "Active Creators",
  };

  const pieData = [
    { name: "Active", value: currentData.active },
    { name: "Inactive", value: currentData.inactive },
  ];

  return (
    <div
      className="card p-5 shadow-sm"
      style={{ height: "470px", borderRadius: 20 }}
    >
      <h6 className="mb-3 font-poppins" style={{ fontSize: "18px" }}>
        Partnership Overview
      </h6>
      <Box display="flex" alignItems="center" mb={2}>
        <PersonOutline fontSize="large" className="me-2" />
        <div>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "bold" }}
            variant="h5"
          >
            {currentData.count}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "Poppins", fontSize: "14px" }}
          >
            {currentData.label}
          </Typography>
        </div>
      </Box>

      <PieChart width={200} height={200}>
        <Pie
          data={pieData}
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
              cornerRadius={10}
            />
          ))}
        </Pie>
      </PieChart>

      <Box display="flex" justifyContent="center" gap={4} mt={2}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "medium" }}
        >
          <span
            className="rounded-circle"
            style={{ width: 10, height: 10, background: COLORS[0] }}
          ></span>
          <small>Active ({currentData.active}%)</small>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "medium" }}
        >
          <span
            className="rounded-circle"
            style={{ width: 10, height: 10, background: COLORS[1] }}
          ></span>
          <small>Inactive ({currentData.inactive}%)</small>
        </Box>
      </Box>
    </div>
  );
}
