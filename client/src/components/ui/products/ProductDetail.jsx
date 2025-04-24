import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Typography, Grid, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import products from "./Product.json";

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", marginTop: 4 }}
      >
        Product not found!
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        maxWidth: "1200px",
        mx: "auto",
        my: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {product.title}
      </Typography>

      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h5" color="primary" fontWeight={700}>
              ₹{product.price}
              {product.mrp && product.mrp > product.price && (
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    ml: 1,
                    textDecoration: "line-through",
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  ₹{product.mrp}
                </Typography>
              )}
            </Typography>

            <Typography mt={1} variant="body1" color="secondary">
              Rating: {product.rating} / 5 ({product.reviews} reviews)
            </Typography>

            <Typography mt={2}>
              <strong>Available Size:</strong> {product.unit}
            </Typography>
            <Typography>
              <strong>Delivery:</strong>{" "}
              {product.delivery_details.estimated_delivery}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Delivery Fee: ₹{product.delivery_details.delivery_fee}
            </Typography>

            <Box mt={2}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Offers:
              </Typography>
              <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                {product.offers.map((offer, i) => (
                  <li key={i}>
                    <Typography variant="body2" color="text.secondary">
                      {offer}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>

            <Box mt={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mb: 2,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: 2,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: "#fff",
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Related Products */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Related Products
        </Typography>
        <Grid container spacing={2}>
          {product.related_products.map((related) => (
            <Grid item xs={12} sm={6} md={3} key={related.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={related.image}
                    alt={related.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography mt={1} fontWeight="bold">
                  {related.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                  ₹{related.price}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetail;
