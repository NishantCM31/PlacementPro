import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white rounded-lg shadow-md">
        <TableCaption className="p-4 text-lg text-gray-600">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader className="bg-indigo-100 text-gray-700">
          <TableRow>
            <TableHead className="p-4 font-semibold text-left">
              Company Name
            </TableHead>
            <TableHead className="p-4 font-semibold text-left">Role</TableHead>
            <TableHead className="p-4 font-semibold text-left">Date</TableHead>
            <TableHead className="p-4 font-semibold text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-300"
            >
              <TableCell className="p-4 border-b border-gray-200">
                {job?.company?.name}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {job?.title}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {job?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200 text-right">
                <Popover>
                  <PopoverTrigger className="p-2 rounded-full transition-transform hover:scale-110 focus:outline-none">
                    <MoreHorizontal className="text-gray-500" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 bg-white shadow-lg rounded-lg">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100"
                    >
                      <Edit2 className="w-4 text-blue-600" />
                      <span className="text-gray-700">Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 mt-2"
                    >
                      <Eye className="w-4 text-green-600" />
                      <span className="text-gray-700">Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
