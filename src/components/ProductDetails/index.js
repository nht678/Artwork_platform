import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaStar,
  FaStarHalf,
  FaTwitter,
} from "react-icons/fa";
import img1 from "../../img/cart-1.png";
import product1 from "../../img/product-2.jpg";
import product2 from "../../img/product-1.jpg";
import product3 from "../../img/product-3.jpg";

import "./style.css";

import axios from "axios";

const ProductDetails = () => {
  const { t } = useTranslation();

  const onClick = (e) => {
    e.preventDefault();
  };

  const { id } = useParams();
  const [Artwork, setArtwork] = useState([]);
  const [userproduct, setUserProduct] = useState([]);
  useEffect(() => {
    axios.get(`https://65dc58f6e7edadead7ebb035.mockapi.io/authentication/${id}`)
      .then(response => {
        setArtwork(response);
        console.log("artwork", response);
      })
      .catch(err => console.error('Error fetching product data', err));
  }, []);
  // useEffect(() => {
  //   axios.get(`https://65e2f93488c4088649f51d06.mockapi.io/authentication/${id}`)
  //     .then((response) => {
  //       setUserProduct(response);
  //       console.log("user product", response);
  //     })
  // }, []);
  return (
    <>
      <section className="gauto-product-details section_70">
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <div className="product-details-image">
                <img src={img1} alt="product" />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="product-details-text">
                <h3>car disk break{Artwork.ArtworkName}</h3>
                <div className="single-pro-page-para">
                  <p>
                    Cursus mal suada faci lisis. Lorem ipsum dolor.ipsum dolor
                    sit amet, cons ectetur elit. Ves tibulum nec odios Suspe
                    ndisse cursus mal suada faci lisis. Lorem ipsum dolor.ipsum
                    dolor sit amet,.Lorem ipsum dolor.ipsum dolor sit amet, cons
                    ectetur elit. Ves tibulum nec odios
                    {Artwork.Des}
                  </p>
                </div>
                <div className="single-shop-price">
                  <p>Author: </p>
                  <p>Owner: </p>
                </div>
                <div className="single-shop-price">
                  <p>
                    {t("price")}:<span>$180{Artwork.Price}</span>
                  </p>
                </div>
                <div className="single-shop-page-btn">
                  <Link to="/cart" className="gauto-btn">
                    <FaShoppingCart /> {t("add_to_cart")}
                  </Link>
                  <ul>
                    <li>
                      <Link to="/" onClick={onClick}>
                        <FaFacebook />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" onClick={onClick}>
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" onClick={onClick}>
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="gauto-related-products section_b_70">
        <Container>
          <Row>
            <Col md={12}>
              <div className="site-heading">
                <h4>{t("products")}</h4>
                <h2>{t("related_products")}</h2>
              </div>
            </Col>
          </Row>
          <Row>
            {/* {userproducts.map(product => {
              return (
                <Col key={product.ArtworkId} lg={3} sm={6}>
                  <div className="product-item">
                    <div className="product-image">
                      <Link to={`/product-single/${product.ArtworkId}`}>
                        <img src={product1} alt="product 1" />
                      </Link>
                    </div>
                    <div className="product-text">
                      <div className="product-title">
                        <h3>
                          <Link to={`/product-single/${product.ArtworkId}`}>{product.ArtworkName}</Link>
                        </h3>
                        <p>${product.price}</p>
                      </div>
                      <div className="product-action">
                        <Link to="/product-single">
                          <FaShoppingCart />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })} */}


            {/* <Col lg={3} sm={6}>
              <div className="product-item">
                <div className="product-image">
                  <Link to="/product-single">
                    <img src={product2} alt="product 1" />
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
            </Col>
            <Col lg={3} sm={6}>
              <div className="product-item">
                <div className="product-image">
                  <Link to="/product-single">
                    <img src={product3} alt="product 1" />
                  </Link>
                </div>
                <div className="product-text">
                  <div className="product-title">
                    <h3>
                      <Link to="/product-single">steering wheel</Link>
                    </h3>
                    <p>$132.00</p>
                  </div>
                  <div className="product-action">
                    <Link to="/product-single">
                      <FaShoppingCart />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div className="product-item">
                <div className="product-image">
                  <Link to="/product-single">
                    <img src={product2} alt="product 1" />
                  </Link>
                </div>
                <div className="product-text">
                  <div className="product-title">
                    <h3>
                      <Link to="/product-single">car battery</Link>
                    </h3>
                    <p>$132.00</p>
                  </div>
                  <div className="product-action">
                    <Link to="/product-single">
                      <FaShoppingCart />
                    </Link>
                  </div>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
