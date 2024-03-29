import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaStar,
  FaStarHalfAlt,
  FaCar,
  FaCogs,
  FaTachometerAlt,
  FaEmpire,
  FaDesktop,
  FaKey,
  FaLock,
  FaEye,
} from "react-icons/fa";

import img1 from "./ArtistRent.jpg";

import "./style.css";

const CarBooking = () => {
  const { t } = useTranslation();

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const onClick = (e) => {
    e.preventDefault();
  };



  return (
    <>
      <section className="gauto-car-booking section_70">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="car-booking-image">
                <img src={img1} alt="car" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="car-booking-right">
                <p className="rental-tag">{t("rental")}</p>
                <h3>Thanh Nhật</h3>
                <div className="price-rating">
                  <div className="price-rent">
                    <h4>
                      $50.00<span>/ {t("day")}</span>
                    </h4>
                  </div>
                </div>
                <p>
                  {" "}
                  consectetur adipiscing elit. Donec luctus tincidunt aliquam.
                  Aliquam gravida massa at sem vulputate interdum et vel eros.
                  Maecenas eros enim, tincidunt vel turpis vel,dapibus tempus
                  nulla. Donec vel nulla dui.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="gauto-booking-form section_70">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="booking-form-left">
                <div className="single-booking">
                  <h3>{t("car_booking.personal_information")}</h3>
                  <form onSubmit={SubmitHandler}>
                    <Row>
                      <Col md={6}>
                        <p>
                          <input
                            type="text"
                            placeholder={t("car_booking.first_name")}
                          />
                        </p>
                      </Col>
                      {/* <Col md={6}>
                        <p>
                          <input
                            type="text"
                            placeholder={t("car_booking.last_name")}
                          />
                        </p>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col md={6}>
                        <p>
                          <input
                            type="email"
                            placeholder={t("car_booking.email")}
                          />
                        </p>
                      </Col>
                      <Col md={6}>
                        <p>
                          <input
                            type="tel"
                            placeholder={t("car_booking.phn")}
                          />
                        </p>
                      </Col>
                    </Row>
                  </form>
                </div>
                <div className="single-booking">
                  <h3>{t("car_booking.booking_details")}</h3>
                  <form>
                    <Row>
                      <Col md={12}>
                        <p>
                          <textarea
                            placeholder="Write Here..."
                            defaultValue={""}
                          />
                        </p>
                      </Col>
                    </Row>
                  </form>
                </div>
              </div>
            </Col>
            {/* <Col lg={4}>
              <div className="booking-right">
                <h3>{t("car_booking.payment_method")}</h3>
                <div className="gauto-payment clearfix">
                  <div className="payment">
                    <input type="radio" id="ss-option" name="selector" />
                    <label htmlFor="ss-option">
                      {t("car_booking.bank_transfer")}
                    </label>
                    <div className="check">
                      <div className="inside" />
                    </div>
                    <p>{t("car_booking.payment_text")}</p>
                  </div>
                  <div className="payment">
                    <input type="radio" id="f-option" name="selector" />
                    <label htmlFor="f-option">
                      {t("car_booking.check_payment")}
                    </label>
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </div>
                  <div className="payment">
                    <input type="radio" id="s-option" name="selector" />
                    <label htmlFor="s-option">
                      {t("car_booking.credit_card")}
                    </label>
                    <div className="check">
                      <div className="inside" />
                    </div>
                    <img src={img2} alt="credit card" />
                  </div>
                  <div className="payment">
                    <input type="radio" id="t-option" name="selector" />
                    <label htmlFor="t-option">Paypal</label>
                    <div className="check">
                      <div className="inside" />
                    </div>
                    <img src={img3} alt="credit card" />
                  </div>
                </div>
                <div className="action-btn">
                  <Link to="/" onClick={onClick} className="gauto-btn">
                    {t("researve_now")}
                  </Link>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CarBooking;
