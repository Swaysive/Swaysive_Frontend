import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { BiCheck } from "react-icons/bi";
import { plansApi } from "../../api/plansApi";
import { usersApi } from "../../api/usersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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
        step: 2,
        planId: plan.id,
      };
      const response = await usersApi.userOnboard(payload);
      if (response.data.status === "success") {
        window.location.href = response.data.data.sessionUrl;
      } else {
        toast.error(response.data.message || "Failed to activate plan.");
      }
    } catch (error) {
      toast.error("Error activating plan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f3f3f3", minHeight: "100vh", py: 6 }}>
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
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              width: "80%",
              minHeight: "660px",
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
            <Box display="flex" gap={5}>
              {plans.map((plan, index) => (
                <Box
                  key={plan.id}
                  sx={{
                    width: "300px",
                    minHeight: "534px",
                    borderRadius: "12px",
                    border: "1px solid #EBE9E9",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "#000",
                      border: "6px solid #D4D4D480", 
                      "& .feature-text": { color: "#fff" },
                      "& .card-title": { color: "#fff" },
                      "& .card-amount": { color: "#fff" },
                      "& .card-btn": {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #fff",
                      },
                      "& .icon-wrapper": {
                        backgroundColor: "#fff",
                        "& svg": { color: "#000" },
                      },
                      "& .monthly-box": {
                        backgroundColor: "#fff",
                      },
                      "& .monthly-text": {
                        color: "#000",
                      },
                    },
                  }}
                >
                  <Box p={2.5}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography
                        className="card-title"
                        variant="h5"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        {plan.title}
                      </Typography>
                      {plan.interval === "month" && (
                        <Box
                          className="monthly-box"
                          sx={{
                            width: "74px",
                            height: "27px",
                            backgroundColor: "black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "4px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Typography
                            className="monthly-text"
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "white",
                              transition: "all 0.3s ease",
                            }}
                          >
                            Monthly
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Typography
                      className="card-amount"
                      gap={2}
                      display="flex"
                      alignItems="center"
                      variant="h5"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "36px",
                        fontWeight: "800",
                        py: 2,
                      }}
                    >
                      ${plan.price}
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#B9BEC1",
                          ml: 0.5,
                        }}
                      >
                        {plan.metadata?.description}
                      </Typography>
                    </Typography>
                    <Box>
                      {plan.features.map((feature) => (
                        <Box
                          key={feature.id}
                          display="flex"
                          gap={1.5}
                          alignItems="center"
                          py={0.8}
                        >
                          <Box
                            className="icon-wrapper"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              backgroundColor: "#EBEFF0",
                              flexShrink: 0,
                              "& svg": {
                                color: "#B9BEC1",
                              },
                            }}
                          >
                            <BiCheck size={18} />
                          </Box>
                          <Typography
                            className="feature-text"
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: "13px",
                              fontWeight: "300",
                            }}
                          >
                            {feature.description}
                            {feature.value && (
                              <>: <b>{feature.value}</b> {feature.unit ? feature.unit : ""}</>
                            )}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box py={2}>
                      <Button
                        className="card-btn"
                        variant="outlined"
                        sx={{
                          border: "1px solid #DFE2E7",
                          fontFamily: "Poppins",
                          textTransform: "none",
                          backgroundColor: "#262626",
                          color: "white",
                          width: "100%",
                          py: 1.2,
                          borderRadius: "8px",
                        }}
                        disabled={submitting}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {plan.name === "Basic"
                          ? "Start with basic"
                          : plan.name === "Professional"
                          ? "Start with pro"
                          : "Go Ultimate"}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
