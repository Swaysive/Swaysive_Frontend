import React, { useState, useEffect } from "react";
import {
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
  //   Checkbox,
  Paper,
  //   Chip,
  //   Avatar,
  TextField,
  Button,
  Box,
//   Typography,
//   Pagination,
//   Select,
//   MenuItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

const PaymentTable = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  return (
    <div className="row" style={{ marginTop: "50px" }}>
      <div className="col-12 mb-4">
        <DashboardHeader
          headerText="Payments"
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
            <Button
              variant="outlined"
              endIcon={<ArrowDropDownIcon />}
              sx={{ mr: 1, color: "#000", borderColor: "#000" }}
            >
              Actions
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#000", borderColor: "#000" }}
              endIcon={<FileDownloadIcon />}
            >
              Export
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PaymentTable;
