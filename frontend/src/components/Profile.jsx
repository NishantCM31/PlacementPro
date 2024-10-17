import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";
import { motion } from "framer-motion"; // Import for animations

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Main content container */}
      <div className="flex-grow p-8 mx-auto my-10 max-w-full md:max-w-screen-xl lg:max-w-8xl">
        <div className="max-w-4xl p-8 mx-auto bg-white border border-gray-200 shadow-md rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24 border border-gray-300 rounded-full shadow-md">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  }
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="text-2xl font-medium text-gray-800">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600">{user?.profile?.bio}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="text-right text-white bg-blue-500 hover:bg-blue-400"
              variant="outline"
            >
              <Pen />
            </Button>
          </motion.div>

          <div className="my-5">
            <div className="flex items-center gap-3 my-2 text-gray-800">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2 text-gray-800">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-lg font-bold text-gray-800">Skills</h1>
            <div className="flex items-center gap-1">
              {user?.profile?.skills.length ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index} className="text-blue-600 bg-blue-100">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-600">NA</span>
              )}
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="font-bold text-gray-800 text-md">Resume</Label>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-600">NA</span>
            )}
          </div>
        </div>

        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>

      {/* Footer with mt-auto to push it to the bottom */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default Profile;
