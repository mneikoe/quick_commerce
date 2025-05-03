import React, { useState, useEffect } from "react";
import {
  Compass,
  DollarSign,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShoppingCart,
  Truck,
  Search,
  User,
  Menu,
  X,
  ChevronRight,
  Star,
  ChevronLeft,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Clock,
  Shield,
  Award,
} from "lucide-react";
import ProductGrid from "../components/ui/products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
  Button as MuiButton,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getMenuItems } from "../actions/MenuAction";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getSubcategories } from "../actions/CategoryAction";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const topDeals = [
  {
    name: "Fresh Berries",
    discount: "30% OFF",
    image: "/api/placeholder/120/120",
    color: "#EF4444",
  },
  {
    name: "Dairy Products",
    discount: "25% OFF",
    image: "/api/placeholder/120/120",
    color: "#3B82F6",
  },
  {
    name: "Breakfast Items",
    discount: "Buy 2 Get 1",
    image: "/api/placeholder/120/120",
    color: "#F59E0B",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    comment:
      "Fastest delivery I've ever experienced! My groceries arrived in just 25 minutes.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    comment:
      "The quality of fruits and vegetables is consistently excellent. Very happy customer!",
    rating: 4,
  },
  {
    name: "Amit Singh",
    comment:
      "Great prices and amazing customer service. My go-to grocery app now.",
    rating: 5,
  },
];

