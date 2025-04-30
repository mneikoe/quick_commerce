import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            id={product._id}
            image={product.image}
            title={product.title}
            price={product.price}
            mrp={product.mrp}
            category={product.category?.name || "Uncategorized"}
            rating={product.rating}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
