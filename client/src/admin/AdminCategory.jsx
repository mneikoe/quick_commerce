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
  Collapse,
  styled,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  PhotoCamera,
  Warning,
  ExpandMore,
  ExpandLess,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getAllSubcategories,
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

const SubcategoryRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& td": {
    paddingLeft: theme.spacing(3),
  },
}));

const FormDialog = ({
  open,
  onClose,
  formData,
  setFormData,
  handleSubmit,
  title,
  imagePreview,
  isSubcategory = false,
  isEdit = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        {isEdit ? `Edit ${title}` : `Create New ${title}`}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={`${title} Name`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              variant="outlined"
              size="small"
              required
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
              required
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
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                    existingImage: null,
                  })
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
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ borderRadius: 2 }}
          disabled={!formData.name || !formData.description}
        >
          {isEdit ? `Save Changes` : `Create ${title}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  console.log(categories);
  const subCategoryIncategory = subCategories.filter((subCat) =>
    categories.some((cat) => cat._id === subCat.category._id)
  );
  console.log("filter subcategory", subCategoryIncategory);
  console.log(subCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState({
    open: false,
    categoryId: null,
  });

  const [expandedCategories, setExpandedCategories] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    existingImage: null,
    status: "active",
  });
  const [subcategoryData, setSubcategoryData] = useState({
    name: "",
    description: "",
    image: null,
    existingImage: null,
    status: "active",
    categoryId: null,
  });

  const [editId, setEditId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({
    id: null,
    name: "",
    type: "", // 'category' or 'subcategory'
  });

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllSubcategories());
  }, [dispatch]);

  const toggleCategoryExpand = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const openModal = (category = null) => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        image: null,
        existingImage: category.image,
        status: category.status || "active",
      });
      setEditId(category._id);
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

  const openSubcategoryModal = (categoryId, subcategory = null) => {
    if (subcategory) {
      setSubcategoryData({
        name: subcategory.name,
        description: subcategory.description,
        image: null,
        existingImage: subcategory.image,
        status: subcategory.status || "active",
        categoryId: categoryId,
      });
      setEditId(subcategory._id);
    } else {
      setSubcategoryData({
        name: "",
        description: "",
        image: null,
        existingImage: null,
        status: "active",
        categoryId: categoryId,
      });
      setEditId(null);
    }
    setSubcategoryModalOpen({ open: true, categoryId });
  };

  const closeSubcategoryModal = () => {
    setSubcategoryModalOpen({ open: false, categoryId: null });
    setSubcategoryData({
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
      try {
        dispatch(updateCategory(editId, data));
        showToast("Category updated successfully", "success");
      } catch (error) {
        showToast(error.message, "error");
      }
    } else {
      dispatch(createCategory(data));
      showToast("Category created successfully", "success");
    }
    closeModal();
  };

  const handleSubcategorySubmit = async () => {
    if (!subcategoryData.name || !subcategoryData.description) {
      showToast("Please fill all required fields", "error");
      return;
    }

    const data = new FormData();
    console.log(data);
    data.append("name", subcategoryData.name);
    data.append("description", subcategoryData.description);
    data.append("status", subcategoryData.status);
    if (subcategoryData.image) {
      data.append("image", subcategoryData.image);
    }

    if (subcategoryData.categoryId) {
      data.append("categoryId", subcategoryData.categoryId); // Use categoryId for an existing category
    }

    try {
      if (editId) {
        await dispatch(
          updateSubcategory(editId, data, subcategoryModalOpen.categoryId)
        );
        showToast("Subcategory updated successfully", "success");
      } else {
        await dispatch(createSubcategory(data));
        showToast("Subcategory created successfully", "success");
      }
    } catch (error) {
      showToast(
        error.response && error.response.data.message
          ? error.response.data.message
          : "An error occurred while submitting.",
        "error"
      );
    }

    closeSubcategoryModal();
  };

  const handleDelete = (item, type) => {
    setItemToDelete({
      id: item._id,
      name: item.name,
      type,
    });
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setItemToDelete({
      id: null,
      name: "",
      type: "",
    });
  };

  const confirmDelete = () => {
    if (itemToDelete.type === "category") {
      dispatch(deleteCategory(itemToDelete.id)).then(() => {
        showToast("Category deleted successfully", "success");
        closeDeleteModal();
      });
    } else if (itemToDelete.type === "subcategory") {
      dispatch(deleteSubcategory(itemToDelete.id)).then(() => {
        showToast("Subcategory deleted successfully", "success");
        closeDeleteModal();
      });
    }
  };
  const viewSubcategories = (category) => {
    setSelectedCategory(category);
    setSubcategoryViewOpen(true);
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
                <React.Fragment key={category._id}>
                  <StyledTableRow hover>
                    <TableCell>
                      {category.image ? (
                        <ImagePreview
                          src={category.image}
                          alt={category.name}
                        />
                      ) : (
                        <Avatar sx={{ bgcolor: "action.selected" }}>
                          <PhotoCamera />
                        </Avatar>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {category.name}
                        {category.subcategories?.length > 0 && (
                          <IconButton
                            size="small"
                            onClick={() => toggleCategoryExpand(category._id)}
                          >
                            {expandedCategories[category._id] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography variant="body2" noWrap>
                        {category.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={category.status}
                        color={
                          category.status === "active" ? "success" : "error"
                        }
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
                          onClick={() => handleDelete(category, "category")}
                          sx={{ color: "error.main", ml: 1 }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add Subcategory">
                        <IconButton
                          onClick={() => openSubcategoryModal(category._id)}
                          sx={{ color: "primary.main", ml: 1 }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          expandedCategories[category._id]
                            ? "Collapse Subcategories"
                            : "View Subcategories"
                        }
                      >
                        <IconButton
                          onClick={() => toggleCategoryExpand(category._id)}
                          sx={{ color: "info.main", ml: 1 }}
                        >
                          {expandedCategories[category._id] ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </StyledTableRow>

                  {/* Subcategories */}
                  {subCategories?.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ p: 0, border: 0 }}>
                        <Collapse
                          in={expandedCategories[category._id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ m: 0 }}>
                            <Table size="small">
                              <TableBody>
                                {subCategoryIncategory
                                  .filter(
                                    (sub) => sub.category._id === category._id
                                  )
                                  .map((subcategory) => (
                                    <SubcategoryRow key={subcategory._id} hover>
                                      <TableCell>
                                        {subcategory.image ? (
                                          <ImagePreview
                                            src={subcategory.image}
                                            alt={subcategory.name}
                                          />
                                        ) : (
                                          <Avatar
                                            sx={{
                                              bgcolor: "action.selected",
                                              width: 40,
                                              height: 40,
                                            }}
                                          >
                                            <PhotoCamera />
                                          </Avatar>
                                        )}
                                      </TableCell>
                                      <TableCell>{subcategory.name}</TableCell>
                                      <TableCell>
                                        <Typography variant="body2" noWrap>
                                          {subcategory.description}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          label={subcategory.status}
                                          color={
                                            subcategory.status === "active"
                                              ? "success"
                                              : "error"
                                          }
                                          size="small"
                                          sx={{ borderRadius: 1 }}
                                        />
                                      </TableCell>
                                      <TableCell align="right">
                                        <Tooltip title="Edit">
                                          <IconButton
                                            onClick={() =>
                                              openSubcategoryModal(
                                                category._id,
                                                subcategory
                                              )
                                            }
                                            sx={{
                                              color: "primary.main",
                                            }}
                                          >
                                            <Edit fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                          <IconButton
                                            onClick={() =>
                                              handleDelete(
                                                subcategory,
                                                "subcategory"
                                              )
                                            }
                                            sx={{
                                              color: "error.main",
                                              ml: 1,
                                            }}
                                          >
                                            <Delete fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                      </TableCell>
                                    </SubcategoryRow>
                                  ))}
                                {/* {expandedCategories[category._id] && ( */}
                                {/* <TableRow>
                                  <TableCell colSpan={6}>
                                    <Typography variant="subtitle2">
                                      Subcategories:
                                    </Typography>
                                    {subCategoryIncategory
                                      .filter(
                                        (sub) =>
                                          sub.category._id === category._id
                                      ) // Fixing the comparison
                                      .map((sub) => (
                                        <Box
                                          key={sub._id}
                                          sx={{ ml: 2, mb: 1 }}
                                        >
                                          <Typography variant="body2">
                                            {sub.name} - {sub.description}
                                          </Typography>
                                        </Box>
                                      ))}
                                  </TableCell>
                                </TableRow> */}
                                {/* )} */}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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

      <FormDialog
        open={modalOpen}
        onClose={closeModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        title="Category"
        isEdit={editId}
      />

      {/* Subcategory Add/Edit Dialog */}
      {subcategoryModalOpen.open && (
        <FormDialog
          open={subcategoryModalOpen.open}
          onClose={closeSubcategoryModal}
          formData={subcategoryData}
          setFormData={setSubcategoryData}
          handleSubmit={handleSubcategorySubmit}
          title="Subcategory"
          isEdit={editId}
          isSubcategory={true}
        />
      )}
      {/* <Dialog
        open={subcategoryViewOpen}
        onClose={() => setSubcategoryViewOpen(false)}
      >
        <DialogTitle>Subcategories of {selectedCategory?.name}</DialogTitle>
        <DialogContent>
          {selectedCategory?.subcategories?.length > 0 ? (
            selectedCategory.subcategories.map((sub) => (
              <Box key={sub._id} mb={1}>
                <Typography variant="subtitle1">{sub.name}</Typography>
                <Typography variant="body2">{sub.description}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No subcategories available.</Typography>
          )}
        </DialogContent>
      </Dialog> */}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onClose={closeDeleteModal} maxWidth="xs">
        <DialogTitle sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
          <Warning color="error" sx={{ mr: 1, verticalAlign: "middle" }} />
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography>
            Are you sure you want to delete <strong>{itemToDelete.name}</strong>
            ?
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
