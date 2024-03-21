// AdminPage.js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Subscription from "./Subscription";

const AdminPage = () => {
    return (
        <Router>
            <div className="admin-page">

                <div className="admin-content">
                    <Sidebar />
                    {/* <Route path="/admin/dashboard" component={Dashboard} /> */}
                    <Route path="/admin/users" component={Users} />
                    <Route path="/admin/subscription" component={Subscription} />
                </div>
            </div>
        </Router>
    );
};

export default AdminPage;
