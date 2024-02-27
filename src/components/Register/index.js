import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaLock, FaUser, FaRegEnvelope } from "react-icons/fa";

import "./style.css";

import { UserServices } from "../../services/UserServices"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { actUserRegister } from "../../store/user/action";

const Register = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const SubmitHandler = (e) => {
  //   e.preventDefault();
  //   UserServices.registerUser(formData)
  //     .then((resRegister) => {
  //       console.log("resRegister", resRegister);
  //       const message = resRegister.data.message;
  //       dispatch(actUserRegister(message))
  //       if (message == "message 1") {
  //         navigate("/login");
  //       } else {
  //         navigate("/register");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Login or password failed", error);
  //       if (error.response) {
  //         toast.error("Server error:", error.response.data);
  //       } else if (error.request) {
  //         toast.error("Network error:", error.request);
  //       } else {
  //         toast.error("Error:", error.message);
  //       }
  //     });
  // };

  const SubmitHandler = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp nhau không
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return; // Dừng quá trình đăng ký nếu mật khẩu không khớp
    }

    UserServices.registerUser(formData)
      .then((resRegister) => {
        console.log("resRegister", resRegister);
        // Kiểm tra mã trạng thái của phản hồi
        if (resRegister.status === 201) {
          // Nếu đăng ký thành công, chuyển hướng đến trang đăng nhập
          navigate("/login");
          toast.success("Registration successful.");
        } else {
          // Nếu có lỗi xảy ra, thông báo cho người dùng
          toast.error("Registration failed.");
        }
      })
      .catch((error) => {
        console.log("Registration failed", error);
        if (error.response) {
          toast.error("Server error:", error.response.data);
        } else if (error.request) {
          toast.error("Network error:", error.request);
        } else {
          toast.error("Error:", error.message);
        }
      });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }



  return (
    <section className="gauto-login-area section_70">
      <Container>
        <Row>
          <Col md={12}>
            <div className="login-box">
              <div className="login-page-heading">
                <FaKey />
                <h3>{t("register_page.singup")}</h3>
              </div>
              <form onSubmit={SubmitHandler}>
                <div className="account-form-group">
                  <input
                    type="text"
                    placeholder={t("register_page.username")}
                    name="username"
                    value={formData?.username}
                    onChange={handleChange}
                  />
                  <FaUser />
                </div>
                <div className="account-form-group">
                  <input
                    type="text"
                    placeholder={t("register_page.email")}
                    name="email"//?
                    value={formData?.email}
                    onChange={handleChange}
                  />
                  <FaRegEnvelope />
                </div>
                <div className="account-form-group">
                  <input
                    type="password"
                    placeholder={t("register_page.password")}
                    name="password"
                    value={formData?.password}
                    onChange={handleChange}
                  />
                  <FaLock />
                </div>
                <div className="account-form-group">
                  <input
                    type="password"
                    placeholder={t("register_page.c_password")}
                    name="confirmPassword"
                    value={formData?.confirmPassword}
                    onChange={handleChange}
                  />
                  <FaLock />
                </div>
                <div className="remember-row">
                  <p className="checkbox remember signup">
                    <input
                      className="checkbox-spin"
                      type="checkbox"
                      id="Freelance"
                    />
                    <label htmlFor="Freelance">
                      <span />
                      {t("register_page.terms")}
                    </label>
                  </p>
                </div>
                <p>
                  <button type="submit" className="gauto-theme-btn">
                    {t("register_page.register_now")}
                  </button>
                </p>
              </form>
              <div className="login-sign-up">
                <Link to="/login">{t("register_page.have_account")}</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
