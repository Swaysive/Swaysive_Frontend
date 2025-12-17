import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { billingApi } from "../../api/billingApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PaymentForm = ({ onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }

      const { error: confirmError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/settings/billings`,
        },
        redirect: "if_required",
      });

      setLoading(false);

      if (confirmError) {
        console.error("AddPaymentMethod: Error:", confirmError);
        setError(confirmError.message);
        onError(confirmError);
      } else if (setupIntent && setupIntent.status === "succeeded") {
        console.log("AddPaymentMethod: Success!", setupIntent);
        onSuccess();
      } else {
        setError("Payment method was not added successfully.");
      }
    } catch (err) {
      console.error("AddPaymentMethod: Error:", err);
      setError(err.message || "An error occurred");
      setLoading(false);
      onError(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <PaymentElement
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
          }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading || !stripe || !elements}
        sx={{
          py: 1.5,
          backgroundColor: "#1F2937",
          "&:hover": {
            backgroundColor: "#111827",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : (
          "Add Payment Method"
        )}
      </Button>
    </Box>
  );
};

const AddPaymentMethodModal = ({ open, onClose, onSuccess, type }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      fetchSetupIntent();
    }
  }, [open, type]);

  const fetchSetupIntent = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use the passed 'type' prop (either 'payment' or 'payout')
      const response = await billingApi.addBillingMethod({ type });

      if (
        response.data.status === "success" &&
        response.data.data?.client_secret
      ) {
        setClientSecret(response.data.data.client_secret);
      } else {
        setError("Failed to initialize payment setup");
      }
    } catch (err) {
      console.error("Error fetching setup intent:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to initialize payment setup"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  const handleError = (error) => {
    console.error("Payment setup error:", error);
  };

  const handleClose = () => {
    setClientSecret(null);
    setError(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 24,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            p: 4,
            overflowY: "auto",
            flex: 1,
          }}
        >
          <Typography variant="h5" fontWeight={600} mb={1}>
            Add {type === "payout" ? "Payout" : "Payment"} Method
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Add a new card to your account
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress sx={{ color: "#1F2937" }} />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <PaymentForm onSuccess={handleSuccess} onError={handleError} />
            </Elements>
          ) : null}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPaymentMethodModal;
