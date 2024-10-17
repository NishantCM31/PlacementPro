import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Analyst",
      "Engineer",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const clearFilters = () => {
    setSelectedValue("");
  };

  return (
    <motion.div
      className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-300"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Center-aligning title */}
      <h1 className="text-xl font-bold text-[#2C3E50] text-center">
        Filter Jobs
      </h1>
      <hr className="mt-2 mb-4 border-gray-300" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h1 className="text-lg font-semibold text-[#34495e] mb-2 text-center">
              {data.filterType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center my-2 space-x-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-gray-700">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
      {/* Center-aligning button */}
      <div className="flex justify-center">
        <button
          onClick={clearFilters}
          className={`mt-4 px-4 py-2 rounded-md text-white transition duration-300 ${
            selectedValue
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!selectedValue}
        >
          Clear All
        </button>
      </div>
    </motion.div>
  );
};

export default FilterCard;
