import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { FaAngleDoubleRight, FaSearch, FaShoppingCart } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import product1 from "../../img/product-1.jpg";


import "./style.css";

import axios from "axios";
import ReactPaginate from "react-paginate";

import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Product = () => {
    const { t } = useTranslation();

    const [pageCount, setPageCount] = useState(0);
    const [products, setProducts] = useState([]);
    console.log("Product", products)
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [artworkParams, setArtworkParams] = useState({
        size: 8,
        page: 1,
        name: null,
        price: null,
        status: null,
        categoryName: null,
    });

    // useeffect đang bị nhân lên 2 lần
    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [artworkParams]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "https://localhost:7130/api/v1/artworks",
                {
                    params: artworkParams,
                }
            );
            console.log(response);
            setProducts(response.data.items);
            setPageCount(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    /**
     * @description: Fetch categories from API
     * @param: {any}
     */
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "https://localhost:7130/api/v1/categories"
            );
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setArtworkParams({ ...artworkParams, categoryName: categoryName });
        fetchProducts();
    };

    const changePage = ({ selected }) => {
        setArtworkParams({ ...artworkParams, page: selected + 1 });
        fetchProducts();
    };

    const deletehandler = (productId) => {
        // Gửi yêu cầu DELETE đến API với productId
        axios.delete(`https://example.com/api/products/${productId}`)
            .then(response => {
                // Xử lý phản hồi từ server, ví dụ như hiển thị thông báo thành công hoặc thực hiện các hành động khác
                console.log('Product deleted successfully');
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Error deleting product:', error);
            });
    };
    // useEffect(() => {

    // })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <section className="gauto-product-page section_70">
            <Container>
                <Link to="/addproduct" className="btn btn-primary">
                    Tạo Mới
                </Link>
                <Row>

                    <Col lg={12} sm={12}>
                        <div className="product-page-right">
                            <Row>
                                {/* <Col md={4} sm={6}>
                                    <div className="product-item">
                                        <div className="product-image">
                                            <Link to="/product-single">
                                                <img src={product1} alt="product 1" />
                                            </Link>
                                        </div>
                                        <div className="product-text">
                                            <div className="product-title">
                                                <h3>
                                                    <Link to="/product-single">car battery</Link>
                                                </h3>
                                                <p>$180.00</p>
                                            </div>
                                            <div className="product-action">
                                                <Link to="/product-single">
                                                    <FaShoppingCart />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col> */}

                                {products.map((product) => (
                                    <Col key={product.idArtwork} md={3} sm={6}>
                                        <div className="product-item">
                                            <div className="product-image">
                                                <img src={product1} alt={product.name} />
                                            </div>
                                            <div className="product-text" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="product-title" style={{ width: '50%', textAlign: 'center' }}>
                                                    <Link to={`/product/${product.idArtwork}/edit`} className="btn btn-primary" onClick={handleShow}>
                                                        <FaPen style={{ fontSize: '34px' }} />
                                                    </Link>


                                                </div>

                                                <div className="product-action" style={{ width: '50%', textAlign: 'center' }}>
                                                    <Button variant="primary" onClick={handleShow}>
                                                        <MdDelete style={{ fontSize: '34px' }} />
                                                    </Button>
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Delete</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Bạn có chắc chắn xóa không?</Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Không
                                                            </Button>
                                                            <Button variant="primary" onClick={() => deletehandler(product.productId)}>
                                                                Có
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </div>
                                            </div>


                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="pagination-box-row">
                                        <ul className="pagination">
                                            <li className="active">
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
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Product;
