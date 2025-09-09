import { Box, Typography, Button } from "@mui/material";
import React from "react";
import StatementTable from "./StatementTable";
import Reports from "./Reports";

function StatementandHistory({
  viewFullTable,
  setViewFullTable,
  viewFullReport,
  setViewFullReport,
}) {
  const StatementsDummyData = [
    { title: "Units Sold (Attributed)", numbers: "2,346" },
    { title: "Influencer Payout", numbers: "$6,489.47" },
    { title: "Total Platform Fees (1.5%)", numbers: "$814.47" },
    { title: "Total Paid This Period", numbers: "$7,346.17" },
  ];
  const EmptyStateData = [
    { title: "Units Sold (Attributed)", numbers: "00" },
    { title: "Influencer Payout", numbers: "$00.00" },
    { title: "Total Platform Fees (1.5%)", numbers: "$00.00" },
    { title: "Total Paid This Period", numbers: "$00.00" },
  ];
  const columns = [
    { label: "Date", field: "date" },
    { label: "Type", field: "type", align: "center" },
    { label: "Product", field: "product", align: "center" },
    { label: "Units", field: "units", align: "center" },
    { label: "Influencer", field: "influencer", align: "center" },
    { label: "Influencer Payout %", field: "influencerpayoutpercentage", align: "center" },
    { label: "Influencer Payout ($)", field: "influencerpayoutdollars", align: "center" },
    { label: "Platform Fee", field: "platformfee", align: "center" },
    { label: "Total ($)", field: "totaldollar", align: "center" },
    {
      label: "Status",
      field: "status",
      align: "center",
      render: (value) => (
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
            backgroundColor: value === "Paid" ? "#16A249" : "#AE7700",
          }}
        >
          {value}
        </Box>
      ),
    },
  ];

  const rows = [
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

if (viewFullTable) {
  return (
    <Box p={1}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          color="dark"
          onClick={() => setViewFullTable(false)}
          sx={{
            border: "1px solid #DFE2E7",
            fontFamily: "Poppins",
            textTransform: "none",
            backgroundColor: "#D4D4D46E",
          }}
        >
          Go Back
        </Button>
      </Box>

      {/* ✅ Now passing data */}
      <StatementTable
        title="Statements Table"
        columns={columns}
        rows={rows}
        showAll={true}
        onViewAll={() => {}}
      />
    </Box>
  );
}

  if (viewFullReport) {
    return (
      <Box p={1}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="outlined"
            color="dark"
            onClick={() => setViewFullReport(false)}
            sx={{
              border: "1px solid #DFE2E7",
              fontFamily: "Poppins",
              textTransform: "none",
              backgroundColor: "#D4D4D46E",
            }}
          >
            Go Back
          </Button>
        </Box>
        <Reports showAll={true} onViewAll={() => {}} />
      </Box>
    );
  }
  return (
    <div>
      <Box pb={5}>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          gap={3}
          flexWrap="wrap"
        >
          {StatementsDummyData && StatementsDummyData.length > 0
            ? StatementsDummyData.map((data, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 265,
                    height: 140,
                    border: "1px solid #E2E7EE",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    px: 4,
                    gap: 1,
                    boxShadow: "0px 1.22px 2.45px 0px #0000000D",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#171A1E",
                    }}
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "#424242",
                    }}
                  >
                    {data.numbers}
                  </Typography>
                </Box>
              ))
            : EmptyStateData.map((data, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 265,
                    height: 140,
                    border: "1px solid #E2E7EE",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    px: 4,
                    gap: 1,
                    boxShadow: "0px 1.22px 2.45px 0px #0000000D",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#171A1E",
                    }}
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "#424242",
                    }}
                  >
                    {data.numbers}
                  </Typography>
                </Box>
              ))}
        </Box>

        {/* Table */}
        <Box mt={4}>
          <StatementTable
            title="Statements Table"
            columns={columns}
            rows={rows}
            onViewAll={() => setViewFullTable(true)}
          />
        </Box>

        {/* Reports */}
        <Box mt={4}>
          <Reports onViewAll={() => setViewFullReport(true)} />
        </Box>
      </Box>
    </div>
  );
}

export default StatementandHistory;
