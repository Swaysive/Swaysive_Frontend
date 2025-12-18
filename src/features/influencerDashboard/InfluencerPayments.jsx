import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import { LuPlus, LuDownload } from "react-icons/lu";
import { GoClock, GoCreditCard } from "react-icons/go";
import { HiArrowTrendingUp, HiOutlineCurrencyDollar } from "react-icons/hi2";
import PayoutHistory from "../../assets/icons/payouthistory.svg";
import { IoSearch, IoChevronDown } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function InfluencerPayments() {
  const [status, setStatus] = useState("All Status");

  const Cardstats = [
    {
      title: "Next Payout",
      value: "$00.00",
      icon: <GoClock size={20} />,
      slogan: "on Aug 15, 2025",
      color: "#3C83F6",
    },
    {
      title: "Total Paid",
      value: "$00.00",
      icon: <HiArrowTrendingUp size={20} />,
      slogan: "Lifetime earnings from Helimix",
      color: "#16A249",
    },
    {
      title: "Pending Payouts",
      value: "$00.00",
      icon: <HiOutlineCurrencyDollar size={20} />,
      slogan: "Total amount awaiting processing",
      color: "#F59F0A",
    },
  ];

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      fontFamily: "Poppins",
      fontSize: "13px",
      "& fieldset": { borderColor: "#E0E0E0" },
      "&:hover fieldset": { borderColor: "#E0E0E0" },
      "&.Mui-focused fieldset": { borderColor: "#E0E0E0" },
    },
  };

  const DummyData = [
    {
      title: "PayPal (john@example.com)",
      cardstatus: "Default",
      status: "Verified",
    },
    {
      title: "Bank Transfer (****1234)",
      // cardstatus: "Default",
      status: "Verified",
    },
  ];
  const DummyTableData = [
    {
      date: "July 30,2025",
      amount: "$159",
      status: "Paid",
      method: "PayPal",
      transactionid: "#OP01012487",
      icon: <FiEye />,
    },
    {
      date: "July 30,2025",
      amount: "$159",
      status: "Pending",
      method: "PayPal",
      transactionid: "#OP01012487",
      icon: <FiEye />,
    },
    {
      date: "July 30,2025",
      amount: "$159",
      status: "Failed",
      method: "PayPal",
      transactionid: "#OP01012487",
      icon: <FiEye />,
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(180deg, #FCFCFC 0%, #F0F7FF 100%)",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ fontFamily: "Poppins", fontSize: "28px" }}
        >
          My Payments 
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          sx={{ fontFamily: "Poppins", fontSize: "14px" }}
        >
          {/* Manage your payout methods and view your earnings from Helimix. */}
        </Typography>

        {/* Buttons */}
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<LuPlus />}
            sx={{
              backgroundColor: "#2A2A2A",
              fontFamily: "Poppins",
              fontSize: "12px",
              borderRadius: "6px",
            }}
          >
            Add Payment Method
          </Button>
      </Box>

      {/* Cards Section */}
      <Box display="flex" gap={2} mt={2}>
        {Cardstats.map((card, index) => (
          <Box
            key={index}
            p={2}
            sx={{
              flex: 1,
              borderRadius: 2,
              border: "1px solid #E0E0E0",
              backgroundColor: "#fff",
              boxShadow: "0px 0.88px 1.77px rgba(0,0,0,0.05)",
              borderLeft: `6px solid ${card.color}`,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                fontWeight={400}
                sx={{ fontFamily: "Poppins", fontSize: "11px" }}
              >
                {card.title}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center">
                {card.icon}
              </Box>
            </Box>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontFamily: "Poppins", fontSize: "20px", mt: 0.5 }}
            >
              {card.value}
            </Typography>
            {card.slogan && (
              <Typography
                variant="caption"
                sx={{ fontFamily: "Poppins", fontSize: "10px" }}
              >
                {card.slogan}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      <Box p={3} sx={{ border: "1px solid #E0E0E0", mt: 4, borderRadius: 2 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ fontFamily: "Poppins", fontSize: "18px" }}
        >
          Payment Methods
        </Typography>
        <Typography
          variant="caption"
          fontWeight={400}
          sx={{
            fontFamily: "Poppins",
            fontSize: "12px",
            color: "#686E7D",
          }}
        >
          Manage how you receive your payouts from Helimix
        </Typography>
        {DummyData.length === 0 ? (
          <Box
            py={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center">
              <Typography>
                <GoCreditCard size={30} color="#0000008F" />
              </Typography>
              <Typography
                pt={1}
                fontWeight={500}
                sx={{
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  color: "#2A2A2AB5",
                }}
              >
                No payment method added yet.
              </Typography>
              <Typography
                pb={2}
                fontWeight={400}
                sx={{
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "10px",
                  color: "#2A2A2AB5",
                }}
              >
                Lorem Ipsum dummy text for this line
              </Typography>
              <Button
                variant="contained"
                startIcon={<LuPlus />}
                sx={{
                  backgroundColor: "#EEEEEE",
                  color: "#151A22E3",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                }}
              >
                Add a payment method.
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {DummyData.map((carddetails, index) => (
              <Box
                key={index}
                mt={2}
                p={2}
                border="1px solid #E0E0E0"
                borderRadius={2}
                display="flex"
                justifyContent="space-between"
                alignItems={"center"}
              >
                <Box display="flex" gap={1} alignItems="center">
                  <Typography>
                    <GoCreditCard />
                  </Typography>
                  <Box>
                    <Typography
                      display="flex"
                      gap={1}
                      alignItems="center"
                      fontWeight={400}
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        color: "#21232C",
                      }}
                    >
                      {carddetails.title}
                      {carddetails.cardstatus && (
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          sx={{
                            mt: 0.5,
                            fontFamily: "Poppins",
                            fontSize: "9px",
                            backgroundColor: "#F2F4F8",
                            color: "black",
                            px: 1.5,
                            py: 0.4,
                            textAlign: "center",
                            borderRadius: "999px",
                            display: "inline-block",
                            width: "fit-content",
                          }}
                        >
                          {carddetails.cardstatus}
                        </Typography>
                      )}
                    </Typography>
                    <Typography
                      fontWeight={700}
                      sx={{
                        mt: 0.5,
                        fontFamily: "Poppins",
                        fontSize: "9px",
                        backgroundColor: "#16A249",
                        color: "#fff",
                        px: 1.5,
                        py: 0.4,
                        textAlign: "center",
                        borderRadius: "999px",
                        display: "inline-block",
                        width: "fit-content",
                      }}
                    >
                      {carddetails.status}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  gap={5}
                  justifyContent="center"
                  alignContent="center"
                  textAlign="center"
                >
                  {!carddetails.cardstatus && (
                    <Box>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#F8F7FC",
                          color: "black",
                          fontFamily: "Poppins",
                          fontSize: "12px",
                        }}
                      >
                        Set Default
                      </Button>
                    </Box>
                  )}
                  <Box sx={{ cursor: "pointer" }}>
                    <HiOutlineDotsHorizontal size={20} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box p={3} sx={{ border: "1px solid #E0E0E0", mt: 3, borderRadius: 2 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ fontFamily: "Poppins", fontSize: "18px" }}
        >
          Payout History
        </Typography>
        <Typography
          variant="caption"
          fontWeight={400}
          sx={{
            fontFamily: "Poppins",
            fontSize: "12px",
            color: "#686E7D",
          }}
        >
          View and manage your payout history from Helimix
        </Typography>

        {/* Filters */}
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" m={2}>
          <TextField
            placeholder="Search by ID or amount..."
            size="small"
            sx={{
              flex: 1,
              minWidth: 250,
              fontFamily: "Poppins",
              ...textFieldStyles,
              fontSize: "13px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearch size={20} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              minWidth: 220,
              fontFamily: "Poppins",
              fontSize: "13px",
              ...textFieldStyles,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IoChevronDown size={20} />
                </InputAdornment>
              ),
            }}
            SelectProps={{
              renderValue: (selected) => selected,
              IconComponent: () => null,
              MenuProps: {
                PaperProps: {
                  sx: { backgroundColor: "#fff" },
                },
              },
            }}
          >
            <MenuItem
              value="All Status"
              sx={{ fontFamily: "Poppins", fontSize: "13px" }}
            >
              <ListItemText primary="All Status" />
            </MenuItem>

            <MenuItem value="Paid">
              <Checkbox checked={status === "Paid"} size="small" />
              <ListItemText primary="Paid" />
            </MenuItem>

            <MenuItem value="Pending">
              <Checkbox checked={status === "Pending"} size="small" />
              <ListItemText primary="Pending" />
            </MenuItem>

            <MenuItem value="Failed">
              <Checkbox checked={status === "Failed"} size="small" />
              <ListItemText primary="Failed" />
            </MenuItem>
          </TextField>
          <TextField
            size="small"
            value="Export CSV"
            sx={{
              width: 140,
              "& .MuiInputBase-root": {
                cursor: "pointer",
              },
              "& input": {
                cursor: "pointer",
              },
              fontFamily: "Poppins",
              fontSize: "13px",
              ...textFieldStyles,
            }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <LuDownload size={20} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            value="View All"
            sx={{
              width: 120,
              "& .MuiInputBase-root": {
                cursor: "pointer",
              },
              "& input": {
                cursor: "pointer",
              },
              fontFamily: "Poppins",
              fontSize: "13px",
              ...textFieldStyles,
            }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <FiEye size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {DummyTableData.length > 0 ? (
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        color: "#686E7D",
                        fontWeight: "400",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        color: "#686E7D",
                        fontWeight: "400",
                      }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        color: "#686E7D",
                        fontWeight: "400",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        color: "#686E7D",
                        fontWeight: "400",
                      }}
                    >
                      Method
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        color: "#686E7D",
                        fontWeight: "400",
                      }}
                    >
                      Transaction ID
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        color: "#686E7D",
                        fontWeight: "400",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DummyTableData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          color: "#21232C",
                          fontWeight: "400",
                        }}
                      >
                        {row.date}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          color: "#21232C",
                          fontWeight: "400",
                        }}
                      >
                        {row.amount}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          color: "#21232C",
                          fontWeight: "400",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            px: 1.5,
                            py: 0.4,
                            borderRadius: "999px",
                            fontFamily: "Poppins",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#fff",
                            backgroundColor:
                              row.status === "Paid"
                                ? "#16A249"
                                : row.status === "Failed"
                                ? "#E53935"
                                : "#F59F0A",
                          }}
                        >
                          {row.status}
                        </Box>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          color: "#21232C",
                          fontWeight: "400",
                        }}
                      >
                        {row.method}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          color: "#21232C",
                          fontWeight: "400",
                        }}
                      >
                        {row.transactionid}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          color: "#21232C",
                          fontWeight: "400",
                        }}
                      >
                        {row.icon}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box
            py={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center">
              <Typography>
                <img src={PayoutHistory} alt="payout-history" />
              </Typography>
              <Typography
                pt={1}
                fontWeight={500}
                sx={{
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  color: "#2A2A2AB5",
                }}
              >
                No payout history yet.
              </Typography>
              <Typography
                pb={2}
                fontWeight={400}
                sx={{
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "10px",
                  color: "#2A2A2AB5",
                }}
              >
                Lorem Ipsum dummy text for this line
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
    </Box>
  );
}

export default InfluencerPayments;
