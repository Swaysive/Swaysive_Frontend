import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Checkbox,
  Chip,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";

const statusColors = {
  Active: "success",
  Inactive: "default",
};

const ProductTable = ({rows,columns}) => {
  

  return (
    <Paper sx={{ borderRadius: "12px", p: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Products</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Influencer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Campaign Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>

                {/* Product column */}
                <TableCell>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <Avatar
                      src={row.image}
                      variant="square"
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          maxWidth: 400,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {row.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.code} • {row.material}
                      </Typography>
                      <Box display="flex" gap={1} mt={0.5}>
                        {row.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{ fontSize: "0.7rem", height: 20 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.influencer}</TableCell>

                {/* Campaign Status */}
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    color={statusColors[row.status]}
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      "& .MuiChip-icon": { fontSize: 8 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer pagination */}
      {/* <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body2" color="text.secondary">
          Showing 6 of 50 entries
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Select size="small" defaultValue={10}>
            {[10, 20, 30].map((n) => (
              <MenuItem key={n} value={n}>
                Show {n}
              </MenuItem>
            ))}
          </Select>
          <Pagination count={99} variant="outlined" shape="rounded" />
        </Box>
      </Box> */}
    </Paper>
  );
};

export default ProductTable;
