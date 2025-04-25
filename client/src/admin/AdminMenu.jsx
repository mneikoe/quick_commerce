import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Edit, Delete, Visibility, Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItems,
  updateMenuItem,
} from "../actions/MenuAction";
import MenuFormModal from "../components/ui/MenuFormModal";
import { getAllCategories } from "../actions/CategoryAction";
// import { updateCartQuantity } from "../actions/CartAction";

const AdminMenu = () => {
  const dispatch = useDispatch();
  const { menuItems, loading } = useSelector((state) => state.menu); // assuming state shape
  const { categories } = useSelector((state) => state.category); // assuming state shape
  console.log("menu items", menuItems.data);
  useEffect(() => {
    dispatch(getMenuItems());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      dispatch(deleteMenuItem(id));
    }
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
    // console.log("sleected item", selectedItem);
    if (selectedItem?._id) {
      dispatch(updateMenuItem(selectedItem._id, data));
    } else {
      dispatch(createMenuItem(data));
    }
  };

  return (
    <Box className="p-4">
      <Paper elevation={3} className="p-4">
        <Box className="flex items-center justify-between mb-4">
          <Typography variant="h5" fontWeight="bold">
            Menu Items
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => openModal(null, false)}
          >
            Add New Item
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <div>{menuItems?.data.length}</div>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : menuItems?.data?.length > 0 ? (
              menuItems?.data?.map((item) => (
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
      </Paper>
      <MenuFormModal
        open={modalOpen}
        handleClose={closeModal}
        handleSubmit={handleCreateOrUpdate}
        item={selectedItem}
        viewOnly={isViewMode}
        categories={categories}
      />
    </Box>
  );
};

export default AdminMenu;
