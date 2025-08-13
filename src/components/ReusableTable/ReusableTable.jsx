import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Pagination,
} from "@mui/material";

const ReusableTable = ({
  columns,
  rows,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowClick,
  showPagination = true,
}) => {
  const startIndex = (page - 1) * rowsPerPage;
  const displayedRows = rows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          {/* Table Header */}
          <TableHead sx={{ backgroundColor: "#F0F0F2" }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{ fontWeight: 600, width: col.width || "auto",padding:'8px' }}
                  //  style={{padding:'8px'}}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {displayedRows.length > 0 ? (
              displayedRows.map((row, rowIndex) => (
                <TableRow
                  hover
                  key={row.id || rowIndex}
                  sx={{ cursor: onRowClick ? "pointer" : "default",padding:'8px' }}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.id}   sx={{padding:'8px' }} >
                      {col.render
                        ? col.render(row[col.id], row) // Use custom render if provided
                        : row[col.id] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box display="flex" justifyContent="center" py={3}>
                    <Typography variant="body2" color="text.secondary">
                      No data available
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {showPagination && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination
            count={Math.ceil(totalCount / rowsPerPage)}
            page={page}
            onChange={(e, newPage) => onPageChange(newPage)}
            shape="rounded"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ReusableTable;
