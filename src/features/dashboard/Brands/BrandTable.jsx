// BrandTable.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Checkbox,
  Chip,
  Select,
  MenuItem,
  Pagination,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { catalogApi } from "../../../api/catalogApi";
import DashboardHeader from "../../../components/Headers/DashboardHeader";

const statusColors = {
  active: "success",
  inactive: "default",
};

const BrandTable = () => {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await catalogApi.getBrands({ page:1, limit:1 });
        if (response.data.status === "success") {
          setBrands(response.data.data.result);
          setTotalRecords(response.data.data.pagination.totalRecords);
          setTotalPages(response.data.data.pagination.totalPages);
        }
      } catch (error) {
        // Handle error (toast, etc.)
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [page, limit]);

  return (
    <div className="row" style={{ marginTop: "50px" }}>
      <div className="col-12 mb-4">
        <DashboardHeader
          headerText="Your Brands"
          bodyText="Review and update your creator-facing brand details and logo for each brand"
        />
      </div>
    <Paper sx={{ borderRadius: "12px", p: 2, mt: 6 }}>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
          {/* <Button variant="outlined" sx={{ color: "#000", borderColor: "#000" }}>
            See Archived Brands
          </Button> */}
          {/* <Button variant="contained" sx={{ backgroundColor: "#000" }}>
            Sync Now
          </Button> */}
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Products</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Campaigns</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand._id} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell
                  onClick={() => navigate(`/brands/details/${brand._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={brand.logo_url || ""}>
                      {brand.name?.[0] || "B"}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {brand.name || "Untitled Brand"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {brand.description || ""}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={brand.status === "active" ? "Active" : "Inactive"}
                    size="small"
                    color={statusColors[brand.status]}
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      "& .MuiChip-icon": { fontSize: 8 },
                    }}
                  />
                </TableCell>
                <TableCell>{brand.product_count ?? 0}</TableCell>
                <TableCell>{brand.campaigns ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer pagination */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          Showing {brands.length} of {totalRecords} entries
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Select
            size="small"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <MenuItem key={n} value={n}>
                Show {n}
              </MenuItem>
            ))}
          </Select>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>
    </Paper>
    </div>
  );
};

export default BrandTable;
