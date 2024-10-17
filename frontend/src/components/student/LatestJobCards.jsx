import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="card">
      <div className="card-header">
        <div className="job-info">
          <i className="bx bxl-apple"></i>
          <div>
            <h5>
              {job?.company?.name} <span>| Just Now</span>
            </h5>
            <a href="#">{job?.title}</a>
            <p>{job?.location}</p>
          </div>
        </div>
        <i className="bx bx-bookmark-plus"></i>
      </div>
      <div className="card-tags">
        <a href="#">Remote</a>
        <a href="#">Freelance</a>
      </div>
      <div className="card-desc">{job?.description}</div>
    </div>
  );
};

export default LatestJobCards;