const DealsSection = () => {
  return (
    <Grid container spacing={2}>
      {topDeals.map((deal, idx) => (
        <Grid item xs={12} sm={4} key={idx}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card
              sx={{
                position: "relative",
                height: 180,
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: deal.color,
                color: "white",
                boxShadow: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  px: 3,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Chip
                    label={deal.discount}
                    color="primary"
                    sx={{
                      bgcolor: "white",
                      color: deal.color,
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {deal.name}
                  </Typography>
                  <MuiButton
                    variant="contained"
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: "white",
                      color: deal.color,
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                      borderRadius: 20,
                    }}
                    endIcon={<ChevronRight size={16} />}
                  >
                    Shop Now
                  </MuiButton>
                </Box>
                <Box
                  sx={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={deal.image}
                    alt={deal.name}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 1,
                      objectFit: "cover",
                      boxShadow: 3,
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  size = "medium",
  ...props
}) => {
  const baseClasses = "font-medium transition-all focus:outline-none";

  const sizeClasses = {
    small: "text-sm px-3 py-1.5 rounded-lg",
    medium: "text-base px-4 py-2 rounded-xl",
    large: "text-lg px-6 py-3 rounded-xl",
  };

  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700 shadow-md",
    outlined: "border-2 border-green-600 text-green-700 hover:bg-green-50",
    text: "text-green-700 hover:text-green-800 hover:underline",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
const CategoryCarousel = ({ categories }) => {
  const theme = useTheme();

  // More precise responsive configuration
  const responsive = {
    xxl: {
      breakpoint: { max: 4000, min: 1800 },
      items: 8,
      partialVisibilityGutter: 20,
    },
    xl: {
      breakpoint: { max: 1800, min: 1536 },
      items: 7,
      partialVisibilityGutter: 20,
    },
    lg: {
      breakpoint: { max: 1536, min: 1200 },
      items: 6,
      partialVisibilityGutter: 20,
    },
    md: {
      breakpoint: { max: 1200, min: 900 },
      items: 5,
      partialVisibilityGutter: 15,
    },
    sm: {
      breakpoint: { max: 900, min: 600 },
      items: 4,
      partialVisibilityGutter: 15,
    },
    xs: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 0.5, sm: 2 },
        mx: { xs: -0.5, sm: 0 }, // Adjust for item padding
      }}
    >
      <Carousel
        responsive={responsive}
        infinite
        // arrows={!useMediaQuery(theme.breakpoints.down("sm"))}
        showDots={false}
        swipeable
        draggable
        containerClass="category-carousel-container"
        itemClass="category-carousel-item"
        partialVisible={false}
        ssr
      >
        {categories.map((category) => (
          <Box key={category._id} sx={{ px: 0.5 }}>
            <Link
              to={`/category/${category._id}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    bgcolor: "#ffe",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    [theme.breakpoints.down("sm")]: {
                      width: 150,
                      height: 150,
                    },
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      maxWidth: "90%",
                      maxHeight: "90%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    color: "#000",
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

const Footer = () => {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: "grey.900", color: "white", py: 6 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              GroceryExpress
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted online grocery partner delivering freshness and
              savings straight to your doorstep.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton sx={{ color: "white" }}>
                <Facebook size={20} />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Twitter size={20} />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Instagram size={20} />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Linkedin size={20} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                to="/about"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">About Us</Typography>
              </Link>
              <Link
                to="/careers"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Careers</Typography>
              </Link>
              <Link
                to="/blog"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Blog</Typography>
              </Link>
              <Link
                to="/press"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Press</Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Help & Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                to="/contact"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Contact Us</Typography>
              </Link>
              <Link
                to="/faq"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">FAQs</Typography>
              </Link>
              <Link
                to="/support"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Support</Typography>
              </Link>
              <Link
                to="/returns"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Returns</Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Policies
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                to="/privacy"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Privacy Policy</Typography>
              </Link>
              <Link
                to="/terms"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Terms of Service</Typography>
              </Link>
              <Link
                to="/shipping"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Shipping Policy</Typography>
              </Link>
              <Link
                to="/refund"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Typography variant="body2">Refund Policy</Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest updates and offers.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey.700",
                    },
                    "&:hover fieldset": {
                      borderColor: "grey.500",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    py: 1,
                  },
                }}
              />
              <MuiButton
                variant="contained"
                color="primary"
                sx={{ whiteSpace: "nowrap" }}
              >
                Subscribe
              </MuiButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "grey.700" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} GroceryExpress. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
            <img
              src="/images/payment-methods/visa.png"
              alt="Visa"
              style={{ height: 24 }}
            />
            <img
              src="/images/payment-methods/mastercard.png"
              alt="Mastercard"
              style={{ height: 24 }}
            />
            <img
              src="/images/payment-methods/paypal.png"
              alt="PayPal"
              style={{ height: 24 }}
            />
            <img
              src="/images/payment-methods/apple-pay.png"
              alt="Apple Pay"
              style={{ height: 24 }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const TestimonialsSection = () => {
  const theme = useTheme();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box sx={{ py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          What Our Customers Say
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Don't just take our word for it - hear from our happy customers
        </Typography>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 1,
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <Box sx={{ display: "flex", mb: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < testimonial.rating ? "#F59E0B" : "none"}
                      color="#F59E0B"
                    />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
                  "{testimonial.comment}"
                </Typography>
                <Typography variant="subtitle1" fontWeight="medium">
                  - {testimonial.name}
                </Typography>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};
function HeroSection({ isVisible }) {
  return (
    <motion.section
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          bgcolor: "primary.dark",
          color: "white",
          mb: 4,
          boxShadow: 4,
        }}
      >
        {/* Background Image with Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: "100%", md: "50%" },
            height: "100%",
            zIndex: 0,
            display: "block",
          }}
        >
          <Box
            component="img"
            src="/api/placeholder/600/500"
            alt="Fresh Groceries"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,0.2))",
            }}
          />
        </Box>

        {/* Text Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            p: { xs: 3, md: 6 },
            width: { md: "60%" },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 500,
              mb: 1,
              display: "inline-block",
            }}
          >
            Trusted by 50,000+ Customers
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Fresh Groceries, <br />
            <Box component="span" sx={{ color: "secondary.light" }}>
              Delivered Fast
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: "md",
              mb: 3,
              color: "primary.100",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            Your trusted online grocery partner – delivering freshness and
            savings straight to your doorstep in 30 minutes or less!
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
            <Button
              size="large"
              variant="contained"
              sx={{
                minWidth: 150,
                fontWeight: 600,
                px: 3,
                py: 1.5,
                boxShadow: 2,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
              }}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={18} /> Shop Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              className="flex items-center gap-2"
              sx={{
                minWidth: 150,
                color: "white",
                borderColor: "white",
                fontWeight: 600,
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <Compass size={18} /> How It Works
            </Button>
          </Box>

          {/* Features */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              mt: 3,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <Truck size={20} />, text: "Fast Delivery" },
              { icon: <Leaf size={20} />, text: "Organic Options" },
              { icon: <DollarSign size={20} />, text: "Best Prices" },
            ].map((item, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff33",
                  }}
                >
                  {item.icon}
                </motion.div>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </motion.section>
  );
}

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { menuItems, loading } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const theme = useTheme();
  const latestProducts = React.useMemo(() => {
    return [...(menuItems?.data || [])]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }, [menuItems]);

  const trendingProducts = React.useMemo(() => {
    return [...(menuItems?.data || [])]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
  }, [menuItems]);

  // Initial data fetch and animation trigger
  useEffect(() => {
    dispatch(getMenuItems());
    dispatch(getAllCategories());
    dispatch(getAllSubcategories());
    setIsVisible(true);
  }, [dispatch]);

  // Polling with cleanup every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getMenuItems());
      dispatch(getAllCategories());
      dispatch(getAllSubcategories());
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [dispatch]);
  return (
    <Box sx={{ bgcolor: "background.paper", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <HeroSection isVisible={true} />

        {/* Categories Section */}
        <motion.section
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
              Shop by Category
            </Typography>
            <CategoryCarousel categories={categories} />
          </Box>
        </motion.section>
        {/* Features Section */}
        {/* Features Section */}
        <motion.section
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              mb: 6,
              borderRadius: 4,
              // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid",
              borderColor: "transparent",
              backgroundColor: "background.paper",
              // "&:hover": {
              //   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
              // },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: "center",
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                color: "text.primary",
                position: "relative",
                "&:after": {
                  content: '""',
                  display: "block",
                  width: "80px",
                  height: "4px",
                  backgroundColor: "primary.main",
                  margin: "16px auto 0",
                  borderRadius: "2px",
                },
              }}
            >
              Why Shop With Us
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
              {[
                {
                  icon: <Truck size={32} color={theme.palette.primary.main} />,
                  title: "10-Minute Delivery",
                  desc: "Lightning fast delivery in record time",
                  bgColor: "rgba(46, 125, 50, 0.1)", // Green tint
                },
                {
                  icon: <Leaf size={32} color={theme.palette.success.main} />,
                  title: "Farm Fresh",
                  desc: "Direct from farms to your doorstep",
                  bgColor: "rgba(27, 94, 32, 0.1)", // Darker green
                },
                {
                  icon: (
                    <DollarSign size={32} color={theme.palette.warning.main} />
                  ),
                  title: "Best Prices",
                  desc: "Price match guarantee",
                  bgColor: "rgba(255, 160, 0, 0.1)", // Orange tint
                },
                {
                  icon: <Award size={32} color={theme.palette.error.main} />,
                  title: "Quality Assured",
                  desc: "100% quality checked products",
                  bgColor: "rgba(211, 47, 47, 0.1)", // Red tint
                },
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <motion.div
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        p: 3,
                        textAlign: "center",
                        boxShadow: "none",
                        borderRadius: 3,
                        border: "none",
                        backgroundColor: "background.paper",
                        position: "relative",
                        overflow: "hidden",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          backgroundColor: theme.palette.primary.main,
                        },
                        "&:hover": {
                          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
                          "& $iconBox": {
                            transform: "scale(1.1)",
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2.5,
                          mb: 2,
                          backgroundColor: item.bgColor,
                          borderRadius: "50%",
                          color: "primary.main",
                          transition: "transform 0.3s ease",
                        }}
                        className="iconBox"
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1.5,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          color: "text.primary",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Card>
        </motion.section>
        {/* Featured Products */}
        <motion.section
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <Box sx={{ mb: 6 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                New Arrivals
              </Typography>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <Button variant="text" endIcon={<ChevronRight size={16} />}>
                  View All
                </Button>
              </Link>
            </Box>

            <ProductGrid products={latestProducts} />
          </Box>
        </motion.section>
        {/* Testimonials Section */}
        <TestimonialsSection />
        {/* Delivery Info Section */}
        <motion.section
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              mb: 6,
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: "center",
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                color: "text.primary",
                borderCollapse: "transparent",
                position: "relative",
                "&:after": {
                  content: '""',
                  display: "block",
                  width: "80px",
                  height: "4px",
                  backgroundColor: "primary.main",
                  margin: "16px auto 0",
                  borderRadius: "2px",
                },
              }}
            >
              How Our Delivery Works
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
              {[
                {
                  icon: <Search size={32} color={theme.palette.primary.main} />,
                  title: "1. Browse & Order",
                  desc: "Select from 5000+ products",
                  bgColor: "rgba(25, 118, 210, 0.1)",
                },
                {
                  icon: <Clock size={32} color={theme.palette.warning.main} />,
                  title: "2. Fast Processing",
                  desc: "Order prepared in minutes",
                  bgColor: "rgba(255, 160, 0, 0.1)",
                },
                {
                  icon: <Truck size={32} color={theme.palette.success.main} />,
                  title: "3. Lightning Delivery",
                  desc: "At your door in 30 mins",
                  bgColor: "rgba(46, 125, 50, 0.1)",
                },
                {
                  icon: <Shield size={32} color={theme.palette.error.main} />,
                  title: "4. Safe Delivery",
                  desc: "Contactless & hygienic",
                  bgColor: "rgba(211, 47, 47, 0.1)",
                },
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <Card
                      sx={{
                        p: 3,
                        textAlign: "center",
                        borderRadius: 3,
                        backgroundColor: "background.paper",
                        position: "relative",
                        boxShadow: "none",
                        "&:hover": {
                          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2.5,
                          mb: 2,
                          backgroundColor: item.bgColor,
                          borderRadius: "50%",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 1.5 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Card>
        </motion.section>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
