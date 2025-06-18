import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Facebook, Instagram, Search } from "@mui/icons-material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import "./InfluencerDetails.css"; // custom styles
import EditIcon from "../../../assets/icons/edit-icon.svg";
import { productApi } from "../../../api/productApi";
import GenerateUrlModal from "../../../components/GenerateUrl Modal/GenerateUrlModal";

const InfluencerDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProducts();
        console.log("Products fetched successfully:", response.data.products);

        const isActive = localStorage.getItem("active") === "true";

        const firstThree = response.data.products.slice(0, 3).map((product, index) => ({
          ...product,
          status: isActive && index === 0 ? "Active" : "Inactive",
        }));

        setData(firstThree);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

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
    setCurrentPage(1);
  };

  return (
    <div className="mt-4">
      <div className="col-12 mb-4">
        <DashboardHeader
          headerText="All Influencers"
          bodyText="Review and update your creator-facing brand details and logo for each brand"
        />
      </div>

      <div className="influencer-container">
        {/* Influencer Header */}
        <div
          className="p-3 mb-4 bg-dark text-white rounded row"
          style={{ maxWidth: "350px" }}
        >
          <h6 className="text-white col-12">Payment Schedule</h6>
          <Typography variant="body2" className="col-6 mb-3">
            Payment Schedule
          </Typography>
          <div className="col-6 d-flex justify-content-end align-items-center gap-2 mb-3">
            <Typography variant="body2">Bi Weekly</Typography>
            <img
              src={EditIcon}
              alt="Influencer Avatar"
              style={{ width: "15px", height: "15px" }}
            />
          </div>
          <Typography variant="body2" className="col-6 mb-3">
            Next Payment
          </Typography>
          <Typography className="col-6 text-end mb-3" variant="body2">
            $546.00
          </Typography>
          <Button
            variant="contained"
            className="mt-2 w-100"
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            Make Payment
          </Button>
        </div>

        {/* Table Controls */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            placeholder="Search…"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />
          <Box display="flex" gap={1}>
            <Button variant="outlined" sx={{ color: "#000", borderColor: "#000" }}>
              Filter
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#000" }}>
              View Stats
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setModalOpen(true)}
            >
              Generate URL
            </Button>
          </Box>
        </Box>

        {/* Product Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell><b>Product Name</b></TableCell>
                <TableCell><b>Brand</b></TableCell>
                <TableCell><b>Commission</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Units Sold</b></TableCell>
                <TableCell><b>URL</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ maxWidth: 400 }}
                      noWrap
                    >
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell>Helimix</TableCell>
                  <TableCell>3%</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      icon={
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor:
                              row.status === "Active" ? "#4CAF50" : "#9e9e9e",
                            ml: 1,
                          }}
                        />
                      }
                      sx={{
                        backgroundColor:
                          row.status === "Active" ? "#e6f4ea" : "#f4f4f5",
                        color: row.status === "Active" ? "#4CAF50" : "#9e9e9e",
                        fontWeight: 600,
                        pl: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.purchases_past_month}</TableCell>
                  <TableCell>
                    <a
                      href={`https://${row.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row.url}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <Typography variant="body2">{currentPage}</Typography>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">
              Showing {paginatedData.length} of {data.length} entries
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
      </div>

      <GenerateUrlModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default InfluencerDetails;
