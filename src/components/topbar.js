import React from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
const TopBar = ({ city }) => {
  return (
    <div className="temperature-details">
      <div className="temperature-information">
        <div className="location-title">{city} Weather</div>
        <span className="lastUpdated">
          Updated on {moment().format("ddd ,MMM D, h:mm a")}
        </span>
      </div>
      <div className="temperature-add-location">
        <div className="add-location">
          <div className="location-button">
            <Link
              to="/changeLocation"
              className="changeLocation"
              style={{
                color: "white",
                cursor: "pointer",
                textDecorationLine: "underline",
              }}>
              Change Location
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
