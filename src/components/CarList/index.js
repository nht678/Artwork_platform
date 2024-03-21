import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaCar,
  FaCogs,
  FaTachometerAlt,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import ReactPaginate from "react-paginate";

import img2 from "./ArtistRent.jpg";


import "./style.css";

const CarList = () => {
  const { t } = useTranslation();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios.get('https://65e2f93488c4088649f51d06.mockapi.io/authentication/All_Artist')
      .then(response => {
        setArtists(response.data);
        const uniqueCategories = ['All', ...new Set(response.data.map(artist => artist.cateName))];
        console.log("unique categories", uniqueCategories);
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  // Pagination logic
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 6;
  const pagesVisited = pageNumber * itemsPerPage;
  const currentArtists = selectedCategory === 'All' ? artists : artists.filter(artist => artist.cateName === selectedCategory);
  const currentArtistsToShow = currentArtists.slice(pagesVisited, pagesVisited + itemsPerPage);
  const pageCount = Math.ceil(currentArtists.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <section className="gauto-car-listing section_70">
      <Container>
        <Row>
          <Col lg={4}>
            <div className="car-list-left">
              <div className="sidebar-widget">
                <ul className="service-menu">
                  {categories.map(category => (
                    <li key={category} className={selectedCategory === category ? 'active' : ''}>
                      <Link to="/car-listing" onClick={() => handleCategoryClick(category)}>
                        {category} <span>({category === 'All' ? artists.length : artists.filter(artist => artist.cateName === category).length})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className="car-listing-right">
              <div className="car-grid-list">
                <Row>
                  {currentArtistsToShow.map(artist => (
                    <Col md={6} key={artist.id}>
                      <div className="single-offers">
                        <div className="offer-image">
                          <Link to="/car-booking">
                            <img src={img2} alt="offer 1" />
                          </Link>
                        </div>
                        <div className="offer-text">
                          <Link to="/car-booking">
                            <h3>{artist.NameArtist}</h3>
                          </Link>
                          <h4>
                            {artist.Price}$<span>/ {t("day")}</span>
                          </h4>
                          <ul>
                            <li>
                              <BiCategoryAlt />
                              {t("model")}:{artist.cateName}
                            </li>
                            {/* <li>
                              <FaCogs />
                              {t("automatic")}
                            </li>
                            <li>
                              <FaTachometerAlt />
                              20kmpl
                            </li> */}
                          </ul>
                          <div className="offer-action">
                            <Link to="/car-booking" className="offer-btn-1">
                              {t("rent_car")}
                            </Link>
                            <Link to="/car-booking" className="offer-btn-2">
                              {t("details")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="pagination-box-row">
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
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarList;
