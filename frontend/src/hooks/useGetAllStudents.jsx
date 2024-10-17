import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setStudents } from "@/redux/studentSlice";

const useGetAllStudents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("/api/students");
        dispatch(setStudents(data.students)); // Dispatch students to Redux store
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };

    fetchStudents();
  }, [dispatch]);
};

export default useGetAllStudents;
