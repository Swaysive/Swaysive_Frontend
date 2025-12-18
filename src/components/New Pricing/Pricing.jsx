import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { BiCheck } from "react-icons/bi";
import { plansApi } from "../../api/plansApi";
import { usersApi } from "../../api/usersApi";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import BubbleLeft from "../../assets/images/bubbles-left1.png";
import BubbleRight from "../../assets/images/bubbles-right.png";
import { billingApi } from "../../api/billingApi";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current plan id from navigation state
  const currentPlanId = location.state?.currentPlanId || null;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await plansApi.getAllPlans();
        if (response.data.status === "success") {
          setPlans(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch plans.");
        }
      } catch (error) {
        toast.error("Error fetching plans.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePlanSelect = async (plan) => {
    setSubmitting(true);
    try {
      const payload = {
        planId: plan.id,
      };
      const response = await billingApi.subscriptionChange(payload);
      
      // Handle both success status and redirect responses
      // if (response.data.status === "success" && response.data.data?.sessionUrl) {
      //   window.location.href = response.data.data.sessionUrl;
      // } else {
        toast.error(response.data.message || "Failed to change plan.");
        navigate('/seller-home/payments');
      // }
    } catch (error) {
      // Check if the error response contains the sessionUrl (303 redirect case)
      if (error.response?.data?.status === "success" && error.response?.data?.data?.sessionUrl) {
        window.location.href = error.response.data.data.sessionUrl;
      } else {
        toast.error(error.response?.data?.message || "Error changing plan.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      {/* Background bubbles */}
      <Box
        component="img"
        src={BubbleLeft}
        alt=""
        sx={{ position: "absolute", top: 20, left: -13, width: "20%" }}
      />
      <Box
        component="img"
        src={BubbleRight}
        alt=""
        sx={{ position: "absolute", bottom: 0, right: -14, width: "20%" }}
      />

      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Poppins",
          fontSize: "36px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Choose Your Plan
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins",
          fontSize: "18px",
          fontWeight: "400",
          textAlign: "center",
          py: 3,
        }}
      >
        Get unlimited access to Swaysive’s features for 60 days, no charge.
        After your trial, continue with our Pro subscription. <br /> Payment
        details required now; you won’t be billed until after Day 60.
      </Typography>

      <Box display={"flex"} justifyContent={"center"}>
        <Box
          sx={{
            width: "80%",
            height: "700px",
            borderRadius: "37px",
            backgroundColor: "#D9D9D969",
            border: "1px solid #D4D4D4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            zIndex: 10,
          }}
        >
          <Box display="flex" gap={5} alignItems="stretch">
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlanId; // compare with current plan

              return (
                <Box
                  key={plan.id}
                  sx={{
                    width: "300px",
                    borderRadius: "12px",
                    border: "1px solid #EBE9E9",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    opacity: isCurrent ? 0.6 : 1,
                    pointerEvents: isCurrent ? "none" : "auto",
                    "&:hover": {
                      backgroundColor: "#000000",
                      border: "4px solid #565656",
                      transform: "translateY(-8px) scale(1.03)",
                      boxShadow: "0px 12px 24px rgba(0,0,0,0.3)",
                      "& .plan-text": { color: "#FFFFFF" },
                      "& .plan-desc": { color: "#B9BEC1" },
                      "& .monthly-badge": { backgroundColor: "#FFFFFF", color: "#000000" },
                      "& .check-icon": {
                        backgroundColor: "#FFFFFF",
                        "& svg": { color: "#000000" },
                      },
                      "& .plan-btn": {
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        border: "1px solid #DFE2E7",
                      },
                    },
                  }}
                >
                  <Box p={2.5} flexGrow={1}>
                    {/* Title */}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography
                        variant="h5"
                        className="plan-text"
                        sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: "600" }}
                      >
                        {plan.name}
                      </Typography>
                      <Box
                        className="monthly-badge"
                        sx={{
                          width: "74px",
                          height: "27px",
                          backgroundColor: "black",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "4px",
                          color: "white",
                        }}
                      >
                        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: "500" }}>
                          Monthly
                        </Typography>
                      </Box>
                    </Box>

                    {/* Price */}
                    <Typography
                      display="flex"
                      gap={2}
                      alignItems="center"
                      variant="h5"
                      className="plan-text"
                      sx={{ fontFamily: "Poppins", fontSize: "36px", fontWeight: "800", py: 2 }}
                    >
                      ${plan.price}
                      <Typography
                        component="span"
                        className="plan-desc"
                        sx={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: "400", color: "#B9BEC1", ml: 0.5 }}
                      >
                        {plan.metadata?.description}
                      </Typography>
                    </Typography>

                    {/* Features */}
                    <Box>
                      {plan.features.map((feature) => (
                        <Box key={feature.id} display="flex" gap={1.5} alignItems="center" py={0.8}>
                          <Box
                            className="check-icon"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              backgroundColor: "#EBEFF0",
                              flexShrink: 0,
                              "& svg": { color: "#B9BEC1" },
                            }}
                          >
                            <BiCheck size={18} />
                          </Box>
                          <Typography
                            className="plan-text"
                            sx={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "300" }}
                          >
                            {feature.description}
                            {feature.value && (
                              <>
                                : <b>{feature.value}</b> {feature.unit ? feature.unit : ""}
                              </>
                            )}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Button */}
                  <Box p={2.5}>
                    <Button
                      variant="outlined"
                      className="plan-btn"
                      sx={{
                        border: "1px solid #DFE2E7",
                        fontFamily: "Poppins",
                        textTransform: "none",
                        backgroundColor: "#262626",
                        color: "white",
                        width: "100%",
                        py: 1.2,
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                      }}
                      disabled={isCurrent || submitting}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      {isCurrent ? "Selected Plan" : "Choose Plan"}
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
