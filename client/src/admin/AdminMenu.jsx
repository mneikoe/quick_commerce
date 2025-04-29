import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  alpha,
  Badge,
  TableContainer,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  Add,
  CurrencyRupee,
  Search,
  FilterList,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItems,
  updateMenuItem,
} from "../actions/MenuAction";
import { getAllCategories } from "../actions/CategoryAction";
import MenuFormModal from "../components/ui/MenuFormModal";
import { showToast } from "../components/ui/ShowToast";
import Loader from "../components/ui/Loader";

// Premium minimalist theme
const premiumTheme = {
  primary: {
    main: "#3d5a80", // Elegant navy blue
    light: "#f5f8fa",
    dark: "#2b3f58",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#e0fbfc", // Very light cyan
    light: "#f8fdfe",
    dark: "#c2d4d5",
    contrastText: "#3d5a80",
  },
  success: {
    main: "#58a87a", // Elegant green
    light: "#edf7f2",
    dark: "#3e7655",
    contrastText: "#ffffff",
  },
  error: {
    main: "#ee6c4d", // Coral red
    light: "#fcefeb",
    dark: "#b5513a",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#f2cc8f", // Soft yellow
    light: "#fdf7ec",
    dark: "#c7a665",
    contrastText: "#5e4a2c",
  },
  info: {
    main: "#98c1d9", // Light blue
    light: "#eef4f8",
    dark: "#6a97b7",
    contrastText: "#2d3e4e",
  },
  background: {
    default: "#f8f9fb", // Very light grayish blue
    paper: "#ffffff",
    subtle: "#f0f4f7",
  },
  text: {
    primary: "#293241", // Dark blue/gray
    secondary: "#5e6977", // Medium gray
    muted: "#8b96a2", // Light gray
  },
  divider: "#eaeff4",
};

