import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../actions/CategoryAction";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const openModal = (item = null) => {
    if (item) {
      setFormData({ name: item.name, description: item.description });
      setEditId(item._id);
    } else {
      setFormData({ name: "", description: "" });
      setEditId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: "", description: "" });
    setEditId(null);
  };

  const handleSubmit = () => {
    if (editId) {
      dispatch(updateCategory(editId, formData));
    } else {
      dispatch(createCategory(formData));
    }
    closeModal();
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete._id));
      closeDeleteModal();
    }
  };

  if (loading) return <Loader />;

  return (
    <Box px={{ xs: 2, sm: 3, md: 4 }} py={2}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={3}
        >
          <Grid item xs={12} sm="auto">
            <Typography variant={isXs ? "h6" : "h5"} fontWeight="bold">
              Categories
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              startIcon={<Add />}
              variant="contained"
              fullWidth={isXs}
              onClick={() => openModal()}
            >
              Add Category
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.status}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => openModal(category)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(category)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      {/* Add / Edit Modal */}
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        // fullScreen={isXs}
        sx={{
          "& .MuiDialog-paper": {
            m: isXs ? 0 : 2,
            borderRadius: isXs ? 0 : 2,
          },
        }}
      >
        <DialogTitle>{editId ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            margin="normal"
            value={formData.name}
            InputLabelProps={{
              sx: { color: theme.palette.text.primary },
            }}
            sx={{ color: theme.palette.text.primary }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            InputLabelProps={{
              sx: { color: theme.palette.text.primary },
            }}
            sx={{ color: theme.palette.text.primary }}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        // fullScreen={isXs}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCategory;
