import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="px-5 mx-auto my-20 max-w-7xl ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold leading-tight tracking-wide mb-8 text-[#2C3E50]">
          <span className="text-[#8e44ad]">Latest & Top </span> Job Openings
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {allJobs.length <= 0 ? (
          <span className="text-lg text-[#555555]">No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: job._id * 0.1 }}
              className="transition-transform duration-300 transform hover:shadow-lg hover:scale-105"
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
