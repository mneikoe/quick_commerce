import React, { useEffect } from "react";
import ProductGrid from "../components/ui/products/ProductGrid";
// import products from "../components/ui/products/Product.json";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItems } from "../actions/MenuAction";
const Products = () => {
  const dispatch = useDispatch();
  const { menuItems, loading } = useSelector((state) => state.menu); // Get menu items from Redux state

  useEffect(() => {
    dispatch(getMenuItems()); // Dispatch the action to fetch menu items when the component mounts
  }, [dispatch]);

  // Check if menuItems are still loading or have no data
  if (loading) {
    return <div>Loading...</div>; // Show loading state if data is still being fetched
  }
  return (
    <div>
      <ProductGrid products={menuItems?.data || []} />
    </div>
  );
};

export default Products;
