import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Alert, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Sidebar from "../../main-component/AdminPage";
const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [formData, setFormData] = useState({
        subscriptionName: "",
        amount: "",
        desSubscription: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchSubscriptions();
    }, [currentPage]);

    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get(`https://localhost:7130/api/Subcription/subciption/getall?page=${currentPage}&pageSize=20`);
            setSubscriptions(response.data);
            setPageCount(Math.ceil(response.headers["x-total-count"] / 20));
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleUpdateSubscription = async (id) => {
        try {
            // Thực hiện logic cập nhật subscription
            // Ví dụ:
            // await axios.put(`https://localhost:7130/api/v1/subs/${id}`, updatedData);
        } catch (error) {
            console.error("Error updating subscription:", error);
        }
    };

    const handleDeleteSubscription = async (id) => {
        try {
            await axios.delete(`https://localhost:7130/api/v1/subs/${id}`);
            // Cập nhật lại danh sách sau khi xóa
            fetchSubscriptions();
        } catch (error) {
            console.error("Error deleting subscription:", error);
        }
    };

    return (<div style={{ display: 'flex' }}>   <Sidebar />
        <Container>
            <Row>
                <Col>
                    <h2>Subscriptions</h2>
                    <Alert variant={alertVariant} show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                        {alertMessage}
                    </Alert>
                    <Form>
                        {/* Form để tạo mới subscription */}
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((subscription) => (
                                <tr key={subscription.idSubscription}>
                                    <td>{subscription.idSubscription}</td>
                                    <td>{subscription.amount}</td>
                                    <td>{subscription.desSubscription}</td>
                                    <td>
                                        <Button variant="info" onClick={() => handleUpdateSubscription(subscription.id)} style={{ marginRight: '5px' }}>Update</Button>
                                        <Button variant="danger" onClick={() => handleDeleteSubscription(subscription.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                    />
                </Col>
            </Row>
        </Container></div>
    );
};

export default Subscription;
