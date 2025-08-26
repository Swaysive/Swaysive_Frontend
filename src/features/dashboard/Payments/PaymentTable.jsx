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
import CurrentPlan from "../../../components/Current Plan/CurrentPlan";

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
      <CurrentPlan/>
    </div>
  );
};

export default PaymentTable;
