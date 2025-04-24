import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress color="primary" size={50} />
    </div>
  );
};

export default Loader;
