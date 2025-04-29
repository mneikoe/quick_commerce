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
} from "@mui/material";
import { Edit, Delete, Visibility, Add } from "@mui/icons-material";

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

const AdminMenu = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { menuItems, loading } = useSelector((state) => state.menu);
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getMenuItems());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    setConfirmDeleteDialogOpen(true);
    setItemToDelete(id);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteMenuItem(itemToDelete));
    showToast("Menu item deleted successfully", "success");
    setConfirmDeleteDialogOpen(false);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const openModal = (item = null, view = false) => {
    setSelectedItem(item);
    setIsViewMode(view);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setIsViewMode(false);
  };

  const handleCreateOrUpdate = (data) => {
    if (selectedItem?._id) {
      dispatch(updateMenuItem(selectedItem._id, data));
      showToast("Updated menu successfully", "success");
    } else {
      dispatch(createMenuItem(data));
      showToast("Created menu successfully", "success");
    }
  };

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  if (loading) {
    <Loader />;
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 4 }}>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          spacing={2}
          mb={3}
        >
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
            Menu Items
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => openModal(null, false)}
            fullWidth={isMobile}
          >
            Add New Item
          </Button>
        </Stack>

        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuItems?.data?.length > 0 ? (
                menuItems?.data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title || item.name}</TableCell>
                    <TableCell>{item.category?.name || "-"}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton
                          color="info"
                          onClick={() => openModal(item, true)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => openModal(item, false)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No menu items found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      {/* Modal for Add/Edit/View */}
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
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this menu item?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDeleteDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminMenu;
