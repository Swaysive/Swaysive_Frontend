import React from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const plans = [
  {
    title: "60 Days Free",
    price: "$0",
    subtitle: "Try every feature without commitment.",
    features: [
      "Connect 1 Amazon seller account",
      "Invite up to 2 influencers",
      "Generate unlimited affiliate tracking links",
      "Create unique Amazon coupon codes",
      "View basic analytics (real-time clicks & total sales)",
      "Access guided onboarding tour & sample campaign templates"
    ],
    buttonText: "Start free",
    dark: false
  },
  {
    title: "Pro Subscription",
    price: "$300",
    subtitle: "Scale your influencer program with advanced tools.",
    features: [
      "Connect 1 Amazon seller account",
      "Invite unlimited influencers",
      "Generate unlimited tracking links & coupon codes",
      "Advanced analytics dashboard",
      "Automated monthly payout scheduling",
      "Full API access & real-time webhooks",
      "Priority email & in-app chat support",
      "Dedicated success manager onboarding call"
    ],
    buttonText: "Subscribe now",
    dark: true
  }
];

export default function SubscriptionPlans() {
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

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={5} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                backgroundColor: plan.dark ? "#000" : "#fff",
                color: plan.dark ? "#fff" : "#000",
                boxShadow: plan.dark ? 6 : 3,
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
                  {plan.price}
                </Typography>
                {plan.dark && (
                  <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                    Monthly
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  color={plan.dark ? "grey.400" : "text.secondary"}
                  sx={{ mb: 3 }}
                >
                  {plan.subtitle}
                </Typography>

                <Divider sx={{ mb: 2, borderColor: plan.dark ? "grey.800" : "grey.200" }} />

                {plan.features.map((feature, i) => (
                  <Box
                    key={i}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                  >
                    <CheckCircleIcon
                      fontSize="small"
                      sx={{ color: plan.dark ? "#fff" : "#000" }}
                    />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                ))}

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: plan.dark ? "#fff" : "#000",
                    color: plan.dark ? "#000" : "#fff",
                    "&:hover": {
                      backgroundColor: plan.dark ? "#e0e0e0" : "#333"
                    }
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
