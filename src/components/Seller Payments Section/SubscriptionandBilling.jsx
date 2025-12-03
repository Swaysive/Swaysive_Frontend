import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";
// import { CheckCircle } from "@mui/icons-material";
import { usersApi } from "../../api/usersApi";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import TickIcon from "../../assets/icons/checkicon.svg";
import StarIcon from "../../assets/icons/staricon.svg";
import CreditCard from "../../assets/icons/atmcardsvg.svg";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SubscriptionandBilling = () => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [billingMethods, setBillingMethods] = useState([]);
  const [billingLoading, setBillingLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCurrentPlan = async () => {
    try {
      const response = await usersApi.getCurrentPlan();
      if (response.data.status === "success") {
        setPlan(response.data.data.plan);
        setSubscription(response.data.data.subscription);
      }
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  const fetchBillingMethods = async () => {
    try {
      const response = await usersApi.getBillingMethods();
      if (response.data.status === "success") {
        setBillingMethods(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching billing methods:", error);
      toast.error("Failed to load billing methods");
    } finally {
      setBillingLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentPlan();
    fetchBillingMethods();
  }, []);

  const handleUpgrade = async () => {
    navigate("/pricing", { state: { currentPlanId: plan.id } });
  };

  const getCardBrandImage = (brand) => {
    // You can customize this to return different images based on card brand
    return CreditCard;
  };

  if (loading) {
    return (
      <div
        className="container mt-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: 200 }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!plan || !subscription) {
    return (
      <div className="container mt-4">
        <Card className="shadow-sm border-0 rounded-4">
          <CardContent>
            <Typography variant="h6" className="fw-bold text-dark">
              No active subscription found.
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPro = plan.name === "Pro";
  const renewDate = subscription.currentPeriodEnd
    ? dayjs(subscription.currentPeriodEnd).format("MMM DD, YYYY")
    : "N/A";
  const price =
    plan.price === "0" ? "Free" : `$${plan.price}.00 / ${plan.interval}`;

  return (
    <Box className=" px-2 mt-4 mb-4">
      <Box>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins", fontSize: "20px", fontWeight: "700" }}
        >
          Current Plan
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: "Poppins",
            fontSize: "13px",
            fontWeight: "400",
            color: "#9AA4B1",
          }}
        >
          Your active subscription details
        </Typography>
      </Box>
      <Card
        className="shadow-sm rounded-4 mt-2"
        style={{
          background:
            "linear-gradient(119.56deg, rgba(255, 255, 255, 1) 0%, rgba(252, 252, 253, 1) 100%)",
          border: "1px solid #3C83F633",
        }}
      >
        <CardContent>
          {/* Plan Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
              p={2}
            >
              <Box>
                <img src={StarIcon} alt="" />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1F2937",
                  }}
                >
                  {plan.title || plan.name}{" "}
                  {plan.interval
                    ? `(${
                        plan.interval.charAt(0).toUpperCase() +
                        plan.interval.slice(1)
                      })`
                    : ""}
                  <Chip
                    label={
                      subscription.status === "active" ? "Active" : "Inactive"
                    }
                    color={
                      subscription.status === "active" ? "success" : "default"
                    }
                    size="small"
                    className="ms-2"
                    sx={{ backgroundColor: "#14A63D21", color: "#14A63D" }}
                  />
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="mt-1"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "21px",
                    fontWeight: "700",
                    color: "#666666",
                  }}
                >
                  {price}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#9AA4B1",
                  }}
                >
                  Renewal Date: {renewDate}
                </Typography>
              </Box>
            </Box>

            {/* Upgrade Button */}
            <Box px={4}>
              {/* {plan.name == "Free" && ( */}
              <Button variant="outlined" color="dark" onClick={handleUpgrade}>
                Upgrade Plan
              </Button>
              {/* )}
              {plan.name == "Pro" && (
                <Button
                  variant="outlined"
                  color="dark"
                  sx={{
                    border: "1px solid #DFE2E7",
                    fontFamily: "Poppins",
                    textTransform: "none",
                  }}
                >
                  Cancel Plan
                </Button>
              )} */}
            </Box>
          </div>

          {/* Features List */}
          <div className="mt-3 px-3">
            <Typography
              variant="subtitle1"
              className=" mb-2"
              sx={{
                fontFamily: "Poppins",
                fontSize: "15px",
                fontWeight: "700",
                color: "#1F2937",
              }}
            >
              Features:
            </Typography>
            <ul className="list-unstyled">
              {(plan.features || []).map((feature, index) => (
                <li
                  key={feature.id || index}
                  className="d-flex align-items-center mb-2"
                >
                  <img src={TickIcon} alt="" />
                  <Typography
                    variant="body2"
                    className="ms-2"
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    {feature.description}
                    {feature.value && (
                      <>
                        : <b>{feature.value}</b>{" "}
                        {feature.unit ? feature.unit : ""}
                      </>
                    )}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Billing Methods
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: "Poppins",
            fontSize: "13px",
            fontWeight: "400",
            color: "#9AA4B1",
          }}
        >
          Manage your payment methods for different billing purposes.
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Subscription Payment Method
        </Typography>
        <Box
          sx={{
            mt: 2,
            border: "1px solid #DFE2E7",
            background: "linear-gradient(101.45deg, #FFFFFF 0%, #FCFCFD 100%)",
            borderRadius: "8px",
          }}
        >
          {billingLoading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress size={30} />
            </Box>
          ) : billingMethods.length === 0 ? (
            <Box p={3}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#727272",
                  textAlign: "center",
                }}
              >
                No payment methods found
              </Typography>
            </Box>
          ) : (
            billingMethods
              .filter((method) => method.type === "payment")
              .map((method, index) => (
                <Box
                  key={method.stripe_id}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                  p={2}
                >
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Box>
                      <img src={getCardBrandImage(method.brand)} alt="" />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "15px",
                          fontWeight: "400",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last_4}
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#727272",
                          }}
                        >
                          Exp {method.exp_month}/{method.exp_year}
                        </Typography>
                        {method.is_default && (
                          <Chip
                            label="Default"
                            size="small"
                            sx={{
                              backgroundColor: "#14A63D21",
                              color: "#14A63D",
                              height: "20px",
                              fontSize: "11px",
                            }}
                          />
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Button
                      startIcon={<FiEdit />}
                      variant="outlined"
                      color="dark"
                      sx={{
                        border: "1px solid #DFE2E7",
                        fontFamily: "Poppins",
                        textTransform: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<RiDeleteBinLine />}
                      variant="outlined"
                      sx={{
                        border: "1px solid #D83A52",
                        fontFamily: "Poppins",
                        textTransform: "none",
                        borderRadius: "6px",
                        color: "#D83A52",
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))
          )}
        </Box>
        <Button
          variant="outlined"
          color="dark"
          sx={{
            border: "1px solid #DFE2E7",
            fontFamily: "Poppins",
            mt: 2,
            textTransform: "none",
          }}
        >
          Add New Card
        </Button>
      </Box>

      {/* Platform Fee & Commission Payment Method - same logic */}
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Platform Fee & Commission Payment Method
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: "Poppins",
            fontSize: "13px",
            fontWeight: "400",
            color: "#9AA4B1",
          }}
        >
          (Credit Card Only)
        </Typography>
        <Box>
          <Box
            sx={{
              mt: 2,
              border: "1px solid #DFE2E7",
              background:
                "linear-gradient(101.45deg, #FFFFFF 0%, #FCFCFD 100%)",
              borderRadius: "8px",
            }}
          >
            {billingLoading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress size={30} />
              </Box>
            ) : billingMethods.length === 0 ? (
              <Box p={3}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#727272",
                    textAlign: "center",
                  }}
                >
                  No payment methods found
                </Typography>
              </Box>
            ) : (
              billingMethods
                .filter((method) => method.type === "platform_fee")
                .map((method, index) => (
                  <Box
                    key={method.stripe_id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={2}
                    p={2}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                      <Box>
                        <img src={getCardBrandImage(method.brand)} alt="" />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "400",
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last_4}
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: "13px",
                              fontWeight: "400",
                              color: "#727272",
                            }}
                          >
                            Exp {method.exp_month}/{method.exp_year}
                          </Typography>
                          {method.is_default && (
                            <Chip
                              label="Default"
                              size="small"
                              sx={{
                                backgroundColor: "#14A63D21",
                                color: "#14A63D",
                                height: "20px",
                                fontSize: "11px",
                              }}
                            />
                          )}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display={"flex"} gap={2}>
                      <Button
                        startIcon={<FiEdit />}
                        variant="outlined"
                        color="dark"
                        sx={{
                          border: "1px solid #DFE2E7",
                          fontFamily: "Poppins",
                          textTransform: "none",
                          borderRadius: "6px",
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        startIcon={<RiDeleteBinLine />}
                        variant="outlined"
                        sx={{
                          border: "1px solid #D83A52",
                          fontFamily: "Poppins",
                          textTransform: "none",
                          borderRadius: "6px",
                          color: "#D83A52",
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                ))
            )}
            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              p={2}
            >
              <Box
                display={"flex"}
                px={3}
                alignItems={"center"}
                sx={{
                  width: "70%",
                  height: "64px",
                  backgroundColor: "#F6F7F9",
                  borderRadius: "6px",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#6D6F71",
                  }}
                >
                  This card will be charged automatically at the end of each
                  month for platform fees (1.5% per unit sold) and influencer{" "}
                  <br />
                  commissions you owe.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="dark"
            sx={{
              border: "1px solid #DFE2E7",
              fontFamily: "Poppins",
              mt: 2,
              textTransform: "none",
            }}
          >
            Add New Card
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionandBilling;
