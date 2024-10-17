// StudentsTable.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/studentActions";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 font-medium">
        Loading students...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium">
        Error fetching students: {error}
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="text-center text-gray-600 font-medium">
        No students found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Students List</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-indigo-100">
          <tr>
            <th className="py-2 px-4 text-left text-gray-700">Full Name</th>
            <th className="py-2 px-4 text-left text-gray-700">Email</th>
            <th className="py-2 px-4 text-left text-gray-700">Phone Number</th>
            <th className="py-2 px-4 text-left text-gray-700">Role</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student._id}
              className="hover:bg-gray-100 transition duration-300"
            >
              <td className="py-2 px-4 border-b border-gray-200">
                {student.fullname}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {student.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {student.phoneNumber}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {student.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
