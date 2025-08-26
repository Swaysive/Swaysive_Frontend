import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { catalogApi } from "../../api/catalogApi";

const brands = ["Helimix", "Nike", "Adidas"];
// const products = ["Magic Bullet Blender", "Air Max 90", "Ultraboost"];

const GenerateUrlModal = ({ open, onClose }) => {
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [commission, setCommission] = useState("");
  const swayFee = 5; // Fixed
  const [urlVisible, setUrlVisible] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [products, setProducts] = useState([]);


  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await catalogApi.getProducts();
          console.log("Products fetched successfully:", response.data.products);
  
          // Only take the first 3 products
          const productNames = response.data.products
        .slice(0, 3)
        .map((product) => product.title); // or product.name

      setProducts(productNames);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, []);
  

  const handleGenerate = () => {
    const url = `https://www.amazon.com/Blending-Portable-Cocktails-Smoothies-Dishwasher/dp/B078KCYLZF`;
    setGeneratedUrl(url);
    setUrlVisible(true);
    localStorage.setItem("active", "true");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
  };

  const handleOpen = () => {
    window.open(generatedUrl, "_blank");
  };

  const total = commission ? parseFloat(commission) + swayFee : "";

  const isFormValid = brand && product && commission;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Generate URL
        </Typography>
      </DialogTitle>

      <DialogContent >
        <Grid container spacing={2}>
          {/* Brand Select */}
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={600}>
              Select Brand
            </Typography>
            <TextField
              select
              fullWidth
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setUrlVisible(false);
              }}
            >
              {brands.map((b, i) => (
                <MenuItem key={i} value={b}>
                  {b}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Product Select */}
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={600}>
              Select Product
            </Typography>
            <TextField
              select
              fullWidth
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
                setUrlVisible(false);
              }}
            >
              {products.map((p, i) => (
                <MenuItem key={i} value={p} sx={{
                  width: 450, // Adjust this value as needed
                  overflow: "auto",
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Calculations */}
          {brand && product && (
            <>
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
            </>
          )}

          {/* Generate Button */}
          {brand && product && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                disabled={!isFormValid}
                onClick={handleGenerate}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: 2,
                }}
              >
                Generate URL
              </Button>
            </Grid>
          )}

          {/* URL Display */}
          {urlVisible && (
            <Grid item xs={12}>
              <Typography fontSize={13} mb={0.5}>
                URL
              </Typography>
              <TextField
                fullWidth
                value={generatedUrl}
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCopy}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={handleOpen}>
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}

          {/* Done Button */}
          <Grid item xs={12}>
            <Button
            color="dark"
              fullWidth
              variant="outlined"
              onClick={onClose}
              sx={{ borderRadius: 2 }}
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateUrlModal;
