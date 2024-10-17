import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import { motion } from "framer-motion";
import Footer from "./shared/Footer";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mx-auto my-10 max-w-7xl">
        <motion.div
          className="flex items-center justify-between p-6 rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-blue-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-white">
            <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-200 font-bold"} variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className={"text-red-200 font-bold"} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-yellow-200 font-bold"} variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg text-white ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </motion.div>
        <h1 className="py-4 mt-6 text-2xl font-medium text-center text-gray-800 border-b-2 border-b-gray-300">
          Job Description
        </h1>
        <div className="p-4 my-4 bg-gray-100 rounded-lg shadow-md">
          <h1 className="my-1 text-lg font-bold">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-700">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="my-1 text-lg font-bold">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-700">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="my-1 text-lg font-bold">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-700">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="my-1 text-lg font-bold">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-700">
              {singleJob?.experienceLevel} 
            </span>
          </h1>
          <h1 className="my-1 text-lg font-bold">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-700">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="my-1 text-lg font-bold">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-700">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="my-1 text-lg font-bold">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-700">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
