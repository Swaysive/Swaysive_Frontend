import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Avatar,
  TextField, InputAdornment, Box, Typography, Select, MenuItem, IconButton, Dialog, DialogContent, CircularProgress
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DashboardHeader from "../../../components/Headers/DashboardHeader";
// import FacebookIcon from "../../../assets/icons/facebook-icon.svg";
// import InstagramIcon from "../../../assets/icons/instagram-icon.svg";
import "./InfluencerTable.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../../api/usersApi";
import { toast } from "react-toastify";

// 4 random avatars
// const randomAvatars = [
//   "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   "https://cdn-icons-png.flaticon.com/512/149/149071.png"
// ];
const randomAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

const getBrandChip = (brand) => (
  <Chip label={brand} color="primary" size="small" className="me-1 mb-1" />
);

const InfluencerTable = () => {
  const [influencers, setInfluencers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Fetch influencers from API
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await usersApi.getUsers({ type: "influencer" });
        if (response.data.status === "success") {
          // Map API data and assign a random avatar
          const mapped = response.data.data.map((user, idx) => ({
            id: user.id,
            name: `${user.first} ${user.last}`,
            // avatar: randomAvatars[idx % randomAvatars.length],
            avatar: randomAvatar,
            brands: ["Helimix"], // Placeholder, update if you have real data
            status: user.status === "active" ? "Active" : "Pending",
            socials: { fb: "1.5M", ig: "1.5M" }, // Placeholder
            email: user.email
          }));
          setInfluencers(mapped);
        }
      } catch (error) {
        toast.error("Failed to fetch influencers.");
      }
      finally{
        setLoading(false)
      }
    };
    fetchInfluencers();
  }, []);

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = influencers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(influencers.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const handleInviteClick = () => setInviteModalOpen(true);
  const handleInviteModalClose = () => setInviteModalOpen(false);
  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setEmail("");
  };

  const handleInvite = async () => {
    try {
      await usersApi.sendInvitations({ email });
      handleInviteModalClose();
      setSuccessModalOpen(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      handleInviteModalClose();
    }
  };

  const handleInfluencerClick = (id) => {
    navigate(`/seller-home/influencers/details/${id}`);
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
    <div className="row" style={{ marginTop: "50px" }}>
      <div className="col-12 mb-4">
        <DashboardHeader
          headerText="All Influencers"
          bodyText="Here are the list of all the influencers you have invited and are actively running products campaigns."
        />
      </div>
      <Box p={2} component={Paper} sx={{ borderRadius: 2 }}>
        {/* Top Controls */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Box>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#000" }}
              onClick={handleInviteClick}
            >
              Invite Influencer
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#f8f9fa" }}>
              <TableRow>
                <TableCell><strong>Influencers</strong></TableCell>
                {/* <TableCell><strong>Brands</strong></TableCell> */}
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((inf, index) => (
                <TableRow key={inf.id || index}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2} onClick={() => handleInfluencerClick(inf.id)}
                      style={{ cursor: "pointer" }}>
                      <Avatar src={inf.avatar} alt={inf.name} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {inf.name}
                        </Typography>
                        {/* <Box className="social-icons" display="flex" gap={1}>
                          <img src={FacebookIcon} alt="fb" width="16" className="me-1" />
                          {inf.socials.fb}
                          {inf.socials.ig && (
                            <>
                              <img src={InstagramIcon} alt="ig" width="16" className="ms-2 me-1" />
                              {inf.socials.ig}
                            </>
                          )}
                        </Box> */}
                      </Box>
                    </Box>
                  </TableCell>
                  {/* <TableCell>
                    {inf.brands.map((brand, idx) => (
                      <React.Fragment key={idx}>{getBrandChip(brand)}</React.Fragment>
                    ))}
                  </TableCell> */}
                  <TableCell>
                    <Chip
                      label={inf.status}
                      size="small"
                      icon={
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor:
                              inf.status === "Active" ? "#4CAF50" : "#9e9e9e",
                            ml: 1,
                          }}
                        />
                      }
                      sx={{
                        backgroundColor:
                          inf.status === "Active" ? "#e6f4ea" : "#f4f4f5",
                        color: inf.status === "Active" ? "#4CAF50" : "#9e9e9e",
                        fontWeight: 600,
                        pl: 1,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer Controls */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
              <KeyboardArrowLeft />
            </IconButton>
            <Typography variant="body2">{currentPage}</Typography>
            <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              <KeyboardArrowRight />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">
              Showing {paginatedData.length} of {influencers.length} entries
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
          </Box>
        </Box>
      </Box>

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
            We have sent an invitation to “{email}” <br />to join Swaysive.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InfluencerTable;
