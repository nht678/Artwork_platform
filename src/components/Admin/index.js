import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { FaAngleDoubleRight, FaSearch, FaShoppingCart } from "react-icons/fa";

import "./style.css";

// Import các component từ AdminPage
import Dashboard from "./Admin/Dashboard";
import User from "./Admin/User";
import Subscription from "./components/Subscription";

const AdminPage = () => {
  const { t } = useTranslation();

  return (
    <section className="admin-page">
      <Container>
        <Row>
          {/* Sidebar */}
          <Col lg={3}>
            <div className="admin-sidebar">
              <ul>
                <li>
                  <Link to="/admin/dashboard">{t("dashboard")}</Link>
                </li>
                <li>
                  <Link to="/admin/user">{t("user")}</Link>
                </li>
                <li>
                  <Link to="/admin/subscription">{t("subscription")}</Link>
                </li>
              </ul>
            </div>
          </Col>
          {/* Content */}
          <Col lg={9}>
            {/* Route cho Dashboard */}
            <Route path="/dashboard" component={Dashboard} />
            {/* Route cho User */}
            <Route path="/user" component={User} />
            {/* Route cho Subscription */}
            <Route path="/subscription" component={Subscription} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminPage;
