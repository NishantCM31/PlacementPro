import React from "react";
import Navbar from "./shared/Navbar";
import AppliedJobTable from "./AppliedJobTable";
import Footer from "./shared/Footer";
import { motion } from "framer-motion";

const AppliedJobs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Navbar />
      <motion.div
        className="flex-grow w-full max-w-6xl p-10 mx-auto mt-12 mb-5 bg-white shadow-lg rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">
          Applied Jobs
        </h1>
        <div className="overflow-x-auto">
          <AppliedJobTable />
        </div>
      </motion.div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default AppliedJobs;
