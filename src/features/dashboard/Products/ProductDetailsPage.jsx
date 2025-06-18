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
  //   DialogTitle,
  DialogContent,
} from "@mui/material";
import { Edit, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import "./ProductDetailsPage.css";
import FacebookIcon from "../../../assets/icons/facebook-icon.svg";
import InstagramIcon from "../../../assets/icons/instagram-icon.svg";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
import ProductImage from "../../../assets/icons/product-image1.svg";
import { useLocation } from "react-router-dom";
import threeDots from "../../../assets/icons/three-dots-icons.svg";
import AssignInfluencerModal from "../../../components/Assign Influencer Modal/AssignInfluencerModal";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const analyticsData = [
  {
    date: "2023-06-01",
    price: "$39.88",
    traffic: "125",
    sold: "12",
    rate: "10%",
    trend: "up",
  },
  {
    date: "2023-06-02",
    price: "$39.88",
    traffic: "126",
    sold: "16",
    rate: "10%",
    trend: "down",
  },
  {
    date: "2023-06-03",
    price: "$39.88",
    traffic: "5k",
    sold: "14",
    rate: "5%",
    trend: "up",
  },
  {
    date: "2023-06-04",
    price: "$39.88",
    traffic: "2k",
    sold: "4",
    rate: "12%",
    trend: "up",
  },
  {
    date: "2023-06-05",
    price: "$39.88",
    traffic: "1.5K",
    sold: "20",
    rate: "10%",
    trend: "up",
  },
  {
    date: "2023-06-06",
    price: "$39.88",
    traffic: "1.2K",
    sold: "18",
    rate: "9%",
    trend: "down",
  },
  {
    date: "2023-06-07",
    price: "$39.88",
    traffic: "1.8K",
    sold: "22",
    rate: "11%",
    trend: "up",
  },
  {
    date: "2023-06-08",
    price: "$39.88",
    traffic: "1.3K",
    sold: "15",
    rate: "8%",
    trend: "down",
  },
  {
    date: "2023-06-09",
    price: "$39.88",
    traffic: "1.6K",
    sold: "19",
    rate: "10%",
    trend: "up",
  },
  {
    date: "2023-06-10",
    price: "$39.88",
    traffic: "1.4K",
    sold: "17",
    rate: "9%",
    trend: "down",
  },
];

const ProductDetailsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [influencer, setInfluencer] = useState(false);
  const [active, setActive] = useState("Inactive");
  // const [active, setIsActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
   const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
  const product = location.state?.product;
  // Calculate paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = analyticsData.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    const value = localStorage.getItem("influencer") === "true";
    const activeValue = localStorage.getItem("active") === "true";
    setInfluencer(value);
    // setIsActive(activeValue);
    if (activeValue) {
      setActive('Active');
    }
  }, []);

  const handleAssign = () => {
    localStorage.setItem("influencer", "true");
    setInfluencer(true);
    setModalOpen(false);
  };

  // const handleInvite = () => {
  //   localStorage.setItem("influencer", "true");
  //   setInfluencer(true);
  //   setModalOpen(false);
  // };

  // Total pages
  const totalPages = Math.ceil(analyticsData.length / pageSize);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleInviteClick = () => {
    setInviteModalOpen(true);
  };

  const handleInviteModalClose = () => {
    setInviteModalOpen(false);
    // setEmail(""); 
  };

  const handleInvite = () => {
    console.log("Inviting influencer with email:", email);
    // Add logic for inviting influencer here
    handleInviteModalClose();
    setSuccessModalOpen(true); // Open success modal after inviting
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setEmail("");
  };

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
                <Tooltip title={product?.title || ""} placement="top">
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
                  src={product?.image}
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
                <Typography variant="h6" className="fw-bold" gutterBottom>
                  Product Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">ASIN:</strong>{" "}
                      {product?.asin}
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Price:</strong> $
                      {product?.price}
                    </div>

                    <div className="d-flex align-items-center mb-2 ">
                      <strong>Commission: </strong>
                      <span
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          fontSize: "12px",
                          padding: "4px 5px",
                          borderRadius: "10px",
                        }}
                      >
                        20.00% <Edit fontSize="small" sx={{ fontSize: 16 }} />{" "}
                      </span>
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Availability:</strong> In
                      Stock
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Brand:</strong> Helmix
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Category:</strong> Shaker
                      Bottles
                    </div>
                    <div className="mb-2" style={{ color: "#667085" }}>
                      <strong className="text-dark">Best Seller Rank: </strong>
                      {product?.best_seller_rank}
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
                                active === "Active"
                                  ? "#4CAF50"
                                  : "#9e9e9e",
                              ml: 1,
                            }}
                          />
                        }
                        sx={{
                          backgroundColor:
                            active === "Active" ? "#e6f4ea" : "#f4f4f5",
                          color:
                            active === "Active" ? "#4CAF50" : "#9e9e9e",
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
          <div className="col-md-2 col-lg-2">
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
                      alt="Influencer"
                      sx={{ width: 180, height: 180, margin: "0 auto 10px" }}
                    />
                    <Typography variant="subtitle1" className="fw-bold">
                      John Thompson
                    </Typography>
                    <div className="d-flex justify-content-center align-items-center mt-2 gap-2">
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
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setModalOpen(true)}
                    variant="outlined"
                    sx={{ mr: 1, color: "#000", borderColor: "#000" }}
                  >
                    Assign Influencer
                  </Button>
                )}
                <div>
                  {/* <Avatar
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Influencer"
                sx={{ width: 100, height: 100, margin: "0 auto 10px" }}
              />
              <Typography variant="subtitle1">John Thompson</Typography>
              <div className="d-flex justify-content-center align-items-center mt-2 gap-2">
                <img src={FacebookIcon} alt="fb" width="16" />
                <span style={{ color: "#667085", fontSize: "14px" }}>1.5M</span>
                <img src={InstagramIcon} alt="ig" width="16" className="ms-3" />
                <span style={{ color: "#667085", fontSize: "14px" }}>1.5M</span>
              </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
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
                  <TableCell>Unit Sold</TableCell>
                  <TableCell>Conversion Rate</TableCell>
                  <TableCell>Increased/Decreased</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.traffic}</TableCell>
                    <TableCell>{row.sold}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>
                      {row.trend === "up" ? (
                        <ArrowUpward color="success" fontSize="small" />
                      ) : (
                        <ArrowDownward color="error" fontSize="small" />
                      )}
                    </TableCell>
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
                Showing {paginatedData.length} of {analyticsData.length} entries
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
        onAssign={handleAssign}
        onInvite={handleInviteClick}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
            // sx={{ mt: 2 }}
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
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleSuccessModalClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {/* Success Icon and Message */}
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
