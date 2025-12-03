import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Select,
  TextField,
  MenuItem,
  Pagination,
  Box,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
// import { Edit } from "@mui/icons-material";
import "./ProductDetailsPage.css";
// import FacebookIcon from "../../../assets/icons/facebook-icon.svg";
// import InstagramIcon from "../../../assets/icons/instagram-icon.svg";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import threeDots from "../../../assets/icons/three-dots-icons.svg";
import AssignInfluencerModal from "../../../components/Assign Influencer Modal/AssignInfluencerModal";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { catalogApi } from "../../../api/catalogApi";
import { usersApi } from "../../../api/usersApi";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const randomAvatars = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
];

const ProductDetailsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [influencer, setInfluencer] = useState(null);
  const [active, setActive] = useState("Inactive");
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  // const [influencer, setInfluencer] = useState(null);
  const [variants, setVariants] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [assignedInfluencer, setAssignedInfluencer] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsPage, setAnalyticsPage] = useState(1);
  const [analyticsPageSize, setAnalyticsPageSize] = useState(5);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [discountCodesLoading, setDiscountCodesLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [productdetailloading, setProductDetailLoading] = useState(true);
  const [influencersloading, setInfluencersLoading] = useState(true);
  const [discountcodeloading, setDiscountCodeLoading] = useState(true);
  const [analyticloading, setAnalyticLoading] = useState(true);
  const loading =
    productdetailloading ||
    influencersloading ||
    discountcodeloading ||
    analyticloading;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await catalogApi.getProductDetail(id);
        if (response.data.status === "success") {
          setProduct(response.data.data);
          setVariants(response.data.data.variants || []);
          // Get influencer from overview
          setInfluencer(response.data.data.overview?.influencer);
          // Set active status based on overview or first variant
          if (response.data.data.overview?.status === "active") {
            setActive("Active");
          }
        }
      } catch (error) {
        // Handle error (toast, etc.)
      } finally {
        setProductDetailLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  // Fetch influencers on mount
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = await usersApi.getUsers({ type: "influencer" });
        if (res.data.status === "success") {
          const infs = res.data.data.map((inf, idx) => ({
            ...inf,
            firstName: inf.first, // Map to firstName for consistency
            lastName: inf.last,   // Map to lastName for consistency
            name: `${inf.first} ${inf.last}`,
            image: randomAvatars[idx % randomAvatars.length],
          }));
          setInfluencers(infs);
        }
      } catch (e) {
        setInfluencers([]);
      } finally {
        setInfluencersLoading(false);
      }
    };
    fetchInfluencers();
  }, []);

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      if (!product?.id) {
        setDiscountCodeLoading(false);
        return;
      }
      setDiscountCodesLoading(true);
      try {
        const res = await catalogApi.productCodes(product.id);
        if (res.data.status === "success") {
          setDiscountCodes(res.data.data);
        }
      } catch (e) {
        console.error("Error fetching discount codes:", e);
        setDiscountCodes([]);
      } finally {
        setDiscountCodesLoading(false);
        setDiscountCodeLoading(false);
      }
    };
    fetchDiscountCodes();
  }, [product?.id]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!product?.id) {
        setAnalyticLoading(false);
        return;
      }
      setAnalyticsLoading(true);
      try {
        const res = await catalogApi.productAnalytics(product.id);
        if (res.data.status === "success") {
          setAnalytics(res.data.data);
        }
      } catch (e) {
        console.error("Error fetching analytics:", e);
        setAnalytics([]);
      } finally {
        setAnalyticsLoading(false);
        setAnalyticLoading(false);
      }
    };
    fetchAnalytics();
  }, [product?.id]);

  const handleAssign = () => {
    localStorage.setItem("influencer", "true");
    // setInfluencer(true);
    setModalOpen(false);
  };

  // Handler when influencer is assigned
  const handleAssignInfluencer = (influencerId) => {
    const inf = influencers.find((i) => i.id === influencerId);
    setAssignedInfluencer(inf);
    // setInfluencer(true);
    // setModalOpen(false);
  };

  const totalPages = Math.ceil(variants.length / pageSize);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const handleInviteClick = () => {
    setInviteModalOpen(true);
  };

  const handleInviteModalClose = () => {
    setInviteModalOpen(false);
  };

  const handleInvite = () => {
    // Add logic for inviting influencer here
    handleInviteModalClose();
    setSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setEmail("");
  };

  const handleCreateCoupon = () => {
    // navigate(`/create-discount-code/${product.overview._id}`);
    navigate("/create-discount-code", {
      state: {
        productApiId: product.id,
        productId: product.overview.id,
        productTitle: product?.title,
        productPrice: product?.overview.price,
        productAsin: product?.overview.variant_sku,
      },
    });
  };

  // Paginated variants
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedVariants = variants.slice(startIndex, startIndex + pageSize);

  // Analytics pagination
  const analyticsTotalPages = Math.ceil(analytics.length / analyticsPageSize);
  const analyticsPaginated = analytics.slice(
    (analyticsPage - 1) * analyticsPageSize,
    analyticsPage * analyticsPageSize
  );

  const handleAnalyticsPageChange = (event, value) => {
    setAnalyticsPage(value);
  };

  const handleAnalyticsPageSizeChange = (event) => {
    setAnalyticsPageSize(event.target.value);
    setAnalyticsPage(1);
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
    <>
      <div className="py-4">
        <div className="col-12 mb-4">
          <DashboardHeader
            headerText="Your Products"
            bodyText="Review and update your creator-facing brand details and logo for each brand"
          />
        </div>

        <div className="row row-container">
          <div className="col-md-3 col-lg-3">
            <Card className="mb-3" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" className="fw-bold" gutterBottom>
                  Product Overview
                </Typography>
                <Tooltip title={product?.name || ""} placement="top">
                  <Typography
                    variant="body2"
                    className="mb-2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product?.title}
                  </Typography>
                </Tooltip>
                <a
                  href="#"
                  className="text-dark fw-bold text-decoration-none mb-2 d-block"
                >
                  Amazon Detail Page
                </a>
                <img
                  src={product?.images[1] || "https://via.placeholder.com/100"}
                  alt="Product"
                  className="img-thumbnail"
                  width="100"
                />
              </CardContent>
            </Card>
          </div>

          <div className="col-md-5 col-lg-5">
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Typography variant="h6" className="fw-bold" gutterBottom>
                    Product Details
                  </Typography>
                  <Button
                    onClick={handleCreateCoupon}
                    variant="outlined"
                    sx={{
                      mr: 0,
                      color: "#000",
                      borderColor: "#000",
                      width: "auto",
                    }}
                  >
                    Create Discount Code
                  </Button>
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">ASIN:</strong>{" "}
                      {product?.overview?.variant_sku}
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Price:</strong> $
                      {product?.overview?.price}
                    </div>

                    <div className="d-flex align-items-center mb-2 ">
                      <strong>Commission: </strong>
                      {/* <span
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          fontSize: "12px",
                          padding: "4px 5px",
                          borderRadius: "10px",
                        }}
                      >
                        20.00% <Edit fontSize="small" sx={{ fontSize: 16 }} />{" "}
                      </span> */}
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Availability:</strong> In
                      Stock
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Brand:</strong>{" "}
                      {product?.brand?.name}
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Category:</strong>
                      {product?.overview?.best_sellers_rank?.[0]?.category}
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Best Seller Rank: </strong>
                      {product?.overview?.best_sellers_rank?.[0]?.rank}
                      {/* {product?.overview?.best_seller_rank?.[0]?.rank} */}
                    </div>
                    <div>
                      <strong>Status: </strong>
                      <Chip
                        label={active}
                        size="small"
                        icon={
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor:
                                active === "Active" ? "#4CAF50" : "#9e9e9e",
                              ml: 1,
                            }}
                          />
                        }
                        sx={{
                          backgroundColor:
                            active === "Active" ? "#e6f4ea" : "#f4f4f5",
                          color: active === "Active" ? "#4CAF50" : "#9e9e9e",
                          fontWeight: 600,
                          pl: 1,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>

          {/* Right: Influencer */}
          <div className="col-md-3 col-lg-3">
            <Card sx={{ height: "100%" }}>
              <CardContent className="text-center">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Typography variant="h6" className="fw-bold" gutterBottom>
                    Influencer
                  </Typography>
                  <img src={threeDots} style={{ height: "20px" }} />
                </div>
                {influencer ? (
                  <div>
                    <Avatar
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user"
                      sx={{ width: 180, height: 180, margin: "0 auto 10px" }}
                    />
                    <Typography variant="subtitle1" className="fw-bold">
                      {influencer.first} {influencer.last}
                    </Typography>
                  </div>
                ) : (
                  <Button
                    onClick={() => setModalOpen(true)}
                    variant="outlined"
                    sx={{
                      mr: 0,
                      color: "#000",
                      borderColor: "#000",
                      width: "100%",
                    }}
                  >
                    Assign Influencer
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Variant Details Table */}
        <div className="mt-4">
          <Typography variant="h6" gutterBottom>
            Variant Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#F0F0F2" }}>
                <TableRow>
                  <TableCell>SKU</TableCell>
                  <TableCell>Attributes</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Campaign Status</TableCell>
                  <TableCell>Applied Codes</TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedVariants.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar
                          src={variant.images?.[1] || ""}
                          alt="variant"
                          sx={{ width: 40, height: 40 }}
                        />
                        <span>{variant.sku}</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {/* {Object.entries(variant.attributes || {})
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")} */}
                      {variant.attributes.color}
                    </TableCell>
                    <TableCell>${variant.price}</TableCell>
                    <TableCell>
                      {/* Placeholder, replace with real data if available */}
                      <Chip
                        label={
                          variant.status === "active" ? "Active" : "Inactive"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {/* Placeholder, replace with real data if available */}
                      {variant.discountCode ? variant.discountCode : "N/A"}
                    </TableCell>
                    {/* <TableCell>
                      
                      <Button size="small" variant="outlined">
                        Apply Code
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              size="small"
            />
            <div className="d-flex align-items-center gap-2">
              <Typography variant="body2">
                Showing {paginatedVariants.length} of {variants.length} entries
              </Typography>
              <Select
                size="small"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <MenuItem value={5}>Show 5</MenuItem>
                <MenuItem value={10}>Show 10</MenuItem>
                <MenuItem value={25}>Show 25</MenuItem>
              </Select>
            </div>
          </div>
        </div>

        {/* Discount Codes Table */}
        <div className="mt-4">
          <Typography variant="h6" gutterBottom>
            Discount Codes
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#F0F0F2" }}>
                <TableRow>
                  <TableCell>Discount Code</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Applies To</TableCell>
                  <TableCell>Valid From</TableCell>
                  <TableCell>Valid To</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discountCodesLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : discountCodes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No discount codes found.
                    </TableCell>
                  </TableRow>
                ) : (
                  discountCodes.map((code, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{code.discountCode}</TableCell>
                      <TableCell>{code.type}</TableCell>
                      <TableCell>
                        {code.type === "percentage"
                          ? `${code.amount}%`
                          : `$${code.amount}`}
                      </TableCell>
                      <TableCell>{code.appliesTo.length} variant(s)</TableCell>
                      <TableCell>
                        {code.validFrom
                          ? new Date(code.validFrom).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {code.validTo
                          ? new Date(code.validTo).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            code.status === "active" ? "Active" : "Inactive"
                          }
                          size="small"
                          color={
                            code.status === "active" ? "success" : "default"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Analytics Table */}
        <div className="mt-4">
          <Typography variant="h6" gutterBottom>
            Analytics
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#F0F0F2" }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Traffic</TableCell>
                  <TableCell>Units Sold</TableCell>
                  <TableCell>Conversion Rate</TableCell>
                  <TableCell>Increased/Decreased</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analyticsLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : analytics.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No analytics data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  analytics.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>${row.price}</TableCell>
                      <TableCell>{row.clicks}</TableCell>
                      <TableCell>{row.unitsSold}</TableCell>
                      <TableCell>{row.conversionRate}</TableCell>
                      <TableCell>
                        <span>
                          {row.change > 0 ? (
                            <ArrowUpwardIcon
                              sx={{ color: "green", fontSize: 18 }}
                            />
                          ) : row.change < 0 ? (
                            <ArrowDownwardIcon
                              sx={{ color: "red", fontSize: 18 }}
                            />
                          ) : (
                            "-"
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Pagination
              count={analyticsTotalPages}
              page={analyticsPage}
              onChange={handleAnalyticsPageChange}
              shape="rounded"
              size="small"
            />
            <div className="d-flex align-items-center gap-2">
              <Typography variant="body2">
                Showing {analyticsPaginated.length} of {analytics.length}{" "}
                entries
              </Typography>
              <Select
                size="small"
                value={analyticsPageSize}
                onChange={handleAnalyticsPageSizeChange}
              >
                <MenuItem value={5}>Show 5</MenuItem>
                <MenuItem value={10}>Show 10</MenuItem>
                <MenuItem value={25}>Show 25</MenuItem>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <AssignInfluencerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onInvite={handleInviteClick}
        productId={product?.id}
        product={product}
        influencers={influencers}
        variants={variants}
        onAssign={handleAssignInfluencer}
      />

      {/* Invite Influencer Modal */}
      <Dialog open={inviteModalOpen} onClose={handleInviteModalClose}>
        <DialogContent>
          <h5 className="fw-bold">Invite Influencer</h5>
          <label className="mt-3 text-disable">Email address </label>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="mt-3"
            onClick={handleInvite}
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              width: "100%",
              borderRadius: 2,
            }}
          >
            Invite
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={successModalOpen} onClose={handleSuccessModalClose}>
        <DialogContent className="position-relative text-center py-4 px-5">
          <IconButton
            aria-label="close"
            onClick={handleSuccessModalClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <CheckCircleIcon style={{ fontSize: 50, color: "green" }} />
          <h5 className="fw-bold mt-3 mb-3">Invitation Sent!</h5>
          <p className="text-muted mb-0">
            We have sent an invitation to “{email}” <br />
            to join Swaysive.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetailsPage;
