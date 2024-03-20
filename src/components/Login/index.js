import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaLock, FaUser } from "react-icons/fa";

import "./style.css";

import { toast } from "react-toastify";
import { UserServices } from "../../services/UserServices";
import { actUserLogin } from "../../store/user/action";

const Login = () => {
  const { t } = useTranslation();

  const SubmitHandler = (e) => {
    e.preventDefault();
    UserServices.loginUser(formData)
      .then((resFetchMe) => {
        console.log("resFetchMe", resFetchMe);
        const token = resFetchMe.data.accessToken;
        const currentUser = resFetchMe.data.userInfo;
        const role = currentUser.role;
        dispatch(actUserLogin(currentUser, token, role));
        toast.success(
          `Bạn đã đăng nhập với role ${role}. Chào mừng đã vào cổng`
        );
        navigate("/");
        // UserServices.fetchMe(token)
        //   .then((res) => {
        //     console.log("take token", res);

        //   })
        //   .catch((err) => alert("Login or password failed"));
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Server error:", error.response.data);
        } else if (error.request) {
          toast.error("Network error:", error.request);
        } else {
          toast.error("Error:", error.message);
        }
      });
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className="gauto-login-area section_70">
      <Container>
        <Row>
          <Col md={12}>
            <div className="login-box">
              <div className="login-page-heading">
                <FaKey />
                <h3>{t("login_page.singin")}</h3>
              </div>
              <form onSubmit={SubmitHandler}>
                <div className="account-form-group">
                  <input
                    type="text"
                    placeholder={t("login_page.user_email")}
                    name="username"
                    value={formData?.username}
                    onChange={handleChange}
                  />
                  <FaUser />
                </div>
                <div className="account-form-group">
                  <input
                    type="password"
                    placeholder={t("login_page.password")}
                    name="password"
                    value={formData?.password}
                    onChange={handleChange}
                  />
                  <FaLock />
                </div>
                <div className="remember-row">
                  <p className="lost-pass">
                    <Link to="/" onClick={onClick}>
                      {t("login_page.f_password")}
                    </Link>
                  </p>
                  <p className="checkbox remember">
                    <input
                      className="checkbox-spin"
                      type="checkbox"
                      id="Freelance"
                    />
                    <label htmlFor="Freelance">
                      <span />
                      {t("login_page.keep")}
                    </label>
                  </p>
                </div>
                <p>
                  <button type="submit" className="gauto-theme-btn">
                    {t("login_page.btn")}
                  </button>
                </p>
              </form>
              <div className="login-sign-up">
                <Link to="/register">{t("login_page.need_account")}</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
