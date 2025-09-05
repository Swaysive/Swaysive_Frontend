import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { LuDownload } from "react-icons/lu";
import ReportsIcon from "../../assets/icons/reportsicon.svg"

function Reports({ onViewAll, showAll = false }) {
  const ReportsDummyData = [
    {
      title: "Aug 30 25 - Influencer Payout + Fee Statement",
      amount: "$1315.10",
    },
    {
      title: "Aug 30 25 - Influencer Payout + Fee Statement",
      amount: "$1315.10",
    },
    {
      title: "Aug 30 25 - Influencer Payout + Fee Statement",
      amount: "$1315.10",
    },
    {
      title: "Aug 30 25 - Influencer Payout + Fee Statement",
      amount: "$1315.10",
    },
  ];

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
            Reports
          </Typography>
          {!showAll && ReportsDummyData.length > 0 && (
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

        <Box
          sx={{
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            px: 2,
            gap: 2,
            pb: 2,
          }}
        >
          {ReportsDummyData.length === 0 ? (
            // No data case
            <Box
              sx={{
                height: "150px",
                width: "100%",
                display: "flex",
                flexDirection:"column",
                gap:1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                <img src={ReportsIcon} alt="" />
              </Typography>
              <Typography
                sx={{
                 fontFamily: "Poppins",
                  fontSize: "19px",
                  fontWeight: "400",
                  color: "#2A2A2AB5",
                }}
              >
                No invoices & Receipts
              </Typography>
            </Box>
          ) : (
            ReportsDummyData.map((report, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#F9FAFBA3",
                  width: "100%",
                  height: "53px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "8px",
                  border: "1px solid #E2E7EE",
                  px: 3,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "13px",
                      fontWeight: "400",
                      color: "#758395",
                    }}
                  >
                    {report.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {report.amount}
                  </Typography>
                </Box>

                <Button
                  startIcon={<LuDownload />}
                  variant="outlined"
                  color="dark"
                  sx={{
                    border: "1px solid #DFE2E7",
                    fontFamily: "Poppins",
                    textTransform: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Download PDF
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Reports;
