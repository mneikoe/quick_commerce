// components/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  // console.log("products at prodcuts grid", products);
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          image={product.image}
          title={product.title}
          price={product.price}
          mrp={product.mrp}
          category={product.category?.name || "Uncategorized"}
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
