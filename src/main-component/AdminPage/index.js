import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import "./sidebar.css"; // Import CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="site-logo">
        <Link to="/">
          <img src={Logo} alt="gauto" className="img-fluid" style={{ width: '100px', height: '80px' }} />
        </Link>
      </div>
      <h1 className="mt-3 mb-4">PAINTPALLET</h1>
      <ul className="list-unstyled">
        {/* <li className="mb-2">
          <Link to="/admin/dashboard" className="text-decoration-none text-secondary">Dashboard</Link>
        </li> */}
        <li className="mb-2">
          <Link to="/admin/users" className="text-decoration-none text-secondary">Users</Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/subscription" className="text-decoration-none text-secondary">Subscription</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
