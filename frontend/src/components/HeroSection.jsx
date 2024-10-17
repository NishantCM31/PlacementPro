import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
      setShowWarning(false); // Hide warning if the query is valid
    } else {
      setShowWarning(true); // Show warning if the query is empty
    }
  };

  return (
    <div className="text-center py-24 px-5 bg-gradient-to-br from-[#E6EEF3] to-[#1d3c46] font-sans text-[#2C3E50]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col gap-8 my-16"
      >
        <span className="mx-auto px-5 py-3 rounded-full bg-[#ECF0F1] text-[#2980B9] font-semibold shadow-md">
          Your Career Journey Starts Here
        </span>
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          className="text-5xl font-bold leading-tight tracking-wide"
        >
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#1B4965]">Dream Job</span>
        </motion.h1>
        <div className="flex w-[60%] mx-auto border border-[#D1D9E0] pl-4 pr-2 rounded-full items-center gap-4 shadow-lg bg-white hover:bg-[#F4F6F7] transition-transform transform hover:scale-105 duration-300">
          <input
            type="text"
            placeholder="Find your dream job here..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (showWarning) setShowWarning(false); // Hide warning as user types
            }}
            className="w-full border-none outline-none text-lg px-3 py-3 rounded-l-full bg-transparent text-[#2C3E50] focus:bg-[#F4F8FB] transition duration-200"
          />
          <Button
            onClick={searchJobHandler}
            className="flex items-center gap-2 bg-[#1B4965] hover:bg-[#123752] text-white px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 font-semibold"
          >
            <Search className="w-5 h-5" />
            <span className="ml-2">Search</span>
          </Button>
        </div>
        {showWarning && (
          <span className="font-medium text-red-500">
            Please enter a search term to proceed.
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default HeroSection;
