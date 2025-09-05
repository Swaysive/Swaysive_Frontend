import { Box } from "@mui/material";
import React, { useState } from "react";
import { Typography, Button, Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StatementTableIcon from "../../assets/icons/statementtableicon.svg"

function StatementTable({ onViewAll, showAll = false }) {
 const DummyTableData = [
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Paid",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Paid",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Paid",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
    {
      date: "Aug 30 25",
      type: "Commission + Fee",
      product: "Helimix 2.0",
      units: 160,
      influencer: "John Smith",
      influencerpayoutpercentage: "10%",
      influencerpayoutdollars: "$415",
      platformfee: "$62.37",
      totaldollar: "$478.21",
      status: "Pending",
    },
  ];

  const rowsPerPage = 15;
  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const visibleData = showAll
    ? DummyTableData.slice(startIndex, startIndex + rowsPerPage)
    : DummyTableData.slice(0, 4);

  return (
    <Box>
      <Box mt={3} sx={{ border: "1px solid #E2E7EE", borderRadius: "6px" }}>
        <Box
          p={3}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: "700" }}
          >
            Statements Table
          </Typography>
          {!showAll && DummyTableData.length > 0 && (
            <Button
              variant="outlined"
              color="dark"
              onClick={onViewAll}
              sx={{
                border: "1px solid #DFE2E7",
                fontFamily: "Poppins",
                textTransform: "none",
                backgroundColor: "#D4D4D46E",
              }}
            >
              View All
            </Button>
          )}
        </Box>

        <Box p={2}>
          {DummyTableData.length === 0 ? (
            <Box
              sx={{
                height: "200px",
                display: "flex",
                flexDirection:"column",
                gap:1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                <img src={StatementTableIcon} alt="" />
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "19px",
                  fontWeight: "400",
                  color: "#2A2A2AB5",
                }}
              >
                No statements table yet
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead
                    sx={{
                      backgroundColor: "#F9FAFB",
                      border: "0.85px solid #E2E7EE",
                      borderRadius: "8px",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Product
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Units
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Influencer
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Influencer Payout %
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Influencer Payout $
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Platform Fee $
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Total $
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          color: "#758395",
                          fontWeight: "700",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visibleData.map((row, index) => (
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
                          {row.type}
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
                          {row.product}
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
                          {row.units}
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
                          {row.influencer}
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
                          {row.influencerpayoutpercentage}
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
                          {row.influencerpayoutdollars}
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
                          {row.platformfee}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            color: "#21232C",
                            fontWeight: "700",
                          }}
                        >
                          {row.totaldollar}
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
                                row.status === "Paid" ? "#16A249" : "#AE7700",
                            }}
                          >
                            {row.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {showAll && (
                <Box display="flex" justifyContent="end" mt={2}>
                  <Pagination
                    count={Math.ceil(DummyTableData.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#000000",
                      },
                      "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#000000",
                        color: "#ffffff",
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default StatementTable;
