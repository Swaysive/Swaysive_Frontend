// ProductTableMui.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Chip,
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
  Pagination,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { catalogApi } from "../../../api/catalogApi";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await catalogApi.getProducts({
          page: currentPage,
          limit: pageSize,
        });
        // The API returns { data: { items: [...], pagination: { total: ... } } }
        // Based on user snippet: response.data.data.items and response.data.data.pagination.total
        const fetchedProducts = response.data?.data?.items || [];
        const total = response.data?.data?.pagination?.total || 0;

        setProducts(fetchedProducts);
        setTotalProducts(total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize]);

  // Server-side pagination means 'products' already contains only the current page's items
  const displayedProducts = products;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    navigate(`/products/details/${product.id}`);
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
    <div className="row" style={{ marginTop: "50px" }}>
      <div className="col-12 mb-4">
        <DashboardHeader
          headerText="Your Products"
          bodyText="Review and update your creator-facing brand details and logo for each brand"
        />
      </div>
      <Box p={2} component={Paper} sx={{ borderRadius: 2 }}>
        {/* Top Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Box>
            {/* <Button
              variant="outlined"
              endIcon={<ArrowDropDownIcon />}
              sx={{ mr: 1, color: "#000", borderColor: "#000" }}
            >
              Actions
            </Button> */}
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#F0F0F2" }}>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell> */}
                <TableCell>Products</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Influencer</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedProducts.map((item) => (
                <TableRow key={item.id} hover>
                  {/* <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="start"
                      gap={2}
                      onClick={() => handleProductClick(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar
                        src={item.main_image || ""}
                        variant="rounded"
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ maxWidth: 300 }}
                          noWrap
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.asin}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{item.brand?.name || "N/A"}</TableCell>
                  <TableCell>
                    {item.influencerName?.first && item.influencerName?.last
                      ? `${item.influencerName.first} ${item.influencerName.last}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.status === "active" ? "Active" : "Inactive"}
                      size="small"
                      icon={
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor:
                              item.status === "active" ? "#4CAF50" : "#9e9e9e",
                            ml: 1,
                          }}
                        />
                      }
                      sx={{
                        backgroundColor:
                          item.status === "active" ? "#e6f4ea" : "#f4f4f5",
                        color: item.status === "active" ? "#4CAF50" : "#9e9e9e",
                        fontWeight: 600,
                        pl: 1,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Pagination
            count={Math.ceil(totalProducts / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#000000",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
            }}
          />
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">
              Showing {products.length} of {totalProducts} entries
            </Typography>
            <Select
              size="small"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <MenuItem value={5}>Show 5</MenuItem>
              <MenuItem value={10}>Show 10</MenuItem>
              <MenuItem value={25}>Show 25</MenuItem>
              <MenuItem value={50}>Show 50</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProductTable;
