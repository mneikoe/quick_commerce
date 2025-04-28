import React, { useEffect } from "react";
import ProductGrid from "../components/ui/products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItems } from "../actions/MenuAction";

const Products = () => {
  const dispatch = useDispatch();
  const { menuItems, loading } = useSelector((state) => state.menu); // Get menu items from Redux state

  useEffect(() => {
    // Fetch data initially
    dispatch(getMenuItems());

    // Set an interval to fetch data every 5 seconds (5000ms)
    const intervalId = setInterval(() => {
      dispatch(getMenuItems());
    }, 3000); // Change 5000 to any interval you prefer

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [dispatch]); // Run this effect only once when the component mounts

  // Check if menuItems are still loading or have no data

  return (
    <div>
      <ProductGrid products={menuItems?.data || []} />
    </div>
  );
};

export default Products;
