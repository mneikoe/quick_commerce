import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import CategoryCard from "./CategoryCard";
import CategoryData from "./category.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "40%",
      right: -15,
      zIndex: 2,
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: 3,
      p: 1,
      cursor: "pointer",
    }}
  >
    <ChevronRight size={20} />
  </Box>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "40%",
      left: -15,
      zIndex: 2,
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: 3,
      p: 1,
      cursor: "pointer",
    }}
  >
    <ChevronLeft size={20} />
  </Box>
);

const CategoryCarousel = () => {
  const filteredCategories = CategoryData.filter((c) => c.image); // Only show with image

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Slider {...settings}>
        {filteredCategories.map((category, idx) => (
          <Box key={idx} px={1}>
            <CategoryCard
              name={category.name}
              image={category.image}
              to={`/category/${encodeURIComponent(category.name)}`}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CategoryCarousel;
