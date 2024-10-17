import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import StudentsTable from "./StudentsTable"; // StudentsTable component to display the list
import { setSearchStudentByText } from "@/redux/studentSlice";
import useGetAllStudents from "@/hooks/useGetAllStudents"; // Custom hook to fetch students
import { useNavigate } from "react-router-dom";

const Students = () => {
  useGetAllStudents(); // Custom hook to fetch students data and store in Redux
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchStudentByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between my-5">
          <Input
            className="flex-grow border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          {/* Uncomment this section to enable adding a new student */}
          {/* <Button 
            onClick={() => navigate("/admin/students/create")} 
            className="ml-4 bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
          >
            New Student
          </Button> */}
        </div>
        <StudentsTable />
      </div>
    </div>
  );
};

export default Students;
