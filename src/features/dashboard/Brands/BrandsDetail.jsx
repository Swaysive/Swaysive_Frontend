import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductTable from "../../../components/ReusableTable/ProductTable";
import { useParams } from "react-router-dom";
import { catalogApi } from "../../../api/catalogApi";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import { CircularProgress } from "@mui/material";

const columns = ["Products", "Brand", "Influencer", "Campaign Status"];

const BrandsDetail = () => {
  const { brandId } = useParams(); // Make sure your route is /brands/:brandId
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [brandLoading, setBrandLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const loading = brandLoading || productsLoading;

  // Fetch brand detail and products
  useEffect(() => {
    const fetchBrandAndProducts = async () => {
      setBrandLoading(true);
      try {
        const res = await catalogApi.getBrandDetail({
          brandId,
          page,
          limit: pageSize,
        });
        if (res.data.status === "success") {
          setBrand(res.data.data.brand);
          setProducts(res.data.data.products.items || []);
          setTotalCount(
            res.data.data.products.pagination?.total ||
              res.data.data.products.items?.length ||
              0
          );
        }
      } catch (e) {
        console.error("Error fetching brand details:", e);
        setBrand(null);
        setProducts([]);
      } finally {
        setBrandLoading(false);
        setProductsLoading(false);
      }
    };
    fetchBrandAndProducts();
  }, [brandId, page, pageSize]);

  // Filter products by search
  const filteredProducts = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.asin?.toLowerCase().includes(search.toLowerCase())
  );

  // Map API products to table rows
  const rows = filteredProducts.map((p) => ({
    id: p._id,
    image: p.images?.[1] || "",
    name: p.title,
    code: p.asin,
    material: p.material || "",
    tags: [],
    brand: brand?.name || "",
    influencer: "-", // You can fill this if you have influencer info
    status: p.status === "active" ? "Active" : "Inactive",
  }));
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
          headerText="Your Brands"
          bodyText="Review and update your creator-facing brand details and logo for each brand"
        />
      </div>
      <Box sx={{ p: 3 }}>
        {/* Brand Overview */}
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: "12px", height: "100%" }}>
              <Typography variant="h6" color="black" mb={2}>
                Brand Overview
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontWeight={600}>Name</Typography>
                <Typography>{brand?.name || "-"}</Typography>
              </Box>
              {/* <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontWeight={600}>Campaign</Typography>
                <Typography>45</Typography>
              </Box> */}
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={600}>Products</Typography>
                <Typography>{brand?.product_count ?? "-"}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Products Table Controls */}
        <Box p={2} component={Paper} sx={{ borderRadius: 2, mt: 3 }}>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
            {/* <Box>
              <Button
                variant="outlined"
                sx={{ mr: 1, color: "#000", borderColor: "#000" }}
              >
                Actions
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "#000", borderColor: "#000" }}
              >
                Export
              </Button>
            </Box> */}
          </Box>

          {/* Table */}
          <ProductTable
            columns={columns}
            rows={rows}
            page={page}
            rowsPerPage={pageSize}
            totalCount={totalCount}
            onPageChange={setPage}
            // onRowClick={(row) => console.log("Clicked row:", row)}
          />

          {/* Footer Controls */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Pagination
              count={Math.ceil(totalCount / pageSize)}
              page={page}
              onChange={(e, value) => setPage(value)}
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
                Showing {rows.length} of {totalCount} entries
              </Typography>
              <Select
                size="small"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value={5}>Show 5</MenuItem>
                <MenuItem value={10}>Show 10</MenuItem>
                <MenuItem value={25}>Show 25</MenuItem>
                <MenuItem value={50}>Show 50</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BrandsDetail;
