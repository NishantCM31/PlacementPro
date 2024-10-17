import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import Footer from "../shared/Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-100 duration-300">
        <div className="flex items-center justify-between mb-6">
          <Input
            className="w-full max-w-xs shadow-md border border-gray-300 rounded-lg p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="ml-4 bg-blue-600 text-white shadow-lg rounded-lg p-2 transition-transform transform hover:scale-105 duration-200"
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
      <Footer />
    </div>
  );
};

export default AdminJobs;
