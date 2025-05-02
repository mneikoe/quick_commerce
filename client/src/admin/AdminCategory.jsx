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
  Chip,
  Avatar,
  LinearProgress,
  Skeleton,
  styled,
} from "@mui/material";
import { Edit, Delete, Add, PhotoCamera, Warning } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../actions/CategoryAction";
import { showToast } from "../components/ui/ShowToast";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td": { border: 0 },
}));

const ImagePreview = styled("img")({
  width: 64,
  height: 64,
  objectFit: "cover",
  borderRadius: 8,
  border: "1px solid rgba(0, 0, 0, 0.12)",
});

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
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={3}
        >
          <Grid item>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Category Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categories.length} total categories
            </Typography>
          </Grid>
          <Grid item>
            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => openModal()}
              sx={{ borderRadius: 3 }}
            >
              New Category
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ overflowX: "auto", position: "relative" }}>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: "background.default" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <StyledTableRow key={category._id} hover>
                  <TableCell>
                    {category.image ? (
                      <ImagePreview src={category.image} alt={category.name} />
                    ) : (
                      <Avatar sx={{ bgcolor: "action.selected" }}>
                        <PhotoCamera />
                      </Avatar>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {category.name}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography variant="body2" noWrap>
                      {category.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={category.status}
                      color={category.status === "active" ? "success" : "error"}
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => openModal(category)}
                        sx={{ color: "primary.main" }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(category)}
                        sx={{ color: "error.main", ml: 1 }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {loading && (
            <LinearProgress
              sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            />
          )}
        </Box>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
          {editId ? "Edit Category" : "Create New Category"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                variant="outlined"
                size="small"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<PhotoCamera />}
                sx={{ borderRadius: 2, py: 1.5 }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />
              </Button>
            </Grid>
            {(formData.image || formData.existingImage) && (
              <Grid item xs={12}>
                <ImagePreview
                  src={
                    formData.image
                      ? URL.createObjectURL(formData.image)
                      : formData.existingImage
                  }
                  alt="Preview"
                  style={{ width: "100%", height: 160 }}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ borderTop: "1px solid", borderColor: "divider", p: 2 }}
        >
          <Button onClick={closeModal} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ borderRadius: 2 }}
            disabled={!formData.name || !formData.description}
          >
            {editId ? "Save Changes" : "Create Category"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteModalOpen} onClose={closeDeleteModal} maxWidth="xs">
        <DialogTitle sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
          <Warning color="error" sx={{ mr: 1, verticalAlign: "middle" }} />
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{categoryToDelete?.name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ borderTop: "1px solid", borderColor: "divider", p: 2 }}
        >
          <Button onClick={closeDeleteModal} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2 }}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCategory;
