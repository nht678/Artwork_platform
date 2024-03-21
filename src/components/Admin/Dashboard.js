import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../main-component/AdminPage";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData(4);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7130/api/User/profile/get/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (<div style={{ display: 'flex' }}>   <Sidebar />
    <Container>
      <Row>
        <Col>
          <h2>Dashboard</h2>
          {userData && (
            <div>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container></div>
  );
};

export default Dashboard;
