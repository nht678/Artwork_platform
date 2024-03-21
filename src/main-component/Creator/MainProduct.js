import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import _ from "lodash";

import "./style.css";

import axios from "axios";
import ReactPaginate from "react-paginate";

import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Product = () => {
    const { t } = useTranslation();
    const [pageCount, setPageCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [artworkParams, setArtworkParams] = useState({
        size: 8,
        page: 1,
        name: null,
        price: null,
        status: null,
        categoryName: null,
    });
    const [orders, setOrders] = useState([]);
    const [modalParams, setModalParams] = useState({
        modalType: null,
        show: false,
        data: null
    });
    
    // useeffect đang bị nhân lên 2 lần
    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, [artworkParams]);

    async function fetchProducts() {
        try {
            const response = await axios.get(
                "https://localhost:7130/api/v1/artworks",
                {
                    params: artworkParams,
                }
            );
            setProducts(response.data.items);
            setPageCount(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }


    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                "https://localhost:7130/api/v1/orders"
            );
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const changePage = ({ selected }) => {
        setArtworkParams({ ...artworkParams, page: selected + 1 });
        fetchProducts();
    };

    const deletehandler = async () => {
        if (modalParams.data) {
            let response  = await  axios.delete(`https://localhost:7130/api/v1/artworks/${modalParams.data.idArtwork}`);
            if (response.status === 200) {
                fetchProducts();
                setModalParams({modalType: null, show: false, data: null});
            }
        }
    };
    
    const getOrderStatus = (status) => {
        switch (status) {
            case 1:
                return "Pending";
            case 2:
                return "Accepted";
            case 3:
                return "Rejected";
            default:
                return "Unknown";
        }
    };

    const orderActionHandler = async (eventKey, order) => {
        let urlLink = `https://localhost:7130/api/v1/orders/update-status/${order.idOrder}/`;
        switch (eventKey) {
            case "1": // Accept
                urlLink += "2";
                break;
            case "2": // Reject
                urlLink += "3";
                break;
            default:
                break;
        }
        let response = await axios.put(urlLink);
        setOrders(orders.map((o) => {
            if (o.idOrder === order.idOrder) {
                o.orderStatus = response.data.orderStatus;
            }
            return o;
        }));
    };

    const inputChangeHandler = (e) => {
        setModalParams({
            ...modalParams,
            data: {
                ...modalParams.data,
                [e.target.id]: e.target.value,
            },
        });
    };

    const onChangeImage = (e, image) => {
        setModalParams({
            ...modalParams,
            data: {
                ...modalParams.data,
                imageLists: modalParams.data.imageLists.map((i) => {
                    if (i._id === image._id) {
                        i.imageUrl = e.target.value;
                    }
                    return i;
                }),
            },
        });
    };

    const handleCreateAndEdit = async (product, type) => {
        if (type !== "save") {
            let modalType = product ? "edit" : "add";
            if (product) {
                // Edit logic goes here
            } else {
                product = {
                    imageLists: [],
                };
            }
            setModalParams({modalType: modalType, show: true, data: product});
        } else {
            let urlLink = "https://localhost:7130/api/v1/artworks";
            let method = "post";
            if (product.idArtwork) {
                urlLink += `/${product.idArtwork}`;
                method = "put";
            }
            let response = await axios[method](urlLink, product);
            if (response.status === 200) {
                fetchProducts();
                setModalParams({modalType: null, show: false, data: null});
            }
        }
    };

    const handleAddAndEditImage = (image) => {
        if (image) {
            setModalParams({
                ...modalParams,
                data: {
                    ...modalParams.data,
                    imageLists: modalParams.data.imageLists.filter((i) => {
                        if (i._id) {
                            return i._id !== image._id;
                        }else{

                            return i.idImageList !== image.idImageList;
                        }
                    }),
                },
            });
        } else {
            setModalParams({
                ...modalParams,
                data: {
                    ...modalParams.data,
                    imageLists: [
                        ...modalParams.data.imageLists,
                        {
                            imageUrl: "",
                            _id: new Date().getTime(),
                        },
                    ],
                },
            })
        }
    }
    
    return (
        <section className="gauto-product-page section_70">
            <Container>
                <div className="order-page">
                    <h2>Orders</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Artwork</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>User</th>
                                <th>Phone</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.idOrder}>
                                    <td>{index + 1}</td>
                                    <td>{order.artwork.name}</td>
                                    <td>{order.artwork.author}</td>
                                    <td>{order.artwork.price}</td>
                                    <td>{order.user.username}</td>
                                    <td>{order.user.phone}</td>
                                    <td>{order.date}</td>
                                    <td>{getOrderStatus(order.orderStatus)}</td>
                                    <td>
                                        <DropdownButton id="dropdown-basic-button" title="Action" onSelect={(eventKey) => orderActionHandler(eventKey, order)}>
                                            <Dropdown.Item eventKey="1">Accept</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">Reject</Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="artwork-page">
                    <div className="d-flex gap-3 align-items-center mb-3">
                        <h2>Artworks</h2>
                        <Button variant="primary" onClick={() => handleCreateAndEdit()}>Create</Button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Artwork</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.idArtwork}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.author}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categoryName}</td>
                                    <td>{product.status}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button className="btn btn-primary me-1" onClick={() => handleCreateAndEdit(product)}>
                                            <FaPen />
                                        </Button>
                                        <Button variant="danger" onClick={()=>setModalParams({modalType: "delete", show: true, data: product})}>
                                            <MdDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="7">
                                    <div className="pagination-box-row">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel=">"
                                            onPageChange={changePage}
                                            pageCount={pageCount}
                                            previousLabel="<"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            containerClassName="pagination"
                                            activeClassName="active"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Container>

            {/* DELETE MODAL */}
            <Modal show={modalParams.show && modalParams.modalType === "delete"} onHide={() => setModalParams({modalType: null, show: false, data: null})}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete this artwork. Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalParams({modalType: null, show: false, data: null})}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => deletehandler()}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ADD/EDIT MODAL */}
            <Modal show={modalParams.show && (modalParams.modalType === "add" || modalParams.modalType === "edit")} 
                onHide={() => setModalParams({modalType: null, show: false, data: null})}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalParams.modalType === "add" ? "Create" : "Edit"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-8">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Artwork Name</label>
                                <input type="text" className="form-control" id="name" value={modalParams.data?.name} onChange={(e) => inputChangeHandler(e)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" value={modalParams.data?.price} onChange={(e) => inputChangeHandler(e)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoryName" className="form-label">Category</label>
                                <input type="text" className="form-control" id="categoryName" value={modalParams.data?.categoryName} onChange={(e) => inputChangeHandler(e)} />
                            </div>
                            {
                                modalParams.modalType === "add" && (
                                    <div className="mb-3">
                                        <label htmlFor="author" className="form-label">Author</label>
                                        <input type="text" className="form-control" id="author" value={modalParams.data?.author} onChange={(e) => inputChangeHandler(e)} />
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-4">
                            {modalParams.data?.imageLists.map((image, index) => (
                                <div key={++index} className="mb-3 d-flex align-items-center gap-3">
                                    <input key={++index} type="text" className="form-control" value={image.imageUrl} onChange={(e) => onChangeImage(e, image)} />
                                    <Button variant="danger" onClick={() => handleAddAndEditImage(image)}>Delete</Button>
                                </div>
                            ))}
                            <div className="mb-3">
                                <Button variant="primary" onClick={() => handleAddAndEditImage()}>Add Image</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalParams({modalType: null, show: false, data: null})}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateAndEdit(modalParams.data, 'save')}>
                        {modalParams.modalType === "add" ? "Add" : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default Product;
