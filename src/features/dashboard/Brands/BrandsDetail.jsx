import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  ButtonGroup,
  Button,
} from "@mui/material";
import ProductTable from "../../../components/ReusableTable/ProductTable";
import CampaignImpactChart from "../../../components/Charts/CampaignImpactChart";

const BrandPage = () => {
  const tabs = ["conversions", "revenue", "clicks"];

  const columns = ["Products", "Brand", "Influencer", "Campaign Status"];

  const rows = [
    {
      id: 1,
      image: "/images/shaker1.png",
      name: "HELIMIX 1.5 Vortex Blender Shaker Bottle Holds Upto 20oz | No Blending Ball or Whisk | USA Made | Portable Pre Workout Whey Protein Drink Shaker Cup...",
      code: "B0045678",
      material: "Copolyester BPA and BPS Free Plastic",
      tags: ["11", "1 New"],
      brand: "Helimix",
      influencer: "John Thompson",
      status: "Active",
    },
    {
      id: 2,
      image: "/images/shaker2.png",
      name: "HELIMIX 2.0 Vortex Blender Shaker Bottle Holds upto 28oz | No Blending Ball or Whisk | USA Made | Portable Pre Workout...",
      code: "B078KCYLZF",
      material: "VOLTRIK",
      tags: ["15", "2 New"],
      brand: "Helimix",
      influencer: "John Thompson",
      status: "Active",
    },
    {
      id: 3,
      image: "/images/shaker3.png",
      name: "Ice Shaker Insulated Stainless Steel Shaker Bottle | 26oz, Bomber | Cold for 30+ Hours | Insulated Cup with Twist-on Agitator...",
      code: "B0CGQLPHSK",
      material: "Ice Shaker",
      tags: [],
      brand: "Helimix",
      influencer: "Jennifer",
      status: "Active",
    },
    {
      id: 4,
      image: "/images/shaker4.png",
      name: "HydroJug 24 oz New Stainless Steel Shaker – Insulated, Leakproof, BPA-Free with Silent Mixing Grate – No Clumps, No Noise...",
      code: "B0CF8LVNMD",
      material: "HydroJug",
      tags: [],
      brand: "Helimix",
      influencer: "Ray Gibbson",
      status: "Inactive",
    },
    {
      id: 5,
      image: "/images/shaker5.png",
      name: "Shaker Bottle – Protein Shaker Cup with Storage Compartments – Leak-proof Workout Shake Bottles with Mixer...",
      code: "B0CIFJGZ76",
      material: "XTKS",
      tags: [],
      brand: "Helimix",
      influencer: "Amelia",
      status: "Inactive",
    },
  ];

  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0]); // FIX: added this
  const rowsPerPage = 3;

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Section */}
      <Grid container spacing={2} alignItems="stretch">
        {/* Left: Brand Overview */}
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 2, borderRadius: "12px", height: "100%" }}>
            <Typography variant="h6" color="black" mb={2}>
              Brand Overview
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight={600}>Name</Typography>
              <Typography>Nike</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight={600}>Campaign</Typography>
              <Typography>45</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>Products</Typography>
              <Typography>5</Typography>
            </Box>
          </Paper>
        </Grid>
       
      </Grid>

      {/* Products Table */}
      <Paper sx={{ p: 2, borderRadius: "12px", border: "none", mt: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Products
        </Typography>
        <ProductTable
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={rows.length}
          onPageChange={setPage}
          onRowClick={(row) => console.log("Clicked row:", row)}
        />
      </Paper>
    </Box>
  );
};

export default BrandPage;
