import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import CategoryCard from "./CategoryCard";
import CategoryData from "./category.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: { xs: 0, md: -15 },
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: 3,
      p: 0.8,
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
      top: "50%",
      left: { xs: 0, md: -15 },
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: 3,
      p: 0.8,
      cursor: "pointer",
    }}
  >
    <ChevronLeft size={20} />
  </Box>
);

const CategoryCarousel = () => {
  const filteredCategories = CategoryData.filter((c) => c.image);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Mobile friendly: hide arrows
          dots: true, // Mobile: show dots instead of arrows
        },
      },
    ],
  };

  return (
    <Box sx={{ mt: 5, px: { xs: 1, md: 2 } }}>
      <Slider {...settings}>
        {filteredCategories.map((category, idx) => (
          <Box key={idx} px={{ xs: 0.5, md: 1 }}>
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
