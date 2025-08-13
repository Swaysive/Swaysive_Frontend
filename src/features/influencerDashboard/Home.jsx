import { React, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import ReusableTable from "../../components/ReusableTable/ReusableTable";
import CampaignImpactChart from "../../components/Charts/CampaignImpactChart";

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
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={row.image}
            variant="rounded"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="body2" fontWeight={600}>
            {value}
          </Typography>
        </Box>
      ),
    },
    { id: "brand", label: "Brand", width: "15%" },
    { id: "influencer", label: "Influencer", width: "20%" },
    { id: "status", label: "Status", width: "10%" },
    { id: "price", label: "Price ($)", width: "8%" },
    { id: "stock", label: "Stock", width: "7%" },
  ];

  // Dummy rows
  const rows = [
    {
      id: 1,
      image: "https://via.placeholder.com/40x40?text=WF", // Wireless Fitness
      product: "Wireless Fitness Tracker Pro",
      brand: "GymPro",
      influencer: "John Thompson",
      status: "Active",
      price: 258.3,
      stock: 18,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/40x40?text=WB",
      product: "Smart Water Bottle with Temp Control",
      brand: "SmartBottle",
      influencer: "Sarah Lee",
      status: "Paused",
      price: 105.6,
      stock: 22,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/40x40?text=YM",
      product: "Premium Yoga Mat with Alignment Lines",
      brand: "YogaLife",
      influencer: "Emily Brown",
      status: "Active",
      price: 312.45,
      stock: 67,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/40x40?text=EB",
      product: "Bluetooth Earbuds Pro",
      brand: "SoundMax",
      influencer: "Mike Chen",
      status: "Inactive",
      price: 145.99,
      stock: 50,
    },
    {
      id: 5,
      image: "https://via.placeholder.com/40x40?text=DB",
      product: "Adjustable Dumbbell Set 40kg",
      brand: "FitStrong",
      influencer: "John Thompson",
      status: "Active",
      price: 499.99,
      stock: 12,
    },
    {
      id: 6,
      image: "https://via.placeholder.com/40x40?text=CH",
      product: "Ergonomic Office Chair",
      brand: "ComfyWork",
      influencer: "Sarah Lee",
      status: "Active",
      price: 249.99,
      stock: 30,
    },
  ];

  const payoutData = {
    nextPayout: "$320",
    schedule: "Weekly",
    lastPayment: "$285.20 on June 2025",
    method: "Bank Transfer (****1234)",
  };

  const notifications = [
    "New product launched: SmartBottle Pro.",
    "Commission adjusted for GymPro.",
    "A payout of $285.20 processed.",
    "A payout of $455.10 processed.",
  ];

  return (
    <Box p={3} bgcolor="#f9f9f9" minHeight="100vh">
      <Grid container spacing={3}>
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={8}>
          {/* Top Stats */}
          <Grid container spacing={3} mb={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper elevation={1} sx={{ p: 2 ,borderRadius:'12px'}}   >
                  <Typography variant="subtitle2">{stat.title}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Assigned Products Table */}
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Assigned Products
            </Typography>
            <ReusableTable
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

          {/* Performance Overview */}
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Performance Overview
            </Typography>
            {/* <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="180px"
              color="text.secondary"
              border="1px dashed #ddd"
              borderRadius={1}
            >
              <Typography variant="body2">Graph placeholder</Typography>
            </Box> */}


           <CampaignImpactChart
        title="Ad Campaign Performance – Last 4 Days"
        tabs={['Earnings', 'Units Sold', 'conversions']}
        // chartData={customChartData}
        lineColor="#FF5722" // Custom orange line
        height={250}        // Custom chart height
      />
          </Paper>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={4}>
          {/* Quick Actions */}
          <Paper elevation={1} sx={{ p: 2, mb: 3 , borderRadius:'12px'}}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2} >
              Quick Actions
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<VisibilityIcon />}
              sx={{ mb: 1, backgroundColor:'#F2F2F2', border:'none', color:'#2A2A2A'}}
            >
              View payment history
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DescriptionIcon />}
               sx={{ mb: 1, backgroundColor:'#F2F2F2' , border:'none', color:'#2A2A2A'}}
            >
              Download statement
            </Button>
          </Paper>

         <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: "12px" }}>
  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
    Payout Overview
  </Typography>

  {[
    { label: "Next Payout", value: payoutData.nextPayout, color: "green" },
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
        <Typography variant="body2">{item.label}</Typography>
      </Grid>

      {/* 30% Column - Value */}
      <Grid item xs={6}>
        <Typography
          variant="body2"
          fontWeight="bold"
          color={item.color || "inherit"}
          textAlign="right"
        >
          {item.value}
        </Typography>
      </Grid>
    </Grid>
  ))}
</Paper>


          {/* Recent Notifications */}
          <Paper elevation={1} sx={{ p: 2 ,borderRadius:'12px'}}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Recent Notifications
            </Typography>
            {notifications.map((note, idx) => (
              <Typography variant="body2" key={idx} mb={1}>
                {note}
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
