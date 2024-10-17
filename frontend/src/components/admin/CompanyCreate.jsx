import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      } else {
        toast.error(
          res.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while registering the company.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="mb-6">
          <h1 className="font-bold text-2xl text-gray-800">
            Create Your Company
          </h1>
          <p className="text-gray-500">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <Label htmlFor="companyName" className="font-semibold">
          Company Name
        </Label>
        <Input
          id="companyName"
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft, etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-6">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="border-gray-400 text-gray-700 hover:bg-gray-200 transition duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
