import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import StatementTableIcon from "../../assets/icons/statementtableicon.svg";

function StatementTable({
  title = "",
  columns = [],
  rows = [],
  onViewAll,
  showAll = false,
  rowsPerPage = 15,
  slogan= ""
}) {
  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const visibleData = showAll
    ? rows.slice(startIndex, startIndex + rowsPerPage)
    : rows.slice(0, 4);

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
         <Box display={"flex"} flexDirection={"column"}>
           <Typography
            sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: "700" }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: "400", color:"#65758B" }}
          >
            {slogan}
          </Typography>
         </Box>
          {!showAll && rows.length > 0 && (
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

        {/* Body */}
        <Box p={2}>
          {rows.length === 0 ? (
            <Box
              sx={{
                height: "200px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={StatementTableIcon} alt="empty" />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "19px",
                  fontWeight: "400",
                  color: "#2A2A2AB5",
                }}
              >
                No data available
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="reusable table">
                  <TableHead
                    sx={{
                      backgroundColor: "#F9FAFB",
                      border: "0.85px solid #E2E7EE",
                    }}
                  >
                    <TableRow>
                      {columns.map((col, idx) => (
                        <TableCell
                          key={idx}
                          align={col.align || "left"}
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "11px",
                            color: "#758395",
                            fontWeight: "700",
                          }}
                        >
                          {col.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visibleData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((col, colIndex) => (
                          <TableCell
                            key={colIndex}
                            align={col.align || "left"}
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              color: "#21232C",
                              fontWeight: col.bold ? "700" : "400",
                            }}
                          >
                            {col.render
                              ? col.render(row[col.field], row)
                              : row[col.field]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {showAll && (
                <Box display="flex" justifyContent="end" mt={2}>
                  <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
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
