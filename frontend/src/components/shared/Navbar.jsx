import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Briefcase } from "lucide-react"; // Import Briefcase icon
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import PlacemateLogo from "@/assets/Placemate.png"; // Update the path to your image
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="shadow-md bg-gray-50">
      <div className="flex items-center justify-between h-16 mx-auto max-w-7xl">
        <div>
          <Link to="/">
            <img src={PlacemateLogo} alt="Placemate Logo" className="h-7" />
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#5C6BC0] transition-colors duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#5C6BC0] transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/students"
                    className="hover:text-[#5C6BC0] transition-colors duration-200"
                  >
                    Students
                  </Link>
                </li>
              </>
            ) : user ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#5C6BC0] transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#5C6BC0] transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#5C6BC0] transition-colors duration-200"
                  >
                    Browse
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/policies"
                    className="text-[#FF7043] border-b-2 border-[#FF7043] transition-colors duration-200 hover:border-[#5C6BC0] hover:text-[#5C6BC0]"
                  >
                    Policies
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-[#5C6BC0] hover:text-white transition-colors duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#5C6BC0] hover:bg-[#4F5B93] transition-all duration-300 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="transition-transform duration-200 cursor-pointer hover:scale-105">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile Picture"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg w-80">
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile Picture"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-[#2C3E50]">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <>
                        {/* Only for student role */}
                        <div className="flex items-center gap-2 cursor-pointer w-fit">
                          <User2 />
                          <Button
                            variant="link"
                            className="hover:text-[#5C6BC0] transition-colors duration-200"
                          >
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                        {/* "My Jobs" link only visible to students */}
                        <div className="flex items-center gap-2 cursor-pointer w-fit">
                          <Briefcase />
                          <Button
                            variant="link"
                            className="hover:text-[#5C6BC0] transition-colors duration-200"
                          >
                            <Link to="/AppliedJobs">My Jobs</Link>
                          </Button>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer w-fit">
                      <LogOut />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="hover:text-[#5C6BC0] transition-colors duration-200"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
