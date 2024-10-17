import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null, // Changed to null to handle file input correctly
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px] bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg transition-all duration-300"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-gray-800">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="fullname" className="text-right text-gray-700">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="email" className="text-right text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="phoneNumber" className="text-right text-gray-700">
                Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="bio" className="text-right text-gray-700">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="skills" className="text-right text-gray-700">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="file" className="text-right text-gray-700">
                Resume
              </Label>
              {/* <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              /> */}
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={fileChangeHandler}
                className="col-span-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4 text-white transition duration-300 bg-blue-500 hover:bg-blue-600">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 text-white transition duration-300 bg-blue-500 hover:bg-blue-600"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
