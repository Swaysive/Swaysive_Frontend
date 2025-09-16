import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FiDownload, FiCalendar, FiChevronDown } from "react-icons/fi";
import DashboardHeader from "../Headers/DashboardHeader";
import StatementTable from "../Seller Payments Section/StatementTable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TrackandSales() {
  const [viewFullTable, setViewFullTable] = useState(false);
  const [anchorElExport, setAnchorElExport] = useState(null);
  const [anchorElStore, setAnchorElStore] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);

  // Custom calendar state
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarAnchor, setCalendarAnchor] = useState(null);

  const handleCalendarToggle = (event) => {
    setCalendarAnchor(calendarAnchor ? null : event.currentTarget);
  };

  const handleCalendarClose = () => {
    setCalendarAnchor(null);
  };

  const columns = [
    { label: "Influencer", field: "influencer" },
    { label: "Product", field: "product", align: "center" },
    { label: "Campaign Link", field: "campaignlink", align: "center" },
    { label: "Units Sold", field: "unitssold", align: "center" },
    { label: "Units Price", field: "unitsprice", align: "center" },
    { label: "Total Revenue", field: "totalrevenue", align: "center" },
    {
      label: "Commission %",
      field: "commission",
      align: "center",
    },
    {
      label: "Commission $",
      field: "commissiondollar",
      align: "center",
    },
    { label: "Swayssive Fee", field: "swayssivefee", align: "center" },
    { label: "Net Revenue", field: "netrevenue", align: "center" },
    {
      label: "Status",
      field: "status",
      align: "center",
      render: (value) => (
        <Box
          component="span"
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.4,
            borderRadius: "999px",
            fontFamily: "Poppins",
            fontSize: "11px",
            fontWeight: 600,
            color: "#fff",
            backgroundColor: value === "Active" ? "#16A249" : "#D83A52",
          }}
        >
          {value}
        </Box>
      ),
    },
  ];

  const rows = [
    {
      influencer: "John Smith",
      product: "Helimix 2.0",
      campaignlink: "LINK-8735",
      unitssold: 160,
      unitsprice: "$25",
      totalrevenue: "$2768.60",
      commission: "10%",
      commissiondollar: "$3015",
      swayssivefee: "$62.37",
      netrevenue: "$3,680.19",
      status: "Active",
    },
    {
      influencer: "Sarah Lee",
      product: "Helimix 2.0",
      campaignlink: "LINK-8735",
      unitssold: 160,
      unitsprice: "$25",
      totalrevenue: "$2768.60",
      commission: "10%",
      commissiondollar: "$2015",
      swayssivefee: "$62.37",
      netrevenue: "$2,180.19",
      status: "Active",
    },
    {
      influencer: "Maria L",
      product: "Helimix 2.0",
      campaignlink: "LINK-8735",
      unitssold: 160,
      unitsprice: "$25",
      totalrevenue: "$2768.60",
      commission: "10%",
      commissiondollar: "$1500",
      swayssivefee: "$62.37",
      netrevenue: "$1478.21",
      status: "Active",
    },
    {
      influencer: "Steven",
      product: "Helimix 2.0",
      campaignlink: "LINK-8735",
      unitssold: 160,
      unitsprice: "$25",
      totalrevenue: "$2768.60",
      commission: "10%",
      commissiondollar: "$415",
      swayssivefee: "$62.37",
      netrevenue: "$478.21",
      status: "Expired",
    },
    {
      influencer: "Eve",
      product: "Helimix 2.0",
      campaignlink: "LINK-8735",
      unitssold: 160,
      unitsprice: "$25",
      totalrevenue: "$2768.60",
      commission: "10%",
      commissiondollar: "$415",
      swayssivefee: "$62.37",
      netrevenue: "$478.21",
      status: "Expired",
    },
  ];

  const chartData = rows.map((row, index) => ({
    name: row.campaignlink || `Link ${index + 1}`,
    revenue: parseFloat(row.netrevenue.replace(/[^0-9.-]+/g, "")),
  }));

  const COLORS = ["#21C45D", "#3D3D3D", "#FF9800", "#2196F3", "#D83A52"];

  const pieData = rows.map((row, index) => ({
    name: row.influencer,
    value: Number(row.commissiondollar.replace(/[^0-9.-]+/g, "")),
  }));

  return (
    <Box sx={{ marginTop: "50px" }}>
      <DashboardHeader
        headerText="Track & Sales"
        bodyText={
          <>
            Monitor influencer-driven sales and commission <br /> tracking
          </>
        }
      />

      {!viewFullTable ? (
        <>
          {/* Search + Export Button */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={3}
          >
            <TextField
              placeholder="Search by Influencer, Product, or Link ID..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "80%" }}
            />

            <Box>
              <Button
                variant="outlined"
                startIcon={<FiDownload />}
                endIcon={<FiChevronDown />}
                onClick={handleOpen(setAnchorElExport)}
                sx={{
                  mr: 1,
                  color: "#fff",
                  borderColor: "#2A2A2A",
                  backgroundColor: "#2A2A2A",
                }}
              >
                Export
              </Button>

              <Menu
                anchorEl={anchorElExport}
                open={Boolean(anchorElExport)}
                onClose={handleClose(setAnchorElExport)}
                PaperProps={{
                  sx: { backgroundColor: "#fff", color: "#000", minWidth: 120 },
                }}
              >
                <MenuItem onClick={handleClose(setAnchorElExport)}>CSV</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose(setAnchorElExport)}>PDF</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose(setAnchorElExport)}>XLSX</MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              sx={{
                color: "#2A2A2A",
                borderColor: "#2A2A2A",
                backgroundColor: "#fff",
                textTransform: "none",
              }}
            >
              Today
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#2A2A2A",
                borderColor: "#2A2A2A",
                backgroundColor: "#fff",
                textTransform: "none",
              }}
            >
              Last 7 days
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#2A2A2A",
                borderColor: "#2A2A2A",
                backgroundColor: "#fff",
                textTransform: "none",
              }}
            >
              Last 30 days
            </Button>

            {/* Custom Calendar Dropdown */}
            <Box>
              <Button
                variant="outlined"
                onClick={handleCalendarToggle}
                startIcon={<FiCalendar />}
                sx={{
                  color: "#2A2A2A",
                  borderColor: "#2A2A2A",
                  backgroundColor: "#fff",
                  textTransform: "none",
                }}
              >
                Custom
              </Button>
              <Popper
                open={Boolean(calendarAnchor)}
                anchorEl={calendarAnchor}
                placement="bottom-start"
                style={{ zIndex: 1300 }}
              >
                <ClickAwayListener onClickAway={handleCalendarClose}>
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: 2,
                    }}
                  >
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        handleCalendarClose();
                      }}
                      inline
                    />
                  </Box>
                </ClickAwayListener>
              </Popper>
            </Box>

            {/* Stores Dropdown */}
            <Box>
              <Button
                variant="outlined"
                endIcon={<FiChevronDown />}
                onClick={handleOpen(setAnchorElStore)}
                sx={{
                  color: "#2A2A2A",
                  borderColor: "#2A2A2A",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  width: "150px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                All Stores
              </Button>
              <Menu
                anchorEl={anchorElStore}
                open={Boolean(anchorElStore)}
                onClose={handleClose(setAnchorElStore)}
                PaperProps={{
                  sx: { backgroundColor: "#fff", color: "#000", minWidth: 150 },
                }}
              >
                <MenuItem onClick={handleClose(setAnchorElStore)}>
                  Helimix 2.0
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose(setAnchorElStore)}>
                  HydroJug
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose(setAnchorElStore)}>
                  Ice Shaker
                </MenuItem>
              </Menu>
            </Box>

            {/* Status Dropdown */}
            <Box>
              <Button
                variant="outlined"
                endIcon={<FiChevronDown />}
                onClick={handleOpen(setAnchorElStatus)}
                sx={{
                  color: "#2A2A2A",
                  borderColor: "#2A2A2A",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  width: "150px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                All Status
              </Button>
              <Menu
                anchorEl={anchorElStatus}
                open={Boolean(anchorElStatus)}
                onClose={handleClose(setAnchorElStatus)}
                PaperProps={{
                  sx: { backgroundColor: "#fff", color: "#000", minWidth: 150 },
                }}
              >
                <MenuItem onClick={handleClose(setAnchorElStatus)}>
                  Active
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose(setAnchorElStatus)}>
                  Expired
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box mt={2}>
            <StatementTable
              title="Sales Overview"
              slogan="Track performance across all influencer campaigns"
              columns={columns}
              rows={rows}
              onViewAll={() => setViewFullTable(true)}
              showAll={false}
            />
          </Box>
        </>
      ) : (
        <Box p={1} mt={2}>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
            <Button
              variant="outlined"
              color="dark"
              onClick={() => setViewFullTable(false)}
              sx={{
                border: "1px solid #DFE2E7",
                fontFamily: "Poppins",
                textTransform: "none",
                backgroundColor: "#D4D4D46E",
              }}
            >
              Go Back
            </Button>
          </Box>
          <StatementTable
            title="Sales Overview"
            slogan="Track performance across all influencer campaigns"
            columns={columns}
            rows={rows}
            showAll={true}
          />
        </Box>
      )}

      {/* Charts Section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 4,
        }}
      >
        {/* Bar Chart */}
        <Box
          sx={{
            border: "1px solid #DFE2E7",
            borderRadius: "8px",
            p: 2,
            width: "55%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: "14px",
              mb: 2,
            }}
          >
            Revenue by Link
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fontFamily: "Poppins" }}
              />
              <YAxis
                domain={[0, 6000]}
                ticks={[0, 1500, 3000, 4500, 6000]}
                tick={{ fontSize: 10, fontFamily: "Poppins" }}
              />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3D3D3D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Pie Chart */}
        <Box
          sx={{
            border: "1px solid #DFE2E7",
            borderRadius: "8px",
            p: 2,
            width: "45%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: "14px",
              mb: 2,
            }}
          >
            Revenue Distribution by Influencer
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="60%"
                cy="50%"
                outerRadius={100}
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              {/* Custom Legend */}
              <Legend
                layout="vertical"
                align="left"
                verticalAlign="middle"
                content={({ payload }) => (
                  <Box>
                    {payload.map((entry, index) => (
                      <Box
                        key={`legend-item-${index}`}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: entry.color,
                            mr: 1,
                          }}
                        />
                        <Typography
                          style={{ color: entry.color }}
                          sx={{
                            fontWeight: 400,
                            fontFamily: "Poppins",
                            fontSize: "12px",
                          }}
                        >
                          {entry.value}
                          <span
                            style={{
                              marginLeft: "auto",
                              fontWeight: 400,
                              fontFamily: "Poppins",
                              color: entry.color,
                            }}
                          >
                            -${pieData[index].value}
                          </span>
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default TrackandSales;
