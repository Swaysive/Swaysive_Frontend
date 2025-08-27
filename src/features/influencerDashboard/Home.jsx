import { React, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import ReusableTable from "../../components/ReusableTable/ReusableTable";
import SmartWatch from "../../assets/images/fitnesstracker.png";
import SmartWaterBottle from "../../assets/images/smartwaterbottle.png";
import YogaMat from "../../assets/images/yogamat.png";
import EarBudsPro from "../../assets/images/earbudspro.png";
import OfficeChair from "../../assets/images/officechair.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InfluencerImpactChart from "../influencerDashboard/InfluencerImpactChart";
import { Link } from "react-router-dom";

export default function InfluencerDashboard() {
  // Dummy Data
  const stats = [
    { title: "Total Commission", value: "$1,280.5" },
    { title: "Units Sold", value: "192" },
    { title: "Active Campaigns", value: "5" },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const columns = [
  {
    id: "product",
    label: "Product",
    width: "35%",
    render: (value, row) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          src={row.image}
          variant="rounded"
          sx={{ width: 40, height: 40 }}
        />
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "12px",
          }}
        >
          {value}
        </Typography>
      </Box>
    ),
  },
  {
    id: "brand",
    label: "Brand",
    width: "15%",
    render: (value) => (
      <Typography
        sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }}
      >
        {value}
      </Typography>
    ),
  },
  {
    id: "commission",
    label: "Commission",
    width: "10%",
    render: (value) => (
      <Typography
        sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }}
      >
        {value}
      </Typography>
    ),
  },
  {
    id: "unitssold",
    label: "Units Sold",
    width: "15%",
    render: (value) => (
      <Typography
        sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }}
      >
        {value}
      </Typography>
    ),
  },
  { id: "totalearned", label: "Total Earned", width: "18%",
    render: (value) => (
      <Typography
        sx={{ fontFamily: "Poppins", fontSize: "12px", color: "#6B7280EB" }} 
      >
        {value}
      </Typography>
    ),
  },
  {
    id: "status",
    label: "Status",
    width: "10%",
    render: (value) => (
      <Box display="flex" alignItems="center" gap={0.5}>
        <FiberManualRecordIcon
          sx={{
            fontSize: 10,
            color: value === "Active" ? "green" : "grey",
          }}
        />
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: "12px",
          }}
          variant="body2"
          fontWeight="medium"
          color={value === "Active" ? "green" : "grey"}
        >
          {value}
        </Typography>
      </Box>
    ),
  },
];


  // Dummy rows
  const rows = [
    {
      id: 1,
      image: SmartWatch, // Wireless Fitness
      product: "Wireless Fitness Tracker Pro",
      brand: "GymPro",
      commission: "15%",
      unitssold: "18",
      totalearned: "$258.30",
      status: "Active",
      
    },
    {
      id: 2,
      image: SmartWaterBottle,
      product: "Smart Water Bottle with Temp Control",
      brand: "SmartBottle",
      commission: "12%",
      unitssold: "22",
      totalearned: "$105.60",
      status: "Paused",
    },
    {
      id: 3,
      image: YogaMat,
      product: "Premium Yoga Mat with Alignment Lines",
      brand: "YogaLife",
      commission: "18%",
      unitssold: "67",
      totalearned: "$312.30",
      status: "Active",
    },
    {
      id: 4,
      image: EarBudsPro,
      product: "Bluetooth Earbuds Pro",
      brand: "SoundMax",
      commission: "18%",
      unitssold: "67",
      totalearned: "$312.30",
      status: "Active",
    },
    {
      id: 5,
      image: OfficeChair,
      product: "Adjustable Dumbbell Set 40kg",
      brand: "FitStrong",
      commission: "15%",
      unitssold: "18",
      totalearned: "$260.30",
      status: "Paused",
    },
    {
      id: 6,
      image: OfficeChair,
      product: "Ergonomic Office Chair",
      brand: "ComfyWork",
      commission: "18%",
      unitssold: "18",
      totalearned: "$258.30",
      status: "Active",
    },
  ];

  const payoutData = {
    nextPayout: "$320",
    schedule: "Weekly",
    lastPayment: "$285.20 on June 2025",
    method: "Bank Transfer (****1234)",
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
                  <Typography variant="h5" fontWeight="bold" sx={{
                      fontFamily: "Poppins",
                      fontSize: "24px",
                    }}>
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Assigned Products Table */}
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2} sx={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                    }}>
              Assigned Products
            </Typography>
            <ReusableTable
            sx={{
                      fontFamily: "Poppins",
                      fontSize: "12px",
                    }}
              columns={columns}
              rows={rows}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={rows.length}
              onPageChange={(newPage) => setPage(newPage)}
              onRowClick={(row) => alert(`Clicked on ${row.product}`)}
              showPagination
            />
          </Paper>

          <Paper elevation={1} sx={{ p: 2 }}>
            <InfluencerImpactChart />
          </Paper>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={4}>
          {/* Quick Actions */}
          <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: "12px" }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2} sx={{fontFamily: "poppins", fontSize: "16px"}}>
              Quick Actions
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<VisibilityIcon />}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                backgroundColor: "#F2F2F2",
                border: "none",
                color: "#2A2A2A",
                fontFamily: "poppins", fontSize: "12px"
              }}
            >
              View all payment history
            </Button>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<DescriptionIcon />}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                backgroundColor: "#F2F2F2",
                border: "none",
                color: "#2A2A2A",
                fontFamily: "poppins", fontSize: "12px"
              }}
            >
              Download statement
            </Button>
          </Paper>

          <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: "12px" }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2} sx={{fontFamily: "poppins", fontSize: "16px"}} >
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
                {/* 70% Column - Label */}
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{fontFamily: "poppins", fontSize: "14px"}}>{item.label}</Typography>
                </Grid>

                {/* 30% Column - Value */}
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={item.color || "inherit"}
                    textAlign="right"
                    sx={{fontFamily: "poppins", fontSize: "12px"}}

                  >
                    {item.value}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Paper>

          {/* Recent Notifications */}
          <Paper elevation={1} sx={{ pb: 2, borderRadius: "12px" }}>
            <Typography p={2} variant="subtitle1" fontWeight="500"  sx={{fontFamily: "poppins", fontSize: "16px"}}>
              Recent Notifications
            </Typography>
            {notifications.map((note, idx) => (
              <Box key={idx} mb={1}>
                <Box px={2} display="flex" flexDirection="column">
                  <Typography variant="body2" fontWeight="400"  sx={{fontFamily: "poppins", fontSize: "14px"}}>
                    {note.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary"  sx={{fontFamily: "poppins", fontSize: "8px"}}>
                    {note.launchtime}
                  </Typography>
                </Box>

                {/* Divider between items, except after the last one */}
                {idx < notifications.length && (
                  <Divider
                    sx={{
                      my: 1,
                      borderBottomWidth: 2,
                      width: "100%",
                    }}
                  />
                )}
              </Box>
            ))}
            <Typography variant="body2" fontWeight="bold" px={2} py={1}>
              <Link href="" underline="none" sx={{ color: "black", fontFamily: "poppins", fontSize: "12px" }}>
                View All Notifications
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
