import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { catalogApi } from "../../../api/catalogApi";
import {
  Menu,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./CreateDiscountCode.css";
import { useParams,useLocation } from "react-router-dom"; // If you get productId from URL
import { toast } from "react-toastify";

export default function CreateDiscountCode() {
  // Get productId from URL or props
  // const { productId } = useParams(); // or pass as prop
    const location = useLocation();
    const { productApiId, productId, productTitle, productPrice, productAsin } = location.state || {};
  // const { productId } = location.state || {};

  const [step, setStep] = useState(1);

  // Step 1 state
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [variationType, setVariationType] = useState("all");

  // Variants state
  const [variants, setVariants] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);

  // Step 2 state
  const [budgetCap, setBudgetCap] = useState("");
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [audience, setAudience] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [continuous, setContinuous] = useState(false);

  // Product info
  const [product, setProduct] = useState(null);

  // Success modal state
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch product details and variants on mount
  useEffect(() => {
    const fetchProductAndVariants = async () => {
      try {
        // const res = await catalogApi.getProductDetail(productId);
        // if (res.data.status === "success") {
        //   setProduct(res.data.data);
        // }
        // Fetch variants using the dedicated API
        const variantsRes = await catalogApi.getVariants(productApiId);
        if (
          variantsRes.data.status === "success" &&
          variantsRes.data.data.result
        ) {
          setVariants(variantsRes.data.data.result);
        }
      } catch (error) {
        toast.error("Failed to fetch product details or variants");
      }
    };
    fetchProductAndVariants();
  }, [productId]);

  // Check if any variant has a discount
  const anyVariantHasDiscount = variants.some((v) => v.hasDiscount);

  // Set default variationType if any variant has discount
  useEffect(() => {
    if (anyVariantHasDiscount) {
      setVariationType("selected");
    }
  }, [anyVariantHasDiscount]);

  // Handle variant selection
  const handleVariantToggle = (variantId) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId]
    );
  };

  // Validation
  const isStep1Valid =
    discountValue &&
    discountValue >= 1 &&
    discountValue <= 80 &&
    ((variationType === "all") ||
      (variationType === "selected" && selectedVariants.length > 0));

  const isStep2Valid = budgetCap && startDate && (continuous || endDate);

  // Handle submit
  const handleSubmit = async () => {
    const payload = {
      discountType,
      discountValue: Number(discountValue),
      budgetCap: Number(budgetCap),
      allowMultipleRedemptions: allowMultiple,
      targetAudience: audience,
      scheduleStart: startDate,
      scheduleEnd: continuous ? undefined : endDate,
      isContinuous: continuous,
      appliesToVariations: variationType,
      ...(variationType === "selected" && { variationIds: selectedVariants }),
    };

    try {
       const res = await catalogApi.createCouponsCode({
        data: payload,
        productId: productApiId,
      });
        if (res.data.status === "success") {
          setDiscountCode(res.data.data.discountCode);
          setSuccessModalOpen(true);
        }
      // await catalogApi.createCouponsCode({
      //   data: payload,
      //   productId: productId,
      // });
      // setSuccessModalOpen(true);
    } catch (error) {
      const errorMessage =
              error.response?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
      // toast.error("Failed to create discount code");
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    navigate("/");
  };

  // UI rendering
  return (
    <div className="container-fluid p-4">
      {/* Step Progress */}
      <div className="steps d-flex align-items-center justify-content-center mb-4">
        {["Discount Setup", "Schedule & Budget", "Review & Submit"].map(
          (label, index) => {
            const stepNum = index + 1;
            return (
              <React.Fragment key={label}>
                <div
                  className="d-flex align-items-center"
                  style={{ cursor: stepNum <= step ? "pointer" : "default" }}
                  onClick={() => {
                    if (stepNum <= step) setStep(stepNum);
                  }}
                >
                  <div
                    className={`step-circle ${
                      step === stepNum ? "active" : ""
                    }`}
                  >
                    {stepNum}
                  </div>
                  <span
                    className={`ms-2 step-label ${
                      step === stepNum ? "fw-bold" : "text-muted"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {stepNum < 3 && <div className="step-line"></div>}
              </React.Fragment>
            );
          }
        )}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card p-4">
          <h5 className="mb-3">Product Context</h5>
          <div className="row mb-4">
            <div className="col-md-3">
              <small className="text-muted">Product Name</small>
              <p>{productTitle || "-"}</p>
            </div>
            <div className="col-md-3">
              <small className="text-muted">Parent ASIN</small>
              <p>{productAsin || "-"}</p>
            </div>
            <div className="col-md-3">
              <small className="text-muted">Price</small>
              <p>${productPrice || "-"}</p>
            </div>
            <div className="col-md-3">
              <small className="text-muted">SKU Status</small>
              <p className="text-success fw-semibold">Verified</p>
            </div>
          </div>

          <h5 className="mb-3">Discount Type & Value</h5>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={discountType === "percentage"}
                onChange={() => setDiscountType("percentage")}
              />
              <label className="form-check-label">Percentage (%)</label>
            </div>
            <div className="form-check mt-2">
              <input
                type="radio"
                className="form-check-input"
                checked={discountType === "fixed"}
                onChange={() => setDiscountType("fixed")}
              />
              <label className="form-check-label">Fixed Amount ($)</label>
            </div>
          </div>
          <input
            type="number"
            placeholder="e.g. 15"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className="form-control"
          />
          <small className="text-muted">Between 1–80%</small>

          <h5 className="mt-4 mb-3">Applies To Variations</h5>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="variations"
              checked={variationType === "all"}
              onChange={() => {
                setVariationType("all");
                setSelectedVariants([]);
              }}
              disabled={anyVariantHasDiscount} // Disable if any variant has discount
            />
            <label className="form-check-label" style={{ color: anyVariantHasDiscount ? "#bbb" : undefined }}>
              All Variations (default)
              {anyVariantHasDiscount && (
                <span className="ms-2 text-danger" style={{ fontSize: 12 }}>
                  (Disabled: at least one variant already has a discount)
                </span>
              )}
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              type="radio"
              className="form-check-input"
              name="variations"
              checked={variationType === "selected"}
              onChange={() => setVariationType("selected")}
            />
            <label className="form-check-label">Select Variations</label>
          </div>
          {variationType === "selected" && (
            <div className="mt-3">
              <div className="mb-2 input-variant p-2" style={{ minHeight: 40 }}>
                {selectedVariants.length === 0 && (
                  <small className="text-muted">No variants selected</small>
                )}
                {variants
                  .filter((v) => selectedVariants.includes(v._id))
                  .map((v) => (
                    <span
                      key={v._id}
                      className="badge bg-dark border me-2 d-inline-flex align-items-center"
                      style={{ fontSize: 14, padding: "6px 10px" }}
                    >
                      {v.variant_sku}
                      <CloseIcon
                        fontSize="small"
                        style={{ marginLeft: 6, cursor: "pointer" }}
                        onClick={() =>
                          setSelectedVariants((prev) =>
                            prev.filter((id) => id !== v._id)
                          )
                        }
                      />
                    </span>
                  ))}
              </div>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  maxHeight: 220,
                  overflowY: "auto",
                  background: "#fafbfc",
                  padding: 8,
                }}
              >
                {variants.map((variant) => {
                  const isDisabled = variant.hasDiscount;
                  return (
                    <div
                      key={variant._id}
                      className="d-flex align-items-center py-1"
                      style={{
                        borderBottom: "1px solid #f0f0f0",
                        cursor: isDisabled
                          ? "not-allowed"
                          : "pointer",
                        background: selectedVariants.includes(variant._id)
                          ? "#e6f4ea"
                          : "transparent",
                        opacity: isDisabled ? 0.5 : 1,
                        pointerEvents: isDisabled ? "none" : "auto",
                        filter: isDisabled ? "blur(1px) grayscale(0.5)" : "none",
                      }}
                      onClick={() => !isDisabled && handleVariantToggle(variant._id)}
                    >
                      <Checkbox
                        checked={selectedVariants.includes(variant._id)}
                        tabIndex={-1}
                        disableRipple
                        sx={{ marginRight: 1 }}
                        inputProps={{ "aria-labelledby": `variant-${variant._id}` }}
                        disabled={isDisabled}
                      />
                      <Avatar
                        src={variant.images?.[1] || ""}
                        alt={variant.variant_title}
                        sx={{ width: 32, height: 32, mr: 2 }}
                      />
                      <div>
                        <div style={{ fontWeight: 500 }}>{variant.variant_title}</div>
                        <div style={{ fontSize: 13, color: "#888" }}>{variant.variant_sku}</div>
                        {isDisabled && (
                          <div style={{ fontSize: 12, color: "#d9534f" }}>
                            Already has a discount
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="text-end mt-4">
            <button
              className={`btn ${
                isStep1Valid ? "btn-dark" : "btn-secondary"
              } px-4`}
              disabled={!isStep1Valid}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card p-4">
          <h5 className="mb-3">Schedule & Budget Set</h5>
          <div className="row mb-4">
            <div className="col-md-3">
              <small className="text-muted">Product Name</small>
              <p>{productTitle || "-"}</p>
            </div>
            <div className="col-md-3">
              <small className="text-muted">Parent ASIN</small>
              <p>{productAsin || "-"}</p>
            </div>
            <div className="col-md-3">
              <small className="text-muted">Price</small>
              <p>${productPrice || "-"}</p>
            </div>
            <div className="col-md-3">
              <small className="text-muted">SKU Status</small>
              <p className="text-success fw-semibold">Verified</p>
            </div>
          </div>

          {/* Budget */}
          <h5>Budget</h5>
          <input
            type="number"
            placeholder="$500"
            value={budgetCap}
            onChange={(e) => setBudgetCap(e.target.value)}
            className="form-control mb-2"
          />
          <small className="text-muted">
            Minimum $100 enforced. Soft limit with 80% threshold warning.
          </small>

          {/* Redemption Rules */}
          <h5 className="mt-4">Redemption Rules</h5>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
            />
            <label className="form-check-label">
              Allow multiple redemptions per customer
            </label>
          </div>
          <small className="text-muted">
            Limited to 1 redemption per customer (default)
          </small>

          {/* Audience */}
          <h5 className="mt-4">Target Audience (Optional)</h5>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              checked={audience === "all"}
              onChange={() => setAudience("all")}
            />
            <label className="form-check-label">All Customers (default)</label>
          </div>

          {/* Schedule */}
          <h5 className="mt-4">Schedule</h5>
          <div className="row">
            <div className="col-md-3">
              <small>Start Date</small>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <small>End Date</small>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={continuous}
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={continuous}
                  onChange={(e) => setContinuous(e.target.checked)}
                />
                <label className="form-check-label">Continuous</label>
              </div>
            </div>
          </div>

          <div className="alert alert-warning mt-3 p-2">
            <small>
              Note: Coupon may take up to 6 hours to activate after submission.
            </small>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-dark px-4" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              className={`btn ${
                isStep2Valid ? "btn-dark" : "btn-secondary"
              } px-4`}
              disabled={!isStep2Valid}
              onClick={() => setStep(3)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card p-4">
          <h5 className="mb-4">Review & Submit</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Product Name</strong><br/>{productTitle || "-"}</p>
              <p><strong>Parent ASIN</strong><br/>{productAsin || "-"}</p>
              <p><strong>Discount Type</strong><br/>{discountType === "percentage" ? "Percentage" : "Fixed Amount"}</p>
              <p><strong>Discount Value</strong><br/>{discountValue}{discountType === "percentage" ? "%" : "$"}</p>
              <p><strong>Applies To Variations</strong><br/>{variationType === "all" ? "All Variations" : "Selected Variations"}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Start Date</strong><br/>{startDate || "-"}</p>
              <p><strong>End Date</strong><br/>{continuous ? "Continuous" : endDate || "-"}</p>
              <p><strong>Budget Cap</strong><br/>${budgetCap}</p>
              <p><strong>Budget Type</strong><br/>Soft Limit – <span className="text-muted">80% threshold</span></p>
              <p><strong>Redemption Rule</strong><br/>{allowMultiple ? "Multiple redemptions allowed" : "1 redemption per customer"}</p>
              <p><strong>Target Audience</strong><br/>{audience === "all" ? "All Customers" : audience}</p>
            </div>
          </div>

          <div className="alert alert-light border mt-4">
            <strong>Security Notice</strong>
            <p className="mb-0 small text-muted">
              Your submission is encrypted and processed securely via Amazon’s Promotions API.
              Confirmation will be shown once activated (usually within 6 hours).
            </p>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-dark px-4" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="btn btn-dark px-4" onClick={handleSubmit}>
              Submit Discount Code
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModalOpen && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1050,
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center py-4 px-4 position-relative d-flex flex-column align-items-center">
              <button
                type="button"
                className="btn-close position-absolute"
                style={{ right: 16, top: 16 }}
                aria-label="Close"
                onClick={handleSuccessModalClose}
              ></button>
              <CheckCircleIcon style={{ fontSize: 60, color: "green", margin: "0 auto" }} />
              <h4 className="fw-bold mt-3 mb-2">
                Discount Code Submitted Successfully!
              </h4>
              <h5 className="text-dark mt-2">Code ID</h5>
              <h5 className="text-secondary">{discountCode}</h5>
              <h5 className="text-dark mt-2">Estimated activation: within 6 hours</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
