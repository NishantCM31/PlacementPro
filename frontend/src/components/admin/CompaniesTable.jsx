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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white rounded-lg shadow-md">
        <TableCaption className="p-4 text-lg text-gray-600">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader className="bg-indigo-100 text-gray-700">
          <TableRow>
            <TableHead className="p-4 font-semibold text-left">Logo</TableHead>
            <TableHead className="p-4 font-semibold text-left">Name</TableHead>
            <TableHead className="p-4 font-semibold text-left">Date</TableHead>
            <TableHead className="p-4 font-semibold text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-300"
            >
              <TableCell className="p-4 border-b border-gray-200">
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {company.name}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="p-4 border-b border-gray-200 text-right">
                <Popover>
                  <PopoverTrigger className="p-2 rounded-full transition-transform hover:scale-110 focus:outline-none">
                    <MoreHorizontal className="text-gray-500" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2 bg-white shadow-lg rounded-lg">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100"
                    >
                      <Edit2 className="w-4 text-blue-600" />
                      <span className="text-gray-700">Edit</span>
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

export default CompaniesTable;
