import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Check, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white rounded-lg shadow-md">
        <TableCaption className="p-4 text-lg text-gray-600">
          A list of your recent applied users
        </TableCaption>
        <TableHeader className="bg-indigo-100 text-gray-700">
          <TableRow>
            <TableHead className="p-4 font-semibold text-left">
              FullName
            </TableHead>
            <TableHead className="p-4 font-semibold text-left">Email</TableHead>
            <TableHead className="p-4 font-semibold text-left">
              Contact
            </TableHead>
            <TableHead className="p-4 font-semibold text-left">
              Resume
            </TableHead>
            <TableHead className="p-4 font-semibold text-left">Date</TableHead>
            <TableHead className="p-4 font-semibold text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-300"
            >
              <TableCell className="p-4 border-b border-gray-200">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 cursor-pointer"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {item?.applicant.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200 text-right">
                <Popover>
                  <PopoverTrigger className="p-2 rounded-full transition-transform hover:scale-110 focus:outline-none">
                    <MoreHorizontal className="text-gray-500" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 bg-white shadow-lg rounded-lg">
                    <div
                      onClick={() => statusHandler("Accepted", item?._id)}
                      className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100"
                    >
                      <Check className="w-4 text-green-600" />
                      <span className="text-gray-700">Accepted</span>
                    </div>
                    <div
                      onClick={() => statusHandler("Rejected", item?._id)}
                      className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 mt-2"
                    >
                      <X className="w-4 text-red-600" />
                      <span className="text-gray-700">Rejected</span>
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

export default ApplicantsTable;
