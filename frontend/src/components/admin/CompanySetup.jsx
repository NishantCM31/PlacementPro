import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="flex items-center gap-5 mb-6">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-gray-200 transition duration-300 flex items-center gap-2"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
        </div>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="font-semibold">
                Company Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Enter company name"
                value={input.name}
                onChange={changeEventHandler}
                className="my-2"
              />
            </div>
            <div>
              <Label htmlFor="description" className="font-semibold">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="Enter company description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-2"
              />
            </div>
            <div>
              <Label htmlFor="website" className="font-semibold">
                Website
              </Label>
              <Input
                id="website"
                type="text"
                name="website"
                placeholder="https://www.example.com"
                value={input.website}
                onChange={changeEventHandler}
                className="my-2"
              />
            </div>
            <div>
              <Label htmlFor="location" className="font-semibold">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                name="location"
                placeholder="Enter company location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-2"
              />
            </div>
            <div>
              <Label htmlFor="file" className="font-semibold">
                Logo
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="my-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 my-6">
            {loading ? (
              <Button
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
