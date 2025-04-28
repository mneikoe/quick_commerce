import React, { useEffect } from "react";
import ProductGrid from "../components/ui/products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItems } from "../actions/MenuAction";

const Products = () => {
  const dispatch = useDispatch();
  const { menuItems, loading } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(getMenuItems());

    const intervalId = setInterval(() => {
      dispatch(getMenuItems());
    }, 3000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <ProductGrid products={menuItems?.data || []} />
    </div>
  );
};

export default Products;
