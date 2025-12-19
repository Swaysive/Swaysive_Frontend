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
  CircularProgress,
  Tooltip,
  Snackbar,
} from "@mui/material";
import { Facebook, Instagram, Search, ContentCopy } from "@mui/icons-material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { usersApi } from "../../../api/usersApi";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import GenerateUrlModal from "../../../components/GenerateUrl Modal/GenerateUrlModal";

const InfluencerDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const influencerName = location.state?.influencerName || "Influencer Details";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchInfluencerProducts = async () => {
      try {
        const response = await usersApi.getInfluencerDetails(id);
        if (response.data.status === "success") {
          // Map the new structure: response.data.data -> [{ product, overview, variants }]
          const mappedData = response.data.data.map((item) => ({
            id: item.product.id,
            title: item.product.title,
            brand: item.product.brand?.name || "Generic",
            commission: item.overview.influencer?.affiliateCommission
              ? `${item.overview.influencer.affiliateCommission}%`
              : "0%",
            status:
              item.overview.campaignStatus === "active" ? "Active" : "Inactive",
            unitsSold: 0, // Not available in the response snippet
            url: item.overview.influencer?.affiliateLink || "-",
          }));
          setData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching influencer products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencerProducts();
  }, [id]);

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
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div className="py-4" style={{ overflowX: "hidden" }}>
      <div className="col-12 mb-4">
        <DashboardHeader
          headerText={`Influencer: ${influencerName}`}
          // bodyText={`Review and update creator-facing details for ${influencerName}`}
          showBackButton={true}
        />
      </div>

      <div className="influencer-container">
        {/* Influencer Header */}
        {/* <div
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
        </div> */}

        {/* Table Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={2}
        >
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
            sx={{ width: { xs: "100%", sm: 250 } }}
          />
          {/* <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant="outlined"
              sx={{ color: "#000", borderColor: "#000" }}
            >
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
          </Box> */}
        </Box>

        {/* Product Table */}
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ width: 50 }}>
                  {/* <Checkbox /> */}
                </TableCell>
                <TableCell sx={{ width: "45%" }}>
                  <b>Product Name</b>
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <b>Brand</b>
                </TableCell>
                <TableCell sx={{ width: "5%" }}>
                  <b>Commission</b>
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <b>Status</b>
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <b>Units Sold</b>
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  <b>URL</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell padding="checkbox">{/* <Checkbox /> */}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        maxWidth: { xs: "150px", sm: "250px", md: "400px" },
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.commission}</TableCell>
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
                  <TableCell>{row.unitsSold}</TableCell>
                  <TableCell>
                    {row.url !== "-" ? (
                      <Box display="flex" alignItems="center">
                        <Tooltip title="Copy URL">
                          <IconButton
                            size="small"
                            onClick={() => {
                              navigator.clipboard.writeText(row.url);
                              setSnackbarOpen(true);
                            }}
                            sx={{ color: "#757575" }}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {/* <Typography
                          variant="caption"
                          sx={{
                            ml: 1,
                            color: "#757575",
                            maxWidth: "150px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.url}
                        </Typography> */}
                      </Box>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          flexWrap="wrap"
          gap={2}
        >
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
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
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

      <GenerateUrlModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="URL copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default InfluencerDetails;
