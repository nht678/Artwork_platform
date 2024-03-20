import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaTwitter,
} from "react-icons/fa";
import product1 from "../../img/product-2.jpg";

import "./style.css";

import axios from "axios";

const ProductDetails = () => {
  const { t } = useTranslation();

  const onClick = (e) => {
    e.preventDefault();
    try {
      let response = axios.post(
        `https://localhost:7130/artworks/order/${artwork.idArtwork}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const { id } = useParams();
  const [artwork, setArtwork] = useState([]);
  useEffect(() => {
    fetchArtworkDetail();
  }, []);

  const fetchArtworkDetail = async () => {
    try {
      let response = await axios.get(
        `https://localhost:7130/api/Product/${id}`
      );
      setArtwork(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <>
      <section className="gauto-product-details section_70">
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <div className="product-details-image">
                <img
                  src={
                    artwork.imageLists && artwork.imageLists.length
                      ? artwork.imageLists[0].imageUrl
                      : product1
                  }
                  alt="product 1"
                />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="product-details-text">
                <h3>{artwork.name}</h3>
                <div className="single-pro-page-para">
                  <p>{artwork.Des}</p>
                </div>
                <div className="single-shop-price">
                  <p>Author: {artwork.author} </p>
                  <p>Owner:{artwork.owner} </p>
                </div>
                <div className="single-shop-price">
                  <p>
                    {t("price")}:<span>{artwork.price}</span>
                  </p>
                </div>
                <div className="single-shop-page-btn">
                  <Link to="/cart" className="gauto-btn" onClick={onClick}>
                    <FaShoppingCart /> {artwork.status}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
