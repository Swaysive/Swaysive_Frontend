import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Divider, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { plansApi } from "../../api/plansApi";
import { usersApi } from "../../api/usersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const planFeatures = {
  "Free": [
    "Connect 1 Amazon seller account",
    "Invite up to 2 influencers",
    "Generate unlimited affiliate tracking links",
    "Create unique Amazon coupon codes",
    "View basic analytics (real-time clicks & total sales)",
    "Access guided onboarding tour & sample campaign templates"
  ],
  "Pro": [
    "Connect 1 Amazon seller account",
    "Invite unlimited influencers",
    "Generate unlimited tracking links & coupon codes",
    "Advanced analytics dashboard",
    "Automated monthly payout scheduling",
    "Full API access & real-time webhooks",
    "Priority email & in-app chat support",
    "Dedicated success manager onboarding call"
  ]
};

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
        if (plan.name === "Pro" && response.data.data.sessionUrl) {
          window.location.href = response.data.data.sessionUrl; // Redirect to Stripe checkout
        } else {
          window.location.href = response.data.data.sessionUrl;
          // toast.success("Plan activated!");
          // navigate("/"); 
        }
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
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Choose Your Plan
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto">
          Get unlimited access to Swaysive’s features for 60 days, no charge. After your trial, continue with our Pro subscription.
          Payment details required now; you won’t be billed until after Day 60.
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => {
            const isPro = plan.name === "Pro";
            return (
              <Grid item xs={12} md={5} key={plan.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    backgroundColor: isPro ? "#000" : "#fff",
                    color: isPro ? "#fff" : "#000",
                    boxShadow: isPro ? 6 : 3,
                    textAlign: "center"
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {plan.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      {plan.price === "0" ? "$0" : `$${plan.price}`}
                    </Typography>
                    {isPro && (
                      <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                        Monthly
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color={isPro ? "grey.400" : "text.secondary"}
                      sx={{ mb: 3 }}
                    >
                      {plan.metadata?.description || plan.subtitle}
                    </Typography>

                    <Divider sx={{ mb: 2, borderColor: isPro ? "grey.800" : "grey.200" }} />

                    {(planFeatures[plan.name] || []).map((feature, i) => (
                      <Box
                        key={i}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{ mb: 1, justifyContent: "flex-start" }}
                      >
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: isPro ? "#fff" : "#000" }}
                        />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 3,
                        backgroundColor: isPro ? "#fff" : "#000",
                        color: isPro ? "#000" : "#fff",
                        "&:hover": {
                          backgroundColor: isPro ? "#e0e0e0" : "#333"
                        }
                      }}
                      disabled={submitting}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      {isPro ? "Subscribe now" : "Start free"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
