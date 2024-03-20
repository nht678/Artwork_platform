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

import axios from "axios";
import ReactPaginate from "react-paginate";

const Product = () => {
  const { t } = useTranslation();

  const [pageCount, setPageCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [artworkParams, setArtworkParams] = useState({
    size: 9,
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

  return (
    <section className="gauto-product-page section_70">
      <Container>
        <Row>
          <Col lg={4} sm={12}>
            <div className="product-page-left">
              <div className="sidebar-widget">
                <form className="product_search">
                  <input type="search" placeholder={t("key_words")} />
                  <button type="submit">
                    <FaSearch />
                  </button>
                </form>
              </div>
              <div className="sidebar-widget">
                <h3>{t("by_category")}</h3>
                <ul className="service-menu">
                  {categories.map((category) => (
                    <li
                      key={category["name"]}
                      className={
                        selectedCategory === category["name"] ? "active" : ""
                      }
                    >
                      <Link
                        to="/"
                        onClick={() => handleCategoryClick(category["name"])}
                      >
                        {category["name"]}{" "}
                        <span>({category["totalProduct"]})</span>
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
              <Row>
                {products.map((product) => (
                  <Col key={product.idArtwork} md={4} sm={6}>
                    <div className="product-item">
                      <div className="product-image">
                        <Link to={`/product-single/${product.idArtwork}`}>
                          <img src={product1} alt={product.name} />
                        </Link>
                      </div>
                      <div className="product-text">
                        <div className="product-title">
                          <h3>
                            <Link to={`/product-single/${product.idArtwork}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <p>{product.price}</p>
                        </div>
                        <div className="product-action">
                          <Link to={`/product-single/${product.idArtwork}`}>
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
