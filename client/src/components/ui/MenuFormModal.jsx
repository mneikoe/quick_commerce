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
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    isAvailable: true,
  });
  console.log(formData);
  // Reset formData when item changes (for editing mode)
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        category: item.category?.name || "",
        price: item.price || "",
        isAvailable: item.isAvailable || false,
      });
    } else {
      setFormData({
        title: "",
        category: "",
        price: "",
        isAvailable: true,
      });
    }
  }, [item]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = () => {
    console.log("Submitting form data:", formData);
    handleSubmit(formData);
    setFormData({
      title: "",
      category: "",
      price: "",
      isAvailable: true,
    });
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
