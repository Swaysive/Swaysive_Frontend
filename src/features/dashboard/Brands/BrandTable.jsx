// BrandTable.js

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Button,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // add this
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DashboardHeader from "../../../components/Headers/DashboardHeader";

const mockData = [
  {
    id: 1,
    name: "Helimix",
    status: "Active",
    product: "Sharemydine",
    image: "https://cdn.shopify.com/s/files/1/0255/3245/2166/files/helimix_logo_300x.png",
  },
  {
    id: 2,
    name: "",
    status: "Inactive",
    product: "Sharemydine",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Adidas",
    status: "Active",
    product: "Sharemydine",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    id: 4,
    name: "Nike",
    status: "Inactive",
    product: "Sharemydine",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    id: 5,
    name: "Puma",
    status: "Inactive",
    product: "Sharemydine",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Puma_logo.svg",
  },
  {
    id: 6,
    name: "Another Brand",
    status: "Active",
    product: "Sharemydine",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Brand Seven",
    status: "Inactive",
    product: "Sharemydine",
    image: "https://i.pravatar.cc/150?img=7",
  },
];

const getStatusChip = (status) => (
  <Chip
    label={status}
    size="small"
    sx={{
      backgroundColor: status === "Active" ? "#e6f4ea" : "#f4f4f5",
      color: status === "Active" ? "#2e7d32" : "#6b7280",
    }}
  />
);

const BrandTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  // Calculate the paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = mockData.slice(startIndex, endIndex);

  // Total pages
  const totalPages = Math.ceil(mockData.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="row" style={{ marginTop: "50px" }}>
      <div className="col-12 mb-4">
        <DashboardHeader
          headerText="Dashboard"
          bodyText="Welcome to swaysive! This is your homepage – check here to see new notifications and review a snapshot of your performance."
        />
      </div>
      <Box p={2} component={Paper} sx={{ borderRadius: 2 }}>
        {/* Top Bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            placeholder="Search…"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />

          <Box display="flex" gap={1}>
            <Button variant="outlined" sx={{ color: "#000",borderColor:'#000' }}>See Archived Brands</Button>
            <Button variant="contained" sx={{ backgroundColor: "#000" }}>
              Add New Brand
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <b>Brands</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Products</b>
                </TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
    {paginatedData.map((row) => (
      <TableRow key={row.id}>
        <TableCell padding="checkbox">
          <input type="checkbox" />
        </TableCell>
        <TableCell
          onClick={() => navigate(`/brands/details`)}
          style={{ cursor: "pointer" }} // make it look clickable
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src={row.image} />
            {row.name || "Untitled Brand"}
          </Box>
        </TableCell>
        <TableCell>{getStatusChip(row.status)}</TableCell>
        <TableCell>{row.product}</TableCell>
      </TableRow>
    ))}
  </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
              <KeyboardArrowLeft />
            </IconButton>
            <Typography variant="body2">{currentPage}</Typography>
            <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              <KeyboardArrowRight />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">
              Showing {paginatedData.length} of {mockData.length} entries
            </Typography>
            <Select
              size="small"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <MenuItem value={5}>Show 5</MenuItem>
              <MenuItem value={10}>Show 10</MenuItem>
              <MenuItem value={25}>Show 25</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BrandTable;
