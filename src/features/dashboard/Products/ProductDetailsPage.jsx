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
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import "./ProductDetailsPage.css";
import FacebookIcon from "../../../assets/icons/facebook-icon.svg";
import InstagramIcon from "../../../assets/icons/instagram-icon.svg";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import threeDots from "../../../assets/icons/three-dots-icons.svg";
import AssignInfluencerModal from "../../../components/Assign Influencer Modal/AssignInfluencerModal";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { catalogApi } from "../../../api/catalogApi";
import { usersApi } from "../../../api/usersApi";

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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await catalogApi.getProductDetail(id);
        if (response.data.status === "success") {
          setProduct(response.data.data);
          setVariants(response.data.data.variants || []);
          setInfluencer(response.data.data.overview.influencer)
          // Set active status based on first variant or product status
          if (
            response.data.data.variants &&
            response.data.data.variants[0]?.status === "active"
          ) {
            setActive("Active");
          }
        }
      } catch (error) {
        // Handle error (toast, etc.)
      }
    };
    fetchProductDetail();
    // const value = localStorage.getItem("influencer") === "true";
    // setInfluencer(false);
  }, [id]);

  // Fetch influencers on mount
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = await usersApi.getUsers({ type: "influencer" });
        if (res.data.status === "success") {
          const infs = res.data.data.map((inf, idx) => ({
            ...inf,
            name: `${inf.firstName} ${inf.lastName}`,
            image: randomAvatars[idx % randomAvatars.length],
          }));
          setInfluencers(infs);
        }
      } catch (e) {
        setInfluencers([]);
      }
    };
    fetchInfluencers();
  }, []);

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
    state: { productApiId: product._id, productId: product.overview._id, productTitle: product?.title, productPrice:product?.overview.price, productAsin:product?.overview.variant_sku  }
  });
  };

  // Paginated variants
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedVariants = variants.slice(startIndex, startIndex + pageSize);

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
                      {product?.overview.variant_sku}
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Price:</strong> $
                      {product?.overview.price}
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
                      <strong className="text-dark">Brand:</strong> {product?.brand?.name}
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
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="user"
                      sx={{ width: 180, height: 180, margin: "0 auto 10px" }}
                    />
                    <Typography variant="subtitle1" className="fw-bold">
                      {influencer.firstName} {influencer.lastName}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                      {influencer.firstName}
                    </Typography> */}
                    {/* <div className="d-flex justify-content-center align-items-center mt-2 gap-2">
                      <img src={FacebookIcon} alt="fb" width="16" />
                      <span style={{ color: "#667085", fontSize: "14px" }}>
                        1.5 M
                      </span>
                      <img
                        src={InstagramIcon}
                        alt="ig"
                        width="16"
                        className="ms-3"
                      />
                      <span style={{ color: "#667085", fontSize: "14px" }}>
                        1.5 M
                      </span>
                    </div> */}
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
      </div>
      <AssignInfluencerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onInvite={handleInviteClick}
        productId={product?.overview._id}
        influencers={influencers}
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
