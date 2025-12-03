import React, { useState } from "react";
import { Button, Box, Menu, MenuItem } from "@mui/material";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import { useNavigate } from "react-router-dom";
import SubscriptionandBilling from "../../../components/Seller Payments Section/SubscriptionandBilling";
import StatementandHistory from "../../../components/Seller Payments Section/StatementandHistory";
import SettingsandAlerts from "../../../components/Seller Payments Section/SettingsandAlerts";
import { LuFilter } from "react-icons/lu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { IoChevronDown } from "react-icons/io5";

const PaymentTable = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("subscription");
  const [viewFullTable, setViewFullTable] = useState(false); // 🔹 Track full table mode
  const [viewFullReport, setViewFullReport] = useState(false);

  // 🔹 For Filter Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Last 30 Days"); // Default
  const open = Boolean(anchorEl);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) setSelectedFilter(option); // update button label
    setAnchorEl(null);
  };

  const buttons = [
    { id: "subscription", label: "Subscription & Billing" },
    // { id: "statements", label: "Statements & History" },
    // { id: "settings", label: "Settings & Alerts" },
  ];

  return (
    <div className="row" style={{ marginTop: "50px" }}>
      <div className="col-12 mb-4">
        {active === "subscription" && (
          <DashboardHeader
            headerText="Subscription & Billing"
            bodyText="Manage your plan and billing methods for subscription, platform fees, and influencer commissions."
          />
        )}

        {active === "statements" && !viewFullTable && !viewFullReport && (
          <DashboardHeader
            headerText="Statements & History"
            bodyText="View all subscription, platform fee, and Influencer Payout payments, with downloadable Reports."
          />
        )}

        {active === "statements" && viewFullTable && (
          <DashboardHeader
            headerText="Statements Table"
            bodyText="View all subscription, platform fee, and Influencer Payout payments."
          />
        )}
        {active === "statements" && viewFullReport && (
          <DashboardHeader
            headerText="Reports"
            bodyText="Download reports for subscription, service fee and influencer payouts."
          />
        )}

        {active === "settings" && (
          <DashboardHeader
            headerText="Settings & Alerts"
            bodyText="Control payment automation and get notified about important billing events."
          />
        )}
      </div>

      {/* Buttons Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Navigation Buttons */}
        {/* <Box>
          <Box
            mx={2}
            sx={{
              width: "217px",
              height: "60px",
              borderRadius: "12px",
              backgroundColor: "#ECECF0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            {buttons.map((btn) => (
              <Button
                key={btn.id}
                onClick={() => {
                  setActive(btn.id);
                  setViewFullTable(false);
                  setViewFullReport(false); // reset when switching tabs
                }}
                sx={{
                  background:
                    active === btn.id
                      ? "linear-gradient(270deg, #020202 -12.5%, #434343 100%)"
                      : "transparent",
                  color: active === btn.id ? "white" : "black",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 2,
                  py: 1.2,
                  border: "none",
                  boxShadow: "none",
                  "&:hover": {
                    background:
                      active === btn.id
                        ? "linear-gradient(270deg, #020202 -12.5%, #434343 100%)"
                        : "transparent",
                    color: active === btn.id ? "white" : "black",
                  },
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Box>
        </Box> */}

        {/* Filter Dropdown (only when statements is active) */}
        {active === "statements" && !viewFullTable && !viewFullReport && (
          <Box mr={2}>
            <Button
              variant="outlined"
              startIcon={<LuFilter />}
              endIcon={<IoChevronDown />} // chevron
              onClick={handleFilterClick}
              sx={{
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                py: 1.5,
                fontSize: "14px",
                color: "#344256",
                border: "1px solid #E1E7EF",
                backgroundColor: "#FCFCFC",
              }}
            >
              {selectedFilter}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleClose("Last 30 Days")}>
                Last 30 Days
              </MenuItem>
              <MenuItem onClick={() => handleClose("This Month")}>
                This Month
              </MenuItem>
              <MenuItem onClick={() => handleClose("Last Month")}>
                Last Month
              </MenuItem>
              <MenuItem onClick={() => handleClose("Custom Range")}>
                Custom Range
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>

      {/* Section Content */}
      <Box>
        {active === "subscription" && <SubscriptionandBilling />}
        {active === "statements" && (
          <StatementandHistory
            viewFullTable={viewFullTable}
            setViewFullTable={setViewFullTable}
            viewFullReport={viewFullReport}
            setViewFullReport={setViewFullReport}
          />
        )}
        {active === "settings" && <SettingsandAlerts />}
      </Box>
    </div>
  );
};

export default PaymentTable;
