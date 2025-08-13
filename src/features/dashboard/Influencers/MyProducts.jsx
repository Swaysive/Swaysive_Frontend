import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Avatar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReusableTable from "../../../components/ReusableTable/ReusableTable";

const MyProductsPage = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [filterAll, setFilterAll] = useState("Active");
  const [sortOrder, setSortOrder] = useState("Newest Assigned");

//   const columns = [];

    const columns = [
      {
        id: "product",
        label: "Product",
        width: "30%",
        render: (value, row) => (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              src={row.image}
              alt={row.product}
              variant="rounded"
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="body2" fontWeight={600}>
              {row.product}
            </Typography>
          </Box>
        ),
      },
      { id: "brand", label: "Brand", width: "15%" },
      {
        id: "commission",
        label: "Commission",
        width: "10%",
        render: (value) => <Typography>{value}%</Typography>,
      },
      { id: "unitsSold", label: "Units Sold", width: "10%" },
      {
        id: "totalEarned",
        label: "Total Earned",
        width: "10%",
        render: (value) => <Typography>${value}</Typography>,
      },
      {
        id: "status",
        label: "Status",
        width: "10%",
        render: (value) => {
          const colorMap = {
            Active: "green",
            Paused: "#999",
            Ended: "red",
          };
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: colorMap[value] || "#ccc",
                }}
              />
              <Typography
                sx={{
                  color: colorMap[value] || "#000",
                  fontWeight: 500,
                }}
              >
                {value}
              </Typography>
            </Box>
          );
        },
      },
      {
        id: "actions",
        label: "Actions",
        width: "15%",
        render: (value, row) => (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(row.url);
            }}
            style={{
              color: "#344256",
              border: "#E1E7EF 1px solid",
              fontSize: "10px",
            }}
          >
            Copy Link
          </Button>
        ),
      },
    ];

  const rows = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    product: "Premium Protein Shaker",
    brand: "Helimix",
    commission: 15,
    unitsSold: 256,
    totalEarned: "856.32",
    status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Paused" : "Ended",
    image: "https://via.placeholder.com/40x40.png?text=Img", // replace with actual
    url: "https://example.com/product-link",
  }));

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h5" fontWeight={600}>
        My Products – Helimix
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Campaigns assigned by Helimix
      </Typography>

      {/* Search & Filters */}
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" mb={2}>
        <TextField
          placeholder="Search products or brands in Helimix..."
          size="small"
          sx={{ flex: 1, minWidth: 250 }}
        />
        <TextField
          select
          size="small"
          value={filterAll}
          onChange={(e) => setFilterAll(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Paused">Paused</MenuItem>
          <MenuItem value="Ended">Ended</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="Newest Assigned">Newest Assigned</MenuItem>
          <MenuItem value="Oldest Assigned">Oldest Assigned</MenuItem>
        </TextField>
      </Box>

      {/* Table */}
      {columns.length > 0 ? (
        <ReusableTable
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={rows.length}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Typography variant="body1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MyProductsPage;
