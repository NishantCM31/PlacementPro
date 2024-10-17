import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice"; // Ensure correct import path for jobSlice
import { motion } from "framer-motion";

// Categories list for carousel
const category = [
  // "Frontend Developer",
  // "Backend Developer",
  // "Data Science",
  // "Graphic Designer",
  // "FullStack Developer",
  "Full Stack Developer",
  "Engineer",
  "Analyst",
  "Consultant",
  "Frontend Developer",
  "Backend Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler to set the search query and navigate to the browse page
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query)); // Set the searched query in Redux
    navigate("/browse"); // Navigate to the browse page
  };

  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold text-center mb-8 text-[#2C3E50]">
        Explore Job Categories
      </h2>
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <Button
                  onClick={() => searchJobHandler(cat)} // Handle category search
                  variant="outline"
                  className="rounded-full px-6 py-3 text-[#8e44ad] border-[#8e44ad] hover:bg-[#8e44ad] hover:text-white transition-all duration-300"
                >
                  {cat}
                </Button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
