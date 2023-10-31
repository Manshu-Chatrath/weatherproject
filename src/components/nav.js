import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../css/nav.css";
const Nav = () => {
  return (
    <div className="navbuttons">
      <NavLink activeClassName="active" exact={true} to="/" className="navbtn">
        <span>7 days</span>
      </NavLink>
      <NavLink
        activeClassName="active"
        exact={true}
        to="/graph"
        className="navbtn">
        <span>Graph</span>
      </NavLink>
    </div>
  );
};
export default Nav;
