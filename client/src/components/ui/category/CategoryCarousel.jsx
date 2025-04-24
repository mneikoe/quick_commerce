import React from "react";
import Slider from "react-slick";
import CategoryCard from "./CategoryCard";
import { Box } from "@mui/material";
import CategoryData from "./category.json";

const CategoryCarousel = () => {
  // Slick settings for carousel
  const settings = {
    dots: true, // To show navigation dots at the bottom
    infinite: true, // To enable infinite scrolling
    speed: 500, // Transition speed for the carousel
    slidesToShow: 3, // Show 3 items at a time horizontally
    slidesToScroll: 3, // Scroll 3 items at a time
    responsive: [
      // Responsiveness for different screen sizes
      {
        breakpoint: 1024, // When the screen size is below 1024px
        settings: {
          slidesToShow: 2, // Show 2 items at a time
          slidesToScroll: 2, // Scroll 2 items at a time
        },
      },
      {
        breakpoint: 600, // When the screen size is below 600px
        settings: {
          slidesToShow: 1, // Show 1 item at a time
          slidesToScroll: 1, // Scroll 1 item at a time
        },
      },
    ],
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Slider {...settings}>
        <div>
          {CategoryData.map((category, idx) => (
            <div key={idx}>
              <CategoryCard
                name={category.name}
                image={category.image}
                to={`/category/${category.name}`}
              />
            </div>
          ))}
        </div>
      </Slider>
    </Box>
  );
};

export default CategoryCarousel;
