import React, { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50 border border-gray-200 transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        {/* Bookmark Button */}
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={handleBookmark}
        >
          <Bookmark
            color={isBookmarked ? "#FFD700" : "#4B5563"}
            fill={isBookmarked ? "#FFD700" : "none"}
          />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-3">
        <Button className="p-2" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-lg text-[#6A38C2]">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl my-2 text-[#4B5563]">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-[#6A38C2] border-[#6A38C2] hover:bg-[#6A38C2] hover:text-white"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#6A38C2]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
