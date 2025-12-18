import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  Stack,
  Divider,
  CircularProgress
} from "@mui/material";

import ReusableTable from "../../components/ReusableTable/ReusableTable";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { influencerApi } from "../../api/influencerApi"; // <-- import your API
import { usersApi } from "../../api/usersApi";

export default function InfluencerDashboard() {
  // Dummy Data
  const stats = [
    { title: "Total Commission", value: "$0" },
    { title: "Units Sold", value: "0" },
    { title: "Active Campaigns", value: "0" },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [assignedProducts, setAssignedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch assigned products from API
  useEffect(() => {
    const fetchAssignedProducts = async () => {
      try {
        const response = await usersApi.getProducts();
        if (response.data.status === "success") {
          setAssignedProducts(response.data.data);
        }
      } catch (error) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedProducts();
  }, []);

  const columns = [
    {
      id: "product",
      label: "Product",
      width: "35%",
      render: (value, row) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src={row.images?.[1] || row.images?.[0] || ""}
            variant="rounded"
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 180, // Adjust width as needed
            }}
            title={row.productTitle}
          >
            {row.productTitle}
          </Typography>
        </Box>
      ),
    },
    {
      id: "brand",
      label: "Brand",
      width: "15%",
      render: (value, row) => (
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }}
        >
          {row.brand}
        </Typography>
      ),
    },
    {
      id: "commission",
      label: "Commission",
      width: "10%",
      render: (value, row) => (
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }}
        >
          {row.commission ? `${row.commission}%` : "—"}
        </Typography>
      ),
    },
    {
      id: "unitsSold",
      label: "Units Sold",
      width: "15%",
      render: (value, row) => (
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }}
        >
          {row.unitsSold}
        </Typography>
      ),
    },
    {
      id: "totalEarned",
      label: "Total Earned",
      width: "18%",
      render: (value, row) => (
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }}
        >
          {row.totalEarned ? `$${row.totalEarned}` : "—"}
        </Typography>
      ),
    },
    {
      id: "status",
      label: "Status",
      width: "10%",
      render: (value, row) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <FiberManualRecordIcon
            sx={{
              fontSize: 10,
              color: row.status === "active" ? "green" : "grey",
            }}
          />
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: "12px",
            }}
            variant="body2"
            fontWeight="medium"
            color={row.status === "active" ? "green" : "grey"}
          >
            {row.status === "active" ? "Active" : "Paused"}
          </Typography>
        </Box>
      ),
    },
  ];

  // Pagination logic for API data
  const paginatedRows = assignedProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const payoutData = {
    nextPayout: "$0",
    schedule: "Weekly",
    lastPayment: "$0",
    method: "-",
  };

  const notifications = [
    {
      title: "New product launched: SmartBottle Pro.",
      launchtime: "Just now",
    },
    {
      title: "Commission adjusted for GymPro.",
      launchtime: "The day before",
    },
    {
      title: "A payout of $285.20 processed.",
      launchtime: "Five days ago",
    },
    {
      title: "A payout of $455.10 processed.",
      launchtime: "Five days ago",
    },
    {
      title: "A payout of $455.10 processed.",
      launchtime: "Five days ago",
    },
    {
      title: "A payout of $455.10 processed.",
      launchtime: "Five days ago",
    },
    {
      title: "A payout of $455.10 processed.",
      launchtime: "Five days ago",
    },
  ];
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
    <Box p={3} bgcolor="#f9f9f9" minHeight="100vh">
      <Grid container spacing={2}>
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={8}>
          {/* Top Stats */}
          <Grid container spacing={3} mb={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: "12px" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      // fontWeight: 600,
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "24px",
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Assigned Products Table */}
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              mb={2}
              sx={{
                fontFamily: "Poppins",
                fontSize: "16px",
              }}
            >
              Assigned Products
            </Typography>
            <ReusableTable
              sx={{
                fontFamily: "Poppins",
                fontSize: "12px",
              }}
              columns={columns}
              rows={paginatedRows}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={assignedProducts.length}
              onPageChange={(newPage) => setPage(newPage)}
              onRowClick={(row) => alert(`Clicked on ${row.productTitle}`)}
              showPagination
              loading={loading}
            />
          </Paper>

        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={4}>
          {/* <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: "12px" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              mb={2}
              sx={{ fontFamily: "Poppins" }}
            >
              Your Profile
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                src="/profile.jpg"
                alt="Profile"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ fontFamily: "Poppins" }}
                >
                  Hamza
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontFamily: "Poppins" }}
                >
                  Influencer
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                borderColor: "#E0E0E0",
                color: "#000",
                fontFamily: "Poppins",
              }}
            >
              Edit Profile
            </Button>
          </Paper> */}
          <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: "12px" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              mb={2}
              sx={{ fontFamily: "poppins", fontSize: "16px" }}
            >
              Payout Overview
            </Typography>

            {[
              {
                label: "Next Payout",
                value: payoutData.nextPayout,
                color: "green",
              },
              { label: "Payout Schedule", value: payoutData.schedule },
              { label: "Last Payment", value: payoutData.lastPayment },
              { label: "Payment Method", value: payoutData.method },
            ].map((item, index) => (
              <Grid
                container
                key={index}
                sx={{
                  mb: 1,
                  alignItems: "center",
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "poppins", fontSize: "14px" }}
                  >
                    {item.label}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={item.color || "inherit"}
                    textAlign="right"
                    sx={{ fontFamily: "poppins", fontSize: "12px" }}
                  >
                    {item.value}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Paper>


        </Grid>
      </Grid>
    </Box>
  );
}
