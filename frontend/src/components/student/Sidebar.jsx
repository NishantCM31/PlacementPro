import React from "react";

const Sidebar = () => (
  <div className="sidebar">
    <a href="#">CodeSorcerers</a>
    <div className="side-nav">
      <div className="item active">
        <i className="bx bx-search-alt"></i>
        <a href="#">Home</a>
      </div>
      <div className="item">
        <i className="bx bx-notification"></i>
        <a href="#">Notification</a>
      </div>
      <div className="item">
        <i className="bx bx-briefcase"></i>
        <a href="#">My Works</a>
      </div>
      <div className="item">
        <i className="bx bx-bookmark-minus"></i>
        <a href="#">Saved Jobs</a>
      </div>
      <div className="item">
        <i className="bx bx-cog"></i>
        <a href="#">Settings</a>
      </div>
    </div>
  </div>
);

export default Sidebar;
