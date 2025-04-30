import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import SelectBox from "./SelectBox";

const MenuFormModal = ({
  open,
  handleClose,
  handleSubmit,
  item = {},
  viewOnly = false,
  categories = [],
}) => {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    isAvailable: true,
    image: null,
  });
  const theme = useTheme();
  console.log(formData);
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        category: item.category?._id || "",
        price: item.price || "",
        isAvailable: item.isAvailable || false,
        image: null,
      });
    } else {
      setFormData({
        title: "",
        category: "",
        price: "",
        isAvailable: true,
        image: null,
      });
    }
  }, [item]);
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image" && files.length) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  const onSubmit = () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("isAvailable", formData.isAvailable);
    if (formData.image) data.append("image", formData.image);

    handleSubmit(data);

    setFormData({
      title: "",
      category: "",
      price: "",
      isAvailable: true,
      image: null,
    });
    setPreview(null);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {viewOnly
          ? "View Menu Item"
          : item?._id
            ? "Edit Menu Item"
            : "Add Menu Item"}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Title"
          name="title"
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          disabled={viewOnly}
          InputLabelProps={{
            sx: { color: theme.palette.text.primary },
          }}
        />
        {/* Category Select Box */}
        <SelectBox
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          placeholder="Select Category"
          required={!viewOnly}
          disabled={viewOnly}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          InputLabelProps={{
            sx: { color: theme.palette.text.primary },
          }}
          margin="normal"
          type="number"
          value={formData.price}
          onChange={handleChange}
          disabled={viewOnly}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.isAvailable}
              onChange={handleChange}
              name="isAvailable"
              color="primary"
              disabled={viewOnly}
            />
          }
          label="Available"
        />
        {!viewOnly && (
          <Box mt={2}>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
          </Box>
        )}

        {(preview || item?.image) && (
          <Box mt={2}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Image Preview:
            </Typography>
            <img
              src={preview || item?.image}
              alt="Preview"
              style={{ maxHeight: "200px", borderRadius: 8 }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!viewOnly && (
          <Button onClick={onSubmit} variant="contained" color="primary">
            {item?._id ? "Update" : "Create"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MenuFormModal;
