import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { usersApi } from "../../api/usersApi";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const planFeatures = {
  Free: [
    "Connect 1 Amazon seller account",
    "Invite up to 2 influencers",
    "Generate unlimited affiliate tracking links",
    "Create unique Amazon coupon codes",
    "View basic analytics (real-time clicks & total sales)",
    "Access guided onboarding tour & sample campaign templates",
  ],
  Pro: [
    "Connect 1 Amazon seller account",
    "Invite unlimited influencers",
    "Generate unlimited tracking links & coupon codes",
    "Advanced analytics dashboard",
    "Automated monthly payout scheduling",
    "Full API access & real-time webhooks",
    "Priority email & in-app chat support",
    "Dedicated success manager onboarding call",
  ],
};

const CurrentPlan = () => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);

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

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const handleUpgrade = async () => {
    try {
      await usersApi.subscriptionChange();
      toast.success("Plan upgrade initiated!");
      fetchCurrentPlan();
      // Optionally, refetch plan/subscription or redirect
    } catch (error) {
      toast.error("Failed to upgrade plan.");
    }
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
    <div className="container mt-4">
      <Card className="shadow-sm border-0 rounded-4">
        <CardContent>
          {/* Plan Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Typography variant="h6" className="fw-bold text-dark">
                {plan.title || plan.name}{" "}
                {plan.interval
                  ? `(${
                      plan.interval.charAt(0).toUpperCase() +
                      plan.interval.slice(1)
                    })`
                  : ""}
              </Typography>
              <Chip
                label={subscription.status === "active" ? "Active" : "Inactive"}
                color={subscription.status === "active" ? "success" : "default"}
                size="small"
                className="ms-2"
              />
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-1"
              >
                {price}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Renew Date: {renewDate}
              </Typography>
            </div>

            {/* Upgrade Button */}
            {plan.name == "Free" && (
              <Button variant="outlined" color="dark" onClick={handleUpgrade}>
                Upgrade Plan
              </Button>
            )}
          </div>

          {/* Features List */}
          <div className="mt-3">
            <Typography variant="subtitle1" className="fw-bold mb-2">
              Features:
            </Typography>
            <ul className="list-unstyled">
              {(planFeatures[plan.name] || []).map((feature, index) => (
                <li key={index} className="d-flex align-items-center mb-2">
                  <CheckCircle color="success" fontSize="small" />
                  <Typography variant="body2" className="ms-2">
                    {feature}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentPlan;
