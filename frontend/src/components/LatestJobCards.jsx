import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg shadow-md bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div>
        <h1 className="font-semibold text-lg text-[#2C3E50]">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">Location: India</p>
      </div>
      <div>
        <h1 className="font-bold text-xl my-2 text-[#2980b9]">{job?.title}</h1>
        <p className="text-sm text-gray-700">{job?.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Badge
          className={"bg-[#e7f3fe] text-[#0d47a1] font-semibold"}
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className={"bg-[#ffe0b2] text-[#d32f2f] font-semibold"}
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className={"bg-[#f1f8e9] text-[#388e3c] font-semibold"}
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
