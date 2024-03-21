import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Table } from "react-bootstrap"; // Thêm Table từ react-bootstrap
import Sidebar from "../../main-component/AdminPage";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7130/api/User/profile/getall");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      await axios.post(`https://localhost:7130/api/Admin/BanUser/${userId}`);
      // Nếu muốn cập nhật danh sách người dùng sau khi cấm người dùng thành công, bạn có thể gọi lại hàm fetchAllUsers() ở đây
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Container>
        <Row>
          <Col>
            <h2>User Management</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleBanUser(user.userId)}>Ban User</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default User;
