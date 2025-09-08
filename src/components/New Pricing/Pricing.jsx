import React from "react";
import { Box, Typography, Button } from "@mui/material";
import BubbleLeft from "../../assets/images/bubbles-left1.png";
import BubbleRight from "../../assets/images/bubbles-right.png";
import { BiCheck } from "react-icons/bi";

function Pricing() {
  const subscriptions = [
    {
      duration: "Basic",
      amount: "$297",
      slogan: "Try every feature without commitment.",
      features: [
        "Connect 1 Amazon store",
        "Extended discount validity (for 30+ days)",
        "Track basic sales & clicks",
        "Manage up to 3 influencers",
        "Simple campaign dashboard",
        "Email support",
      ],
      buttontext: "Start with basic",
    },
    {
      duration: "Pro Subscription",
      amount: "$497",
      slogan: "Scale your influencer program with advanced tools.",
      features: [
        "Connect up to 3 Amazon stores ",
        "Extended discount validity (for 30+ days)",
        "Manage up to 100 influencers ",
        "Advanced attribution tracking (beyond Amazon’s default window)",
        "Campaign performance analytics (CTR, conversions, revenue uplift)",
        "Commission & payout automation",
        "Influencer dashboard with real-time tracking",
        "Priority email + chat support",
      ],
      buttontext: "Start with pro",
    },
    {
      duration: "Go Ultimate",
      amount: "$800",
      slogan: "For large Amazon brands or agencies managing multiple stores and hundreds of influencers.",
      features: [
        "Unlimited Amazon stores",
        "Unlimited influencers",
        "Full multi-store management in one portal ",
        "Advanced analytics & insights ",
        "Customizable campaign rules & tiers",
        "Integrations with HubSpot and Slack",
        "Dedicated account manager",
        "SLA-backed support (24/7 priority)"
      ],
      buttontext: "Go Ultimate",
    },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="img"
        src={BubbleLeft}
        alt=""
        sx={{ position: "absolute", top: -50, left: -13, width: "20%" }}
      />
      <Box
        component="img"
        src={BubbleRight}
        alt=""
        sx={{ position: "absolute", bottom: 0, right: -14, width: "20%" }}
      />
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
            height: "660px",
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
            {subscriptions.map((subscription, index) => (
              <Box
                key={index}
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
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      className="card-title"
                      variant="h5"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {subscription.duration}
                    </Typography>
                    {index === 1 && (
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
                    display={"flex"}
                    alignItems={"center"}
                    variant="h5"
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "36px",
                      fontWeight: "800",
                      py: 2,
                    }}
                  >
                    {subscription.amount}
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
                      {subscription.slogan}
                    </Typography>
                  </Typography>
                  <Box>
                    {subscription.features.map((feature, fIndex) => (
                      <Box
                        key={fIndex}
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
                          }}
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
                        </Box>
                        <Typography
                          className="feature-text"
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "13px",
                            fontWeight: "300",
                          }}
                        >
                          {feature}
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
                    >
                      {subscription.buttontext}
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Pricing;
