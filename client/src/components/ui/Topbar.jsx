import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Badge,
  Divider,
  Chip,
} from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu as MenuIcon, ShoppingCart, X } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import UserProfileMenu from "./UserProfileMenu";
import Button from "./Button";
import TextInput from "./TextInput";
import CartModal from "./CartModal";
import { allowedRoles, isRolePath } from "../../utils/isRolePath";

const Topbar = ({ onToggleSidebar, open }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const isRoleRoute = isRolePath(location.pathname, [
    "admin",
    "shopkeeper",
    "deliveryboy",
  ]);

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [cartOpen, setCartOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => navigate("/login");
  console.log(currentUser?.role);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
        elevation={1}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", px: 2, flexWrap: "wrap" }}
        >
          {/* Sidebar toggle / Logo  */}
          {/* only by user with role */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {currentUser && isRoleRoute && (
              <IconButton
                onClick={onToggleSidebar}
                sx={{ color: "white" }}
                aria-label="Toggle Sidebar"
              >
                {open ? <X size={20} /> : <MenuIcon size={20} />}
              </IconButton>
            )}

            {/* Optional logo/brand */}
            <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
              ShopMate
            </Typography>
          </Box>

          {/* Middle Section - Navigation + Search */}
          {/* only by user without role */}
          {!isMobile && currentUser?.role && !isRoleRoute && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {allowedRoles.includes(currentUser.role) && (
                <Chip
                  label={`${currentUser.role} dashboard`}
                  clickable
                  onClick={() => navigate(`/${currentUser.role}/dashboard`)}
                />
              )}

              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography>Home</Typography>
              </NavLink>
              <NavLink
                to="/products"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography>Products</Typography>
              </NavLink>
              <Typography sx={{ color: "white" }}>Contact</Typography>
              <TextInput size="small" placeholder="Search item" />
            </Box>
          )}

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && currentUser?.role && !isRoleRoute && (
              <IconButton
                onClick={() => {
                  setCartOpen(true);
                  handleMenuClose();
                }}
                sx={{ color: "white" }}
                aria-label="Open Cart"
              >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            )}

            {/* Auth section */}
            {currentUser ? (
              isRoleRoute ? (
                <>
                  <Typography sx={{ color: "white" }}>
                    {currentUser?.name}
                  </Typography>
                  <Button variant="contained" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <UserProfileMenu />
                </Box>
              )
            ) : (
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
            )}

            {/* Mobile Menu */}
            {isMobile && currentUser?.role && !isRoleRoute && (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ color: "white" }}
                  aria-label="Open Menu"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      handleMenuClose();
                    }}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/products");
                      handleMenuClose();
                    }}
                  >
                    Products
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
                  <Divider />
                  <MenuItem>
                    <TextInput
                      size="small"
                      placeholder="Search item"
                      fullWidth
                    />
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setCartOpen(true);
                      handleMenuClose();
                    }}
                  >
                    <ShoppingCart size={18} /> &nbsp;Cart ({itemCount})
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    {currentUser ? (
                      <Button variant="contained" onClick={handleLogout}>
                        Logout
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {currentUser?.role && !isRoleRoute && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {allowedRoles.includes(currentUser.role) && (
                          <Chip
                            label={`${currentUser.role} dashboard`}
                            clickable
                            onClick={() =>
                              navigate(`/${currentUser.role}/dashboard`)
                            }
                          />
                        )}
                      </Box>
                    )}
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Cart modal */}
      <CartModal open={cartOpen} handleClose={() => setCartOpen(false)} />
    </>
  );
};

export default Topbar;
