import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  TextField,
  Avatar,
  Typography,
  Button,
  Grid,
  InputAdornment,
  Checkbox,
  Box,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { catalogApi } from "../../api/catalogApi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { toast } from 'react-toastify';

// const randomAvatars = [
//   "https://randomuser.me/api/portraits/men/1.jpg",
//   "https://randomuser.me/api/portraits/women/2.jpg",
//   "https://randomuser.me/api/portraits/men/3.jpg",
//   "https://randomuser.me/api/portraits/women/4.jpg"
// ];

const randomAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

const swayFee = 1.5; // Fixed

const AssignInfluencerModal = ({
  open,
  onClose,
  onInvite,
  productId,
  influencers = [],
  variants = [],
  onAssign,
  onSuccess
}) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState("");
  const [selectedInfluencerId, setSelectedInfluencerId] = useState("");
  const [showCommission, setShowCommission] = useState(false);
  const [commission, setCommission] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [affiliateLinks, setAffiliateLinks] = useState([]); // <-- new state

  // Assign influencer to product
  const handleAssign = async () => {
    if (!selectedInfluencerId) return;
    try {
      await catalogApi.assignInfluencerToProduct({
        productId,
        influencerId: selectedInfluencerId,
      });
      setShowCommission(true);
      if (onAssign) onAssign(selectedInfluencerId);
    } catch (error) {
      const errorMessage =
              error.response?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
      // Optionally show error
    }
  };

  const total = commission ? parseFloat(commission) + swayFee : "";

  // Multi-select handler for variants
  const handleVariantChange = (event) => {
    setSelectedVariants(event.target.value);
  };

  // Generate affiliate link (update to handle multiple links)
  const handleGenerate = async () => {
    try {
      const response = await catalogApi.generateAffiliateLink({
        productId,
        influencerId: selectedInfluencerId,
        commissionRate: Number(total),
        variantIds: selectedVariants,
      });
      // Response: { status, message, data: [ { variantId, affiliateLink, ... } ] }
      setAffiliateLinks(response.data.data || []);
      // setSuccessModalOpen(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleSelect = (e) => {
    const inf = influencers.find(i => i.id === e.target.value);
    setSelectedInfluencer(e.target.value);
    setSelectedInfluencerId(inf?.id || "");
    setShowCommission(false);
    setCommission("");
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  const handleOpen = (url) => {
    window.open(url, "_blank");
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    if (onClose) onClose();
  };

  // const total = commission ? parseFloat(commission) + swayFee : "";

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent className="position-relative text-start py-4 px-4" style={{ width: 500 }}>
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={onClose}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" className="fw-bold mb-3 text-black">
            Assign Influencer
          </Typography>

          {/* Select Influencer Dropdown */}
          <TextField
            fullWidth
            select
            label="Select Influencer"
            value={selectedInfluencer}
            onChange={handleSelect}
            className="mb-3"
          >
            {influencers.map((inf, idx) => (
              <MenuItem key={inf.id} value={inf.id}>
                <div className="d-flex align-items-center">
                  <Avatar src={randomAvatar} className="me-2" />
                  <span>{inf.name}</span>
                </div>
              </MenuItem>
            ))}
          </TextField>

          {/* Multi-select Variants Dropdown (moved below influencer input) */}
          <TextField
            select
            fullWidth
            label="Select Variants"
            value={selectedVariants}
            onChange={handleVariantChange}
            SelectProps={{
              multiple: true,
              renderValue: (selected) =>
                selected
                  .map(
                    (id) =>
                      variants.find((v) => v._id === id)?.variant_sku || ""
                  )
                  .join(", "),
            }}
            className="mb-3"
          >
            {variants.map((variant) => (
              <MenuItem key={variant._id} value={variant._id}>
                <Checkbox checked={selectedVariants.indexOf(variant._id) > -1} />
                <Avatar
                  src={variant.images?.[1] || ""}
                  sx={{ width: 32, height: 22, mr: 1 }}
                />
                <ListItemText
                  primary={variant.variant_title}
                  secondary={variant.variant_sku}
                />
              </MenuItem>
            ))}
          </TextField>

          {/* Assign Button */}
          {selectedInfluencer && !showCommission && (
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              onClick={handleAssign}
              className="mb-3"
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              Assign
            </Button>
          )}

          {/* Commission/Fee/Total Calculation */}
          {showCommission && (
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={4}>
                <Typography fontSize={13} mb={0.5}>
                  Affiliate Commission
                </Typography>
                <TextField
                  fullWidth
                  placeholder="10"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    type: "number",
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <Typography align="center" mt={3} fontWeight="bold">
                  +
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography fontSize={13} mb={0.5}>
                  Fees
                  <InfoOutlinedIcon fontSize="inherit" sx={{ ml: 0.5 }} />
                </Typography>
                <TextField
                  fullWidth
                  value={`${swayFee} %`}
                  disabled
                />
              </Grid>

              <Grid item xs={1}>
                <Typography align="center" mt={3} fontWeight="bold">
                  =
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography fontSize={13} mb={0.5}>
                  Total
                  <InfoOutlinedIcon fontSize="inherit" sx={{ ml: 0.5 }} />
                </Typography>
                <TextField fullWidth value={total ? `${total} %` : ""} disabled />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#000" }}
                  disabled={!commission || selectedVariants.length === 0}
                  onClick={handleGenerate}
                  // sx={{ mt: 2 }}
                >
                  Generate Affiliate Link
                </Button>
              </Grid>
            </Grid>
          )}

            {/* URL Display */}
          {affiliateLinks.length > 0 && (
            <div className="mb-3">
              <Typography fontSize={13} mb={1} fontWeight={600}>
                Affiliate Links
              </Typography>
              {affiliateLinks.map((linkObj, idx) => (
                <Box key={linkObj.variantId} mb={2}>
                  <Typography fontSize={12} mb={0.5}>
                    Variant SKU: {variants.find(v => v._id === linkObj.variantId)?.variant_sku || linkObj.variantId}
                  </Typography>
                  <TextField
                    fullWidth
                    value={linkObj.affiliateLink}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => handleCopy(linkObj.affiliateLink)}>
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                          <IconButton onClick={() => handleOpen(linkObj.affiliateLink)}>
                            <OpenInNewIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              ))}
            </div>
          )}

          {/* Done Button */}
          {/* <Grid item xs={12}>
            <Button
            color="dark"
              fullWidth
              variant="outlined"
              onClick={onClose}
              sx={{ borderRadius: 2 }}
            >
              Done
            </Button>
          </Grid> */}

          {/* Invite Influencer Link */}
          {/* <div className="d-flex align-items-center text-primary" onClick={onInvite} style={{ cursor: 'pointer' }}>
            <AddIcon className="me-1" fontSize="small" />
            <Typography variant="body2">Invite Influencer</Typography>
          </div> */}
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successModalOpen} onClose={handleSuccessModalClose}>
        <DialogContent className="text-center py-4 px-5">
          <CheckCircleIcon style={{ fontSize: 50, color: "green" }} />
          <h5 className="fw-bold mt-3 mb-3">Affiliate Links Generated!</h5>
          <Typography className="text-muted mb-0">
            The affiliate links have been generated successfully.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#000" }}
            onClick={handleSuccessModalClose}
            fullWidth
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignInfluencerModal;
