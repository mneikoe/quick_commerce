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
  MenuItem,
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
import { showToast } from "../components/ui/ShowToast";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  console.log(categories);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    existingImage: null,
    status: "active",
  });
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
      setFormData({
        name: item.name,
        description: item.description,
        image: null,
        existingImage: item.image,
        status: item.status || "active",
      });
      setEditId(item._id);
    } else {
      setFormData({
        name: "",
        description: "",
        image: null,
        existingImage: null,
        status: "active",
      });
      setEditId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: "",
      description: "",
      image: null,
      existingImage: null,
      status: "active",
    });
    setEditId(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      showToast("Please fill all required fields", "error");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("status", formData.status);
    if (formData.image) {
      data.append("image", formData.image);
    }

    if (editId) {
      dispatch(updateCategory(editId, data));
      showToast("Category updated successfully", "success");
    } else {
      dispatch(createCategory(data));
      showToast("Category created successfully", "success");
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
      dispatch(deleteCategory(categoryToDelete._id)).then(() => {
        showToast("Category deleted successfully", "success");
        closeDeleteModal();
      });
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
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            select
            fullWidth
            label="Status"
            margin="normal"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            margin="normal"
          />
          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "contain",
                marginTop: 10,
              }}
            />
          ) : formData.existingImage ? (
            <img
              src={formData.existingImage}
              alt="Existing"
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "contain",
                marginTop: 10,
              }}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={closeDeleteModal}>
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
