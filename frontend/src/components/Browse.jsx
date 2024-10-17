import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import LatestJobCards from "./LatestJobCards"; // Assuming this is the component you're using to display jobs
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Footer from "./shared/Footer";

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const searchLower = searchedQuery.toLowerCase();

      const filteredJobs = allJobs.filter((job) => {
        const title = job?.title?.toLowerCase() || "";
        const company = job?.company?.name?.toLowerCase() || "";
        const description = job?.description?.toLowerCase() || "";
        const position = job?.position?.toString().toLowerCase() || "";
        const jobType = job?.jobType?.toLowerCase() || "";
        const salary = job?.salary?.toString().toLowerCase() || "";

        return (
          title.includes(searchLower) ||
          company.includes(searchLower) ||
          description.includes(searchLower) ||
          position.includes(searchLower) ||
          jobType.includes(searchLower) ||
          salary.includes(searchLower)
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs); // Reset to all jobs if no search query is provided
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-6 mx-auto my-10 max-w-7xl">
        <h1 className="font-bold text-2xl text-[#2C3E50] mb-8">
          Search Results ({filterJobs.length})
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))
          ) : (
            <div>No results found for "{searchedQuery}"</div>
          )}
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Browse;
