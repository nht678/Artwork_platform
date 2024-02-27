import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { FaAngleDoubleRight, FaSearch, FaShoppingCart } from "react-icons/fa";

import img1 from "../../img/cart-1.png";
import img2 from "../../img/cart-2.jpg";
import product1 from "../../img/product-1.jpg";
import product2 from "../../img/product-2.jpg";
import product3 from "../../img/product-3.jpg";
import product4 from "../../img/product-4.jpg";
import product5 from "../../img/product-5.jpg";

import "./style.css";

import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Product = () => {
  // const { t } = useTranslation();

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  // const onClick = (e) => {
  //   e.preventDefault();
  // };

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get('https://65dc58f6e7edadead7ebb035.mockapi.io/authentication/All_Product') // Assuming your API endpoint for fetching all products is '/api/products'
  //     .then(response => setProducts(response.data))
  //     .catch(error => console.error('Error fetching product data:', error));
  // }, []);

  // test phan trang 
  // const [products, setProducts] = useState([]);
  // const [pageNumber, setPageNumber] = useState(0);
  // const itemsPerPage = 9; // Số lượng sản phẩm trên mỗi trang
  // const pagesVisited = pageNumber * itemsPerPage;
  // const currentProducts = products.slice(pagesVisited, pagesVisited + itemsPerPage);
  // const pageCount = Math.ceil(products.length / itemsPerPage);

  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('https://65dc58f6e7edadead7ebb035.mockapi.io/authentication/All_Product')
      .then(response => {
        setProducts(response.data);
        // Lấy danh sách các danh mục từ dữ liệu sản phẩm và loại bỏ các danh mục trùng lặp
        const uniqueCategories = [...new Set(response.data.map(product => product.cateName))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  const handleCategoryClick = (category) => {
    // Lọc sản phẩm theo danh mục được chọn
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory ? products.filter(product => product.cateName === selectedCategory) : products;

  // Pagination logic
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;
  const pagesVisited = pageNumber * itemsPerPage;
  const currentProducts = filteredProducts.slice(pagesVisited, pagesVisited + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <section className="gauto-product-page section_70">
      <Container>
        <Row>
          <Col lg={4} sm={12}>
            <div className="product-page-left">
              <div className="sidebar-widget">
                <form className="product_search" onSubmit={SubmitHandler}>
                  <input type="search" placeholder={t("key_words")} />
                  <button type="submit">
                    <FaSearch />
                  </button>
                </form>
              </div>
              {/* <div className="sidebar-widget">
                <h3>{t("by_category")}</h3>
                <ul className="service-menu">
                  <li className="active">
                    <Link to="/" onClick={onClick}>
                      headlamps <span>(2376)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      disk break <span>(237)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      Turbo Oil <span>(23)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      tyre &amp; metal wheel <span>(258)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      battery <span>(67)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      suspension <span>(123)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      Shock Absorber <span>(23)</span>
                    </Link>
                  </li>
                </ul>
              </div> */}
              <div className="sidebar-widget">
                <h3>{t("by_category")}</h3>
                <ul className="service-menu">
                  {categories.map(category => (
                    <li key={category} className={selectedCategory === category ? 'active' : ''}>
                      <Link to="/" onClick={() => handleCategoryClick(category)}>
                        {category} <span>({products.filter(product => product.cateName === category).length})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-widget">
                <h3>{t("top_selling")}</h3>
                <ul className="top-products">
                  <li>
                    <div className="recent-img">
                      <Link to="/product-single">
                        <img src={img1} alt="recent" />
                      </Link>
                    </div>
                    <div className="recent-text">
                      <h4>
                        <Link to="/product-single">disk break</Link>
                      </h4>
                      <p>$78.60</p>
                    </div>
                  </li>
                  <li>
                    <div className="recent-img">
                      <Link to="/product-single">
                        <img src={img2} alt="recent" />
                      </Link>
                    </div>
                    <div className="recent-text">
                      <h4>
                        <Link to="/product-single">Shock Absorber</Link>
                      </h4>
                      <p>$39.40</p>
                    </div>
                  </li>
                  <li>
                    <div className="recent-img">
                      <Link to="/product-single">
                        <img src={img1} alt="recent" />
                      </Link>
                    </div>
                    <div className="recent-text">
                      <h4>
                        <Link to="/product-single">suspension</Link>
                      </h4>
                      <p>$52.50</p>
                    </div>
                  </li>
                  <li>
                    <div className="recent-img">
                      <Link to="/product-single">
                        <img src={img1} alt="recent" />
                      </Link>
                    </div>
                    <div className="recent-text">
                      <h4>
                        <Link to="/product-single">turbo oil</Link>
                      </h4>
                      <p>$78.60</p>
                    </div>
                  </li>
                  <li>
                    <div className="recent-img">
                      <Link to="/product-single">
                        <img src={img2} alt="recent" />
                      </Link>
                    </div>
                    <div className="recent-text">
                      <h4>
                        <Link to="/product-single">Shock Absorber</Link>
                      </h4>
                      <p>$39.40</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col lg={8} sm={12}>
            <div className="product-page-right">
              {/* <Row>
                {currentProducts.map(product => (
                  <Col key={product.id} md={4} sm={6}>
                    <div className="product-item">
                      <div className="product-image">
                        <Link to="/product-single">
                          <img src={product1} alt={product.ArtworkName} />
                        </Link>
                      </div>
                      <div className="product-text">
                        <div className="product-title">
                          <h3>
                            <Link to="/product-single">{product.ArtworkName}</Link>
                          </h3>
                          <p>{product.price}</p>
                        </div>
                        <div className="product-action">
                          <Link to="/product-single">
                            <FaShoppingCart />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row> */}
              <Row>
                {currentProducts.map(product => (
                  <Col key={product.id} md={4} sm={6}>
                    <div className="product-item">
                      <div className="product-image">
                        <Link to="/product-single">
                          <img src={product1} alt={product.ArtworkName} />
                        </Link>
                      </div>
                      <div className="product-text">
                        <div className="product-title">
                          <h3>
                            <Link to="/product-single">{product.ArtworkName}</Link>
                          </h3>
                          <p>{product.price}</p>
                        </div>
                        <div className="product-action">
                          <Link to="/product-single">
                            <FaShoppingCart />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col md={12}>
                  <div className="pagination-box-row">
                    {/* <p>Page 1 of 6</p> */}
                    <ul className="pagination">
                      <li className="active">
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=">"
                          onPageChange={changePage}
                          pageCount={pageCount}
                          previousLabel="<"
                          pageClassName='page-item'
                          pageLinkClassName='page-link'
                          previousClassName='page-item'
                          previousLinkClassName='page-link'
                          nextClassName='page-item'
                          nextLinkClassName='page-link'
                          breakClassName='page-item'
                          breakLinkClassName='page-link'
                          containerClassName='pagination'
                          activeClassName='active'
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
