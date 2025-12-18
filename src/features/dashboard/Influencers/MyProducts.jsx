
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField, // Keep TextField for the search input
  Button, // Keep Button as it's used in columns
  Avatar,
  CircularProgress
} from "@mui/material";
import ProteinShaker from "../../../assets/icons/proteinshaker.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Keep ContentCopyIcon as it's used in columns
import ReusableTable from "../../../components/ReusableTable/ReusableTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { influencerApi } from "../../../api/influencerApi"; // <-- import your API
import { usersApi } from "../../../api/usersApi";

const MyProductsPage = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [filterAll, setFilterAll] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest Assigned");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await usersApi.getProducts();
        if (response.data.status === "success") {
          setProducts(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Successfully Copied", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("Unable to copy link. Please try again or copy manually", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const columns = [
    {
      id: "product",
      label: "Product",
      width: "30%",
      render: (value, row) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src={row.images?.[1] || row.images?.[0] || ProteinShaker}
            alt={row.productTitle}
            variant="rounded"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="body2" fontWeight={600}>
            {row.productTitle}
          </Typography>
        </Box>
      ),
    },
    {
      id: "brand",
      label: "Brand",
      width: "15%",
      render: (value, row) => <Typography>{row.brand}</Typography>,
    },
    {
      id: "commission",
      label: "Commission",
      width: "10%",
      render: (value, row) => <Typography>{row.commission}%</Typography>,
    },
    {
      id: "unitsSold",
      label: "Units Sold",
      width: "10%",
      render: (value, row) => <Typography>{row.unitsSold}</Typography>,
    },
    {
      id: "totalEarned",
      label: "Total Earned",
      width: "10%",
      render: (value, row) => <Typography>${row.totalEarned}</Typography>,
    },
    {
      id: "status",
      label: "Status",
      width: "10%",
      render: (value, row) => {
        const colorMap = {
          active: "green",
          paused: "#999",
          ended: "red",
        };
        const statusLabel =
          row.status === "active"
            ? "Active"
            : row.status === "paused"
            ? "Paused"
            : row.status === "ended"
            ? "Ended"
            : row.status;
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: colorMap[row.status?.toLowerCase()] || "#ccc",
              }}
            />
            <Typography
              sx={{
                color: colorMap[row.status?.toLowerCase()] || "#000",
                fontWeight: 500,
              }}
            >
              {statusLabel}
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
            handleCopyLink(row.affiliateLink);
          }}
          disabled={!row.affiliateLink} // Disable if affiliateLink is null or empty
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

  // Filtering and sorting can be applied here if needed
  const filteredProducts =
    filterAll === "All"
      ? products
      : products.filter(
          (p) => p.status?.toLowerCase() === filterAll.toLowerCase()
        );

  // Sorting logic (example for units sold and earnings)
  let sortedProducts = [...filteredProducts];
  if (sortOrder === "Units Sold (High to Low)") {
    sortedProducts.sort((a, b) => b.unitsSold - a.unitsSold);
  } else if (sortOrder === "Units Sold (Low to High)") {
    sortedProducts.sort((a, b) => a.unitsSold - b.unitsSold);
  } else if (sortOrder === "Earnings High to Low") {
    sortedProducts.sort((a, b) => b.totalEarned - a.totalEarned);
  } else if (sortOrder === "Earnings Low to High") {
    sortedProducts.sort((a, b) => a.totalEarned - b.totalEarned);
  }

  const paginatedRows = sortedProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
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
    <Box p={3}>
      <ToastContainer />
      <Box
        sx={{
          background: "linear-gradient(180deg, #FCFCFC 0%, #F0F7FF 100%)",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          My Products
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" mb={3}>
          Campaigns assigned by Helimix
        </Typography> */}
      </Box>

      {/* Search & Filters */}
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" m={2}>
        <TextField
          placeholder="Search product..."
          size="small"
          sx={{ flex: 1, minWidth: 250 }}
        />
      </Box>

      {/* Table */}
      {columns.length > 0 ? (
        <ReusableTable
          columns={columns}
          rows={paginatedRows}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={sortedProducts.length}
          onPageChange={(newPage) => setPage(newPage)}
          loading={loading}
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
