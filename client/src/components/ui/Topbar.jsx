import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  // Button,
} from "@mui/material";
import UserProfileMenu from "./UserProfileMenu";
import { Menu as MenuIcon, Search, ShoppingCart, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "./Button";
import Constants from "../../constants/constants";
import TextInput from "./TextInput";

const Topbar = ({ onToggleSidebar, open }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser); //undefined show
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // color: (theme) => theme.palette.text.secondary.ma,
      }}
      // color=(theme)=>theme.palette.secondary.light
      elevation={1}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Toggle for Mobile Only */}
        <IconButton
          onClick={onToggleSidebar}
          sx={{ display: { xs: "inline-flex" }, color: "white" }}
        >
          {!open ? <MenuIcon size={20} /> : <X size={20} />}
        </IconButton>

        <Typography variant="h6" noWrap sx={{ color: "white" }}>
          {currentUser.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Search Icon & Input - Visible for USER role */}
          {currentUser?.role === Constants.USER_ROLE.USER && (
            <TextInput
              // icon={<Search />}
              placeholder="Search the item"
              // sx={{ width: { xs: "150px", sm: "200px", md: "250px" }? }} // Make responsive
            />
          )}

          {/* Cart Icon - Visible for USER role */}
          {currentUser?.role === Constants.USER_ROLE.USER && (
            <IconButton sx={{ color: "white" }}>
              <ShoppingCart />
            </IconButton>
          )}

          {/* Profile Menu or Login Button */}
          {currentUser ? (
            <UserProfileMenu />
          ) : (
            <Button variant="contained" sx={{ color: "white" }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