const AdminMenu = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  theme.palette = { ...theme.palette, ...premiumTheme };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { menuItems, loading } = useSelector((state) => state.menu);
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.category
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    dispatch(getMenuItems());
    dispatch(getAllCategories());
  }, [dispatch]);

  const filteredItems = menuItems?.data?.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category?._id === selectedCategory;
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (id) => {
    setItemToDelete(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteMenuItem(itemToDelete));
    showToast("Menu item deleted successfully", "success");
    setConfirmDeleteDialogOpen(false);
  };

  const openModal = (item = null, view = false) => {
    setSelectedItem(item);
    setIsViewMode(view);
    setModalOpen(true);
  };

  const handleCreateOrUpdate = (data) => {
    const action = selectedItem?._id
      ? updateMenuItem(selectedItem._id, data)
      : createMenuItem(data);

    dispatch(action);
    showToast(
      `Menu item ${selectedItem?._id ? "updated" : "created"} successfully`,
      "success"
    );
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setIsViewMode(false);
  };

  if (loading || categoryLoading) return <Loader />;

  return (
    <Box
      sx={{
        p: 0,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Header & Title Bar */}
      <Box
        sx={{
          py: 2.5,
          px: isMobile ? 3 : 4,
          bgcolor: "#ffffff",
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1.5,
              bgcolor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: "-0.3px",
                fontSize: isMobile ? "1.3rem" : "1.5rem",
              }}
            >
              Menu
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.85rem",
              }}
            >
              {filteredItems?.length} items in your catalog
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => openModal()}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            borderRadius: 2,
            px: 2,
            py: 1,
            boxShadow: "0 3px 10px rgba(61, 90, 128, 0.15)",
            textTransform: "none",
            fontSize: "0.95rem",
            fontWeight: 500,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
              boxShadow: "0 4px 12px rgba(61, 90, 128, 0.25)",
            },
            transition: "all 0.25s ease",
          }}
        >
          Add
        </Button>
      </Box>

      <Box
        sx={{
          px: isMobile ? 3 : 4,
          pt: 4,
          pb: 6,
        }}
      >
        {/* Search & Filter Controls */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            bgcolor: "#ffffff",
            boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={3}
            sx={{ width: "100%" }}
          >
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Search
                    sx={{
                      color: theme.palette.text.muted,
                      mr: 1,
                      fontSize: 22,
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#fff",
                  overflow: "hidden",
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                    transition: "all 0.15s ease",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 1,
                  },
                },
              }}
            />

            <FormControl
              size="medium"
              sx={{
                minWidth: isMobile ? "100%" : 240,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#fff",
                  overflow: "hidden",
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 1,
                  },
                },
              }}
            >
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.text.secondary,
                }}
              >
                <FilterList sx={{ fontSize: 20, mr: 0.7 }} />
                Filter by Category
              </InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Filter by Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Menu Items Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Box
            sx={{
              py: 2,
              px: 3,
              bgcolor: theme.palette.primary.light,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: theme.palette.text.primary }}
            >
              Menu Items
            </Typography>
          </Box>

          {/* Added TableContainer with horizontal scroll */}
          <TableContainer sx={{ overflowX: "auto", width: "100%" }}>
            <Table size="medium" sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  {["Name", "Category", "Price", "Status", "Actions"].map(
                    (header, index) => (
                      <TableCell
                        key={header}
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          color: theme.palette.text.secondary,
                          bgcolor: "#ffffff",
                          py: 2,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          ...(index === 4 && { textAlign: "right" }),
                          whiteSpace: "nowrap", // Prevents text wrapping
                        }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredItems?.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow
                      key={item._id}
                      hover
                      sx={{
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.light, 0.4),
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 500,
                          py: 2.5,
                          px: 3,
                          color: theme.palette.text.primary,
                          fontSize: "0.95rem",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          whiteSpace: "nowrap", // Prevents text wrapping
                        }}
                      >
                        {item.title || item.name}
                      </TableCell>

                      <TableCell
                        sx={{
                          py: 2.5,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          whiteSpace: "nowrap", // Prevents text wrapping
                        }}
                      >
                        <Chip
                          label={item.category?.name || "Uncategorized"}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.info.light, 0.7),
                            color: theme.palette.info.dark,
                            fontWeight: 500,
                            borderRadius: 1.5,
                            px: 1,
                            py: 0.5,
                            fontSize: "0.8rem",
                          }}
                        />
                      </TableCell>

                      <TableCell
                        sx={{
                          py: 2.5,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          whiteSpace: "nowrap", // Prevents text wrapping
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                          }}
                        >
                          <CurrencyRupee
                            sx={{
                              fontSize: "0.9rem",
                              color: theme.palette.text.secondary,
                              mr: 0.5,
                            }}
                          />
                          {item.price.toFixed(2)}
                        </Box>
                      </TableCell>

                      <TableCell
                        sx={{
                          py: 2.5,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          whiteSpace: "nowrap", // Prevents text wrapping
                        }}
                      >
                        {item.isAvailable ? (
                          <Chip
                            label="Available"
                            size="small"
                            sx={{
                              bgcolor: alpha(theme.palette.success.light, 0.7),
                              color: theme.palette.success.dark,
                              fontWeight: 500,
                              borderRadius: 1.5,
                              width: 110,
                              py: 0.5,
                              fontSize: "0.8rem",
                            }}
                          />
                        ) : (
                          <Chip
                            label="Out of Stock"
                            size="small"
                            sx={{
                              bgcolor: alpha(theme.palette.error.light, 0.7),
                              color: theme.palette.error.dark,
                              fontWeight: 500,
                              borderRadius: 1.5,
                              width: 110,
                              py: 0.5,
                              fontSize: "0.8rem",
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          pr: 3,
                          py: 2.5,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          whiteSpace: "nowrap", // Prevents text wrapping for actions
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Tooltip title="View Details" arrow>
                            <IconButton
                              onClick={() => openModal(item, true)}
                              sx={{
                                color: theme.palette.info.main,
                                borderRadius: 1.5,
                                "&:hover": {
                                  bgcolor: alpha(theme.palette.info.light, 0.3),
                                },
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit Item" arrow>
                            <IconButton
                              onClick={() => openModal(item, false)}
                              sx={{
                                color: theme.palette.primary.main,
                                borderRadius: 1.5,
                                "&:hover": {
                                  bgcolor: alpha(
                                    theme.palette.primary.light,
                                    0.3
                                  ),
                                },
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Item" arrow>
                            <IconButton
                              onClick={() => handleDelete(item._id)}
                              sx={{
                                color: theme.palette.error.main,
                                borderRadius: 1.5,
                                "&:hover": {
                                  bgcolor: alpha(
                                    theme.palette.error.light,
                                    0.3
                                  ),
                                },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        py: 8,
                        textAlign: "center",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box sx={{ maxWidth: 400, mx: "auto" }}>
                        <Typography
                          variant="h6"
                          color={theme.palette.text.secondary}
                          sx={{ mb: 1, fontWeight: 500 }}
                        >
                          No menu items found
                          {searchQuery || selectedCategory !== "all"
                            ? " matching filters"
                            : ""}
                        </Typography>

                        <Typography
                          variant="body2"
                          color={theme.palette.text.secondary}
                          sx={{ mb: 3 }}
                        >
                          {searchQuery || selectedCategory !== "all"
                            ? "Try adjusting your search or filter criteria"
                            : "Start by adding menu items to your catalog"}
                        </Typography>

                        {searchQuery || selectedCategory !== "all" ? (
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setSearchQuery("");
                              setSelectedCategory("all");
                            }}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 3,
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                            }}
                          >
                            Clear Filters
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => openModal()}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 3,
                              boxShadow: "0 3px 10px rgba(61, 90, 128, 0.15)",
                              bgcolor: theme.palette.primary.main,
                              "&:hover": {
                                bgcolor: theme.palette.primary.dark,
                              },
                            }}
                          >
                            Add First Item
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Menu Item Modal */}
      <MenuFormModal
        open={modalOpen}
        handleClose={closeModal}
        handleSubmit={handleCreateOrUpdate}
        item={selectedItem}
        viewOnly={isViewMode}
        categories={categories}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ bgcolor: theme.palette.background.paper }}>
          <DialogTitle
            sx={{
              p: 3,
              pb: 2,
              fontWeight: 600,
              color: theme.palette.text.primary,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            Confirm Deletion
          </DialogTitle>

          <DialogContent sx={{ p: 3, pt: 3 }}>
            <Typography variant="body1" color={theme.palette.text.secondary}>
              Are you sure you want to delete this menu item? This action cannot
              be undone.
            </Typography>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 1, gap: 2 }}>
            <Button
              onClick={() => setConfirmDeleteDialogOpen(false)}
              variant="outlined"
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
                borderRadius: 2,
                px: 3,
                "&:hover": {
                  borderColor: theme.palette.text.secondary,
                  bgcolor: alpha(theme.palette.divider, 0.5),
                },
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              startIcon={<Delete />}
              sx={{
                bgcolor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                borderRadius: 2,
                px: 3,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: theme.palette.error.dark,
                  boxShadow: "0 2px 8px rgba(238,108,77,0.3)",
                },
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Delete Item
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AdminMenu;
