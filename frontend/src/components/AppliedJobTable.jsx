import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Table className="min-w-full">
        <TableCaption className="text-gray-600 text-lg">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-100 text-gray-700">
            <TableHead className="p-4 font-semibold text-left">Date</TableHead>
            <TableHead className="p-4 font-semibold text-left">
              Job Role
            </TableHead>
            <TableHead className="p-4 font-semibold text-left">
              Company
            </TableHead>
            <TableHead className="p-4 font-semibold text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="p-4 text-center text-gray-600">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition duration-300"
              >
                <TableCell className="p-4 border-b border-gray-200">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200 text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500 text-white"
                        : appliedJob?.status === "pending"
                        ? "bg-yellow-400 text-white"
                        : "bg-green-500 text-white"
                    } rounded-md py-1 px-2`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
