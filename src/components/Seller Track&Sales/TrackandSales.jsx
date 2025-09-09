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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FiDownload, FiCalendar, FiChevronDown } from "react-icons/fi";
import DashboardHeader from "../Headers/DashboardHeader";
import StatementTable from "../Seller Payments Section/StatementTable";

function TrackandSales() {
  const [viewFullTable, setViewFullTable] = useState(false);
  const [anchorElExport, setAnchorElExport] = useState(null);
  const [anchorElStore, setAnchorElStore] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);

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
      commissiondollar: "$415",
      swayssivefee: "$62.37",
      netrevenue: "$478.21",
      status: "Active",
    },
    {
      influencer: "John Smith",
      product: "Helimix 2.0",
      campaignlink: "LINK-8735",
      unitssold: 160,
      unitsprice: "$25",
      totalrevenue: "$2768.60",
      commission: "10%",
      commissiondollar: "$415",
      swayssivefee: "$62.37",
      netrevenue: "$478.21",
      status: "Active",
    },
    {
      influencer: "John Smith",
      product: "Helimix 2.0",
      campaignlink: "LINK-8735",
      unitssold: 160,
      unitsprice: "$25",
      totalrevenue: "$2768.60",
      commission: "10%",
      commissiondollar: "$415",
      swayssivefee: "$62.37",
      netrevenue: "$478.21",
      status: "Active",
    },
    {
      influencer: "John Smith",
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
      influencer: "John Smith",
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

  return (
    <Box sx={{ marginTop: "50px" }}>
      {/* ✅ Always render header on both views */}
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
                <MenuItem onClick={handleClose(setAnchorElExport)}>
                  CSV
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose(setAnchorElExport)}>
                  PDF
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose(setAnchorElExport)}>
                  XLSX
                </MenuItem>
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
            <Button
              variant="outlined"
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
    </Box>
  );
}

export default TrackandSales;
