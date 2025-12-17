import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonOutline } from "@mui/icons-material";

const chartDataSets = {
  creators: {
    active: 0,
    inactive: 0,
    count: 0,
    label: "Active Creators",
    description: "you have 0 / 0 products active and 0 / 0 brands active",
  },
  //   products: {
  //     active: 80,
  //     inactive: 20,
  //     count: 25,
  //     label: "Active Products",
  //     description: "you have 25 / 26 products active and 1 / 2 brands active"
  //   },
  //   brands: {
  //     active: 50,
  //     inactive: 50,
  //     count: 1,
  //     label: "Active Brands",
  //     description: "you have 25 / 26 products active and 1 / 2 brands active"
  //   }
};

const COLORS = ["#28a745", "#dc3545"]; // green, red

export default function PartnershipOverview() {
  const [tab, setTab] = useState("creators");
  const currentData = chartDataSets[tab];

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

      <Typography
        className="mt-3"
        variant="body2"
        sx={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "medium" }}
      >
        {currentData.description}
      </Typography>

      {/* <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        indicatorColor="primary"
        textColor="primary"
        centered
        className="mt-3"
      >
        <Tab label="Creators" value="creators" />
        <Tab label="Products" value="products" />
        <Tab label="Brands" value="brands" />
      </Tabs> */}
    </div>
  );
}
